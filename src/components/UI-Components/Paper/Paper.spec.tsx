import { shallow } from 'enzyme';
import * as React from 'react';
import { Paper, PaperProps } from './Paper';

describe('Paper', () => {

  test('should render', () => {
    const props: PaperProps = {
      component: 'div',
      elevation: 1,
      square: true
    };
    const shallowWrapper = shallow(<Paper {...props}>
      <span>mockChild</span>
    </Paper>);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
