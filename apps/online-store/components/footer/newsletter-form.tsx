'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@phab/utils';

const schema = z.object({ email: z.string().email() });
type TSchema = z.infer<typeof schema>;

export const NewsletterForm = ({ className }: { className?: string }) => {
  const { register, handleSubmit } = useForm<TSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ email }: TSchema) => {
    console.log(email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('flex', className)}>
      <input
        {...register('email')}
        placeholder="Enter your email"
        className="h-full w-full bg-[#F8F6F4] p-3 text-mineral-green-600 caret-mineral-green-600 placeholder:text-mineral-green-400 focus:outline-none sm:w-72"
      />
      <button className="flex items-center justify-center bg-mineral-green-600 px-6 py-3 text-pampas-100 transition-all duration-300 hover:bg-opacity-90">
        Subscribe
      </button>
    </form>
  );
};
