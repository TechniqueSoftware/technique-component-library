import { Theme } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createTheme';
/**
 * Colors set by the theme that were not able to be set via global overrides and need to be shared across multiple
 * components
 */
export declare const colors: {
    icon: {
        default: (theme: Theme) => string;
    };
};
export declare const clubOSThemeConfig: ThemeOptions;
declare const clubOsTheme: Theme;
export default clubOsTheme;
