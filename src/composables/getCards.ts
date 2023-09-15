const APIKey = "f632b8f7-2990-4593-9768-584578b57697";

const cardsURL: string = "https://api.pokemontcg.io/v2/cards?q=name:";
const setURL: string = "https://api.pokemontcg.io/v2/cards?q=set.id:";

let cardsArr: Array<any> = [];

const getCards = async (cards: Boolean, term: string) => {
  let data: any;
  let queryURL: string;

  cardsArr = [];

  // Construct query URL based on searching cards or sets
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

  // Send fetch request
  if (queryURL) {
    try {
      const res = await fetch(queryURL, {
        headers: {
          "X-Api-Key": APIKey,
        },
      });
      data = await res.json();

      console.log(data);
      // push cards into cardsArr
      data.data.forEach((entry: any) => {
        // cardsArr.push({
        //   id: entry.id,
        //   images: entry.images,
        //   name: entry.name,
        //   number: entry.number,
        //   setDetails: entry.set,
        //   pricing: entry.tcgplayer,
        // });
        cardsArr.push({
          id: entry.id,
          images: entry.images,
          name: entry.name,
          number: entry.number,
          setDetails: entry.set,
          pricing: {
            nonHolo: entry.tcgplayer?.prices?.normal?.market,
            reverseHolo: entry.tcgplayer?.prices?.reverseHolofoil?.market,
            holo: entry.tcgplayer.prices?.holofoil?.market,
            firstEditionHolo:
              entry.tcgplayer?.prices?.["1stEditionHolofoil"]?.market,
            unlimitedHolo: entry.tcgplayer?.prices?.unlimitedHolofoil?.market,
          },
        });
      });
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
        // Push to cardsArr
        nextData.data.forEach((entry: any) => {
          // cardsArr.push({
          //   id: entry.id,
          //   images: entry.images,
          //   name: entry.name,
          //   number: entry.number,
          //   details: entry.set,
          //   pricing: entry.tcgplayer,
          // });
          cardsArr.push({
            id: entry.id,
            images: entry.images,
            name: entry.name,
            number: entry.number,
            setDetails: entry.set,
            pricing: {
              nonHolo: entry.tcgplayer?.prices?.normal?.market,
              reverseHolo: entry.tcgplayer?.prices?.reverseHolofoil?.market,
              holo: entry.tcgplayer?.prices?.holofoil?.market,
              firstEditionHolo:
                entry.tcgplayer?.prices?.["1stEditionHolofoil"]?.market,
              unlimitedHolo: entry.tcgplayer?.prices?.unlimitedHolofoil?.market,
            },
          });
        });
      } catch (err: any) {
        console.error(err.message);
      }
      console.log(totalReq);
    }
  }

  console.log(cardsArr);
  return cardsArr;
};

export { getCards };
