import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import { AnyZodObject } from 'zod';

export const validate =
  (schema: AnyZodObject) => async (req: MedusaRequest, res: MedusaResponse) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };
