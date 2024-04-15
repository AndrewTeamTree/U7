import { useState, useEffect, useCallback } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import apiKey from './config';
import PhotoList from './components/PhotoList';
import NotFound from './components/NotFound';
import Search from './components/Search';
import Nav from './components/Nav';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("Sk8er");
  const [isLoading, setIsLoading] = useState(false);

  const handleQuery = useCallback((searchQuery) => {
    setQuery(searchQuery);

  }, []);

  useEffect(() => {
    fetchData(query);
  }, [query]);

  useEffect(() => {

    const searchQuery = query;
    handleQuery(searchQuery);
  }, [query, handleQuery]);

  const fetchData = (query) => {
    setIsLoading(true);
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&sort=relevance&privacy_filter=1&safe_search=1&per_page=16&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        if (responseData.photos && responseData.photos.photo) {
          setPhotos(responseData.photos.photo);
        } else {
          throw new Error('Response data does not contain photos');
        }
      })
      .catch(error => {
        console.error('Error fetching and parsing data:', error);
      })
      .finally(() => {
        setIsLoading(false);

      });
  };

  return (
    <div>
      <Search handleQuery={handleQuery} />
      <Nav />
      {isLoading ? <p>Loading...</p> : (
        <Routes>
          <Route path="/" element={<Navigate to="/Sk8er" />} />
          <Route path="/Sk8er" element={<PhotoList photos={photos} title="Sk8er" handleQuery={handleQuery} />} />
          <Route path="/Maids" element={<PhotoList photos={photos} title="Maids" handleQuery={handleQuery} />} />
          <Route path="/Handymen" element={<PhotoList photos={photos} title="Handymen" handleQuery={handleQuery} />} />
          <Route path="/search/:query" element={<PhotoList photos={photos} title="Search Results" handleQuery={handleQuery} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
