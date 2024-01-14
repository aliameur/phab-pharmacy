import { registerOverriddenValidators } from '@medusajs/medusa';
import { AdminPostProductsReq as MedusaAdminPostProductsReq } from '@medusajs/medusa/dist/api/routes/admin/products/create-product';
import { AdminPostProductsProductReq as MedusaAdminPostProductsProductReq } from '@medusajs/medusa/dist/api/routes/admin/products/update-product';
import { IsNumber, IsOptional } from 'class-validator';

class AdminPostProductsProductReq extends MedusaAdminPostProductsProductReq {
  @IsOptional()
  @IsNumber()
  wholesaler_product_id: number | null;

  @IsOptional()
  @IsNumber()
  max_quantity: number | null;
}

class AdminPostProductsReq extends MedusaAdminPostProductsReq {
  @IsOptional()
  @IsNumber()
  wholesaler_product_id: number | null;

  @IsOptional()
  @IsNumber()
  max_quantity: number | null;
}

registerOverriddenValidators(AdminPostProductsProductReq);
registerOverriddenValidators(AdminPostProductsReq);
