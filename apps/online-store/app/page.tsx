import { FAQs, FeaturedCategory, Hero, Team, Testimonials } from '../sections';

export default async function Index() {
  return (
    <main>
      <Hero />
      <FeaturedCategory title="Category" side="left" />
      <FeaturedCategory title="Category" side="right" />
      <FeaturedCategory title="Category" side="left" />
      <Testimonials
        testimonials={[
          {
            handle: 'ali_ameur',
            content:
              'Lorem ipsum dolor sit amet consectetur. Sodales sed est fames aliquam sed iaculis. Ultrices elit eu amet donec aliquam quam duis aenean.',
          },
          {
            handle: 'ali_ameur',
            content:
              'Lorem ipsum dolor sit amet consectetur. Sodales sed est fames aliquam sed iaculis. Ultrices elit eu amet donec aliquam quam duis aenean.',
          },
          {
            handle: 'ali_ameur',
            content:
              'Lorem ipsum dolor sit amet consectetur. Sodales sed est fames aliquam sed iaculis. Ultrices elit eu amet donec aliquam quam duis aenean.',
          },
        ]}
      />
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
      <Team
        members={[
          {
            name: 'John Doe',
            title: 'CEO',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
            links: {
              linkedin: '#',
              twitter: '#',
              dribbble: '#',
            },
          },
          {
            name: 'John Smith',
            title: 'CTO',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
            links: {
              linkedin: '#',
              twitter: '#',
              dribbble: '#',
            },
          },
          {
            name: 'John Appleseed',
            title: 'CFO',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
            links: {
              linkedin: '#',
              twitter: '#',
              dribbble: '#',
            },
          },
        ]}
      />
    </main>
  );
}
