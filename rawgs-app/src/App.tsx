// Import necessary dependencies
import './App.css';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';
import Home from './pages/home/Home';
import Games from './pages/home/Games';

const apiKey = process.env.VITE_RAWG_API_KEY;
const rawgURL = 'https://api.rawg.io';

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

function App() {
  const [title, setTitle] = useState('New and Trending');
  const [searchResults, setSearchResults] = useState<Array<Game>>([]);
  const [searchString, setSearchString] = useState('');
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [searchUrl, setSearchUrl] = useState('');
  const [next, setNext] = useState(
    `${rawgURL}/api/games?key=${apiKey}&dates=2023-03-01,2023-05-31&platforms=18,1,7&page=2`
  );
  const [previous, setPreviousPage] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const fetchNext = async (nextPage: string, nextPageNumber: number) => {
    try {
      setPageNumber(nextPageNumber);
      // Make a GET request to the API endpoint
      const response = await fetch(`${nextPage}`);
      // Parse the response data as JSON
      const json = await response.json();
      // Update the state variable `searchResults` with the fetched data
      setSearchResults(json.results);
      setNext(json.next);
      setSearchUrl(json.next);
      setPreviousPage(json.previous);
    } catch (error) {
      // Log any errors that occur during the fetch
      console.log('error', error);
    }
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const fetchPrevious = async (
    previousPage: string,
    previousPageNumber: number
  ) => {
    try {
      setPageNumber(previousPageNumber);
      // Make a GET request to the API endpoint
      const response = await fetch(`${previousPage}`);
      // Parse the response data as JSON
      const json = await response.json();
      // Update the state variable `searchResults` with the fetched data
      setSearchResults(json.results);
      setNext(json.next);
      setSearchUrl(json.previous);
      setPageNumber(pageNumber - 1); // Decrement the page number for the previous page
      console.log(pageNumber);
      setPreviousPage(json.previous);
      console.log('fetchPrevious');
    } catch (error) {
      // Log any errors that occur during the fetch
      console.log('error', error);
    }
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const fetchPage = async (page: number) => {
    try {
      // Make a GET request to the API endpoint
      if (searchUrl) {
        const response = await fetch(`${searchUrl}&page=${page}`);
        // Parse the response data as JSON
        const json = await response.json();
        // Update the state variable `searchResults` with the fetched data
        setSearchResults(json.results);
        setNext(json.next);
        setPreviousPage(json.previous);
        setPageNumber(page);
        console.log(json.results);
      } else {
        const response = await fetch(
          `${rawgURL}/api/games?key=${apiKey}&dates=2023-03-01,2023-05-31&platforms=18,1,7&page=${page}`
        );
        // Parse the response data as JSON
        const json = await response.json();
        // Update the state variable `searchResults` with the fetched data
        setSearchResults(json.results);
        setNext(json.next);
        setPreviousPage(json.previous);
        setPageNumber(page);
        console.log(json.results);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
    } catch (error) {
      // Log any errors that occur during the fetch
      console.log('error', error);
    }
  };

  // Render the component
  const handleSearch = (search: string) => {
    setTitle(search);
    setPageNumber(1); // Reset the page number to 1 when performing a new search
    fetch(`${rawgURL}/api/games?key=${apiKey}&search=${search}`)
      .then((response) => response.json())
      .then((json) => {
        setSearchResults(json.results);
        setSearchString(search);
        setIsSearchComplete(true);
        setNext(json.next);
        setSearchUrl(
          `${rawgURL}/api/games?key=${apiKey}&search=${search}&page=${pageNumber}`
        );
      });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  // Function to handle pagination
  const handlePagination = () => {
    if (next) {
      fetch(next)
        .then((response) => response.json())
        .then((json) => {
          setSearchResults(json.results);
          setNext(json.next);
          setSearchUrl(json.next);
          setPageNumber(pageNumber + 1); // Increment the page number for the next page
        });
    }
  };

  const handleHomeButton = () => {
    setSearchResults([]); // Set searchResults to an empty array
    setTitle('New and Trending');
    setSearchString('');
    setIsSearchComplete(false);
    setSearchUrl('');
    setPageNumber(1);
    setNext(
      `${rawgURL}/api/games?key=${apiKey}&dates=2023-03-01,2023-05-31&platforms=18,1,7&page=2`
    );
  };

  const handleAllGames = () => {
    setSearchResults([]); // Set searchResults to an empty array
    setTitle('All Games');
    setSearchString('');
    setIsSearchComplete(false);
    setSearchUrl('');
    setPageNumber(1);
    setNext(`${rawgURL}/api/games?key=${apiKey}&page=2`);
  };

  return (
    <div className="App">
      <div className="logo"></div>
      <div className="search-bar-container">
        <SearchBar
          placeholder="Search through RAWG database"
          onSearch={handleSearch}
        />
      </div>
      <nav className="navBar">
        <Link to="/" className="navButton" onClick={handleHomeButton}>
          Home
        </Link>
        <br />
        <Link to="/games" className="navButton" onClick={handleAllGames}>
          All Games
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              title={title}
              searchResults={searchResults}
              searchString={searchString}
              isSearchComplete={isSearchComplete}
              searchUrl={searchUrl}
              next={next}
              previous={previous}
              pageNumber={pageNumber}
              handlePagination={handlePagination}
              fetchNext={fetchNext}
              fetchPrevious={fetchPrevious}
              fetchPage={fetchPage}
              handleHomeButton={handleHomeButton}
            />
          }
        />
        <Route
          path="/games"
          element={
            <Games
              title={'All Games'}
              searchResults={searchResults}
              searchString={searchString}
              isSearchComplete={isSearchComplete}
              searchUrl={searchUrl}
              next={next}
              previous={previous}
              pageNumber={pageNumber}
              handlePagination={handlePagination}
              fetchNext={fetchNext}
              fetchPrevious={fetchPrevious}
              handleAllGames={handleAllGames}
            />
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>404: Page Not Found</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat vitae
        debitis, rerum vel nemo placeat cumque quam libero beatae tempora unde
        at tempore quae iure autem rem obcaecati culpa? Iure?
      </p>
    </div>
  );
}

export default App;
