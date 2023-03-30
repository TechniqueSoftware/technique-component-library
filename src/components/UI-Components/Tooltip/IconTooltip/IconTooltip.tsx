import * as React from 'react';
import { Theme } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/styles/withStyles';
import { colors } from '../../storyThemes';
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon';

const styles = (theme: Theme) => ({
  icon: {
    fontSize: theme.typography.body2.fontSize,
    color: colors.icon.default(theme)
  }
});

export interface IconTooltipProps {
  tooltipText: string | React.ReactNode;
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  iconProps?: SvgIconProps & { component: any };
  classes?: {
    icon?: string;
  };
}

export class IconTooltip extends React.PureComponent<IconTooltipProps> {

  static defaultProps: Partial<IconTooltipProps> = {
    classes: {}
  };

  render() {
    const {
      classes,
      placement = 'top',
      iconProps,
      tooltipText,
    } = this.props;

    const tooltipProps = {
      placement,
      title: tooltipText,
      tabIndex: 0,
    };

    const iconClassName = classes && classes.icon;
    const IconComponent = iconProps.component;

    return (
      <Tooltip {...tooltipProps}>
        <IconComponent classes={{ root: iconClassName }} {...iconProps} />
      </Tooltip>);
  }
}

export default withStyles(styles)(IconTooltip);
