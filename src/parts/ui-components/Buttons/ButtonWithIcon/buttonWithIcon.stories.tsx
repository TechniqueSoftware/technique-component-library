//@ts-nocheck
import * as React from 'react';
import { select, text } from '@storybook/addon-knobs';
import { createCUICStoriesOf } from '../../../../components/UI-Components/utils/utils';
import { MODULE_NAME } from '../../../../components/UI-Components/constants';
import { ButtonWithIcon, ButtonWithIconProps } from '../../../../components/UI-Components/Buttons/ButtonWithIcon/ButtonWithIcon';
import clubOsTheme from '../../../../components/UI-Components/storyThemes/index'
import LocationOn from '@material-ui/icons/LocationOn';
import Add from '@material-ui/icons/Add';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { IconPosition } from '../../../../components/UI-Components/Buttons/ButtonWithIcon/ButtonWithIcon';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

function render() {

  const iconMap = {
    LocationOn,
    Add,
    None: ''
  };

  const iconMapKeys = Object.keys(iconMap);
  const iconComponent = select('Icon Component', iconMapKeys, iconMapKeys[0]);
  const iconProps: SvgIconProps & { component: any } = {
    component: iconMap[iconComponent]
  };

  const variantMap: any = {
    text: 'text',
    outlined: 'outlined',
    contained: 'contained'
  };

  const buttonWithIconProps: ButtonWithIconProps = {
    iconProps,
    iconPosition: select('Icon position', ['left', 'right'], 'left') as IconPosition,
    variant: select('Variant', Object.keys(variantMap), variantMap.contained),
    size: select('Size', ['small', 'medium', 'large'], 'medium'),
    color: select('Color', ['inherit', 'primary', 'secondary', 'default'], 'primary'),
    children: text('Button text', 'Submit')
  };

  return (
    <div>
      <MuiThemeProvider theme={clubOsTheme}>
        <Box p={2}>
          <ButtonWithIcon {...buttonWithIconProps} />
        </Box>
      </MuiThemeProvider>
    </div>);
}

createCUICStoriesOf(MODULE_NAME.BUTTONS, module)
  .addCUICStory({
    render,
    name: 'ButtonWithIcon',
    notes: require('./notes.md').default
  });
