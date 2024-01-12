import {
  getCategoryByHandle,
  getProductsByCategoryHandle,
} from '@phab/data-next';

import { FAQs, FeaturedCategory, Hero, Team, Testimonials } from '../sections';

export const metadata = {
  title: 'Home | Phab Pharmacy',
};

export default async function Index() {
  const [coldAndFlu, skinCare, headachesAndPainRelief] = await Promise.all([
    getCategoryData('cold-and-flu'),
    getCategoryData('skin-care'),
    getCategoryData('headaches-and-pain-relief'),
  ]);
  return (
    <main>
      <Hero />
      <FeaturedCategory
        title={coldAndFlu.category.name}
        side="left"
        products={coldAndFlu.products}
        href={`/categories/${coldAndFlu.category.handle}`}
      />
      <FeaturedCategory
        title={skinCare.category.name}
        side="right"
        products={skinCare.products}
        href={`/categories/${skinCare.category.handle}`}
      />
      <FeaturedCategory
        title={headachesAndPainRelief.category.name}
        side="left"
        products={headachesAndPainRelief.products}
        href={`/categories/${headachesAndPainRelief.category.handle}`}
      />
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

async function getCategoryData(handle: string) {
  const [category, products] = await Promise.all([
    getCategoryByHandle(handle),
    getProductsByCategoryHandle(handle),
  ]);
  return { category, products };
}
