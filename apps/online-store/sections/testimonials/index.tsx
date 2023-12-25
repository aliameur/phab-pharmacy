import { Testimonial } from './testimonial';

type TTestimonials = {
  testimonials: {
    handle: string;
    content: string;
  }[];
};
export const Testimonials = ({ testimonials }: TTestimonials) => {
  return (
    <div className="flex flex-col items-center gap-16 py-16 text-mineral-green-600">
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-merriweather text-5xl">Customer Testimonials</h2>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="flex justify-center gap-16">
        {testimonials.map((testimonial, i) => (
          <Testimonial key={i} handle={testimonial.handle}>
            {testimonial.content}
          </Testimonial>
        ))}
      </div>
    </div>
  );
};
