import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import styles from 'components/Modal/Modal.module.css';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => {
      return { showModal: !showModal };
    });
  };

  render() {
    const { largeImage, alt, smallImage } = this.props;
    return (
      <>
        <li className={css.imageGalleryItem} onClick={this.toggleModal}>
          <img
            className={css['imageGalleryItem-image']}
            src={smallImage}
            alt={alt}
          />
        </li>
        {this.state.showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img alt={alt} src={largeImage} className={styles.modalImage} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
