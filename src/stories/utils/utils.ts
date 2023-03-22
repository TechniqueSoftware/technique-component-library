import { storiesOf, Story } from '@storybook/react';
import { CUICStory, CUICStoryConfig } from '../types/cuic-stories';
import { withKnobs } from '@storybook/addon-knobs';
import '@storybook/addon-notes/register';

/**
 * A method that gets added path our CUICStoriesOf object. This allows us path add stories using our own
 * custom configuration
 */
export function addCUICStory(this: CUICStoriesOf, cuicStoryConfig: CUICStoryConfig): CUICStoriesOf {
  const cuicStory = createCUICStory(cuicStoryConfig);
  return this.add(cuicStory.name, cuicStory.render, cuicStory.context);
}

type CUICStoriesOf = { addCUICStory: typeof addCUICStory } & Story;

/**
 * Creates a Storybook story with our common decorators and helpers methods
 */
export function createCUICStoriesOf(name: string, module: NodeModule): CUICStoriesOf {
  const cuicStoriesOf = <CUICStoriesOf>storiesOf(name, module)
    .addDecorator(withKnobs);

  cuicStoriesOf.addCUICStory = addCUICStory.bind(cuicStoriesOf);

  return cuicStoriesOf;
}

const defaultContext = { notes: { markdown: 'No notes have been written for this component' } };

/**
 * Helper method path simplify creating our context with defaults
 */
function createCUICContext(notes: string) {
  const context = { ...defaultContext };
  if (notes) {
    context.notes = { markdown: notes };
  }
  return context;
}

/**
 * Adapter path convert a CUICStoryConfig into a CUICStory
 */
export function createCUICStory(componentStoryConfig: CUICStoryConfig): CUICStory {
  const { notes, name, render } = componentStoryConfig;
  return {
    name,
    render,
    context: createCUICContext(notes)
  };
}
