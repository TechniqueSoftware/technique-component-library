import * as React from 'react';
import { shallow } from 'enzyme';
import Pagination from './Pagination';

describe('Pagination', () => {
  test('should render with minimal props', () => {
    const wrapper = shallow(
      <Pagination
        pageNo={1}
        pageSize={20}
        count={200}
        onPageNoChange={() => undefined}
        onPageSizeChange={() => undefined}
      />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });

  test('should render with page sizes', () => {
    const wrapper = shallow(
      <Pagination
        pageNo={1}
        pageSize={20}
        count={200}
        pageSizes={[5, 10, 20, 200]}
        onPageNoChange={() => undefined}
        onPageSizeChange={() => undefined}
      />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });

  test('should render with page 5', () => {
    const wrapper = shallow(
      <Pagination
        pageNo={5}
        pageSize={50}
        count={200}
        onPageNoChange={() => undefined}
        onPageSizeChange={() => undefined}
      />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
