import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import SearchResult from '../SearchResult';

function Search() {

  const [ navigationDirection, setNavigationDirection ] =  useState();
  const [ searchQuery, setSearchQuery ] =  useState('');

  return (
    <>
      <SearchBar onKeyNavigation={setNavigationDirection} onChange={setSearchQuery} />
			<SearchResult navigationDirection={navigationDirection} resetNavigationDirection={setNavigationDirection} searchQuery={searchQuery} />
    </>
  );
}

export default Search;
