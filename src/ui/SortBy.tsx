import { useSearchParams } from "react-router";
import Select from "./Select";

export default function SortBy({
  options,
}: {
  options: { value: string; label: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeSortBy = searchParams.get("sortBy") || options[0].value;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sortBy: e.target.value,
    });
  }

  return (
    <Select
      options={options}
      activeValue={activeSortBy}
      type="white"
      onChange={handleChange}
    />
  );
}
