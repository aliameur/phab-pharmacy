interface Props {
  level: 'Low' | 'Medium' | 'Normal';
}

export default function StockStatusTag({ level }: Props) {
  return (
    <span
      className={`rounded-full p-1 text-white ${
        level === 'Normal'
          ? 'bg-green-800'
          : level === 'Medium'
            ? 'bg-orange-700'
            : 'bg-red-800'
      }`}
    >
      {level}
    </span>
  );
}
