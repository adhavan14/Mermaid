import { useState } from 'react'
import './App.css'
import MermaidPage from './pages/MermaidPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MermaidPage></MermaidPage>
    </>
  )
}

export default App
