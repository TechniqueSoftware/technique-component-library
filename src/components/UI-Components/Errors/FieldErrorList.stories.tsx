import * as React from 'react';
import { FieldErrorList, FieldErrorListProps } from '../../Errors/FieldErrorList';
import { createCUICStoriesOf } from '../utils/utils';
import { MODULE_NAME } from '../constants';
import { text } from '@storybook/addon-knobs';
import clubOsTheme from '../storyThemes/index';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

function render() {

  const fieldErrorListProps:FieldErrorListProps = {
    title:'There was an error. Please update the following:',
    errors:{
      name:[text('First Name Error', 'Name is too short'), text('Second Name Error', 'Name is too long')],
      promoCode: [text('Promo Code Error', 'Code is expired')]
    },
    labels:{
      name: text('Name Label Value', 'Name'),
      description: text('Description Label Value', 'Description'),
      promoCode: text('Promo Code Label Value', 'Promo Code'),
    }
  };

  return (
    <ThemeProvider theme={clubOsTheme}>
      <FieldErrorList {...fieldErrorListProps}/>
    </ThemeProvider>);
}

createCUICStoriesOf(MODULE_NAME.ERRORS, module)
.addCUICStory({
  render,
  name: 'FieldErrorList',
  notes: require('./notes.md').default
});
