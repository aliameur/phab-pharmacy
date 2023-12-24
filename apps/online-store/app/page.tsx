import { Hero } from '../sections/hero';
import { FeaturedCategory } from '../sections/featured-category';

export default async function Index() {
  return (
    <main>
      <Hero />
      <FeaturedCategory side="left"/>
      <FeaturedCategory side="right"/>
      <FeaturedCategory side="left"/>
    </main>
  );
}
