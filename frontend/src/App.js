import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotifDispatch } from './NotifContext'

const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
  
  const notifDispatch = useNotifDispatch()

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    notifDispatch({type:'CHANGE', payload: `Voted for ${anecdote.content}`})
    setTimeout(() => {notifDispatch({type: 'HIDE'})}, 5000)
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: false
  })
  console.log(result)
  if ( result.isSuccess === false ) {
    return <div>Anecdotes could not be loaded</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {[...anecdotes].map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
