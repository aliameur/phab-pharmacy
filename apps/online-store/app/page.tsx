import { FAQs, FeaturedCategory, Hero, Team, Testimonials } from '../sections';

export default async function Index() {
  return (
    <main>
      <Hero />
      <FeaturedCategory title="Category" side="left" />
      <FeaturedCategory title="Category" side="right" />
      <FeaturedCategory title="Category" side="left" />

      <Testimonials />
      <FAQs
        questions={[
          {
            question: 'Question One',
            answer:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur blanditiis cum cupiditate distinctio earum eius fugiat, iusto nostrum pariatur quam quas quia quis, repellendus saepe ullam, velit. Sint, voluptate.',
          },
          {
            question: 'Question Two',
            answer:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur blanditiis cum cupiditate distinctio earum eius fugiat, iusto nostrum pariatur quam quas quia quis, repellendus saepe ullam, velit. Sint, voluptate.',
          },
          {
            question: 'Question Three',
            answer:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur blanditiis cum cupiditate distinctio earum eius fugiat, iusto nostrum pariatur quam quas quia quis, repellendus saepe ullam, velit. Sint, voluptate.',
          },
          {
            question: 'Question Four',
            answer:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur blanditiis cum cupiditate distinctio earum eius fugiat, iusto nostrum pariatur quam quas quia quis, repellendus saepe ullam, velit. Sint, voluptate.',
          },
          {
            question: 'Question Five',
            answer:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur blanditiis cum cupiditate distinctio earum eius fugiat, iusto nostrum pariatur quam quas quia quis, repellendus saepe ullam, velit. Sint, voluptate.',
          },
        ]}
      />
      <Team />
    </main>
  );
}
