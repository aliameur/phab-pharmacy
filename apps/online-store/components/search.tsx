'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Search as SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({ search: z.string().min(1) });
type TSchema = z.infer<typeof schema>;

export const Search = () => {
  const { register, handleSubmit } = useForm<TSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ search }: TSchema) => {
    console.log(search);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <input
        {...register('search')}
        placeholder="What are you looking for?"
        className="caret-mineral-green-600 text-mineral-green-600 placeholder:text-mineral-green-400 h-full w-full bg-[#F8F6F4] px-6 py-6 text-xl focus:outline-none"
      />
      <div className="bg-mineral-green-600 absolute bottom-0 right-0 top-0 flex aspect-square items-center justify-center">
        <SearchIcon className="text-pampas-100 h-8 w-8" />
      </div>
    </form>
  );
};
