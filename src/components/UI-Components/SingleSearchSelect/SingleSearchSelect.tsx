import * as React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles, Theme } from '@material-ui/core';
import withStyles from '@material-ui/styles/withStyles';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import TextInput, { TextInputProps } from '../TextInput/TextInput';
import { SelectCustom, SelectCustomProps } from '../Select/SelectCustom';

export interface SingleSearchSelectProps extends SelectCustomProps {
  options: {
    label: string,
    value: string
  }[];
  emptyDataLabel?: string;
  searchContainerMaxWidth?: number;
  listContainerHeight?: number;
  error?: boolean;
  classes?: {
    container?: string;
  };
  autoFocus?: boolean;
  placeholder?: string;
  ariaLabel?: string;
  startAdornmentIcon?: React.ReactElement;
  onChange: (value: any) => void;
}

const useSingleSearchSelectPropsStyles = makeStyles(() =>
  createStyles({
    searchContainer: (props: SingleSearchSelectProps) => {
      return ({ width: props.searchContainerMaxWidth || 400 });
    },
    container: {},
  }));

const styles = (theme: Theme) => ({
  container: {
    border: `1px solid ${theme.palette.grey['300']}`,
    background: theme.palette.common.white
  }
});

function SingleSearchSelect(props: SingleSearchSelectProps) {
  const {
    value,
    options = [],
    maxWidth = 300,
    id,
    label,
    disabled = false,
    open,
    emptyDataLabel = '',
    error,
    listContainerHeight,
    hideLabel = false,
    classes,
    autoFocus = false,
    placeholder = 'Search',
    ariaLabel = 'Search',
    startAdornmentIcon = <Search />,
    onChange,
    onMenuOpen,
    onMenuClose
  } = props;

  const [search, setSearch] = React.useState<string>('');

  const handleOpenMenu = () => {
    onMenuOpen();
  };

  const handleCancel = () => {
    onMenuClose();
    setSearch('');
  };

  const handleSearchChange = (event: any) => {
    const search = event.target.value;
    setSearch(search);
  };

  const handleSelect = (value: string) => {
    onChange(value);
    handleCancel();
  };

  const renderListItems = () => {
    const listStyles = { overflow: 'auto', maxHeight: listContainerHeight, width: '100%' };
    const options = getFilteredOptions();

    return (
      <List style={listStyles} dense>
        {
          options.map(option => (
            <ListItem
              dense
              key={option.value}
              selected={option.value === value}
              style={{ cursor: 'pointer' }}
              onClick={() => handleSelect(option.value)}
            >
              <Typography component="span">
                {option.label}
              </Typography>
            </ListItem>
          ))
        }
        {(search && !options.length) && <ListItem><ListItemText>No match found</ListItemText></ListItem>}
      </List>
    );
  };

  const getFormattedValue = (value: string) => {
    const option = options.find(x => x.value === value);
    return option ? option.label : !options.length ? emptyDataLabel : '';
  };

  const getFilteredOptions = () => {
    return options.filter(option => option.label.toLowerCase().includes(search.toLowerCase()));
  };

  const selectCustomProps: SelectCustomProps = {
    disabled,
    label,
    hideLabel,
    maxWidth,
    open,
    value: getFormattedValue(value),
    id: `${id}-single-search-select`,
    onMenuOpen: handleOpenMenu,
    onMenuClose: handleCancel
  };

  const textInputProps: TextInputProps = {
    error,
    autoFocus,
    placeholder,
    startAdornmentIcon,
    value: search,
    'aria-label': ariaLabel,
    onChange: handleSearchChange,
  };

  const { searchContainer } = useSingleSearchSelectPropsStyles(props);

  return (
    <SelectCustom {...selectCustomProps} >
      <Fade in={true}>
        <Grid item className={searchContainer}>
          <div className={classes.container}>
            <TextInput {...textInputProps} />
            {renderListItems()}
          </div>
        </Grid>
      </Fade>
    </SelectCustom>
  );
}

export default withStyles(styles)(SingleSearchSelect);
