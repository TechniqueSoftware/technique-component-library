import * as React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

interface RadioProps {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  label: string;
  name: string;
  value: string;
  radioPropsList: RadioProps[];
}

function renderRadioPropsList(formControlLabelPropsList: RadioProps[]) {
  return formControlLabelPropsList.map((props) => {
    return <FormControlLabel {...props} control={<Radio />} key={props.value} />;
  });
}

export function RadioGroup(props: RadioGroupProps) {
  const { onChange, label, name, value, radioPropsList } = props;
  return <FormControl component="fieldset">
    <FormLabel component="legend">{label}</FormLabel>
    <MuiRadioGroup aria-label={label} name={name} value={value} onChange={onChange}>
      {renderRadioPropsList(radioPropsList)}
    </MuiRadioGroup>
  </FormControl>;
}
