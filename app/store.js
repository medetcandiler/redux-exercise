import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/usersSlice/usersSlice';
import formReducer from './features/formSlice/formSlice';


export default configureStore({
  reducer: {
    users: usersReducer,
    form: formReducer
  },
});
