//@ts-nocheck
import { createCUICStoriesOf, createCUICStory } from './utils';
import { CUICStoryConfig } from '../types/cuic-stories';
import * as React from 'react';

describe('CUIC Utilities', () => {

  const notes = 'mockNotesFilePath';
  const cuicStoryConfig: CUICStoryConfig = {
    notes,
    name: 'mockName',
    render: () => <span>test</span>
  };

  describe('createCUICStoriesOf', () => {
    test('should create CUICStoriesOf and allow us path call addCUICStory without throwing an error', () => {
      const mockName = 'mockName';
      expect(() => {
        const CUICStoriesOf = createCUICStoriesOf(mockName, module);
        CUICStoriesOf.addCUICStory(cuicStoryConfig);
        //@ts-ignore
        expect(CUICStoriesOf.kind).toBe(mockName);
      }).not.toThrow();
    });
  });

  describe('createCUICStory', () => {
    test('should generate a CUICStory from configuration', () => {
      const cuicStory = createCUICStory(cuicStoryConfig);

      expect(cuicStory).toMatchSnapshot();
      expect(cuicStory.context.notes.markdown).toBe(notes);
      expect(cuicStory.render()).toMatchSnapshot('renderResult');
    });
  });

});
