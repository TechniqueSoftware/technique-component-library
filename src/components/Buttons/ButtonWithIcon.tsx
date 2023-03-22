import Button, { ButtonProps } from '@material-ui/core/Button';
import * as React from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Box from '@material-ui/core/Box';

export type IconPosition = 'left' | 'right';
const LEFT: IconPosition = 'left';
const RIGHT: IconPosition = 'right';

export interface ButtonWithIconProps extends ButtonProps {
  ref?: any;
  iconPosition?: IconPosition;
  iconProps?: SvgIconProps & { component?: any };
}

const buttonSizeToIconSizeMap: { [key: string]: 'inherit' | 'medium' | 'small' | 'large' } = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

export function ButtonWithIcon(props: ButtonWithIconProps) {

  const {
    iconPosition = LEFT,
    variant = 'contained',
    iconProps,
    children,
    ...rest
  } = props;

  // If any defaults are set above for the buttonProps they need to be passed in here.
  const buttonPropsWithDefaults: ButtonProps = {
    ...rest,
    variant
  };

  function renderIcon() {
    if (!iconProps || !iconProps.component) return null;

    const boxProps = {
      mr: iconPosition === LEFT ? 1 : 0,
      ml: iconPosition === RIGHT ? 1 : 0
    };

    return (<Box {...boxProps} clone>
      <iconProps.component
        {...iconProps}
        fontSize={buttonSizeToIconSizeMap[props.size]} />
    </Box>);
  }

  const iconComponent = renderIcon();

  return <Button {...buttonPropsWithDefaults}>
      {iconPosition === LEFT && iconComponent}
      {children}
      {iconPosition === RIGHT && iconComponent}
    </Button>;
}

export default ButtonWithIcon;
