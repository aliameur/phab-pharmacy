import { SectionHeading } from '../common';
import { Testimonial } from './testimonial';

type TTestimonials = {
  testimonials: {
    handle: string;
    content: string;
  }[];
};
export const Testimonials = ({ testimonials }: TTestimonials) => {
  return (
    <div className="flex flex-col items-center gap-8 px-4 py-8 text-mineral-green-600 md:gap-16 md:py-16">
      <SectionHeading title="Customer Testimonials">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </SectionHeading>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {testimonials.map((testimonial, i) => (
          <Testimonial key={i} handle={testimonial.handle}>
            {testimonial.content}
          </Testimonial>
        ))}
      </div>
    </div>
  );
};
