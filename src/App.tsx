import { useState } from 'react'
import seaLogo from './assets/sea.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://www.cs.cmu.edu/~bam/uicourse/830spring20/05-830-2020-03-Michael_Bernstein-SEA.pdf" target="_blank">
          <img src={seaLogo} className="logo sea" alt="SEA logo" />
        </a>
      </div>
      <h1>Vite + SEA</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and SEA logos to learn more
      </p>
    </>
  )
}

export default App
