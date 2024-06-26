import { configureStore } from '@reduxjs/toolkit'
import CalendarReducer from '../app/slices/calendar'
import moonphasesReducer from '@/app/slices/moonphases'

export const store = configureStore({
  reducer: {
    calendar: CalendarReducer,
    moonphases: moonphasesReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppStore = typeof store