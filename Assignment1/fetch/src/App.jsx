import React, { useState, useCallback } from 'react';
import './App.css';

// Simulate an API call with a delay
const simulateApiCall = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = [
        `Result for "${query}" 1`,
        `Result for "${query}" 2`,
        `Result for "${query}" 3`
      ];
      resolve(results);
    }, 500); // Simulate a 500ms delay
  });
};

// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Function to handle search input
  const handleSearchInput = useCallback(async (event) => {
    const query = event.target.value;
    setQuery(query);

    if (query.trim() === '') {
      setResults([]);
      return;
    }

    try {
      const results = await simulateApiCall(query);
      setResults(results);
    } catch (error) {
      console.error('Error fetching results:', error);
      setResults([]);
    }
  }, []);

  // Create debounced version of handleSearchInput
  const debouncedHandleSearchInput = useCallback(
    debounce(handleSearchInput, 300),
    [handleSearchInput]
  );

  return (
    <div className="App">
      <h1>Search Application</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={debouncedHandleSearchInput}
      />
      <div id="results">
        {results.length === 0 ? (
          <p>No results found</p>
        ) : (
          results.map((result, index) => (
            <div key={index} className="result-item">
              {result}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
