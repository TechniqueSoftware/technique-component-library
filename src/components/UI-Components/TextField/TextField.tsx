import * as React from 'react';
import { default as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function determineLabelWidth(inputLabel: React.RefObject<HTMLLabelElement>) {
  return inputLabel && inputLabel.current && inputLabel.current.offsetWidth;
}

const useStyles = makeStyles({
  visuallyHidden: {
    marginLeft: '-9999px'
  },
  appendedText: {
    marginLeft: '20px',
  }
});

export function TextField(props: TextFieldProps) {

  const inputLabel: React.RefObject<HTMLLabelElement> = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState<null | number>(0);

  // @ts-ignore
  TextField.defaultProps = {
    variant: 'outlined',
    margin: 'dense'
  };

  const {
    isInvisible,
    hideLabel,
    maxWidth,
    appendedText,
    min,
    max,
    ...propsToPassOn
  } = props;
  const classes = useStyles();

  React.useEffect(() => {
    if (!isInvisible) {
      setLabelWidth(determineLabelWidth(inputLabel));
    }
  }, [isInvisible, propsToPassOn.label]);

  const inputLabelProps = propsToPassOn.InputLabelProps;

  const decoratedProps: TextFieldProps = {
    ...propsToPassOn,
    InputLabelProps: {
      ...inputLabelProps,
      ref: inputLabel,
    },
    inputProps: {
      ...propsToPassOn.inputProps,
      min,
      max
    },
    SelectProps: {
      ...propsToPassOn.SelectProps,
      // @ts-ignore
      style: { maxWidth: (maxWidth ? maxWidth : 'initial'), minWidth: (hideLabel ? 0 : labelWidth) + 48 }
    }, InputProps: {
      ...props.InputProps,
      labelWidth,
    } as any
  };

  if (hideLabel && decoratedProps.InputLabelProps) {
    decoratedProps.InputLabelProps.classes = { root: classes.visuallyHidden };
    decoratedProps.InputLabelProps.shrink = false;
  }

  const muiTextField = <MuiTextField {...decoratedProps} />;

  if (props.appendedText) {
    return (
      <Grid container alignItems="center" onClick={decoratedProps.onClick}>
        {muiTextField}
        <Typography>
          <span className={classes.appendedText}>{appendedText}</span>
        </Typography>
      </Grid>
    );
  }

  return muiTextField;
}

export type TextFieldProps = MuiTextFieldProps & {
  // The label for the TextField relies on element being visible to determine the label width. This prop gives
  // us a way to indicate when the TextField is invisible and changing to visible so that we can recalculate the width.
  isInvisible?: boolean,
  hideLabel?: boolean,
  appendedText?: string,
  maxWidth?: number,
  defaultProps?: any,
  min?: string,
  max?: string
};

export default TextField as React.ComponentType<TextFieldProps>;
