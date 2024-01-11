'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Search as SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '../../lib/utils';

const schema = z.object({ search: z.string().min(1) });
type TSchema = z.infer<typeof schema>;

type TSearch = {
  className?: string;
};
export const Search = ({ className }: TSearch) => {
  const { register, handleSubmit } = useForm<TSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ search }: TSchema) => {
    console.log(search);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('relative', className)}
    >
      <input
        {...register('search')}
        placeholder="What are you looking for?"
        className="h-full w-full bg-[#F8F6F4] px-6 py-6 text-xl text-mineral-green-600 caret-mineral-green-600 placeholder:text-mineral-green-400 focus:outline-none"
      />
      <button className="absolute bottom-0 right-0 top-0 flex aspect-square items-center justify-center bg-mineral-green-600 transition-all duration-300 hover:bg-opacity-90">
        <SearchIcon className="h-8 w-8 text-pampas-100" />
      </button>
    </form>
  );
};
