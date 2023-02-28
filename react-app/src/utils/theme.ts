import { green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#66bb6a',
        contrastText: '#fff'
      },
      secondary: {
        main: '#009688',
        contrastText: '#fff',
      },
      
    },
  });

export default theme;