import { notFound } from 'next/navigation';

import { getCategoryByHandle } from '@phab/data-next';

type Props = {
  params: { handle: string };
};

export default async function Page({ params: { handle } }: Props) {
  const category = await getCategoryByHandle(handle).catch((err) => {
    notFound();
  });
  return (
    <div>
      <div className="bg-pattern flex h-72 w-full items-center justify-center text-pampas-100">
        <h2 className="font-merriweather text-4xl">{category.name}</h2>
      </div>
      cateogry
    </div>
  );
}
