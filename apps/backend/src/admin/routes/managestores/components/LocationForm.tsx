import { useEffect, useState } from "react";
import { CreateLocation, UpdateLocation } from "../utils";

export default function LocationForm({ selectedLocation, resetSelection }) {
  const [formData, setFormData] = useState({
    canDeliver: false,
    priceFactor: 1,
  });

  useEffect(() => {
    if (selectedLocation) {
      setFormData(selectedLocation);
    }
  }, [selectedLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedLocation) {
      UpdateLocation(formData);
    } else {
      CreateLocation(formData);
    }
    resetSelection();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="canDeliver"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Can Deliver
        </label>
        <input
          type="checkbox"
          id="canDeliver"
          name="canDeliver"
          checked={formData.canDeliver}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="priceFactor"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Price Factor
        </label>
        <input
          type="number"
          id="priceFactor"
          name="priceFactor"
          value={formData.priceFactor}
          onChange={handleChange}
          className="border border-gray-300 p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save Location
      </button>
    </form>
  );
}
