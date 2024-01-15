import { RadioGroup } from '@headlessui/react';
import { PaymentSession } from '@medusajs/medusa';
import { Text, clx } from '@medusajs/ui';
import React from 'react';

import PaymentTest from './payment-test';
import Radio from './radio';

type PaymentContainerProps = {
  paymentSession: PaymentSession;
  selectedPaymentOptionId: string | null;
  disabled?: boolean;
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>;
};

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
}) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <>
      <RadioGroup.Option
        key={paymentSession.id}
        value={paymentSession.provider_id}
        disabled={disabled}
        className={clx(
          'text-small-regular rounded-rounded hover:shadow-borders-interactive-with-active mb-2 flex cursor-pointer flex-col gap-y-2 border px-8 py-4',
          {
            'border-ui-border-interactive':
              selectedPaymentOptionId === paymentSession.provider_id,
          },
        )}
      >
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-x-4">
            <Radio
              checked={selectedPaymentOptionId === paymentSession.provider_id}
            />
            <Text className="text-base-regular">
              {paymentInfoMap[paymentSession.provider_id]?.title ||
                paymentSession.provider_id}
            </Text>
            {paymentSession.provider_id === 'manual' && isDevelopment && (
              <PaymentTest className="small:block hidden" />
            )}
          </div>
          <span className="justify-self-end text-gray-700">
            {paymentInfoMap[paymentSession.provider_id]?.icon}
          </span>
        </div>
        {paymentSession.provider_id === 'manual' && isDevelopment && (
          <PaymentTest className="small:hidden text-[10px]" />
        )}
      </RadioGroup.Option>
    </>
  );
};

export default PaymentContainer;
