import PropTypes from 'prop-types';

import css from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <div className={css.buttonContainer}>
      <button className={css.button} onClick={onClick} type="button">
        Load More
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
