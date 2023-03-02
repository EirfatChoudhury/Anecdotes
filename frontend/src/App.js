import { useState } from 'react'
import { 
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams,
  useNavigate
} from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to={"/"} style={padding}>anecdotes</Link>
      <Link to={"/create"} style={padding}>create new</Link>
      <Link to={"/about"} style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, vote }) => {
  const handleVote = (id) => {
    console.log('button clicked')
    vote(id)
  }

  return(
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
          <li key={anecdote.id}>
            <Link to={`anecdotes/${anecdote.id}`} >{anecdote.content}</Link>
            <button onClick={() => handleVote(anecdote.id)}>Vote</button>
          </li>)}
      </ul>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(anecdote => anecdote.id === Number(id))
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Votes: {anecdote.votes}</p>
      <p>Info: {anecdote.info}</p>
      <p>Author: {anecdote.author}</p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.main.value,
      author: author.main.value,
      info: info.main.value,
      votes: 0
    })
    navigate('/')
  }

  const resetValues = (e) => {
    e.preventDefault()
    content.other.reset()
    author.other.reset()
    info.other.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.main} />
        </div>
        <div>
          author
          <input name='author' {...author.main} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.main} />
        </div>
        <button>create</button>
        <button onClick={resetValues}>reset</button>
      </form>
    </div>
  )
}

const Notification = ( {notification} ) => {
  return(
    <div>
      <p>{notification}</p>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`${anecdote.content} was successfully added!`)
    setTimeout(() => setNotification(''), 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    setNotification(`Voted for ${anecdote.content}`)
    setTimeout(() => setNotification(''), 5000)
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification}/>
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} vote={vote}/>} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
