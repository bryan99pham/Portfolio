// Import necessary dependencies
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlaystation,
  faSteam,
  faXbox,
} from '@fortawesome/free-brands-svg-icons';
import './Home.css';

const apiKey = process.env.VITE_RAWG_API_KEY;
const rawgURL = 'https://api.rawg.io';

function Pagination(count: number) {
  const pageList = [];
  for (let i = 1; i <= Math.ceil(count / 20); i++) {
    pageList.push(i);
  }
  return pageList;
}

interface Game {
  background_image: string;
  name: string;
  released: string;
  id: number;
  genres: Genre[];
  stores: Store[];
}

// interface PaginationInfo {
//   count: number;
//   next: string;
//   previous: string;
// }

interface Genre {
  id: number;
  name: string;
  slug: string;
}

interface Store {
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
  };
}

function Home({
  title,
  searchResults,
  searchString,
  isSearchComplete,
  next,
  previous,
  pageNumber,
  fetchNext,
  fetchPrevious,
  fetchPage,
} : {
  title: string;
  searchResults: Array<Game>;
  searchString: string;
  isSearchComplete: boolean;
  next: string;
  previous: string;
  searchUrl: string;
  pageNumber: number;
  handlePagination: () => void;
  fetchNext: (nextPage:string, nextPageNumber: number) => void;
  fetchPrevious: (previousPage:string, previousPageNumber: number) => void;
  fetchPage: (page:number) => void;
  handleHomeButton: () => void;
}) {
  // Initialize state variable named games and a function named setGames that can be used to update the value of games
  // const [games, setGames] = useState([])
  const [games, setGames] = useState<Array<Game>>([]);
  // const [searchGames, setSearchGames] = useState<Array<Game>>([]);
  // const [nextPage, setNextPage] = useState('');
  // const [previousPage, setPreviousPage] = useState('');
  const [count, setCount] = useState(0);
  // const [url, setUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Define an async function to fetch data and update the state
  const fetchData = async () => {
    try {
      // Make a GET request to the API endpoint
      const response = await fetch(
        `${rawgURL}/api/games?key=${apiKey}&dates=2023-03-01,2023-05-31&platforms=18,1,7`
      );
      // Parse the response data as JSON
      const json = await response.json();
      // Update the state variable `games` with the fetched data
      setGames(json.results);
      // setNextPage(json.next);
      setCount(json.count);
      // setUrl(
      //   `${rawgURL}/api/games?key=${apiKey}&dates=2023-03-01,2023-05-31&platforms=18,1,7`
      // );
    } catch (error) {
      // Log any errors that occur during the fetch
      console.log('error', error);
    }
  };

  const handleNextPage = () => {
    fetchNext(next, currentPage+1);
    setCurrentPage(pageNumber+1);
  };

  const handlePreviousPage = () => {
    fetchPrevious(previous, currentPage-1);
    setCurrentPage(pageNumber-1);
  };

  const handleFetchPage = (page:number) => {
    fetchPage(page);
    setCurrentPage(page);
  }

  // Use the `useEffect` hook to fetch data from rawg API when the component mounts
  useEffect(() => {
    fetchData();
    setCurrentPage(1);
  }, []);

  // Render the component
  return (
    <div>
      <div className="container">
        <div className="pageHeader">
          {searchResults.length > 0 && isSearchComplete ? (
            <h1 className="pageTitle">Search: {searchString}</h1>
          ) : searchResults.length === 0 && isSearchComplete ? (
            <div className="error">
              <h1>No Results: {searchString}</h1>
            </div>
          ) : (
            <h1 className="pageTitle">{title}</h1>
          )}
        </div>
        <div className="dropDown">
          <select name="cars" id="cars">
            <option value="Relevance">Relevance</option>
            <option value="Date Added">Date Added</option>
            <option value="Name">Name</option>
            <option value="Release Date">Release Date</option>
            <option value="Popularity">Popularity</option>
            <option value="Average Rating">Average Rating</option>
          </select>
        </div>
        {/* Map over the `games` array and render a card for each game */}
        <div className="cardGrid">
          {(searchResults.length > 0 ? searchResults : games).map(
            (game: Game) => (
              <div className="card" key={game.name}>
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="card-image"
                />
                <div className="store-icon-container">
                  {game.stores != null
                    ? game.stores.map((store: Store) =>
                        store.store.name === 'PlayStation Store' ? (
                          <FontAwesomeIcon
                            className="store-icon"
                            key={store.store.name}
                            icon={faPlaystation}
                            size="lg"
                          />
                        ) : store.store.name === 'Steam' ? (
                          <FontAwesomeIcon
                            className="store-icon"
                            key={store.store.name}
                            icon={faSteam}
                            size="lg"
                          />
                        ) : store.store.name === 'Nintendo Store' ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            key={store.store.name}
                            width="16"
                            height="16"
                            viewBox="0 -3 25 25"
                            className="store-icon"
                          >
                            <path
                              fill="currentColor"
                              d="M0 .6h7.1l9.85 15.9V.6H24v22.8h-7.04L7.06 7.5v15.9H0V.6"
                            />
                          </svg>
                        ) : store.store.name === 'Xbox Store' ? (
                          <FontAwesomeIcon
                            className="store-icon"
                            key={store.store.name}
                            icon={faXbox}
                            style={{ color: '#ffffff' }}
                            size="lg"
                          />
                        ) : null
                      )
                    : null}
                </div>
                <div className="card-title-container">
                  <a
                    href={rawgURL + '/api/games/' + game.id + '?key=' + apiKey}
                    className="card-title"
                  >
                    {game.name}
                  </a>
                </div>
                <div className="card-content">
                  <p className="card-body">Release Date: {game.released}</p>
                  <p>Genres:</p>
                  <ul className="card-body">
                    {game.genres.map((genre: Genre) => (
                      <li key={genre.name}>{genre.name}</li>
                    ))}
                  </ul>
                  <a href="google.com" className="button">
                    Show more games like this
                  </a>
                </div>
              </div>
            )
          )}
        </div>
        <div className="pagination">
          {previous &&
            (next === '' ? (
              <button
                className="pagination-button"
                id="previous"
                onClick={() => handlePreviousPage()}
              >
                Previous
              </button>
            ) : (
              <button
                className="pagination-button"
                id="previous"
                onClick={() => handlePreviousPage()}
              >
                Previous
              </button>
            ))}
          {!isSearchComplete ? (Pagination(count).map((page: number) => (
            <button
              key={page}
              className={page === pageNumber ? 'active' : ''}
              onClick={() => handleFetchPage(page)}
            >
              {page}
            </button>
          ))) : ( null )}
          {next &&
            (next === '' ? (
              <button
                className="pagination-button"
                id="next"
                onClick={() => handleNextPage()}
              >
                Next
              </button>
            ) : (
              <button
                className="pagination-button"
                id="next"
                onClick={() => handleNextPage()}
              >
                Next
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
