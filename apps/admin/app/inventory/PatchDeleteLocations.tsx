import { useAdminDeleteStockLocation } from 'medusa-react';
import React from 'react';

type Props = {
  stockLocationId: string;
};

const StockLocation = ({ stockLocationId }: Props) => {
  const deleteLocation = useAdminDeleteStockLocation(stockLocationId);
  // ...

  const handleDelete = () => {
    deleteLocation.mutate(void 0, {
      onSuccess: ({ id, object, deleted }) => {
        console.log(id);
      },
    });
  };

  handleDelete();
  return null;
};

export default StockLocation;
