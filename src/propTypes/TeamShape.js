import PropTypes from "prop-types";

export default PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    abbreviation: PropTypes.string,
    city: PropTypes.string,
    conference: PropTypes.string,
    division: PropTypes.string,
    full_name: PropTypes.string,
    name: PropTypes.string,
  })
);
