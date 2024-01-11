import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProductByHandle } from '@phab/data-next';

import { AddToCart } from '../../../components/add-to-cart';
import { DetailSection } from '../../../components/detail-section';
import { Gallery } from '../../../components/gallery';
import { Rating } from '../../../components/rating';
import { Review } from '../../../components/review';

export async function generateMetadata({
  params: { handle },
}: Props): Promise<Metadata> {
  const { title, description } = await getProductByHandle(handle);
  return {
    title,
    description: description,
  };
}

type Props = {
  params: { handle: string };
};

export default async function Page({ params: { handle } }: Props) {
  const product = await getProductByHandle(handle).catch((err) => {
    notFound();
  });
  return (
    <main className="px-16">
      <div className="flex pb-16 pt-12">
        <Gallery className="sticky top-32 h-full w-1/2 pr-10" />
        <div className="flex w-1/2 flex-col gap-8 pl-10">
          <div className="flex flex-col gap-2 text-mineral-green-600">
            <h2 className="font-merriweather text-3xl font-bold">
              {product.title}
            </h2>
            <h3 className="text-xl">{product.subtitle}</h3>
          </div>
          <Rating value={2.5} />
          <div className="flex gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 w-24 bg-neutral-300" />
            ))}
          </div>
          <div className="flex flex-col gap-4 text-sm text-mineral-green-600">
            <p>{product.description}</p>
          </div>
          <AddToCart />
          <div className="flex flex-col gap-8 pt-8">
            <DetailSection title="Description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              doloribus exercitationem nostrum pariatur? Amet, aperiam deserunt
              maxime omnis perspiciatis suscipit.
            </DetailSection>
            <DetailSection title="Composition">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              doloribus exercitationem nostrum pariatur? Amet, aperiam deserunt
              maxime omnis perspiciatis suscipit.
            </DetailSection>
            <DetailSection title="Ingredients">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              doloribus exercitationem nostrum pariatur? Amet, aperiam deserunt
              maxime omnis perspiciatis suscipit.
            </DetailSection>
            <DetailSection title="Usage">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              doloribus exercitationem nostrum pariatur? Amet, aperiam deserunt
              maxime omnis perspiciatis suscipit.
            </DetailSection>
          </div>
        </div>
      </div>
      <div className="border-t border-mineral-green-600/20">
        {Array.from({ length: 4 }).map((_, i) => (
          <Review
            key={i}
            rating={3.5}
            name="Ali Ameur"
            date={new Date()}
            likes={23}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
            doloribus exercitationem nostrum pariatur? Amet, aperiam deserunt
            maxime omnis perspiciatis suscipit.
          </Review>
        ))}
      </div>
    </main>
  );
}
