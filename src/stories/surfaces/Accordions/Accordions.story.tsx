import * as React from 'react';
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../../constants';
import { select } from '@storybook/addon-knobs';

import { default as Accordions, Accordion } from '@clubos-ui-components/core/dist/components/Accordions/Accordions';

import clubOsTheme from '@clubos-ui-components/core/dist/themes/clubOS';
import { MuiThemeProvider } from '@material-ui/core';

const AccordionsStory = () => {

  const panels: Accordion[] = [
    {
      title: 'Title',
      subTitle: 'Subtitle',
      helperText: 'Helper text. (default: expanded)',
      defaultExpanded: true,
      rightSummary: 'Right Summary panel',
      details: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate.',
    },
    {
      title: 'Seven hills',
      subTitle: 'Brewery',
      details: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate.',
    },
    {
      title: 'Fanta panda',
      subTitle: 'Chinese',
      helperText: 'Disabled',
      disabled: true,
      details: 'Parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate.',
    },
    {
      title: 'Scottish Notice',
      subTitle: 'Pub',
      details: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui.',
    },
    {
      title: '7stern',
      subTitle: 'Brewery',
      helperText: 'Map info included',
      rightSummary: <div>Phone 699111234123</div>,
      details: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles.',
    },
    {
      title: '1234567890',
      summary: (
        <>
          <h4>Hollandia</h4>
          <h5>An irish pub</h5>
          <p>Custom Summary</p>
        </>
      ),
      details: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles.',
    },
  ];

  const mode = select('Mode', ['free', 'accordion'], 'free');

  return (
    <MuiThemeProvider theme={clubOsTheme}>
      <Accordions
        mode={mode}
        panels={panels}
      />

    </MuiThemeProvider>
  );
};

createCUICStoriesOf(MODULE_NAME.SURFACES, module)
  .addCUICStory({
    render: () => <AccordionsStory/>,
    name: 'Expansion Panels',
    notes: require('./notes.md').default
  });
