'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({ email: z.string().email() });
type TSchema = z.infer<typeof schema>;

export const NewsletterForm = () => {
  const { register, handleSubmit } = useForm<TSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ email }: TSchema) => {
    console.log(email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <input
        {...register('email')}
        placeholder="Enter your email"
        className="caret-mineral-green-600 text-mineral-green-600 placeholder:text-mineral-green-400 h-full w-72 bg-[#F8F6F4] p-3 focus:outline-none"
      />
      <button className="bg-mineral-green-600 text-pampas-100 flex items-center justify-center px-6 py-3 transition-all duration-300 hover:bg-opacity-90">
        Subscribe
      </button>
    </form>
  );
};
