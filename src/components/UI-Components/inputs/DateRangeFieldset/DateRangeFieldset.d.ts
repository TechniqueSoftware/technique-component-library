/// <reference types="react" />
import * as moment from 'moment';
import { DateRangeOption } from './dateRangeFieldSetConstants';
export interface DateRangeFieldsetInputProps {
    error?: boolean;
    helperText?: string;
    startDateHelperText?: string;
    endDateHelperText?: string;
    onChange: (value: string) => void;
    value: string;
    min?: string;
    max?: string;
}
export interface DateRangeFieldsetProps {
    id: string;
    dateRangeLabel: string;
    today: moment.Moment;
    dateRangeOptions: DateRangeOption[];
    dateRangeProps?: DateRangeFieldsetInputProps;
    startDateProps?: DateRangeFieldsetInputProps;
    endDateProps?: DateRangeFieldsetInputProps;
    isInvisible?: boolean;
}
export default function DateRangeFieldset(props: DateRangeFieldsetProps): JSX.Element;
