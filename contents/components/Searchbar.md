<frontmatter>
  title: Searchbar Component
  layout: default.md
  pageNav: 3
</frontmatter>

# Searchbar Component

A reusable search input component that provides real-time search functionality with autocomplete suggestions.

**File Location**: `src/components/Searchbar.tsx`

## Overview

The Searchbar component provides a user-friendly search interface with autocomplete suggestions. It's designed to be flexible and can be integrated with various data sources for searching vessels, ports, or other entities in the AIS Web Portal.

## Props

| Prop          | Type       | Default       | Description                                               |
| ------------- | ---------- | ------------- | --------------------------------------------------------- |
| `placeholder` | `string`   | `"Search..."` | Placeholder text for the search input                     |
| `onSearch`    | `function` | `undefined`   | Callback function triggered when a search is submitted    |
| `onSelect`    | `function` | `undefined`   | Callback function triggered when a suggestion is selected |
| `suggestions` | `array`    | `[]`          | Array of suggestion items to display                      |
| `className`   | `string`   | `""`          | Additional CSS classes to apply to the component          |
| `autoFocus`   | `boolean`  | `false`       | Whether the input should be focused on mount              |

## Features

### Search Input

-   Clean, accessible input field with customizable placeholder
-   Keyboard navigation support
-   Responsive design that works on all device sizes

### Autocomplete

-   Real-time suggestions as the user types
-   Keyboard navigation through suggestions
-   Customizable suggestion rendering
-   Debounced search to prevent excessive API calls

### Styling

-   Consistent with the AIS Web Portal design system
-   Customizable through CSS classes
-   Focus and hover states for improved usability

## Usage

```tsx
// Basic usage
<Searchbar
  placeholder="Search vessels..."
  onSearch={(query) => fetchVessels(query)}
/>

// With autocomplete suggestions
<Searchbar
  placeholder="Search ports..."
  suggestions={portSuggestions}
  onSelect={(port) => selectPort(port)}
  onSearch={(query) => fetchPortSuggestions(query)}
/>

// With custom styling
<Searchbar
  className="dark-theme-search"
  placeholder="Search terminals..."
  onSearch={handleTerminalSearch}
/>
```

## Implementation Details

The Searchbar component uses a controlled input pattern and manages its own internal state for the search query and suggestion visibility.

```typescript
const [query, setQuery] = useState("");
const [isFocused, setIsFocused] = useState(false);
const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

// Debounced search function to prevent excessive API calls
const debouncedSearch = useCallback(
    debounce((searchTerm) => {
        if (onSearch && searchTerm.trim()) {
            onSearch(searchTerm);
        }
    }, 300),
    [onSearch]
);

// Handle input changes
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
};
```

## Dependencies

-   React for component structure
-   Tailwind CSS for styling
-   Lucide React for search icon
-   Optional integration with search APIs

## Styling

The component uses Tailwind CSS for styling:

```tsx
<div className={`relative w-full ${className}`}>
    <div className="relative">
        <input
            type="text"
            className="w-full px-4 py-2 pr-10 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            autoFocus={autoFocus}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
        </div>
    </div>

    {/* Suggestions dropdown */}
    {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
                <li
                    key={index}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        index === activeSuggestionIndex ? "bg-gray-100" : ""
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                >
                    {renderSuggestion
                        ? renderSuggestion(suggestion)
                        : suggestion.toString()}
                </li>
            ))}
        </ul>
    )}
</div>
```

## Performance Considerations

-   Uses debouncing to prevent excessive API calls during typing
-   Optimizes rendering with conditional display of suggestions
-   Implements keyboard navigation for better accessibility and usability
