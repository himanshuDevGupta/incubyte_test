function add(numbers) {
   if (!numbers) return 0;

  let delimiter = /,|\n/; // default delimiters: comma or newline
  let numberString = numbers;

  // Custom delimiter support
  if (numbers.startsWith("//")) {
    const delimiterMatch = numbers.match(/^\/\/(.+)\n/);
    if (delimiterMatch) {
      let customDelimiter = delimiterMatch[1];

      // Support delimiters in brackets: //[***]\n1***2***3
      if (customDelimiter.startsWith("[") && customDelimiter.endsWith("]")) {
        const delimiters = customDelimiter
          .match(/\[([^\]]+)\]/g)
          .map(d => d.slice(1, -1).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
        delimiter = new RegExp(delimiters.join("|"), "g");
      } else {
        // Single character delimiter
        delimiter = new RegExp(customDelimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
      }

      numberString = numbers.slice(delimiterMatch[0].length);
    }
  }

   const numArray = numberString.split(delimiter).map(n => parseInt(n, 10)).filter(n => !isNaN(n));
  const negatives = numArray.filter(n => n < 0);
 if (negatives.length > 0) {
    throw new Error("negative numbers not allowed: " + negatives.join(","));
  }

  return numArray.reduce((sum, num) => sum + num, 0);

  
}
