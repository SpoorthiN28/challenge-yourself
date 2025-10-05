import ChallengeForm from '../components/ChallengeForm'
import ChallengeList from '../components/ChallengeList'

function App() {
  return (
    <div id='main-header'>
      <h1>Your Challenges</h1>
      <ChallengeForm />
      <ChallengeList />
    </div>
  )
}

export default App
