import { useAdminUpdateStockLocation } from "medusa-react";

function UpdateLocation({
  stockLocationId,
  name,
}: {
  stockLocationId: string;
  name: string;
}) {
  const updateLocation = useAdminUpdateStockLocation(stockLocationId);

  const handleRemove = () => {
    updateLocation.mutate({
      name: "Warehouse",
    });
  };
}

export default UpdateLocation;
