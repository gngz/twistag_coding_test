import uniqolor from 'uniqolor';

/**
 * Generates a random color.
 *
 * @return {string} The randomly generated color.
 */
export function generateRandomColor() {
  return uniqolor.random().color;
}
