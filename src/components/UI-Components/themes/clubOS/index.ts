import { createTheme, Theme } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createTheme';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import createPalette from '@material-ui/core/styles/createPalette';

/**
 * Colors set by the theme that were not able to be set via global overrides and need to be shared across multiple
 * components
 */
export const colors = {
  icon: {
    // The default icon color for non input icons (icons that aren't checkboxes/radio buttons).
    default: (theme: Theme): string => theme.palette.grey['600']
  }
};

const SPACING_UNIT = 8;

const typography: TypographyOptions = {
  fontFamily: `'Open Sans', sans-serif`,
  fontSize: 14,
  // Header font sizes are based off of tachyons font sizes scale, starting at 3em: http://tachyons.io/docs/typography/scale/
  h1: {
    fontSize: '3rem'
  },
  h2: {
    fontSize: '2.25rem'
  },
  h3: {
    fontSize: '1.5rem'
  },
  h4: {
    fontSize: '1.25rem'
  },
  h5: {
    fontSize: '1rem'
  },
  h6: {
    fontSize: '.875rem'
  }
};

const palette = createPalette({
  primary: { main: '#0d86c5' },
  secondary: { main: '#E36419' },
  common: { white: '#ffffff' },
  error: { main: '#df5650' }
});

export const clubOSThemeConfig: ThemeOptions = {
  typography,
  palette,
  spacing: SPACING_UNIT,
  overrides: {
    MuiButton: {
      root: {
        color: palette.grey['600'],
        fontWeight: 'bold'
      },
      contained: {
        color: palette.primary.main,
        backgroundColor: palette.common.white
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: 14,
        fontWeight: 700,
        paddingLeft: SPACING_UNIT * 2,
        paddingRight: SPACING_UNIT * 2,
        paddingTop: SPACING_UNIT,
        paddingBottom: SPACING_UNIT,
      },
    },
    MuiDialogTitle: {
      root: {
        fontSize: typography.h3.fontSize
      }
    },
    MuiFormLabel: {
      asterisk: {
        color: palette.error.main
      }
    },
    MuiTab: {
      root: {
        '@media (min-width: 0px)': {
          minWidth: '135px'
        }
      }
    }
  }
};

const clubOsTheme = createTheme(clubOSThemeConfig);

export default clubOsTheme;
