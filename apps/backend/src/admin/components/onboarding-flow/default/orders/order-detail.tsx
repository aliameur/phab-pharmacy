import {
  ComputerDesktopSolid,
  CurrencyDollarSolid,
  NextJs,
} from '@medusajs/icons';
import { Heading, IconBadge, Text } from '@medusajs/ui';
import React from 'react';

const OrderDetailDefault = () => {
  return (
    <>
      <Text size="small" className="mb-6">
        You finished the setup guide 🎉 You now have your first order. Feel free
        to play around with the order management functionalities, such as
        capturing payment, creating fulfillments, and more.
      </Text>
      <Heading
        level="h2"
        className="text-ui-fg-base border-ui-border-base mb-2 border-t border-solid pt-6"
      >
        Start developing with Medusa
      </Heading>
      <Text size="small">
        Medusa is a completely customizable commerce solution. We've curated
        some essential guides to kickstart your development with Medusa.
      </Text>
      <div className="border-ui-border-base mb-6 mt-6 grid auto-rows-fr grid-cols-3 gap-4 border-b border-solid pb-6">
        <a
          href={`https://docs.medusajs.com/modules/overview?ref=onboarding`}
          target="_blank"
          className="flex"
        >
          <div className="rounded-rounded bg-ui-bg-subtle shadow-elevation-card-rest hover:shadow-elevation-card-hover flex items-start p-3">
            <div className="mr-4">
              <div className="bg-ui-bg-base border-ui-border-strong flex items-center justify-center rounded-lg border p-1">
                <IconBadge>
                  <CurrencyDollarSolid />
                </IconBadge>
              </div>
            </div>
            <div>
              <Text
                size="xsmall"
                weight="plus"
                className="text-ui-fg-base mb-1"
              >
                Add Commerce Features
              </Text>
              <Text size="small">
                Learn about all available commerce features and how to add them
                in your storefront
              </Text>
            </div>
          </div>
        </a>
        <a
          href="https://docs.medusajs.com/recipes/?ref=onboarding"
          target="_blank"
          className="flex"
        >
          <div className="rounded-rounded bg-ui-bg-subtle shadow-elevation-card-rest hover:shadow-elevation-card-hover flex items-start p-3">
            <div className="mr-4">
              <div className="bg-ui-bg-base border-ui-border-strong flex items-center justify-center rounded-lg border p-1">
                <IconBadge>
                  <ComputerDesktopSolid />
                </IconBadge>
              </div>
            </div>
            <div>
              <Text
                size="xsmall"
                weight="plus"
                className="text-ui-fg-base mb-1"
              >
                Build Custom Use Cases
              </Text>
              <Text size="small">
                Build a marketplace, subscription-based purchases, or your
                custom use-cases.
              </Text>
            </div>
          </div>
        </a>
        <a
          href={`https://docs.medusajs.com/starters/nextjs-medusa-starter?ref=onboarding`}
          target="_blank"
          className="flex"
        >
          <div className="rounded-rounded bg-ui-bg-subtle shadow-elevation-card-rest hover:shadow-elevation-card-hover flex items-start p-3">
            <div className="mr-4">
              <div className="bg-ui-bg-base border-ui-border-strong flex items-center justify-center rounded-lg border p-1">
                <IconBadge>
                  <NextJs />
                </IconBadge>
              </div>
            </div>
            <div>
              <Text
                size="xsmall"
                weight="plus"
                className="text-ui-fg-base mb-1"
              >
                Install Next.js Quickstart
              </Text>
              <Text size="small">
                Install and use the Next.js storefront with your commerce store.
              </Text>
            </div>
          </div>
        </a>
      </div>
      <div>
        You can find more useful guides in{' '}
        <a
          href="https://docs.medusajs.com/?ref=onboarding"
          target="_blank"
          className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
        >
          our documentation
        </a>
        . If you like Medusa, please{' '}
        <a
          href="https://github.com/medusajs/medusa"
          target="_blank"
          className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
        >
          star us on GitHub
        </a>
        .
      </div>
    </>
  );
};

export default OrderDetailDefault;
