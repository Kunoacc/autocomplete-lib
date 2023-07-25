type FuzzyResult = {
  target: string;
  score: number;
}

/**
 * This function is used to perform a fuzzy search on a given input.
 * A fuzzy search is a technique that locates values that are likely to be relevant 
 * to a search argument even when the argument does not exactly correspond to 
 * the desired information.
 * 
 * This is a watered down implementation of the fuzzy search algorithm.
 * 
 * @param input The search query to perform
 * @param data The data to perform the search on
 */
const fuzzySearch = (input: string, data: string[]) => {
  const results: Array<FuzzyResult> = [];

  for (const entry of data) {
    let relevanceScore = 0;
    for (const char of input) {
      if (!entry.includes(char)) continue;
      relevanceScore++;
    }

    results.push({ target: entry, score: relevanceScore });
  }

  const sortedResults = results.sort((a, b) => {
    return b.score - a.score;
  })
  .filter((result) => {
    return result.score > 0;
  })
  .map((result) => {
    return result.target;
  });

  return sortedResults;
}

/**
 * This function is used to perform a search on a given input.
 * @param input the search query to perform
 * @param data the data to perform the search on
 * @returns 
 */
export const search = (input: string, data: string[]) => {
  const matches = fuzzySearch(input, data);

  // separate exact matches from other matches, convert to lowercase because `includes` is case sensitive
  const exactMatches = matches.filter((item) => item.toLocaleLowerCase().includes(input));
  const otherMatches = matches.filter((item) => !item.toLocaleLowerCase().includes(input));

  // remove duplicates from the array
  const normalizedResults = new Set([...exactMatches, ...otherMatches]);

  return [...normalizedResults].slice(0, 10);
}