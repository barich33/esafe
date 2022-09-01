import { ApplicationReducer } from './appReducer/applicationReducer';
import { configureStore } from '@reduxjs/toolkit';

/**
 * Creates a Redux store that holds the complete state tree of the app
 * @param reducers reducer object passed to combineReducer
 */
export const store = configureStore({
  reducer: {
    application: ApplicationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
