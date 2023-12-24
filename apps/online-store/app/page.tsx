import { FAQs } from '../sections/faqs';
import { FeaturedCategory } from '../sections/featured-category';
import { Hero } from '../sections/hero';
import { Team } from '../sections/team';
import { Testimonials } from '../sections/testimonials';

export default async function Index() {
  return (
    <main>
      <Hero />
      <FeaturedCategory title="Category" side="left" />
      <FeaturedCategory title="Category" side="right" />
      <FeaturedCategory title="Category" side="left" />
      <Testimonials />
      <FAQs />
      <Team />
    </main>
  );
}
