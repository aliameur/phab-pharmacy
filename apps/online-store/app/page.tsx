import { FeaturedCategory } from '../sections/featured-category';
import { Hero } from '../sections/hero';

export default async function Index() {
  return (
    <main>
      <Hero />
      <FeaturedCategory title="Category" side="left" />
      <FeaturedCategory title="Category" side="right" />
      <FeaturedCategory title="Category" side="left" />
    </main>
  );
}
