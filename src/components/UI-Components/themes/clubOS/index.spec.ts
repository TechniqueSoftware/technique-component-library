import clubOsTheme, { clubOSThemeConfig } from './index';

describe('clubOsTheme', () => {
  test('should match snapshot', () => {
    expect(clubOsTheme).toMatchSnapshot();
  });
});

describe('clubOsThemeConfig', () => {
  test('should match snapshot', () => {
    expect(clubOSThemeConfig).toMatchSnapshot();
  });
});
