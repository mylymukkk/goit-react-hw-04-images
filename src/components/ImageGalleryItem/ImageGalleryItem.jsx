import PropTypes from 'prop-types';

import { useState } from 'react';

import css from './ImageGalleryItem.module.css';
import styles from 'components/Modal/Modal.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ largeImage, alt, smallImage }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>
      <li className={css.imageGalleryItem} onClick={toggleModal}>
        <img
          className={css['imageGalleryItem-image']}
          src={smallImage}
          alt={alt}
        />
      </li>
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <img alt={alt} src={largeImage} className={styles.modalImage} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
