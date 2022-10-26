import { createTheme } from "@mui/material/styles";
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '3rem',
          fontWeight: '700',
        },
        subtitle1: {
          fontWeight: '400',
          fontSize: '1.25rem',
          lineHeight: '2',
        },
      }
    }
  }
});

export default theme