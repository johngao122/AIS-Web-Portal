import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
    onSearch?: (searchTerm: string) => void;
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    return (
        <div className={`relative flex items-center ${className}`}>
            <input
                type="text"
                placeholder="Search here for vessels, locations..."
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                onChange={handleSearch}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
        </div>
    );
};

export default SearchBar;
