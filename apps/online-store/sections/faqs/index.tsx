'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '../../components/button';
import { SectionHeading } from '../common';

type TFAQs = {
  questions: {
    question: string;
    answer: string;
  }[];
};

export const FAQs = ({ questions }: TFAQs) => {
  return (
    <div className="flex flex-col items-center gap-16 p-16 text-mineral-green-600">
      <SectionHeading title="FAQs">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        varius enim in eros elementum tristique.
      </SectionHeading>
      <Accordion.Root
        type="single"
        defaultValue="item-1"
        className="w-[768px] border-t border-mineral-green-600"
        collapsible
      >
        {questions.map((question) => (
          <Accordion.Item
            key={question.question}
            value={question.question}
            className="border-b border-mineral-green-600"
          >
            <Accordion.Header className="flex">
              <Accordion.Trigger className="flex flex-1 items-center justify-between py-5 font-merriweather text-lg font-bold transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                {question.question}
                <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-300" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all">
              <div className="pb-4 pt-0">{question.answer}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <h3 className="font-merriweather text-[32px] font-bold">
            Still have a question?
          </h3>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <Button>Contact</Button>
      </div>
    </div>
  );
};
