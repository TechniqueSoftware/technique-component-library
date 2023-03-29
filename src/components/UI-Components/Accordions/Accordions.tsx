// @ts-nocheck
import * as React from 'react';

import { default as MUIAccordion } from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

export interface Accordion {
  // Status
  defaultExpanded?: boolean;  // Default: false
  disabled?: boolean;         // Default: true
  // Summary
  title?: React.ReactNode | string;
  subTitle?: string;
  helperText?: string;
  rightSummary?: React.ReactNode | string;
  summary?: React.ReactNode | string;   // Instead of the above props, a custom summary would be applied
  // Details
  details: React.ReactNode | string;
}

export interface AccordionsProps {
  className?: string;
  panels: Accordion[];
  mode?:
    'free' |      // Applied by the user
    'accordion'   // Only one open at a time
  ;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    subTitle: {
      fontSize: theme.typography.pxToRem(12),
      fontWeight: theme.typography.fontWeightBold,
    },
    summaryContainer: {
      display: 'flex',
      width: '100%',
    },
    summaryLeft: {
      flex: '1 1 100%',
    },
    summaryRight: {
      flex: '1 1 0',
      marginLeft: theme.spacing(3),
    },
  }),
);

const Accordions = (props: AccordionsProps) => {
  const classes = useStyles();
  const {
    className,
    panels,
    mode = 'free',
  } = props;

  const internalId = React.useRef<string>();
  if (!internalId.current) internalId.current = Math.random().toString().substr(2);
  const { current: id } = internalId;

  const [expandedPanels, setExpandedPanels] = React.useState<boolean[]>(panels.map(panel => !!panel.defaultExpanded));

  React.useEffect(() => {
    if (mode === 'accordion') {
      const firstExpanded = expandedPanels.findIndex(Boolean);
      if (firstExpanded === -1) setExpandedPanels(panels.map(() => false));
      setExpandedPanels(panels.map((v, index) => index === firstExpanded));
    }
  }, [mode]);

  const handleExpanded =
    (expandedIndex: number) =>
      (event: React.ChangeEvent, expanded: boolean) => {
        const newExpandedPanels = expandedPanels.concat();
        switch (mode) {
          case 'free':
            newExpandedPanels[expandedIndex] = expanded;
            break;
          case 'accordion':
            panels.forEach((p, index) => newExpandedPanels[index] = expanded && index === expandedIndex);
            break;
        }
        setExpandedPanels(newExpandedPanels);
      };

  return (
    <div className={className}>
      {panels.map(
        ({
           title,
           subTitle,
           helperText,
           rightSummary,
           summary = null,
           details,
           defaultExpanded,
           disabled,
         },
         index,
        ) => (
          <MUIAccordion
            key={index}
            defaultExpanded={defaultExpanded}
            expanded={expandedPanels[index]}
            disabled={disabled}
            onChange={handleExpanded(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls={`panel-${index}-content-${id}`}
              id={`panel-${index}-header-${id}`}
            >
              <div className={classes.summaryContainer}>
                <div className={classes.summaryLeft}>
                  <Typography className={classes.title}>{title}</Typography>
                  {!!subTitle && <Typography className={classes.subTitle}>{subTitle}</Typography>}
                  {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
                  {summary}
                </div>
                {!!rightSummary && <div className={classes.summaryRight}>
                  {rightSummary}
                </div>}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {details}
            </AccordionDetails>
          </MUIAccordion>
        )
      )}
    </div>
  );
};

export default Accordions;
