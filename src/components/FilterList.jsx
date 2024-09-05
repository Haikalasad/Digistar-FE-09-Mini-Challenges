import React from 'react';

const FilterList = () => (
  <div className="flex space-x-4">
    {['Group by', 'Realisation', 'Dates', 'Types', 'Sample', 'Extended'].map((filter) => (
      <button key={filter} className="p-2  bg-blue-100 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-200">
        {filter}
      </button>
    ))}
  </div>
);

export default FilterList;
