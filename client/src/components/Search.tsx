import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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

  const clearSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchInput('');
    setCurrentInput('');
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex', mt: 10, mb: 2, justifyContent: 'space-around',
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" textAlign="center" sx={{ mr: 5 }}>
        Find a new project:
        {' '}
      </Typography>
      <TextField
        id="input-search-header"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        placeholder="Search"
        aria-describedby="search-helper-text"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          m: 1, p: 1, height: 40, color: 'white',
        }}
        onClick={() => handleSubmit}
      >
        <SearchIcon />
      </Button>
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: 'text.secondary', my: 1, p: 1, height: 40, color: 'white',
        }}
        onClick={() => clearSearch}
      >
        <ClearIcon />
      </Button>
    </Box>
  );
};

export default Search;

Search.propTypes = {
  setSearchInput: PropTypes.func.isRequired,
};
