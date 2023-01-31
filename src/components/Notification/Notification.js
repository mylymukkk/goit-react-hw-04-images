import { toast } from 'react-toastify';

export const notificationError = () =>
  toast.error('Nothing was found for your request :(', {
    autoClose: 1500,
  });

export const notificationInfo = () =>
  toast.info('Write down your request!', {
    autoClose: 1500,
  });
