import * as React from 'react';
import { shallow } from 'enzyme';

import Breadcrumbs from './Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';

describe('Breadcrumbs', () => {
  test('should render with minimal props', () => {
    const shallowWrapper = shallow(
      <Breadcrumbs
        links={[
          { label: 'Home' },
        ]}
      />
    );
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
  test('should render with two links', () => {
    const shallowWrapper = shallow(
      <Breadcrumbs
        links={[
          { label: 'Home' },
          { label: 'Home', icon: <HomeIcon/> },
          { label: 'Sales', href: '/sales' },
          { label: 'Invoices', onClick: () => undefined },
          { current: true, label: 'Invoices', disabled: true, onClick: () => undefined },
        ]}
      />
    );
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
