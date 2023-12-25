import { Quote } from 'lucide-react';
import { ReactNode } from 'react';

type TTestimonial = {
  children: ReactNode;
  handle: string;
};

export const Testimonial = ({ children, handle }: TTestimonial) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative min-h-[180px] w-[268px] bg-mineral-green-600 p-4 pb-10 text-pampas-100">
        {children}
        <div className="absolute bottom-0 left-1/2 h-11 w-11 -translate-x-1/2 translate-y-1/2 rounded-full border border-norway-300 bg-neutral-300" />
        <Quote className="absolute -left-[13px] -top-2.5 rotate-180 text-norway-300" />
        <Quote className="absolute -bottom-2.5 -right-[13px] text-norway-300" />
      </div>
      <span className="text-mineral-green-600">@{handle}</span>
    </div>
  );
};
