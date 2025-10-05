import { configureStore } from "@reduxjs/toolkit"

import challengeReducer from './features/challenges/challengeSlice'

export const store = configureStore({
  reducer: {
    challenges: challengeReducer
  },
})