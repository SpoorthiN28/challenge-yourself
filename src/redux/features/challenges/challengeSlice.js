import { createSlice } from '@reduxjs/toolkit'

const loadChallengeFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('demoChallenges')
    return data ? JSON.parse(data) : []
  } catch (error) {
    return []
  }
}

const saveChallengeToLocalStorage = (challenges) => {
  localStorage.setItem("demoChallenges", JSON.stringify(challenges))
}

const challengeSlice = createSlice({
  name: 'challenges',
  initialState: {
    challenges: loadChallengeFromLocalStorage(),
    filter: {
      status: 'all',
      search: ''
    }
  },
  reducers: {
    addChallenge: (state, action) => {
      state.challenges.push(action.payload);
      saveChallengeToLocalStorage(state.challenges)
    },
    deleteChallenge: (state, action) => {
      state.challenges = state.challenges.filter(challenge => challenge.id !== action.payload);
      saveChallengeToLocalStorage(state.challenges)
    },
    toggleComplete: (state, action) => {
      const challenge = state.challenges.find(t => t.id === action.payload);
      if (challenge) challenge.completed = !challenge.completed;
      saveChallengeToLocalStorage(state.challenges)
    },
    editChallenge: (state, action) => {
      const { id, newText } = action.payload;
      const challenge = state.challenges.find(t => t.id === id);
      if (challenge) challenge.text = newText;
      saveChallengeToLocalStorage(state.challenges)
    },
    setStatusFilter: (state, action) => {
      state.filter.status = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.filter.search = action.payload;
    },
  },
})

export const { addChallenge, deleteChallenge, toggleComplete, editChallenge, setStatusFilter, setSearchFilter } = challengeSlice.actions;

export default challengeSlice.reducer