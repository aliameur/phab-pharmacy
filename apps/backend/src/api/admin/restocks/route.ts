import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import { MedusaError } from '@medusajs/utils';

import Restock from '../../../services/restock';

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const restockService: Restock = req.scope.resolve('restockService');

  res.json({
    restocks: await restockService.list(),
  });
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const restockService: Restock = req.scope.resolve('restockService');

  if (
    !req.body.restocks ||
    !req.body.restocks.every(
      (d) => typeof d.productId === 'string' && typeof d.quantity === 'number',
    )
  )
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      'Invalid restock data',
    );

  res.json({
    restocks: await restockService.create(req.body.restocks),
  });
}
