import _pluralize from 'pluralize';

/**
 * This method wraps our third party pluralize library. This is done in preparation for the situation where we need to intercept certain
 * words and return something other than what the pluralize library would return.
 */
export function pluralize(word: string, count: number, inclusive?: boolean) {
  return _pluralize(word, count, inclusive);
}
