import { useAdminDeleteStockLocation } from "medusa-react";

function DeleteLocation({ stockLocationId }: { stockLocationId: string }) {
  const deleteLocation = useAdminDeleteStockLocation(stockLocationId);

  const handleDelete = () => {
    deleteLocation.mutate();
  };
}

export default DeleteLocation;
