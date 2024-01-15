import { useMeCustomer } from 'medusa-react';

import { Input } from '@phab/ui/core';
import { Checkbox } from '@phab/ui/core';

import { CheckoutFormValues } from '../../../lib/checkout-provider';
import AddressSelect from './address-select';
import ConnectForm from './connect-form';

export const emailRegex =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

const ShippingAddress = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => {
  const { customer } = useMeCustomer();

  return (
    <div>
      {customer && (customer.shipping_addresses?.length || 0) > 0 && (
        <div className="mb-6 flex flex-col gap-y-4 p-5">
          <p className="text-small-regular">
            {`Hi ${customer.first_name}, do you want to use one of your saved addresses?`}
          </p>
          <AddressSelect addresses={customer.shipping_addresses} />
        </div>
      )}
      <ConnectForm<CheckoutFormValues>>
        {({ register, formState: { errors, touchedFields } }) => (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First name"
                {...register('shipping_address.first_name', {
                  required: 'First name is required',
                })}
                autoComplete="given-name"
                // @ts-ignore
                errors={errors}
                touched={touchedFields}
                required
              />
              <Input
                label="Last name"
                {...register('shipping_address.last_name', {
                  required: 'Last name is required',
                })}
                autoComplete="family-name"
                // @ts-ignore
                errors={errors}
                touched={touchedFields}
                required
              />
              <Input
                label="Address"
                {...register('shipping_address.address_1', {
                  required: 'Address is required',
                })}
                autoComplete="address-line1"
                // @ts-ignore
                errors={errors}
                touched={touchedFields}
                required
              />
              <Input
                label="Company"
                {...register('shipping_address.company')}
                autoComplete="organization"
                // @ts-ignore
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label="Postal code"
                {...register('shipping_address.postal_code', {
                  required: 'Postal code is required',
                })}
                autoComplete="postal-code"
                // @ts-ignore
                errors={errors}
                touched={touchedFields}
                required
              />
              <Input
                label="City"
                {...register('shipping_address.city', {
                  required: 'City is required',
                })}
                autoComplete="address-level2"
                // @ts-ignore
                errors={errors}
                touched={touchedFields}
                required
              />
              <Input
                label="State / Province"
                {...register('shipping_address.province')}
                autoComplete="address-level1"
                // @ts-ignore
                errors={errors}
                touched={touchedFields}
              />
            </div>
            <div className="my-8">
              <span>Same as billing address</span>
              <Checkbox checked={checked} onChange={onChange} />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <Input
                label="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: emailRegex,
                })}
                autoComplete="email"
                // @ts-ignore
                errors={errors}
                touched={touchedFields}
                required
              />
              <Input
                label="Phone"
                {...register('shipping_address.phone')}
                autoComplete="tel"
                // @ts-ignore
                errors={errors}
                touched={touchedFields}
              />
            </div>
          </>
        )}
      </ConnectForm>
    </div>
  );
};

export default ShippingAddress;
