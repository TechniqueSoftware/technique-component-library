import * as React from 'react';
import { SubHeader, SubHeaderProps } from './SubHeader';
import { shallow } from 'enzyme';

describe('SubHeader', () => {
  test('should render with minimal props', () => {
    const props: SubHeaderProps = { subheader: 'mockHeader' };
    const shallowWrapper = shallow(<SubHeader {...props} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should render with right icon', () => {
    const props: SubHeaderProps = {
      subheader: 'mockHeader',
      rightComponent:<div>Right Icon</div>
    };
    const shallowWrapper = shallow(<SubHeader {...props} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should render a subtitle when provider with one', () => {
    const props: SubHeaderProps = {
      subheader: 'mockHeader',
      subtext: 'mockSubTitle'
    };
    const shallowWrapper = shallow(<SubHeader {...props} />);
    const subTitle = shallowWrapper.findWhere((node) => node.text().indexOf(props.subtext as string) > 0);
    expect(subTitle.length).toBe(1);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should remove margin when gutterBottom is false', () => {
    const props: SubHeaderProps = {
      subheader: 'mockHeader',
      subtext: 'mockSubTitle',
      gutterBottom: false
    };
    const shallowWrapper = shallow(<SubHeader {...props} />);
    const subTitle = shallowWrapper.findWhere((node) => node.text().indexOf(props.subtext as string) > 0);
    expect(shallowWrapper.debug()).toMatchSnapshot();
    expect(subTitle.props().mb).toBe(0);
  });
});
