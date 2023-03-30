import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';

export interface SectionHeaderProps {
  header: React.ReactNode | string;
  subtitle?: React.ReactNode | string;
  gutterBottom?: boolean;
  rightComponent?: React.ReactNode;
}

export function SectionHeader(props: SectionHeaderProps) {
  const {
    header,
    subtitle,
    rightComponent,
    gutterBottom = true
  } = props;
  return <Box mb={gutterBottom ? 2 : 0}>
    <Box mb={1}>
    <Grid container item xs={12} spacing={1}>
      <Grid container item xs={8} spacing={1}>
        <Typography variant="h4" component="h2" gutterBottom={true}>
          {header}
        </Typography>
      </Grid>
      {rightComponent && <Grid justifyContent="flex-end" alignItems="center" container item xs={4}>
        {rightComponent}
      </Grid>}
    </Grid>
      <Divider orientation="horizontal" />
    </Box>
    {subtitle &&
    <Typography variant="subtitle1" gutterBottom={true}>
      {subtitle}
    </Typography>
    }
  </Box>;
}
