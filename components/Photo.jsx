import PropTypes from 'prop-types';


const Photo = ({ server, id, secret }) => {
  return (
    <li>
      <img src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`} alt="" />
    </li>
  );
}

Photo.propTypes = {
  server: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  secret: PropTypes.string.isRequired
};

export default Photo;
