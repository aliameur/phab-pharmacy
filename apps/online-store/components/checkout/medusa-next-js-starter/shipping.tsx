import { RadioGroup } from '@headlessui/react';
import { ErrorMessage } from '@hookform/error-message';
import { CheckCircleSolid } from '@medusajs/icons';
import { Cart } from '@medusajs/medusa';
import { Button, Heading, Text, clx } from '@medusajs/ui';
import { Loader2 } from 'lucide-react';
import { formatAmount, useCart, useCartShippingOptions } from 'medusa-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useCheckout } from '../../../lib/checkout-provider';
import Radio from './radio';

type ShippingOption = {
  value?: string;
  label?: string;
  price: string;
};

type ShippingProps = {
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
};

const Shipping: React.FC<ShippingProps> = ({ cart }) => {
  const {
    editAddresses: { state: isAddressesOpen, close: closeAddresses },
    editShipping: { state: isOpen, open, close },
    editPayment: {
      state: isPaymentOpen,
      open: openPayment,
      close: closePayment,
    },
    addressReady,
    shippingReady,
  } = useCheckout();

  const currentShippingOption =
    cart.shipping_methods?.[0]?.shipping_option.id || '';

  const [shippingOptionId, setShippingOptionId] = useState(
    currentShippingOption,
  );

  const { addShippingMethod, setCart } = useCart();

  const {
    setError,
    formState: { errors },
  } = useForm();

  // Fetch shipping options
  const { shipping_options, refetch } = useCartShippingOptions(cart.id, {
    enabled: !!cart.id,
  });

  // Any time the cart changes we need to ensure that we are displaying valid shipping options
  useEffect(() => {
    const refetchShipping = async () => {
      await refetch();
    };

    refetchShipping();
  }, [cart, refetch]);

  const submitShippingOption = (soId: string) => {
    addShippingMethod.mutate(
      { option_id: soId },
      {
        onSuccess: ({ cart }) => {
          setCart(cart);
          close();
          openPayment();
        },
        onError: () =>
          setError(
            'soId',
            {
              type: 'validate',
              message:
                'An error occurred while adding shipping. Please try again.',
            },
            { shouldFocus: true },
          ),
      },
    );
  };

  const handleChange = (value: string) => {
    setShippingOptionId(value);
  };

  const handleEdit = () => {
    open();
    closeAddresses();
    closePayment();
  };

  const editingOtherSteps = isAddressesOpen || isPaymentOpen;

  // Memoized shipping method options
  const shippingMethods: ShippingOption[] = useMemo(() => {
    if (shipping_options && cart?.region) {
      return shipping_options?.map((option) => ({
        value: option.id,
        label: option.name,
        price: formatAmount({
          amount: option.amount || 0,
          region: cart.region,
        }),
      }));
    }

    return [];
  }, [shipping_options, cart]);

  return (
    <div className="small:px-8 bg-pampas-200 pb-8 p-4">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className={clx(
            'text-3xl-regular flex flex-row items-baseline gap-x-2',
            {
              'pointer-events-none select-none opacity-50':
                editingOtherSteps && !shippingReady,
            },
          )}
        >
          Delivery
          {!isOpen && currentShippingOption && shippingReady && (
            <CheckCircleSolid />
          )}
        </Heading>
        {!isOpen && addressReady && (
          <Text>
            <button onClick={handleEdit} className="text-ui-fg-interactive">
              Edit
            </button>
          </Text>
        )}
      </div>
      {!editingOtherSteps && isOpen ? (
        <div className="pb-8">
          <div>
            <RadioGroup
              value={shippingOptionId}
              onChange={(value: string) => handleChange(value)}
            >
              {shippingMethods && shippingMethods.length ? (
                shippingMethods.map((option) => {
                  return (
                    <RadioGroup.Option
                      key={option.value}
                      value={option.value}
                      className={clx(
                        'text-small-regular rounded-rounded hover:shadow-borders-interactive-with-active mb-2 flex cursor-pointer items-center justify-between border px-8 py-4',
                        {
                          'border-ui-border-interactive':
                            option.value === shippingOptionId,
                        },
                      )}
                    >
                      <div className="flex items-center gap-x-4">
                        <Radio checked={shippingOptionId === option.value} />
                        <span className="text-base-regular">
                          {option.label}
                        </span>
                      </div>
                      <span className="justify-self-end text-gray-700">
                        {option.price}
                      </span>
                    </RadioGroup.Option>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center px-4 py-8 text-gray-900">
                  <Loader2 />
                </div>
              )}
            </RadioGroup>
            <ErrorMessage
              errors={errors}
              name="soId"
              render={({ message }) => {
                return (
                  <div className="text-small-regular pt-2 text-rose-500">
                    <span>{message}</span>
                  </div>
                );
              }}
            />
          </div>

          <Button
            size="large"
            className="mt-6"
            onClick={() => submitShippingOption(shippingOptionId)}
          >
            Continue to payment
          </Button>
        </div>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && shippingReady && (
              <div className="flex w-1/3 flex-col">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Method
                </Text>
                <Text className="txt-medium text-ui-fg-subtle">
                  {cart.shipping_methods[0].shipping_option.name} (
                  {formatAmount({
                    amount: cart.shipping_methods[0].price,
                    region: cart.region,
                  })
                    .replace(/,/g, '')
                    .replace(/\./g, ',')}
                  )
                </Text>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shipping;
