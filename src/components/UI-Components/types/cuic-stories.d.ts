import { RenderFunction } from '@storybook/react';

export interface CUICStoryConfig {
  name: string;
  render: RenderFunction;
  notes: string;
}

export interface CUICStory {
  name: string;
  render: RenderFunction;
  context: { notes: { markdown: string } };
}
