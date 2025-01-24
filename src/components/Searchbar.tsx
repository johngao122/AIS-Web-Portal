import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
    onSearch?: (searchTerm: string) => void;
    className?: string;
    value?: string;
}

/**
 * A SearchBar component that allows the user to search for
 * vessels, locations, etc. by providing a callback `onSearch`
 * that will be called with the user's input string.
 *
 * The component also accepts a `value` prop which will be used
 * to initialize the input field. If `value` changes, the input
 * field will be updated accordingly.
 *
 * Finally, the component accepts a `className` prop which can be
 * used to apply additional CSS styles to the component.
 *
 * @param {object} props
 * @param {function} props.onSearch - A callback that will be called with the user's input string.
 * @param {string} props.value - The initial value of the input field. Defaults to an empty string.
 * @param {string} props.className - Additional CSS classes to apply to the component. Defaults to an empty string.
 *
 * @returns {JSX.Element}
 */
const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    className,
    value = "",
}) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    /**
     * Handles changes to the search input field by updating the state
     * and calling `onSearch` if it's defined.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The React event object.
     */
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (onSearch) {
            onSearch(newValue);
        }
    };

    return (
        <div className={`relative flex items-center ${className}`}>
            <input
                type="text"
                placeholder="Search here for vessels, locations..."
                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                onChange={handleSearch}
                value={inputValue}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
        </div>
    );
};

export default SearchBar;
