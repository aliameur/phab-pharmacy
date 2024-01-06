import DeleteModal from "./DeleteModal";

export default function LocationTable({
  locations,
  isLoading,
  onSelectLocation,
}) {
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Can Deliver
            </th>
            <th scope="col" className="px-6 py-3">
              Price Factor
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id} className="bg-white border-b">
              <td className="px-6 py-4">{location.id}</td>
              <td className="px-6 py-4">
                {location.canDeliver ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4">{location.priceFactor}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onSelectLocation(location)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <DeleteModal locationId={location.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
