import * as React from 'react';
import { ErrorBanner } from './ErrorBanner';
import Typography from '@material-ui/core/Typography';

export interface ErrorListProps {
  className?: string;
  title: string;
  errors: string[];
}

export const ErrorList = (props: ErrorListProps) => {
  const {
    className,
    title,
    errors,
  } = props;

  if (!errors.length) return null;

  return (
    <ErrorBanner
      className={className}
      message={title}
    >
      <ul>
        {errors.map((error, index) => (
          <li
            key={index}
          ><Typography>{error}</Typography></li>
        ))}
      </ul>
    </ErrorBanner>
  );
};
