// This function takes in a nested structure as a parameter and returns an array of all numeric values
function deepFlattenAndExtract(input) {
    return (Array.isArray(input) ? input : Object.values(input)).reduce((res, item) => {
      if (typeof item === 'number') {
        return res.concat(item);
      } else if (Array.isArray(item) || (typeof item === 'object' && item !== null)) {
        return res.concat(deepFlattenAndExtract(item));
      }
      return res;
    }, []);
}

// This is the main testing function
function main() {
    const input = [
        1,
        [2, 3, {a: 4, b: "ignore"}],
        { c: 5, d: [6, { e: 7}] },
        "text",
        [8, [9, 10]]
    ];

    result = deepFlattenAndExtract(input);
    console.log(result);
}

main();