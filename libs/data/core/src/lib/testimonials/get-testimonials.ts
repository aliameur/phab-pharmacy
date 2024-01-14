import { MedusaTestimonialOperation, TRequestFn } from '../../types';

export const getTestimonials = (requestFn: TRequestFn) => async () => {
  const res = await requestFn<MedusaTestimonialOperation>({
    path: '/testimonials',
  });
  return res.body.testimonials;
};
