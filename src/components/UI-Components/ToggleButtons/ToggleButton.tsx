import * as React from 'react';
import { default as MuiToggleButton, ToggleButtonProps } from '@material-ui/lab/ToggleButton';

import { Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

export {
  ToggleButtonProps,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      fontWeight: 'bold',
      textAlign: 'center',
      minWidth: 21,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  }),
);

function ToggleButton(props: ToggleButtonProps) {
  const {
    children,
  } = props;
  const classes = useStyles({});

  const partialProps = { ...props };
  delete partialProps.children;

  return (
    <MuiToggleButton {...partialProps}>
      {typeof children === 'string'
        ? <div className={classes.content}>{children}</div>
        : children
      }
    </MuiToggleButton>
  );
}

export default ToggleButton;
