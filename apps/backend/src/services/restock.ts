import { ProductService, TransactionBaseService } from '@medusajs/medusa';
import { MedusaError } from '@medusajs/utils';
import axios from 'axios';

import { OrderStatus, RestockOrder } from '../models/restock-order';
import { RestockOrderDetail } from '../models/restock-order-detail';
import { TWholesaleData } from '../types/product';

const RESTOCK_CHECK_INTERVAL = 20;

export default class Restock extends TransactionBaseService {
  private productService: ProductService;

  constructor(container) {
    super(container);
    this.productService = container.productService;
  }

  async list() {
    const restockRepo = this.activeManager_.getRepository(RestockOrder);
    return await restockRepo.find();
  }

  async create(
    data: {
      productId: string;
      quantity: number;
    }[],
  ): Promise<RestockOrder> {
    return this.atomicPhase_(async (manager) => {
      const [products, l] = await this.productService.listAndCount({
        id: data.map((d) => d.productId),
      });
      const wholesalerIds = products
        .map((p) => p.wholesaler_product_id)
        .filter(Boolean);

      if (wholesalerIds.length !== data.length) {
        throw new MedusaError(
          MedusaError.Types.NOT_ALLOWED,
          'Products do not have a registered wholesaler ID.',
        );
      }

      // create order with external API
      const restockRepo = manager.getRepository(RestockOrder);
      const restockDetailRepo = manager.getRepository(RestockOrderDetail);
      try {
        const res = await axios.post(
          'https://phabservice-129311a14694.herokuapp.com/wholesaler/order',
          {
            customerId: 1472,
            orderDetails: data.map((item, i) => ({
              productId: wholesalerIds[i],
              quantity: item.quantity,
            })),
          },
        );
        const wholesaleData: TWholesaleData = res.data;

        const restock = restockRepo.create();

        restock.status = OrderStatus.PENDING;
        restock.wholesaler_order_id = wholesaleData.orderId;
        restock.total_amount = wholesaleData.totalAmount;

        restock.order_details = wholesaleData.orderDetails.map((detail) => {
          const restockDetail = restockDetailRepo.create();
          restockDetail.product_id = detail.productId;
          restockDetail.quantity = detail.quantity;
          return restockDetail;
        });

        this.check();
        return await restockRepo.save(restock);
      } catch (e) {
        throw new MedusaError(
          MedusaError.Types.UNEXPECTED_STATE,
          'Upstream server error. Maybe wholesaler API is down?',
        );
      }
    });
  }

  async check() {
    const restockRepo = this.activeManager_.getRepository(RestockOrder);
    const pendingRestocks = await restockRepo.find({
      where: { status: OrderStatus.PENDING },
    });

    console.log(`checking ${pendingRestocks.length} restocks...`);

    let count = 0;
    const results = await Promise.all(
      pendingRestocks.map(async (restock) => {
        const res = await axios.get(
          `https://phabservice-129311a14694.herokuapp.com/wholesaler/delivery/${restock.wholesaler_order_id}`,
        );
        if (res.data === 'DELIVERED') {
          restock.status = OrderStatus.DELIVERED;
          await restockRepo.save(restock);
          return true;
        }
        return false;
      }),
    );

    console.log(`${results.filter(Boolean).length} new restocks delivered...`);

    setTimeout(() => {
      if (pendingRestocks.length > 0) this.check();
    }, 1000 * RESTOCK_CHECK_INTERVAL);
  }
}
