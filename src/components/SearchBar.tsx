import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search recipes..."
        className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-recipe-orange"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
};