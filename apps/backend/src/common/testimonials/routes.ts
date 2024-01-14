import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import { EntityManager } from 'typeorm';

import { Testimonial } from '../../models/testimonial';
import { validateTestimonial } from './validate';

export async function testimonialsGET(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  const manager: EntityManager = req.scope.resolve('manager');
  const testimonialRepo = manager.getRepository(Testimonial);

  res.json({
    testimonials: await testimonialRepo.find(),
  });
}

export async function testimonialsPOST(
  req: MedusaRequest,
  res: MedusaResponse,
): Promise<void> {
  await validateTestimonial(req, res);

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
