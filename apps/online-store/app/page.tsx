import { FAQs, FeaturedCategory, Hero, Team, Testimonials } from '../sections';

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
