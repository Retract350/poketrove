const APIKey = "f632b8f7-2990-4593-9768-584578b57697";

const getCards = async (parameter: string, name: string) => {
  try {
    const urlParams: string = "https://api.pokemontcg.io/v2/" + parameter;
    const url: string = name ? urlParams + "?q=name:" + name : urlParams;

    const res = await fetch(url, {
      headers: {
        "X-Api-Key": APIKey,
      },
    });

    let data = await res.json();
    console.log(data);
  } catch (err: any) {
    console.error(err.message);
  }
};

export default getCards;
