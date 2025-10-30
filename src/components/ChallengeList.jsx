import { useState } from "react";
import { deleteChallenge, editChallenge, setSearchFilter, setStatusFilter, toggleComplete } from "../redux/features/challenges/challengeSlice";
import { useDispatch, useSelector } from "react-redux";

const ChallengeList = () => {
  const { filter, challenges } = useSelector((state) => state.challenges)

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const dispatch = useDispatch()

  const filteredChallenge = challenges.filter(challenge => {
    if (filter.status === 'completed') return challenge.completed;
    if (filter.status === 'pending') return !challenge.completed;
    return true;
  }).filter(challenge => challenge.text.toLowerCase().includes(filter.search.toLowerCase()))

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  }

  const handleSave = (id) => {
    if (editText.trim()) {
      dispatch(editChallenge({ id, newText: editText.trim() }))
      setEditId(null);
      setEditText('');
    }
  }
  return (
    <div>
      <div>
        <input
          id="search-challenge"
          type="text"
          placeholder="Search challenge"
          value={filter.search}
          onChange={(event) => dispatch(setSearchFilter(event.target.value))}
        />
      </div>




      <ul id="challenge-list">
        <div id="tabs">
          {
            ['all', 'completed', 'pending'].map((status, index) => (
              <li key={index}>
                <button
                  onClick={() => dispatch(setStatusFilter(status))}
                  id={(filter.status === status ? "tabs-button" : 'tabs-inactive')}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              </li>
            ))
          }
        </div>


        {filteredChallenge.length === 0 && <p>No challenges found.</p>}
        {
          filteredChallenge.map(challenge => (
            <li key={challenge.id} id="check-list">
              <div id="check-box">
                <input
                  type="checkbox"
                  checked={challenge.completed}
                  onChange={() => dispatch(toggleComplete(challenge.id))}
                />
                {
                  editId === challenge.id ? (
                    <input type="text" value={editText} onChange={(event) => setEditText(event.target.value)} />
                  ) : (
                    <span id={challenge.completed ? 'challenge-complete' : ''}>{challenge.text}</span>
                  )
                }
              </div>

              <div id='challenge-buttons'>
                {
                  editId === challenge.id ? (
                    <button
                      id="save-button"
                      onClick={() => handleSave(challenge.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      id="edit-button"
                      onClick={() => handleEdit(challenge.id, challenge.text)}
                    >
                      Edit
                    </button>
                  )
                }
                <button
                  id="delete-button"
                  onClick={() => dispatch(deleteChallenge(challenge.id))}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default ChallengeList