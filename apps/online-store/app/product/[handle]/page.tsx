import { AddToCart } from '../../../components/add-to-cart';
import { Rating } from '../../../components/rating';

export default async function Page() {
  return (
    <main className="px-16">
      <div className="flex">
        <div className="w-1/2"></div>
        <div className="flex w-1/2 flex-col gap-8">
          <div className="flex flex-col gap-2 text-mineral-green-600">
            <h2 className="font-merriweather text-3xl font-bold">BIOGENA</h2>
            <h3 className="text-xl">DAOZym</h3>
          </div>
          <Rating value={2.5} />
          <div className="flex gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 w-24 bg-neutral-300" />
            ))}
          </div>
          <div className="flex flex-col gap-4 text-sm text-mineral-green-600">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad esse
              est fugit molestias, quos reiciendis sapiente? Adipisci distinctio
              ea eveniet facilis fugit hic illum, incidunt iusto magnam maiores,
              molestiae mollitia nam neque officiis provident quas quisquam,
              repellendus unde veniam vero!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad esse
              est fugit molestias, quos reiciendis sapiente? Adipisci distinctio
              ea eveniet facilis fugit hic illum, incidunt iusto magnam maiores,
              molestiae mollitia nam neque officiis provident quas quisquam,
              repellendus unde veniam vero!
            </p>
          </div>
          <AddToCart />
        </div>
      </div>
      <div></div>
    </main>
  );
}
