import PropTypes from 'prop-types';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ toggleModal, children }) => {
  const onEsc = useCallback(
    event => {
      if (event.code === 'Escape') {
        toggleModal();
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', onEsc);

    return () => {
      window.removeEventListener('keydown', onEsc);
    };
  }, [onEsc]);

  const onOverlay = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={onOverlay}>
      <div>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
