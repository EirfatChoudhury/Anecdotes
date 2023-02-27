import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initialiseAnecdotes } from './reducers/anecdoteReducer'
import AnedoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterBar from './components/FilterBar'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => dispatch(initialiseAnecdotes()), [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterBar />
      <AnecdoteList />
      <AnedoteForm />
    </div>
  )
}

export default App