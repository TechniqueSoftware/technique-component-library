import * as React from 'react';
import { SectionHeader, SectionHeaderProps } from './SectionHeader';
import { shallow } from 'enzyme';

describe('SectionHeader', () => {
  test('should render with minimal props', () => {
    const props: SectionHeaderProps = { header: 'mockHeader' };
    const shallowWrapper = shallow(<SectionHeader {...props} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should render with right icon', () => {
    const props: SectionHeaderProps = {
      header: 'mockHeader',
      rightComponent:<div>Right Icon</div>
    };
    const shallowWrapper = shallow(<SectionHeader {...props} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should render a subtitle when provider with one', () => {
    const props: SectionHeaderProps = {
      header: 'mockHeader',
      subtitle: 'mockSubTitle'
    };
    const shallowWrapper = shallow(<SectionHeader {...props} />);
    const subTitle = shallowWrapper.findWhere((node) => node.text().indexOf(props.subtitle as string) > 0);
    expect(subTitle.length).toBe(1);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should remove margin when gutterBottom is false', () => {
    const props: SectionHeaderProps = {
      header: 'mockHeader',
      subtitle: 'mockSubTitle',
      gutterBottom: false
    };
    const shallowWrapper = shallow(<SectionHeader {...props} />);
    const subTitle = shallowWrapper.findWhere((node) => node.text().indexOf(props.subtitle as string) > 0);
    expect(shallowWrapper.debug()).toMatchSnapshot();
    expect(subTitle.props().mb).toBe(0);
  });
});
