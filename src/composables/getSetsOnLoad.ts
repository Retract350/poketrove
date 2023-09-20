import { APIKey } from "./variables";

const setArray: Array<any> = [];

const getSetsOnLoad = async () => {
  // Verify that setArray has not already been populated
  if (!setArray.length) {
    try {
      const res = await fetch("https://api.pokemontcg.io/v2/sets", {
        headers: {
          "X-Api-Key": APIKey,
        },
      });

      const returnObject = await res.json();

      // Push set objects to setArray with necessary properties only
      returnObject.data.forEach((el: any) => {
        setArray.push({
          id: el.id,
          name: el.name,
          releaseDate: el.releaseDate,
        });
      });

      // Sort setArray by date descending
      setArray.sort((a, b) =>
        a.releaseDate > b.releaseDate
          ? -1
          : b.releaseDate > a.releaseDate
          ? 1
          : 0
      );
    } catch (error: any) {
      console.error(error.message);
    }
  } else {
    return setArray;
  }
};

export { getSetsOnLoad, setArray };
