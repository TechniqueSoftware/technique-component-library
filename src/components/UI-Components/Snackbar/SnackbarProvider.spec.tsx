import { shallow } from 'enzyme';
import * as React from 'react';
import { EnqueueSnackbarParams } from './SnackbarProvider';
import { SnackbarContentProps } from './SnackbarContent';
import { SnackbarProviderProps } from 'notistack';

type SnackbarProviderExportsType = {
  createSnackbarContentFactory(params: (SnackbarContentProps & { closeSnackbar: (key: number) => void })): (key: number) => any;
  SnackbarProvider: React.ComponentType<SnackbarProviderProps>;
  EnqueueSnackbarParams: EnqueueSnackbarParams;
  useSnackbar(): {
    closeSnackbar: (key?: any) => void;
    enqueueSnackbar: (params: EnqueueSnackbarParams) => (string | number)
  }
};

describe('SnackbarProvider', () => {

  let SnackbarProviderExports: SnackbarProviderExportsType;
  const enqueueSnackbar = jest.fn();
  beforeEach(() => {
    jest.mock('notistack', () => ({
      useSnackbar: jest.fn(() => ({
        enqueueSnackbar,
        closeSnackbar: jest.fn()
      }))
    }));
    SnackbarProviderExports = require('./SnackbarProvider');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('useSnackbar', () => {
    test('should return functions for closing and enqueueing snackbars', () => {
      const snackbarValues = SnackbarProviderExports.useSnackbar();
      expect(snackbarValues).toMatchSnapshot();
    });

    test('should call notistacks useSnackbar', () => {
      const snackbarValues = SnackbarProviderExports.useSnackbar();
      snackbarValues.enqueueSnackbar({
        autoHideDuration: 111,
        id: 'mockId',
        maxWidth: 666,
        message: 'mockMessage',
        onUndo: jest.fn(),
        variant: 'success'
      });

      const notistack = require('notistack');
      expect(notistack.useSnackbar.mock.calls).toMatchSnapshot('useSnackbar');
    });

    test('should call notistacks useSnackbar and enqueueSnackbar', () => {
      const snackbarValues = SnackbarProviderExports.useSnackbar();
      snackbarValues.enqueueSnackbar({
        autoHideDuration: 111,
        id: 'mockId',
        maxWidth: 666,
        message: 'mockMessage',
        onUndo: jest.fn(),
        variant: 'success'
      });

      const notistack = require('notistack');
      expect(notistack.useSnackbar().enqueueSnackbar.mock.calls).toMatchSnapshot('enqueue');
    });
  });

  describe('snackbarContentFactory', () => {
    test('should return a function that renders the Snackbar component with a key', () => {
      const createSnackbarContent = SnackbarProviderExports.createSnackbarContentFactory({
        id: 'mockId',
        'aria-describe-id': 'mockAria',
        className: 'mockClassName',
        maxWidth: 666,
        message: 'mockMessage',
        onClose: jest.fn(),
        onUndo: jest.fn(),
        variant: 'success',
        closeSnackbar: jest.fn()
      });

      const snackbarContent = createSnackbarContent(12345);

      const shallowWrapper = shallow(snackbarContent);
      const props = shallowWrapper.find('WithStyles(ForwardRef(SnackbarContent))').props();

      expect(props).toMatchSnapshot('props');
      expect(shallowWrapper.debug()).toMatchSnapshot('shallowWrapper');
    });
  });
});
