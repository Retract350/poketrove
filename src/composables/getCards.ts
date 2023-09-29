import { APIKey } from "./variables";

// URLs for fetch requests
const cardsURL: string = "https://api.pokemontcg.io/v2/cards?q=name:";
const setURL: string = "https://api.pokemontcg.io/v2/cards?q=set.id:";

let cardsArr: Array<any> = [];

const getCards = async (cards: Boolean, term: string) => {
  let data: any;
  let queryURL: string;
  let error: string;

  // Reset cards array between fetch requests
  cardsArr = [];

  // Check if user is searching card name
  if (cards) {
    queryURL = cardsURL + term;
  }
  // Check if user is searching by set name
  else if (!cards) {
    // Replace all spaces in search for sets
    let setParam = term.replace(/\s/g, "");
    queryURL = setURL + setParam;
  } else {
    queryURL = "";
  }

  // Verify that queryURL is set before initiating request
  if (queryURL) {
    try {
      const res = await fetch(queryURL, {
        headers: {
          "X-Api-Key": APIKey,
        },
      });
      data = await res.json();

      console.log(data);

      // Push cards into cardsArr if there was no error from API
      if (!data.error) {
        data.data.forEach((entry: any) => {
          // Set card object properties when pushing object
          cardsArr.push({
            id: entry.id,
            images: entry.images,
            name: entry.name,
            number: entry.number,
            setDetails: entry.set,
            pricing: {
              nonHolo: entry?.tcgplayer?.prices?.normal?.market,
              reverseHolo: entry?.tcgplayer?.prices?.reverseHolofoil?.market,
              holo: entry?.tcgplayer?.prices?.holofoil?.market,
              firstEditionHolo:
                entry?.tcgplayer?.prices?.["1stEditionHolofoil"]?.market,
              unlimitedHolo:
                entry?.tcgplayer?.prices?.unlimitedHolofoil?.market,
            },
            tcgplayer: entry?.tcgplayer?.url,
            subtypes: entry.subtypes,
            rarity: entry.rarity,
          });
        });
      }
    } catch (err: any) {
      console.error(err);
    }
  } else {
    console.error("Invalid request URL");
  }

  // Check if more than 250 card results
  if (data.totalCount > 250) {
    // Since API only returns 250 cards at most, need to repeat the fetch request for the rest of the data
    // Determine how many MORE requests need to be sent to receive all data
    let totalReq = Math.ceil(data.totalCount / 250) - 1;

    // Repeat request as many times as necessary to retrieve all cards
    for (let i = 1; i <= totalReq; i++) {
      try {
        let pageNumber = i;
        pageNumber++;

        queryURL = queryURL + "&page=" + pageNumber;

        const res = await fetch(queryURL, {
          headers: {
            "X-Api-Key": APIKey,
          },
        });

        const nextData = await res.json();

        // Push resulting cards to cardsArr
        nextData.data.forEach((entry: any) => {
          cardsArr.push({
            id: entry.id,
            images: entry.images,
            name: entry.name,
            number: entry.number,
            setDetails: entry.set,
            pricing: {
              nonHolo: entry?.tcgplayer?.prices?.normal?.market,
              reverseHolo: entry?.tcgplayer?.prices?.reverseHolofoil?.market,
              holo: entry?.tcgplayer?.prices?.holofoil?.market,
              firstEditionHolo:
                entry?.tcgplayer?.prices?.["1stEditionHolofoil"]?.market,
              unlimitedHolo:
                entry?.tcgplayer?.prices?.unlimitedHolofoil?.market,
            },
            tcgplayer: entry?.tcgplayer?.url,
            subtypes: entry.subtypes,
            rarity: entry.rarity,
          });
        });
      } catch (err: any) {
        console.error(err.message);
      }
    }
  }

  console.log(cardsArr);
  // Return cardsArr for searchCards component to prop down to cardsList component
  return cardsArr;
};

export { getCards };
