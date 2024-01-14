import clsx from 'clsx';
import React from 'react';
import { useHits, useSearchBox } from 'react-instantsearch';

import { ProductHit, TProductHit } from './product-hit';

type THit = {
  close: () => void;
};

export const Hits = ({ close }: THit) => {
  const { query } = useSearchBox();
  const { hits } = useHits();
  return (
    <div
      className={clsx(
        'mb-1 w-[50vw] overflow-y-scroll transition-all duration-300 ease-in-out',
        {
          'max-h-full opacity-100': !!query,
          'max-h-0 opacity-0': !query && !hits.length,
        },
      )}
    >
      <div className="mb-4 grid grid-cols-3 gap-4">
        {hits.slice(0, 6).map((hit, index) => (
          <div key={index} onClick={close}>
            <ProductHit {...(hit as unknown as TProductHit)} />
          </div>
        ))}
      </div>
    </div>
  );
};
