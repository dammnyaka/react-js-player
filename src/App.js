import "./App.scss"
import { useState } from 'react'
import db from './db.json'
import Media from './Player/Media.jsx';
import Container from './Player/Container.jsx'



function App() {
  
  const [currentSong, setCurrentSong] = useState(db.list[0]);

  return (
    <div className="App">
      <div  className="player">
        <Container db={db} currentSong={currentSong} setCurrentSong={setCurrentSong}/>
        <Media db={db} currentSong={currentSong} setCurrentSong={setCurrentSong}/>
      </div>
    </div>
  );
}

export default App;
