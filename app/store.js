import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './features/usersSlice/usersSlice';
import formSlice from './features/formSlice/formSlice';

export default configureStore({
  reducer: {
    users: usersSlice,
    form: formSlice
  },
});
