const APIKey = "f632b8f7-2990-4593-9768-584578b57697";

const cardsURL: string = "https://api.pokemontcg.io/v2/cards?q=name:";
const setURL: string = "https://api.pokemontcg.io/v2/cards?q=set.name:";

const getCards = async (parameter: number, term: string) => {
  let queryURL: string;

  if (parameter === 1) {
    queryURL = cardsURL + term;
  } else if (parameter === 2) {
    queryURL = setURL + term;
  } else {
    queryURL = "";
  }

  if (queryURL) {
    try {
      const res = await fetch(queryURL, {
        headers: {
          "X-Api-Key": APIKey,
        },
      });
      const data = await res.json();

      console.log(data);
    } catch (err: any) {
      console.error(err);
    }
  } else {
    console.error("Invalid request URL");
  }
};

export default getCards;
