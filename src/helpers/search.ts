type FuzzyResult = {
  target: string;
  score: number;
}

/**
 * This function is used to perform a fuzzy search on a given input.
 * A fuzzy search is a technique that locates values that are likely to be relevant 
 * to a search argument even when the argument does not exactly correspond to 
 * the desired information.
 * @param input 
 * @param data 
 */
export const fuzzySearch = (input: string, data: string[]) => {
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
  .slice(0, 10)
  .map((result) => {
    return result.target;
  });

  return sortedResults;
}

/**
 * This function is used to perform a search on a given input.
 * @param input 
 * @param data 
 * @returns 
 */
export const search = (input: string, data: string[]) => {
  const matches = fuzzySearch(input, data);

  const exactMatches = matches.filter((item) => item.includes(input));
  const otherMatches = matches.filter((item) => !item.includes(input));

  // remove duplicates from the array
  const normalizedResults = new Set([...exactMatches, ...otherMatches]);

  return [...normalizedResults];
}