import * as React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { id, children, classes, onClose, ...other } = props;
  return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h4" component="h2">{children}</Typography>
        {onClose ? (
          <IconButton id={`${id}-close-button`} aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
  );
});
