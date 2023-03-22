import * as React from 'react';
import { select, text } from '@storybook/addon-knobs';
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../constants';
import clubOsTheme from '../../../themes/clubOS/index';
import { ButtonWithIcon, ButtonWithIconProps, IconPosition } from '../../../components/Buttons/ButtonWithIcon'
import LocationOn from '@material-ui/icons/LocationOn';
import Add from '@material-ui/icons/Add';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

function render() {

  const iconMap = {
    LocationOn,
    Add,
    None: ''
  };

  const iconMapKeys = Object.keys(iconMap);
  const iconComponent: any = select('Icon Component', iconMapKeys, iconMapKeys[0]) ;
  const iconProps: SvgIconProps & { component: string } = {
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
