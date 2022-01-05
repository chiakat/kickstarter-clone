import React, { useState } from 'react';
import {
  Grid, TextField, Button, Typography,
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
    <Grid
      container
      item
      md
      component="form"
      sx={{
        display: 'flex', mt: 10, mb: 2, justifyContent: 'flex-end',
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" sx={{ mr: 1, py: 1 }}>
        Find a new project:
        {' '}
      </Typography>
      <TextField
        id="input-search-header"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        placeholder="Search"
        aria-describedby="search-helper-text"
        sx={{ flexGrow: 2 }}
      />
      <Grid item>
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
      </Grid>
    </Grid>
  );
};

export default Search;

Search.propTypes = {
  setSearchInput: PropTypes.func.isRequired,
};
