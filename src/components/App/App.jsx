import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchPhoto } from 'services/api';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Searchbar } from '../Searchbar/Searchbar';
import {
  notificationError,
  notificationInfo,
} from '../Notification/Notification';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    setIsLoading(true);

    fetchPhoto(searchQuery, page)
      .then(data => {
        if (data.hits.length === 0) {
          return notificationError();
        }

        setImages(prevState => [...prevState, ...data.hits]);
        setTotalHits(data.totalHits);
      })

      .catch(error => {
        console.error(error);
      })

      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery, page]);

  const resetState = () => {
    setPage(1);
    setImages([]);
  };

  const increasePage = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const searchValue = form.elements.input.value.trim().toLocaleLowerCase();

    if (searchValue === '') {
      notificationInfo();
    }

    if (
      searchValue !== searchQuery ||
      (searchValue === searchQuery && page !== 1)
    ) {
      resetState();
    }

    setSearchQuery(searchValue);
    form.reset();
  };

  const showButton =
    images.length > 0 && images.length < totalHits && !isLoading;

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {images.length !== 0 && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {showButton && <Button onClick={increasePage} />}
      <ToastContainer />
    </>
  );
};
