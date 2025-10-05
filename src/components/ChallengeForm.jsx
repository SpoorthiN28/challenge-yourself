import { useState } from "react";
import { useDispatch } from "react-redux";
import { addChallenge } from '../redux/features/challenges/challengeSlice'
import { nanoid } from "nanoid";

const ChallengeForm = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();

    if (text.trim() === '') return;

    dispatch(addChallenge({
      id: nanoid(),
      text: text.trim(),
      completed: false,
    }))

    setText('')
  }

  return (
    <form id="new-challenge" onSubmit={handleSubmit}>
      <input
        id="challenge-title"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add new challenge"
      />
      <button id="addchallenge-button" type="submit">Add Challenge</button>
    </form>
  );
}

export default ChallengeForm