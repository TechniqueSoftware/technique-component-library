import * as React from 'react';
import { default as MuiPaper, PaperProps as MuiPaperProps } from '@material-ui/core/Paper';

export type PaperProps = MuiPaperProps;

export const Paper = MuiPaper as React.ComponentType<MuiPaperProps>;

export default Paper;
