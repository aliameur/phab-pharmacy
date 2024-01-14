import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import { EntityManager } from 'typeorm';
import * as z from 'zod';
import { AnyZodObject } from 'zod';

import { Testimonial } from '../../../models/testimonial';

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const manager: EntityManager = req.scope.resolve('manager');
  const testimonialRepo = manager.getRepository(Testimonial);

  res.json({
    testimonials: await testimonialRepo.find(),
  });
}

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  await validate(dataSchema)(req, res);

  const manager: EntityManager = req.scope.resolve('manager');
  const testimonialRepo = manager.getRepository(Testimonial);

  const testimonial = testimonialRepo.create();
  testimonial.name = req.body.name;
  testimonial.testimonial = req.body.testimonial;
  testimonial.imageSrc = req.body.imageSrc;
  testimonial.created_at = new Date();
  testimonial.updated_at = new Date();
  const result = await testimonialRepo.save(testimonial);

  req.res.json({
    testimonial: result,
  });
}

const dataSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    testimonial: z.string({
      required_error: 'Testimonial is required',
    }),
    imageSrc: z.string({
      required_error: 'ImageSrc is required',
    }),
  }),
});

const validate =
  (schema: AnyZodObject) => async (req: MedusaRequest, res: MedusaResponse) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  };
