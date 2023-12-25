import { Quote } from 'lucide-react';
import { ReactNode } from 'react';

export const Testimonials = () => {
  return (
    <div className="text-mineral-green-600 flex flex-col items-center gap-16 py-16">
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-merriweather text-5xl">Customer Testimonials</h2>
        <p className="text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="flex justify-center gap-16">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Testimonial key={idx} handle="ali_ameur">
            Lorem ipsum dolor sit amet consectetur. Sodales sed est fames
            aliquam sed iaculis. Ultrices elit eu amet donec aliquam quam duis
            aenean.
          </Testimonial>
        ))}
      </div>
    </div>
  );
};

type TTestimonial = {
  children: ReactNode;
  handle: string;
};
const Testimonial = ({ children, handle }: TTestimonial) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-mineral-green-600 text-pampas-100 relative min-h-[180px] w-[268px] p-4 pb-10">
        {children}
        <div className="border-norway-300 absolute bottom-0 left-1/2 h-11 w-11 -translate-x-1/2 translate-y-1/2 rounded-full border bg-neutral-300" />
        <Quote className="text-norway-300 absolute -left-[13px] -top-2.5 rotate-180" />
        <Quote className="text-norway-300 absolute -bottom-2.5 -right-[13px]" />
      </div>
      <span className="text-mineral-green-600">@{handle}</span>
    </div>
  );
};
