//@ts-nocheck
import * as React from 'react';
import { createCUICStoriesOf } from '../../../components/UI-Components/utils/utils';
import { MODULE_NAME } from '../../../components/UI-Components/constants';
import { IconTooltip, IconTooltipProps } from '../../..';
import clubOsTheme from '../../../components/UI-Components/storyThemes';
import { select, text } from '@storybook/addon-knobs';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import HelpRounded from '@material-ui/icons/HelpRounded';
import LocationOn from '@material-ui/icons/LocationOn';
import Add from '@material-ui/icons/Add';

type TooltipIconStoryProps = {
  iconComponent: any;
  tooltipText: string;
  placement: any;
};

class IconTooltipStory extends React.PureComponent<TooltipIconStoryProps> {

  render() {
    const { tooltipText, iconComponent: IconComponent, placement, } = this.props;
    const iconTooltipProps: IconTooltipProps = {
      placement,
      tooltipText,
      iconProps: {
        component: IconComponent
      },
    };
    const style: React.CSSProperties = {
      margin: '50%',
    };

    return (
      <div style={style}>
        <ThemeProvider theme={clubOsTheme}>
          <IconTooltip {...iconTooltipProps} />
        </ThemeProvider>
      </div>
    );
  }

}

createCUICStoriesOf(MODULE_NAME.ICON, module)
  .addCUICStory({
    render: () => {

      const iconMap = {
        HelpRounded,
        LocationOn,
        Add,
      };

      const iconMapKeys = Object.keys(iconMap);
      const iconComponentSelect = select('Icon Component', iconMapKeys, iconMapKeys[0]);
      const tooltipText = text(
        'Tooltip text',
        'Locations that do not have bulk texting enabled cannot be selected. Contact support@club-os.com for help.',
      );
      const placementSelect = select(
        'Placement',
        [
          'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left',
          'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top',
        ],
        'top'
      );

      return (
        <IconTooltipStory
          tooltipText={tooltipText}
          iconComponent={iconMap[iconComponentSelect]}
          placement={placementSelect}
        />);
    },
    name: 'IconTooltip',
    notes: require('./notes.md').default
  });
