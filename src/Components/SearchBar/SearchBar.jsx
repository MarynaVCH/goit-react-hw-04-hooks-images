import React from 'react';
import {
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  Headerform,
} from './Searchbar.styled';

export default function SearchBar({ onSubmit }) {
  const handleSearch = e => {
    e.preventDefault();
    onSubmit(e.target.elements.searchValue.value);
  };
  return (
    <Headerform>
      <SearchForm onSubmit={handleSearch}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          name="searchValue"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Headerform>
  );
}
