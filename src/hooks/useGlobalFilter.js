import { useState } from 'react';

export const useGlobalFilter = (initialFilters = {}) => {
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(initialFilters);
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    return {
        globalFilterValue,
        setGlobalFilterValue,
        filters,
        setFilters,
        onGlobalFilterChange,
    };
};
