import { useEffect } from 'react';
import NoResults from './NoResults';
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import Photo from "./Photo";

const PhotoList = ({ handleQuery, title, photos }) => {
  const { query } = useParams();

  useEffect(() => {
    const searchQuery = query || title;
    handleQuery(searchQuery)
  },);

  const foundResults = () => {
    if (photos.length > 0) {
      return (
        <div className="photo-grid">
          {photos.map(photo => (
            <Photo
              key={photo.id}
              id={photo.id}
              server={photo.server}
              secret={photo.secret}
            />
          ))}
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
    farm: PropTypes.number.isRequired,
    server: PropTypes.string.isRequired,
    secret: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isHorizontal: PropTypes.bool
  }))
};

export default PhotoList;
