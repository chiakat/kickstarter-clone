import React, { useState } from 'react';
import {
  Box, TextField, InputAdornment, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps{
  setSearchInput: React.Dispatch<React.SetStateAction<string>>,
}

// eslint-disable-next-line func-names
const Search = function ({ setSearchInput }: SearchProps) {
  const [currentInput, setCurrentInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchInput(currentInput);
    setCurrentInput('');
  };

  return (
    <Box component="form" sx={{ display: 'flex', mt: 10, mb: 2 }} onSubmit={(handleSubmit)}>
      <Typography variant="h4" textAlign="center" sx={{ mr: 5 }}>
        Fund a new project:
        {' '}
      </Typography>
      <TextField
        id="input-search-header"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        placeholder="Search"
        InputProps={(
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
            )}
        aria-describedby="search-helper-text"
      />
    </Box>
  );
};

export default Search;

Search.propTypes = {
  searchInput: PropTypes.string,
  setSearchInput: PropTypes.func.isRequired,
};

Search.defaultProps = {
  searchInput: '',
};
