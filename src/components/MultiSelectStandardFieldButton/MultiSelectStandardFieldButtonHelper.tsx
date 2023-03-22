import { MultiSelectStandardOptions } from '../MultiSelectStandardField/MultiSelectStandardSearchList/MultiSelectStandardSearchList';

export const getButtonLabel = (multiSelectStandardFieldProps: MultiSelectStandardOptions[], label: string) => {
  const filteredObj: any = [];
  let toDisplayLabel: string = '';

  multiSelectStandardFieldProps.filter((item: any) => {
    if (item.checked === true) {
      filteredObj.push(item.labelString);
    }
  });

  toDisplayLabel = filteredObj && filteredObj.length === 1 ? filteredObj.join(', ') : filteredObj.length > 1 ? `${filteredObj.length} ${label}s` : 'All';

  return toDisplayLabel;
};
