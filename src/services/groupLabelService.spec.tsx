import { getLabelFromGroupCounts, GroupCount } from './groupLabelService';

describe('groupLabelService', () => {

  test('should return the selected label when there is only one group and 1 selected', () => {
    const selectedLabel = 'Mock Selected';

    const groupCountList: GroupCount[] = [{
      selectedLabel,
      numSelected: 1,
      groupLabel: 'Foo'
    }];
    const label = getLabelFromGroupCounts('mockDefault', groupCountList);
    expect(label).toBe(selectedLabel);
  });

  test('should return the selected label when there is only one group and 1 selected', () => {
    const selectedLabel = 'Mock Selected';

    const groupCountList: GroupCount[] = [{
      selectedLabel,
      numSelected: 2,
      groupLabel: 'Foo'
    }];
    const label = getLabelFromGroupCounts('mockDefault', groupCountList);
    expect(label).toBe('2 Foos');
  });

  test('should combine the first two groups when two groups have values', () => {
    const selectedLabel = 'Mock Selected';

    const groupCountList: GroupCount[] = [{
      selectedLabel,
      numSelected: 2,
      groupLabel: 'Foo'
    }, {
      selectedLabel,
      numSelected: 3,
      groupLabel: 'Bar'
    }, {
      selectedLabel: '',
      numSelected: 0,
      groupLabel: 'Zap'
    }];
    const label = getLabelFromGroupCounts('mockDefault', groupCountList);
    expect(label).toBe('2 Foos, 3 Bars');
  });

  test('should add an ellipsis when there are three groups with values', () => {
    const selectedLabel = 'Mock Selected';

    const groupCountList: GroupCount[] = [{
      selectedLabel,
      numSelected: 2,
      groupLabel: 'Foo'
    }, {
      selectedLabel,
      numSelected: 3,
      groupLabel: 'Bar'
    }, {
      selectedLabel,
      numSelected: 1,
      groupLabel: 'Zap'
    }];
    const label = getLabelFromGroupCounts('mockDefault', groupCountList);
    expect(label).toBe('2 Foos, 3 Bars, ...');
  });

  test('should add an ellipsis when there are more than three groups with values', () => {
    const selectedLabel = 'Mock Selected';

    const groupCountList: GroupCount[] = [{
      selectedLabel,
      numSelected: 2,
      groupLabel: 'Foo'
    }, {
      selectedLabel,
      numSelected: 3,
      groupLabel: 'Bar'
    }, {
      selectedLabel,
      numSelected: 1,
      groupLabel: 'Zap'
    },
      {
        selectedLabel,
        numSelected: 1,
        groupLabel: 'Pow'
      }];
    const label = getLabelFromGroupCounts('mockDefault', groupCountList);
    expect(label).toBe('2 Foos, 3 Bars, ...');
  });
});
