export enum RequestType {
  TRENDING = "trending",
  SEARCH = "search",
}

export type FecthType = {
  search?: string;
  offset?: number;
};

export const fetchGifs = async ({ search, offset }: FecthType) => {
  const type = search ? RequestType.SEARCH : RequestType.TRENDING;
  const offsetParam = offset ? `&offset=${offset * 25}` : "";
  const searchParam = search ? `&q=${search}` : "";

  const BASE_URL = `${process.env.REACT_APP_API_URL}/${type}?api_key=${process.env.REACT_APP_API_KEY}`;
  const PARAMS = `${offsetParam}${searchParam}`;

  try {
    const response = await fetch(BASE_URL + PARAMS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    return error;
  }
};
