import * as React from 'react';
import clsx from 'clsx';

import MuiSnackbarContent from '@material-ui/core/SnackbarContent';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import green from '@material-ui/core/colors/lightGreen';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import SuccessIcon from '@material-ui/icons/CheckCircle';
import ClubOSErrorIcon from '@material-ui/icons/Error';
import ClubOSInfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

import { Theme, makeStyles, withStyles } from '@material-ui/core/styles';

export interface SnackbarContentProps {
  id: string;
  className?: string;
  'aria-describe-id'?: string;  // Default: 'snackbar'
  variant: 'success' | 'warning' | 'error' | 'info';
  message: React.ReactNode;
  maxWidth?: number;
  onUndo?: () => void;
  onClose?: () => void;
}

const useStyles = makeStyles((theme: Theme) => {
  return ({
    success: {},
    error: {},
    info: {},
    warning: {},
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
    },
    undoLink: {
      fontWeight: 900,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 600,
    },
  });
});

const clubOSWarningIconStyles = (theme: Theme) => ({
  root: {
    color: yellow[800],
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
});

const clubOSSuccessIconStyles = (theme: Theme) => ({
  root: {
    color: green[600],
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
});
const clubOSInfoIconStyles = (theme: Theme) => ({
  root: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
});

const clubOSErrorIconStyles = (theme: Theme) => ({
  root: {
    color: red[600],
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
});

const ClubOSWarningIcon = (props: { classes: { root: any } }) => <WarningIcon className={props.classes.root} />;
const ClubOSSuccessIcon = (props: { classes: { root: any } }) => <SuccessIcon className={props.classes.root} />;

const ClubOSWarningIconStyles = withStyles(clubOSWarningIconStyles)(ClubOSWarningIcon);
const ClubOSSuccessIconStyles = withStyles(clubOSSuccessIconStyles)(ClubOSSuccessIcon);
const ClubOSErrorIconStyles = withStyles(clubOSErrorIconStyles)(ClubOSErrorIcon);
const ClubOSInfoIconStyles = withStyles(clubOSInfoIconStyles)(ClubOSInfoIcon);

const variantIcon = {
  success: ClubOSSuccessIconStyles,
  warning: ClubOSWarningIconStyles,
  info: ClubOSInfoIconStyles,
  error: ClubOSErrorIconStyles,
};

export interface SnackbarActionsProps {
  onUndo?: () => void;
  onClose?: () => void;
}

export function SnackbarAction(props: SnackbarActionsProps) {

  const { onUndo, onClose } = props;
  const classes = useStyles();
  return <React.Fragment>
    {!!onUndo &&
    <Button
      color="primary"
      size="small"
      onClick={onUndo}
    >
      Undo
    </Button>}
    {!!onClose &&
    <IconButton
      key="close"
      aria-label="Close"
      color="inherit"
      onClick={onClose}
    >
      <CloseIcon className={classes.icon} />
    </IconButton>
    }
  </React.Fragment>;
}

export const SnackbarContent = React.forwardRef((props: SnackbarContentProps, ref) => {
  const classes = useStyles();
  const {
    id,
    className,
    'aria-describe-id': ariaDescribeId = 'snackbar',
    message,
    maxWidth = 400,
    variant,
    onClose,
    onUndo
  } = props;

  const Icon = variantIcon[variant];
  const applyAriaDescribeId = ariaDescribeId || 'snackbar-content';

  return (
    <div ref={ref as any} id={id}>
      <Box maxWidth={maxWidth}>
        <MuiSnackbarContent
          className={clsx(classes[variant], className)}
          aria-describedby={applyAriaDescribeId}
          message={
            <span id={applyAriaDescribeId} className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          action={<SnackbarAction onClose={onClose} onUndo={onUndo} />}
        />
      </Box>
    </div>
  );
});
