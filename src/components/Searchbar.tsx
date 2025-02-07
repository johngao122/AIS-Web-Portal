/*eslint-disable*/

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import type VesselMarker from "@/types/VesselMarker";

interface SearchBarProps {
    onSearch?: (searchTerm: string) => void;
    className?: string;
    value?: string;
    vessels: VesselMarker[];
}

interface VesselSuggestion {
    vesselName: string;
    imoNumber: string;
    mmsi: string;
}

/**
 * A SearchBar component for searching a list of vessels by name, IMO, or MMSI.
 *
 * @prop {function} onSearch - A callback function that gets called when the user
 * submits a search query. The callback function receives the search query as a
 * string argument.
 * @prop {string} className - The CSS class name to apply to the outermost element.
 * @prop {string} value - The initial value of the search input.
 * @prop {VesselMarker[]} vessels - A list of vessels to search.
 *
 * @example
 * import { SearchBar } from "react-vessel-dashboard";
 *
 * const vessels = [
 *   { vesselName: "Seawise Giant", imoNumber: "7372141", mmsi: "123456789" },
 *   { vesselName: "Knarr", imoNumber: "9468645", mmsi: "234567890" },
 * ];
 *
 * const handleSearch = (query) => {
 *   console.log(`Searching for ${query}`);
 * };
 *
 * const App = () => {
 *   return (
 *     <SearchBar
 *       onSearch={handleSearch}
 *       vessels={vessels}
 *       className="my-4"
 *     />
 *   );
 * };
 */
const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    className,
    value = "",
    vessels,
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState<VesselSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    /**
     * Generates a list of vessel suggestions based on the provided query.
     * The suggestions are filtered from the list of vessels by matching the
     * query against the vessel's name, IMO number, or MMSI number. The search
     * is case-insensitive and returns at most 5 suggestions.
     *
     * @param {string} query - The search query to filter vessel suggestions.
     * @returns {VesselSuggestion[]} An array of up to 5 vessel suggestions
     * that match the search query.
     */

    const generateSuggestions = (query: string): VesselSuggestion[] => {
        if (!query || query.length < 2) return [];

        return vessels
            .filter(
                (vessel) =>
                    vessel.vesselName
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                    vessel.imoNumber
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                    vessel.mmsi.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 5) // Limit to 5 suggestions
            .map((vessel) => ({
                vesselName: vessel.vesselName,
                imoNumber: vessel.imoNumber,
                mmsi: vessel.mmsi,
            }));
    };

    useEffect(() => {
        const newSuggestions = generateSuggestions(inputValue);
        setSuggestions(newSuggestions);
    }, [inputValue, vessels]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /**
     * Handles changes to the search input.
     * @param e React.ChangeEvent of the input element.
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setShowSuggestions(true);
        setSelectedIndex(-1);
        if (onSearch) {
            onSearch(newValue);
        }
    };

    /**
     * Handles keyboard events for navigating and selecting vessel suggestions.
     *
     * This function supports the following keys:
     * - ArrowDown: Moves the selection down the suggestion list.
     * - ArrowUp: Moves the selection up the suggestion list.
     * - Enter: Selects the currently highlighted suggestion.
     * - Escape: Closes the suggestion list.
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event triggered by user input.
     */

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prevIndex) =>
                    prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
                    handleSuggestionClick(
                        suggestions[selectedIndex].vesselName
                    );
                }
                break;
            case "Escape":
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
            default:
                break;
        }
    };

    /**
     * Handles a suggestion click event.
     * @param {string} vesselName - The vessel name that was clicked.
     * Sets the input value to the clicked vessel name, closes the suggestion
     * list, resets the selected index, and calls the onSearch callback if
     * it is defined.
     */
    const handleSuggestionClick = (vesselName: string) => {
        setInputValue(vesselName);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        if (onSearch) {
            onSearch(vesselName);
        }
    };

    /**
     * Resets the search input and closes the suggestion list.
     *
     * This function also calls the onSearch callback if it is defined,
     * passing an empty string as the argument.
     */
    const clearInput = () => {
        setInputValue("");
        setShowSuggestions(false);
        setSelectedIndex(-1);
        if (onSearch) {
            onSearch("");
        }
    };

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder="Search here for vessels by name, IMO, or MMSI..."
                    className="w-full px-4 py-2 pr-20 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(true)}
                    value={inputValue}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {inputValue && (
                        <button
                            onClick={clearInput}
                            className="p-1 hover:bg-gray-100 rounded-full"
                        >
                            <X className="h-4 w-4 text-gray-400" />
                        </button>
                    )}
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-50 
                                ${selectedIndex === index ? "bg-gray-50" : ""}
                                ${
                                    index !== suggestions.length - 1
                                        ? "border-b border-gray-100"
                                        : ""
                                }`}
                            onClick={() =>
                                handleSuggestionClick(suggestion.vesselName)
                            }
                        >
                            <div className="flex flex-col">
                                <span className="font-medium">
                                    {suggestion.vesselName}
                                </span>
                                <div className="text-sm text-gray-500">
                                    <span>IMO: {suggestion.imoNumber}</span>
                                    <span className="mx-2">•</span>
                                    <span>MMSI: {suggestion.mmsi}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
