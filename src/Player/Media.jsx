import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import './Media.scss'




const Media = ({db}) => {

  const [itPlay, setItPlay] = useState(false);

  const audioPlayer = useRef();


  const togglePlayPause = () => {
    const prevValue = itPlay
    setItPlay(!prevValue)
    if(!prevValue) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }
console.log(db.list);
  return (
    <div className='media'>
      <audio ref={audioPlayer} src={require(`../music/${db.list[2].src}.mp3`)}></audio>
      <div className='media_main'>
        <div>duration 0.00</div>
        <img src={require(`../icon/${db.icon[0].backward}.png`)} alt="backward" />
        <img onClick={togglePlayPause} 
          src={itPlay ? require(`../icon/${db.icon[0].pause}.png`) : 
            require(`../icon/${db.icon[0].play}.png`)}
          alt="play" />
        <img src={require(`../icon/${db.icon[0].forward}.png`)} alt="forward" />
        <div>
          <input type="range" />
        </div>
        <div>duration 2.12</div>
      </div>
      <div className='media_timeline'>
        <input type="range" />
      </div>
    </div>
  )
}

export default Media