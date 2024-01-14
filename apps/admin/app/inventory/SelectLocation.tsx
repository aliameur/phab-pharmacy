import { useState } from 'react';

import ViewInventory from './ViewInventory';
import { Location } from './types';

interface Props {
  stock_locations: Location[];
}

export default function SelectLocation({ stock_locations }: Props) {
  const [location, setLocation] = useState(
    stock_locations.length > 0 ? stock_locations[0] : null,
  );

  const handleUpdateLocation = (location: string) => {
    const selectedLocation = stock_locations.find(
      (loc) => loc.name === location,
    );
    if (selectedLocation) {
      setLocation(selectedLocation);
    }
  };

  return (
    <div className="mx-8">
      <div className="flex w-48 flex-col">
        <label className="text-gray-700 dark:text-gray-300">
          Select Location
        </label>
        <select
          className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={location?.name ? location.name : 'no name'}
          onChange={(e) => handleUpdateLocation(e.target.value)}
        >
          {stock_locations.map((loc) => (
            <option key={loc.id} value={loc.name ? loc.name : 'no name'}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      {location ? (
        <ViewInventory location={location} />
      ) : (
        <div className="text-2xl font-semibold">
          Failed to load location data.
        </div>
      )}
    </div>
  );
}
