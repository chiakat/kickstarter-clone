import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const rawTheme = createTheme({
  palette: {
    primary: {
      light: '#80e27e',
      main: '#4caf50',
      dark: '#087f23',
    },
    secondary: {
      light: '#ff6090',
      main: '#e91e63',
      dark: '#b0003a',
    },
  },
  typography: {
    fontFamily: "'Lato', 'Francois One', 'DM Sans','Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    button: {
      textTransform: 'none',
    },
  },
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: "'Lato', 'Francois One', 'DM Sans', sans-serif",
};

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: '#f7f9fa',
      placeholder: grey[200],
    },
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 48,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 42,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 36,
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 32,
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 26,
      fontWeight: rawTheme.typography.fontWeightMedium,
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 22,
      fontWeight: rawTheme.typography.fontWeightMedium,
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14,
    },
  },
};

export default theme;
