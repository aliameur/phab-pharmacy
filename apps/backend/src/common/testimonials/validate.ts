import * as z from 'zod';

import { validate } from '../utils';

const testimonialSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
    }),
    testimonial: z.string({
      required_error: 'testimonial is required',
    }),
    imageSrc: z.string({
      required_error: 'imageSrc is required',
    }),
  }),
});

export const validateTestimonial = validate(testimonialSchema);
