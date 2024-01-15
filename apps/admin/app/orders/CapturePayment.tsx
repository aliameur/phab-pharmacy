import { useAdminCapturePayment } from 'medusa-react';
import React from 'react';

type Props = {
  orderId: string;
};

export default function CapturePayment({ orderId }: Props) {
  const capturePayment = useAdminCapturePayment(orderId);

  const handleCapture = () => {
    capturePayment.mutate(void 0, {
      onSuccess: ({ order }) => {
        console.log(order);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <button
      type="button"
      className="w-full rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:border-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      onClick={handleCapture}
    >
      Capture Payment
    </button>
  );
}
