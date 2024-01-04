import { DeleteLocation } from "../utils";

export default function DeleteModal({ locationId }) {
  const handleDelete = () => {
    DeleteLocation(locationId);
  };

  return (
    <div>
      <button onClick={handleDelete} className="text-red-600 hover:underline">
        Delete
      </button>
    </div>
  );
}
