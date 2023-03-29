import { company, lorem, name } from 'faker';

export function createRandomCompanyNameWordsArray(arraySize: number) {
  return createRandomWordArray(() => {
    return company.companyName();
  }, arraySize);
}

export function createRandomLoremIpsumWordsArray(arraySize: number) {
  return createRandomWordArray(() => {
    return lorem.word();
  }, arraySize);
}

export function createRandomNameWordsArray(arraySize: number): string[] {
  return createRandomWordArray(() => {
    return name.firstName();
  }, arraySize);
}

export function createRandomWordArray(wordGeneratorFunc: () => string, arraySize): string[] {
  const array = Array(arraySize).fill(null).map(wordGeneratorFunc);
  // Converting to and from a set to remove duplicates
  return Array.from<string>(new Set<string>(array));
}
