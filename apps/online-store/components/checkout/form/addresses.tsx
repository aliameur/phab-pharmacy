import { CheckCircleSolid } from '@medusajs/icons';
import { Loader2 } from 'lucide-react';
import React from 'react';

import { Button, Divider } from '@phab/ui/core';

import { useCheckout } from '../../../lib/checkout-provider';
import BillingAddress from '../medusa-next-js-starter/billing-address';
import ShippingAddress from '../medusa-next-js-starter/shipping-address';

const Addresses = () => {
  const {
    sameAsBilling: { state: checked, toggle: onChange },
    editAddresses: { state: isOpen, open },
    editShipping: { close: closeShipping },
    editPayment: { close: closePayment },
    setAddresses,
    handleSubmit,
    cart,
  } = useCheckout();

  const handleEdit = () => {
    open();
    closeShipping();
    closePayment();
  };

  return (
    <div className="bg-pampas-200 px-4 md:px-8 pb-8">
      <div className="mb-6 flex flex-row items-center justify-between">
        <h2 className="flex flex-row items-baseline gap-x-2 text-3xl">
          Address
          {!isOpen && <CheckCircleSolid />}
        </h2>
        {!isOpen && (
          <p>
            <Button onClick={handleEdit}>Edit</Button>
          </p>
        )}
      </div>
      {isOpen ? (
        <div className="pb-8">
          <ShippingAddress checked={checked} onChange={onChange} />

          {!checked && (
            <div>
              <h2 className="gap-x-4 pb-6 pt-8 text-3xl">Billing address</h2>

              <BillingAddress />
            </div>
          )}

          <Button
            size="lg"
            className="mt-6"
            onClick={handleSubmit(setAddresses)}
          >
            Continue to delivery
          </Button>
        </div>
      ) : (
        <div>
          <div className="text-base text-mineral-green-600">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex w-full items-start gap-x-1">
                  <div className="flex w-1/3 flex-col">
                    <p className="mb-1 text-xl">Shipping Address</p>
                    <p className="text-base ">
                      {cart.shipping_address.first_name}{' '}
                      {cart.shipping_address.last_name}
                    </p>
                    <p className="text-base ">
                      {cart.shipping_address.address_1}{' '}
                      {cart.shipping_address.address_2}
                    </p>
                    <p className="text-base ">
                      {cart.shipping_address.postal_code},{' '}
                      {cart.shipping_address.city}
                    </p>
                    <p className="text-base ">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </p>
                  </div>

                  <div className="flex w-1/3 flex-col ">
                    <p className="text-ui-fg-base mb-1 text-xl">Contact</p>
                    <p className="text-base ">{cart.shipping_address.phone}</p>
                    <p className="text-base ">{cart.email}</p>
                  </div>

                  <div className="flex w-1/3 flex-col">
                    <p className="text-ui-fg-base mb-1 text-xl">
                      Billing Address
                    </p>

                    {checked ? (
                      <p className="text-base ">
                        Billing- and delivery address are the same.
                      </p>
                    ) : (
                      <>
                        <p className="text-base ">
                          {cart.billing_address.first_name}{' '}
                          {cart.billing_address.last_name}
                        </p>
                        <p className="text-base ">
                          {cart.billing_address.address_1}{' '}
                          {cart.billing_address.address_2}
                        </p>
                        <p className="text-base ">
                          {cart.billing_address.postal_code},{' '}
                          {cart.billing_address.city}
                        </p>
                        <p className="text-base ">
                          {cart.billing_address.country_code?.toUpperCase()}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Loader2 className="h-10 w-10 animate-spin text-mineral-green-600" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Addresses;
