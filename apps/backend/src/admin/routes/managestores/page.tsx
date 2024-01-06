"use client";

import { RouteProps } from "@medusajs/admin";
import { useAdminStockLocations } from "medusa-react";

import { useState } from "react";
import LocationTable from "./components/LocationTable";
import LocationForm from "./components/LocationForm";

const LocationManager = ({ notify }: RouteProps) => {
  const { stock_locations, isLoading } = useAdminStockLocations();
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <LocationForm
        selectedLocation={selectedLocation}
        resetSelection={() => setSelectedLocation(null)}
      />
      <LocationTable
        locations={stock_locations}
        isLoading={isLoading}
        onSelectLocation={setSelectedLocation}
      />
    </div>
  );
};

export default LocationManager;
