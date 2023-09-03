const getSetsOnLoad = async () => {
  try {
    const res = await fetch("https://api.pokemontcg.io/v2/sets", {
      headers: {
        "X-Api-Key": "f632b8f7-2990-4593-9768-584578b57697",
      },
    });

    const returnObject = await res.json();
    const setArray: Array<any> = [];

    returnObject.data.forEach((el: any) => {
      setArray.push({
        id: el.id,
        name: el.name,
        releaseDate: el.releaseDate.substring(0, 4),
      });
    });

    console.log(setArray);
  } catch (error: any) {
    console.error(error.message);
  }
};

export default getSetsOnLoad;
