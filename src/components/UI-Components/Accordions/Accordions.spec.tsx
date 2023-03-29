import Accordions from './Accordions';
import { shallow } from 'enzyme';
import * as React from 'react';

import clubOsTheme from '../../../themes/clubOS';
import { MuiThemeProvider } from '@material-ui/core/styles';

describe('Accordions', () => {

  test('should render with base props', () => {
    const shallowWrapper = shallow(
      <MuiThemeProvider theme={clubOsTheme}>
        <Accordions
          panels={[
            {
              title: 'Title',
              details: 'Lorem ipsum.',
            },
          ]}
        />
      </MuiThemeProvider>
    );
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should render with all props', () => {
    const shallowWrapper = shallow(
      <MuiThemeProvider theme={clubOsTheme}>
        <Accordions
          className="class-name"
          mode="accordion"
          panels={[
            {
              title: 'Title',
              subTitle: 'Subtitle',
              helperText: 'Helper text. (default: expanded)',
              defaultExpanded: true,
              rightSummary: 'Right Summary panel',
              details: 'Lorem ipsum.',
            },
            {
              summary: (
                <>
                  <h4>Hollandia</h4>
                </>
              ),
              details: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles.',
            },
          ]}
        />
      </MuiThemeProvider>
    );
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

});
