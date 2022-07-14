import "./App.scss"
import {useState} from 'react'
import db from './db.json'
import Media from './Player/Media.jsx';
import Container from './Player/Container.jsx'



function App() {
  //state
  // const [isPlay, setIsPlay] = useState(false);
  // const [currentSong, setCurrentSong] = useState(db.list[0])



  return (
    <div className="App">
      <div  className="player">
        <Container/>
        <Media db={db}/>
      </div>
    </div>
  );
}

export default App;
