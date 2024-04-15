import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import NoResults from './NoResults';
import Photo from './Photo';

const PhotoList = ({ handleQuery, title, photos }) => {
  const { query } = useParams();

  React.useEffect(() => {
    const searchQuery = query || title;
    handleQuery(searchQuery);
  }, [query, title, handleQuery]);

  const foundResults = () => {
    if (photos.length > 0) {
      return (
        <div className="photo-container">
          <ul>
            {photos.map(photo => (
              <Photo
                key={photo.id}
                id={photo.id}
                server={photo.server}
                secret={photo.secret}
              />
            ))}
          </ul>
        </div>
      );
    } else {
      return <NoResults />;
    }
  };

  return (
    <div className="photo-container">
      <h2>Results for {query || title}</h2>
      {foundResults()}
    </div>
  );
};

PhotoList.propTypes = {
  title: PropTypes.string,
  handleQuery: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    server: PropTypes.string.isRequired,
    secret: PropTypes.string.isRequired,
  })),
};

export default PhotoList;
