const APIKey = "f632b8f7-2990-4593-9768-584578b57697";

const cardsURL: string = "https://api.pokemontcg.io/v2/cards?q=name:";
const setURL: string = "https://api.pokemontcg.io/v2/cards?q=set.id:";

const getCards = async (cards: Boolean, term: string) => {
  let data: any;
  let queryURL: string;

  if (cards) {
    queryURL = cardsURL + term;

    console.log(queryURL);
  } else if (!cards) {
    let setParam = term.replace(/\s/g, "");
    queryURL = setURL + setParam;

    console.log(queryURL);
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
      data = await res.json();

      console.log(data);
    } catch (err: any) {
      console.error(err);
    }
  } else {
    console.error("Invalid request URL");
  }

  // Check if more than 250 card results
  if (data.totalCount > 250) {
    console.log(data);
    // Determine how many MORE requests need to be sent to receive all data
    let totalReq = Math.ceil(data.totalCount / 250) - 1;

    for (let i = 1; i <= totalReq; i++) {
      try {
        let pageNumber = i;
        pageNumber++;

        queryURL = queryURL + "&page=" + pageNumber;

        console.log(pageNumber, i);

        const res = await fetch(queryURL, {
          headers: {
            "X-Api-Key": APIKey,
          },
        });

        const nextData = await res.json();
        console.log(nextData);
      } catch (err: any) {
        console.error(err.message);
      }

      console.log(totalReq);
    }
  }
};

export default getCards;
