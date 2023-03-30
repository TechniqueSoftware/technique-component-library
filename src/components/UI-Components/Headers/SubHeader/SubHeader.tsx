import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

export interface SubHeaderProps {
  subheader: React.ReactNode | string;
  subtext?: React.ReactNode | string;
  gutterBottom?: boolean;
  rightComponent?: React.ReactNode;
}

export function SubHeader(props: SubHeaderProps) {
  const {
    subheader,
    subtext,
    gutterBottom = true
  } = props;

  return <Box mb={gutterBottom ? 2 : 0}>
    <Typography variant="body1" component="h2" gutterBottom={true}>
      <b>{subheader}</b>
    </Typography>
    <Typography variant="body1" gutterBottom={true}>
      {subtext}
    </Typography>
  </Box>;
}
