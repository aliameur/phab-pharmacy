import { Input } from '@phab/ui/core';

import { CheckoutFormValues } from '../../../../../apps/online-store/lib/checkout-provider';
import ConnectForm from './connect-form';

const BillingAddress = () => {
  return (
    <ConnectForm<CheckoutFormValues>>
      {({ register, formState: { errors, touchedFields } }) => (
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First name"
            {...register('billing_address.first_name', {
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
            {...register('billing_address.last_name', {
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
            {...register('billing_address.address_1', {
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
            {...register('billing_address.company')}
            autoComplete="organization"
            // @ts-ignore
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Postal code"
            {...register('billing_address.postal_code', {
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
            {...register('billing_address.city', {
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
            {...register('billing_address.province')}
            autoComplete="address-level1"
            // @ts-ignore
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Phone"
            {...register('billing_address.phone')}
            autoComplete="tel"
            // @ts-ignore
            errors={errors}
            touched={touchedFields}
          />
        </div>
      )}
    </ConnectForm>
  );
};

export default BillingAddress;
