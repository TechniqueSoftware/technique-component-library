import * as React from 'react';
import { createCUICStoriesOf } from '../../../../components/UI-Components/utils/utils';
import { MODULE_NAME } from '../../../../components/UI-Components/constants';
import clubOsTheme from '../../../../components/UI-Components/storyThemes';
import { TextInput, TextInputProps } from '../../../..';
import { boolean, number, text } from '@storybook/addon-knobs';
import Search from '@material-ui/icons/Search';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

type TextInputStoryProps = {
  containerWidth: number;
  placeholder: string;
  withAdornment: boolean;
};

type TextInputStoryState = { text: string };

class TextInputStory extends React.PureComponent<TextInputStoryProps, TextInputStoryState> {

  constructor(props: TextInputStoryProps) {
    super(props);
    this.state = { text: '' };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(event: any) {
    this.setState({ text: event.target.value });
  }

  render() {
    const { containerWidth, placeholder, withAdornment } = this.props;
    const textInputProps: TextInputProps = {
      placeholder,
      'aria-label': placeholder,
      value: this.state.text,
      onChange: this.handleTextChange
    };
    if (withAdornment) {
      textInputProps.startAdornmentIcon = <Search />;
    }
    return (
      <div style={{ width: containerWidth }}>
        <ThemeProvider theme={clubOsTheme}>
          <TextInput {...textInputProps} />
        </ThemeProvider>
      </div>
    );
  }

}

createCUICStoriesOf(MODULE_NAME.INPUTS, module)
  .addCUICStory({
    render: () => {
      const placeholder = text('Placeholder text', 'Search');
      const containerWidth = number('Container width', 400);
      const withAddornment = boolean('With addornment icon', true);
      return (
        <TextInputStory
          placeholder={placeholder}
          containerWidth={containerWidth}
          withAdornment={withAddornment} />);
    },
    name: 'TextInput',
    notes: require('./notes.md').default
  });
