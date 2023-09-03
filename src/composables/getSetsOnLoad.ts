const setArray: Array<any> = [];

const getSetsOnLoad = async () => {
  try {
    const res = await fetch("https://api.pokemontcg.io/v2/sets", {
      headers: {
        "X-Api-Key": "f632b8f7-2990-4593-9768-584578b57697",
      },
    });

    const returnObject = await res.json();

    returnObject.data.forEach((el: any) => {
      setArray.push({
        id: el.id,
        name: el.name,
        releaseDate: el.releaseDate,
      });
    });

    console.log(setArray);

    // Sort setArray by date descending
    setArray.sort((a, b) =>
      a.releaseDate > b.releaseDate ? -1 : b.releaseDate > a.releaseDate ? 1 : 0
    );
  } catch (error: any) {
    console.error(error.message);
  }
};

export { getSetsOnLoad, setArray };
