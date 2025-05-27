import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './css/App.css'
import MovieCard from './components/Moviecard'
import Home from './pages/Home'
import {Routes, Route} from "react-router-dom"
import Favourites from './pages/Favourites'
import NavBar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <MovieProvider>
      <NavBar/>
      <main className='main-content'>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />

        </Routes>
        {/* <Text display="Hi"/> {/*does not need to end inline*/}
        {/* <Text display = "Wassup"/>
        <MovieCard movie={{title: "Tim'sFilm", releasedate:"2024"}}></MovieCard> */} 
        {/* <Home/> */}
      </main>
    </MovieProvider>
  )
}

function Text({display}){ //thing in braces is a props or property
  return(
    <div> 
      <p>
        {display}
      </p>
    </div>
  );
}

export default App
