import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";

import Gif from "./components/Gif";
import Search from "./components/Search";
import Loading from "./components/Loading";
import Pagination from "./components/Pagination";

import { fetchGifs, FecthType } from "./utils/api";

import { Container, Message } from "./styles/app";

enum AppStatusEnum {
  LOADING = "loading",
  EMPTY = "empty",
  HAS_DATA = "hasData",
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const App = () => {
  const initialCurrentPage = 1;
  const [appStatus, setAppStatus] = useState<AppStatusEnum>(
    AppStatusEnum.LOADING
  );
  const [gifs, setGifs] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);

  useEffect(() => {
    setGifs([]);
    setAppStatus(AppStatusEnum.LOADING);

    const isThereAnyGif = (gifs: Array<any>) => gifs.length !== 0;

    const getGifs = async ({ search, offset }: FecthType) => {
      const response = await fetchGifs({
        search,
        offset,
      });

      setGifs(response.data);
      setAppStatus(
        isThereAnyGif(response.data)
          ? AppStatusEnum.HAS_DATA
          : AppStatusEnum.EMPTY
      );
    };

    getGifs({
      search: inputValue,
      offset: currentPage,
    });
  }, [currentPage, inputValue, setGifs, setAppStatus]);

  return (
    <Container>
      <Search placeholder="Search all GIFs" onchange={setInputValue} />

      {appStatus === AppStatusEnum.LOADING && <Loading />}

      {appStatus === AppStatusEnum.EMPTY ? (
        <Message>No GIFs found for {inputValue} :(</Message>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {gifs.map((gif: any, index: number) => {
            return (
              <Gif
                key={index}
                embedUrl={gif.embed_url}
                imageURL={gif.images.preview_webp.url}
                alt={gif.title}
              />
            );
          })}
        </Masonry>
      )}

      {appStatus === AppStatusEnum.HAS_DATA && (
        <Pagination
          length={10}
          currentPage={currentPage}
          onClick={setCurrentPage}
        />
      )}
    </Container>
  );
};

export default App;
