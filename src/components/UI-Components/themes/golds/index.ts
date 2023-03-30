import { createTheme } from '@material-ui/core';
import { clubOSThemeConfig } from '../clubOS';

const goldsThemeConfig = {
  typography: { ...clubOSThemeConfig.typography },
  palette: {
    primary: { main: '#d15b1f' },
    secondary: { main: '#132959' }
  }
};

const goldsTheme = createTheme(goldsThemeConfig);
export default goldsTheme;
