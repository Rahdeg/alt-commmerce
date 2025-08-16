"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterOption {
    id: string;
    label: string;
    value: string;
}

interface FilterGroup {
    id: string;
    label: string;
    options: FilterOption[];
    multiple?: boolean;
}

interface MobileSearchProps {
    onSearch?: (query: string) => void;
    onFilterChange?: (filters: Record<string, string[]>) => void;
    className?: string;
}

const defaultFilterGroups: FilterGroup[] = [
    {
        id: "category",
        label: "Category",
        options: [
            { id: "sneakers", label: "Sneakers", value: "sneakers" },
            { id: "running", label: "Running", value: "running" },
            { id: "basketball", label: "Basketball", value: "basketball" },
            { id: "casual", label: "Casual", value: "casual" }
        ]
    },
    {
        id: "price",
        label: "Price Range",
        options: [
            { id: "under-50", label: "Under $50", value: "under-50" },
            { id: "50-100", label: "$50 - $100", value: "50-100" },
            { id: "100-200", label: "$100 - $200", value: "100-200" },
            { id: "over-200", label: "Over $200", value: "over-200" }
        ]
    },
    {
        id: "brand",
        label: "Brand",
        options: [
            { id: "nike", label: "Nike", value: "nike" },
            { id: "adidas", label: "Adidas", value: "adidas" },
            { id: "puma", label: "Puma", value: "puma" },
            { id: "reebok", label: "Reebok", value: "reebok" }
        ],
        multiple: true
    }
];

export function MobileSearch({ onSearch, onFilterChange, className = "" }: MobileSearchProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [expandedFilters, setExpandedFilters] = useState<string[]>([]);
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
    const searchRef = useRef<HTMLInputElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    // Close filters when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };

        if (isFilterOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isFilterOpen]);

    const handleSearch = () => {
        if (onSearch && searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    };

    const handleSearchKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const toggleFilter = (filterId: string) => {
        setExpandedFilters(prev =>
            prev.includes(filterId)
                ? prev.filter(id => id !== filterId)
                : [...prev, filterId]
        );
    };

    const toggleFilterOption = (filterId: string, optionValue: string, multiple = false) => {
        setActiveFilters(prev => {
            const currentValues = prev[filterId] || [];

            if (multiple) {
                const newValues = currentValues.includes(optionValue)
                    ? currentValues.filter(v => v !== optionValue)
                    : [...currentValues, optionValue];

                const updated = { ...prev, [filterId]: newValues };
                if (newValues.length === 0) {
                    delete updated[filterId];
                }
                return updated;
            } else {
                const newValues = currentValues.includes(optionValue) ? [] : [optionValue];
                const updated = { ...prev, [filterId]: newValues };
                if (newValues.length === 0) {
                    delete updated[filterId];
                }
                return updated;
            }
        });
    };

    const clearAllFilters = () => {
        setActiveFilters({});
        if (onFilterChange) {
            onFilterChange({});
        }
    };

    const applyFilters = () => {
        if (onFilterChange) {
            onFilterChange(activeFilters);
        }
        setIsFilterOpen(false);
    };

    const getActiveFilterCount = () => {
        return Object.values(activeFilters).reduce((total, values) => total + values.length, 0);
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Search Bar */}
            <div className="relative">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleSearchKeyPress}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-base"
                    />
                    {searchQuery && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Filter Button */}
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center space-x-2 px-4 py-2 border-gray-300 hover:border-orange-500 hover:bg-orange-50"
                >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                    {getActiveFilterCount() > 0 && (
                        <span className="bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {getActiveFilterCount()}
                        </span>
                    )}
                </Button>

                {getActiveFilterCount() > 0 && (
                    <Button
                        variant="ghost"
                        onClick={clearAllFilters}
                        className="text-sm text-gray-600 hover:text-red-600"
                    >
                        Clear all
                    </Button>
                )}
            </div>

            {/* Filter Panel */}
            {isFilterOpen && (
                <div
                    ref={filterRef}
                    className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 space-y-4"
                >
                    {defaultFilterGroups.map((filterGroup) => (
                        <div key={filterGroup.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                            <button
                                onClick={() => toggleFilter(filterGroup.id)}
                                className="w-full flex items-center justify-between text-left font-medium text-gray-900 py-2"
                            >
                                {filterGroup.label}
                                {expandedFilters.includes(filterGroup.id) ? (
                                    <ChevronUp className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                )}
                            </button>

                            {expandedFilters.includes(filterGroup.id) && (
                                <div className="mt-3 space-y-2">
                                    {filterGroup.options.map((option) => {
                                        const isSelected = activeFilters[filterGroup.id]?.includes(option.value) || false;
                                        return (
                                            <label
                                                key={option.id}
                                                className="flex items-center space-x-3 cursor-pointer"
                                            >
                                                <input
                                                    type={filterGroup.multiple ? "checkbox" : "radio"}
                                                    name={filterGroup.id}
                                                    value={option.value}
                                                    checked={isSelected}
                                                    onChange={() => toggleFilterOption(
                                                        filterGroup.id,
                                                        option.value,
                                                        filterGroup.multiple
                                                    )}
                                                    className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                                />
                                                <span className="text-sm text-gray-700">{option.label}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Apply Filters Button */}
                    <div className="pt-4 border-t border-gray-200">
                        <Button
                            onClick={applyFilters}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                        >
                            Apply Filters
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
