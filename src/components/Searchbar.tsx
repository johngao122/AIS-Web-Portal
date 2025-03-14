/*eslint-disable*/

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import type VesselMarker from "@/types/VesselMarker";

/**
 * Props for the SearchBar component
 * @interface SearchBarProps
 */
interface SearchBarProps {
    /** Callback function triggered when search is submitted or changed */
    onSearch?: (searchTerm: string) => void;
    /** Optional CSS class name for additional styling */
    className?: string;
    /** Initial/controlled value of the search input */
    value?: string;
    /** Array of vessel markers to generate search suggestions from */
    vessels: VesselMarker[];
}

/**
 * Interface for vessel search suggestions
 * @interface VesselSuggestion
 */
interface VesselSuggestion {
    /** Name of the vessel */
    vesselName: string;
    /** IMO number of the vessel */
    imoNumber: string;
    /** MMSI number of the vessel */
    mmsi: string;
}

/**
 * SearchBar Component
 *
 * An interactive search component for finding vessels by name, IMO number, or MMSI.
 * Features auto-suggestions, keyboard navigation, and real-time filtering.
 *
 * Features:
 * - Real-time search suggestions as user types
 * - Keyboard navigation through suggestions (arrow keys and Enter)
 * - Clear button to reset search
 * - Responsive design
 * - Clickable suggestions
 * - Outside click detection to close suggestion panel
 *
 * @component
 * @param {SearchBarProps} props - Component props
 * @param {Function} [props.onSearch] - Callback when search term changes
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.value] - Controlled input value
 * @param {VesselMarker[]} props.vessels - Array of vessels for suggestions
 * @returns {React.ReactElement} The rendered SearchBar component
 */
const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    className,
    value = "",
    vessels,
}) => {
    const [inputValue, setInputValue] = useState<string>(value);
    const [suggestions, setSuggestions] = useState<VesselSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] =
        useState<number>(-1);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const searchContainerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    /**
     * Generates vessel suggestions based on the search query
     * Filters vessels by name, IMO number, or MMSI that match the query
     *
     * @param {string} query - The search query to filter vessels by
     * @returns {VesselSuggestion[]} Array of matching vessel suggestions
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
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /**
     * Handles changes to the search input
     * Updates suggestions and calls the onSearch callback
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setShowSuggestions(true);
        setActiveSuggestionIndex(-1);
        if (onSearch) {
            onSearch(newValue);
        }
    };

    /**
     * Handles keyboard navigation through suggestions
     * Supports arrow keys for navigation and Enter for selection
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveSuggestionIndex((prevIndex) =>
                    prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setActiveSuggestionIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (
                    activeSuggestionIndex >= 0 &&
                    activeSuggestionIndex < suggestions.length
                ) {
                    handleSuggestionClick(
                        suggestions[activeSuggestionIndex].vesselName
                    );
                }
                break;
            case "Escape":
                setShowSuggestions(false);
                setActiveSuggestionIndex(-1);
                break;
            default:
                break;
        }
    };

    /**
     * Handles clicking on a suggestion
     * Sets the input value to the selected vessel name and triggers search
     *
     * @param {string} vesselName - The name of the selected vessel
     */
    const handleSuggestionClick = (vesselName: string) => {
        setInputValue(vesselName);
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        if (onSearch) {
            onSearch(vesselName);
        }
    };

    /**
     * Clears the search input
     * Resets the input value, suggestions, and calls onSearch with empty string
     */
    const clearInput = () => {
        setInputValue("");
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        if (onSearch) {
            onSearch("");
        }
    };

    return (
        <div ref={searchContainerRef} className={`relative ${className}`}>
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
                                ${
                                    activeSuggestionIndex === index
                                        ? "bg-gray-50"
                                        : ""
                                }
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
