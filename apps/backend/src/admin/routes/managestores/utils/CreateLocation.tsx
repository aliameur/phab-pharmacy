import { useAdminCreateStockLocation } from "medusa-react";

const CreateLocation = ({
  id,
  name,
}: {
  id: string;
  name: string;
  //  address: string;
  //  can_deliver: boolean;
  //  price_factor: number;
}) => {
  const createStockLocation = useAdminCreateStockLocation();

  const handleCreate = () => {
    createStockLocation.mutate({
      name: name,
    });
  };
};

export default CreateLocation;
