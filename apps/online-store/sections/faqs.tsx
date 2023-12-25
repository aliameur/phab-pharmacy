'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '../components/button';

export const FAQs = () => {
  return (
    <div className="text-mineral-green-600 flex flex-col items-center gap-16 p-16">
      <div className="flex flex-col items-center gap-6">
        <h2 className="font-merriweather text-5xl">FAQs</h2>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.
        </p>
      </div>
      <Accordion.Root
        type="single"
        defaultValue="item-1"
        className="border-mineral-green-600 w-[768px] border-t"
        collapsible
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Accordion.Item
            key={i}
            value={`item-${i + 1}`}
            className="border-mineral-green-600 border-b"
          >
            <Accordion.Header className="flex">
              <Accordion.Trigger className="font-merriweather flex flex-1 items-center justify-between py-5 text-lg font-bold transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                Item {i + 1}
                <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-300" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all">
              <div className="pb-4 pt-0">Item {i + 1} text</div>
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
