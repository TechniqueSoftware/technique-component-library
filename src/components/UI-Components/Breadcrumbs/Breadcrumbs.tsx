import * as React from 'react';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export interface BreadcrumbsProps {
  className?: string;
  links: {
    label: string;
    current?: boolean;    // Default: false. The current slug, it will be not clickable
    href?: string;
    target?: string;      // href's target
    icon?: JSX.Element;
    disabled?: boolean;
    onClick?: () => void;
  }[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      display: 'flex',
      fontSize: '16px',
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 18,
      height: 18,
      position: 'relative',
      top: '2px',
    },
  }),
);

export default function Breadcrumbs(props: BreadcrumbsProps) {
  const {
    className,
    links,
  } = props;
  const classes = useStyles();

  const renderIcon = (icon: JSX.Element | undefined) =>
    icon
      ? React.cloneElement(icon, { className: classes.icon })
      : null;

  return (
    <MuiBreadcrumbs
      className={className}
      itemsBeforeCollapse={0}
      itemsAfterCollapse={4}
      maxItems={5}
    >
      {links.map((link, index) => {
        const {
          current,
          label,
          href,
          target,
          icon,
          disabled,
          onClick,
        } = link;

        if (current) {
          return (
            <Typography
              key={index}
              className={classes.link}
              color="textPrimary"
            >
              {renderIcon(icon)}
              {label}
            </Typography>
          );
        }

        return (
          <Link
            key={index}
            className={classes.link}
            color="inherit"
            target={target}
            href={disabled ? undefined : href || '#'}
            onClick={disabled ? undefined : onClick}
          >
            {renderIcon(icon)}
            {label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
}
