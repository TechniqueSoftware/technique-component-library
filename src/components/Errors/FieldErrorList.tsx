import * as React from 'react';
import { ErrorList } from './ErrorList';

export interface FieldErrorListProps {
  className?: string;
  title: string;
  errors: FieldErrors;
  labels: {
    [fieldName: string]: string;
  };
}

export interface FieldErrors {
  [fieldName: string]: string[];
}

export const mergeFieldErrors = (...fieldErrors: FieldErrors[]): FieldErrors => {
  const output: FieldErrors = {};
  fieldErrors.forEach(fieldErrorsItem => {
    Object.keys(fieldErrorsItem)
    .forEach(fieldName => {
      if (!output[fieldName]) output[fieldName] = [];
      output[fieldName] = output[fieldName].concat(fieldErrorsItem[fieldName]);
    });
  });
  return output;
};

/**
 * Developers may want to use these functions in their projects
 const getErrors = (fieldName: string): string[] => errors[fieldName] || [];
 const getError = (fieldName: string): string => getErrors(fieldName)[0] || '';
 const hasError = (fieldName: string): boolean => !!getError(fieldName);
 */

export const FieldErrorList = (props: FieldErrorListProps) => {
  const {
    className,
    title,
    errors,
    labels,
  } = props;

  return (
    <ErrorList
      className={className}
      title={title}
      errors={
        Object.keys(errors)
          .reduce((acc: string[], fieldName: string) => {
            if (!labels[fieldName]) console.error(`FieldErrorList: no label passed for field: ${fieldName}`);
            return acc.concat(
                errors[fieldName].map(error => `${labels[fieldName] || fieldName} > ${error}`)
              );
          },
            []
          )
      }/>
  );
};
