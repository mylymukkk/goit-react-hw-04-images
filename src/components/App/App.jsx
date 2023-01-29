import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchPhoto } from 'services/api';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Searchbar } from '../Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
    totalHits: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (searchQuery === '') {
      return this.notificationInfo();
    }

    if (
      prevState.searchQuery !== searchQuery ||
      (prevState.page !== page && page !== 1)
    ) {
      this.setState({ isLoading: true });
      await fetchPhoto(searchQuery, page)
        .then(data => {
          if (data.hits.length === 0) {
            return this.notificationError();
          }
          this.setState(({ images }) => {
            return {
              images: [...images, ...data.hits],
              totalHits: data.totalHits,
            };
          });
        })

        .catch(error => {
          console.error(error);
        })

        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  resetState = () => {
    this.setState({ page: 1, images: [] });
  };

  increasePage = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const searchValue = form.elements.input.value.trim().toLocaleLowerCase();

    if (this.state.searchQuery !== searchValue) {
      this.resetState();
    }

    if (
      this.state.searchQuery === searchValue &&
      this.state.images.length > 12
    ) {
      this.setState(({ images }) => {
        const imagesFirstPage = images.splice(0, 12);
        return {
          images: imagesFirstPage,
          page: 1,
        };
      });
    }

    this.setState({ searchQuery: searchValue });
    form.reset();
  };

  notificationError = () =>
    toast.error('Nothing was found for your request :(', {
      autoClose: 1500,
    });

  notificationInfo = () =>
    toast.info('Write down your request!', {
      autoClose: 1500,
    });

  render() {
    const { images, isLoading, totalHits } = this.state;
    const showButton =
      images.length > 0 && images.length < totalHits && !isLoading;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length !== 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {showButton && <Button onClick={this.increasePage} />}
        <ToastContainer />
      </>
    );
  }
}
