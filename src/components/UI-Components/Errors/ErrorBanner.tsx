import * as React from 'react';

import { Theme } from '@material-ui/core/styles';
import { makeStyles, createStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

export interface ErrorBannerProps {
  className?: string;
  message?: string;
  children?: any;
}

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      width: '100%',
      backgroundColor: '#fff2f1',
      border: '1px solid #df5650',
      borderRadius: 4,
      padding: theme.spacing(3),
      fontSize: 13,
    },
    message: {
      color: '#df5650',
      marginBottom: 2,
    },
  });
});

export function ErrorBanner(props: ErrorBannerProps) {
  const classes = useStyles({});
  const {
    message,
    children,
  } = props;

  if (!message && !children) return null;

  return (
    <div className={classes.root}>
      {!!message && (
        <Typography className={classes.message}>
          <i className="fa fa-exclamation-circle" /> {message}
        </Typography>)
      }
      {children || null}
    </div>
  );
}
