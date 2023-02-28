import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotifDispatch } from '../NotifContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const notifDispatch = useNotifDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length < 5) {
      notifDispatch({type: 'CHANGE', payload: `${content} not 5 characters or more`})
      setTimeout(() => {notifDispatch({type: 'HIDE'})}, 5000)
      console.log("Must be minimum 5 characters")
      return null
    }
    newAnecdoteMutation.mutate({content, votes: 0})
    notifDispatch({type: 'CHANGE', payload: `${content} successfully added`})
    setTimeout(() => {notifDispatch({type: 'HIDE'})}, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input placeholder='Min 5 characters' name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
