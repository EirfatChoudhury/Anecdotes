import { useSelector, useDispatch } from "react-redux";
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const byVotes = (b1, b2) => b2.votes - b1.votes
    const anecdotes = useSelector(({filterSearch, anecdotes}) => {
      if (filterSearch !== '') {
        const regex = new RegExp( filterSearch, 'i' )
        return anecdotes.filter(anecdote => anecdote.content.match(regex))
      }
      return anecdotes
    })

    const vote = async anecdote => {
      dispatch(voteFor(anecdote))
      dispatch(setNotification(`Voted for ${anecdote.content}`))
    }

    return (
        <div>
          {[...anecdotes].sort(byVotes).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
      )
}

export default AnecdoteList