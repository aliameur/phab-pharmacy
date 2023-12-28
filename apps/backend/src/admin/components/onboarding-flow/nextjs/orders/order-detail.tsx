import {
  ComputerDesktopSolid,
  CurrencyDollarSolid,
  NextJs,
} from '@medusajs/icons';
import { Heading, IconBadge, Text } from '@medusajs/ui';
import React from 'react';

const OrderDetailNextjs = () => {
  const queryParams = `?ref=onboarding&type=${
    process.env.MEDUSA_ADMIN_ONBOARDING_TYPE || 'nextjs'
  }`;
  return (
    <>
      <Text size="small" className="mb-6">
        You finished the setup guide 🎉. You now have a complete ecommerce store
        with a backend, admin, and a Next.js storefront. Feel free to play
        around with each of these components to experience all commerce features
        that Medusa provides.
      </Text>
      <Heading
        level="h2"
        className="text-ui-fg-base border-ui-border-base mb-2 border-t border-solid pt-6"
      >
        Continue Building your Ecommerce Store
      </Heading>
      <Text size="small">
        Your ecommerce store provides all basic ecommerce features you need to
        start selling. You can add more functionalities, add plugins for
        third-party integrations, and customize the storefront’s look and feel
        to support your use case.
      </Text>
      <div className="border-ui-border-base mb-6 mt-6 grid auto-rows-fr grid-cols-3 gap-4 border-b border-solid pb-6">
        <a
          href={`https://docs.medusajs.com/starters/nextjs-medusa-starter${queryParams}`}
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
                Build with the Next.js Storefront
              </Text>
              <Text size="small">
                Learn about the Next.js starter storefront’s features and how to
                customize it.
              </Text>
            </div>
          </div>
        </a>
        <a
          href={`https://docs.medusajs.com/modules/overview${queryParams}`}
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
          href={`https://docs.medusajs.com/recipes${queryParams}`}
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

export default OrderDetailNextjs;
