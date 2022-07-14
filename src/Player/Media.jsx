// import React from 'react'
import { useRef, useState,useEffect } from 'react'
import './Media.scss'




const Media = ({db}) => {

  const [itPlay, setItPlay] = useState(false);
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const audioPlayer = useRef();
  const timelineBar = useRef()

  useEffect(()=> {
    const sec = Math.floor(audioPlayer.current.duration);
    setDuration(sec)
    timelineBar.current.max = sec 
  },[audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  const calculateTime = (sec) => {
    const min = Math.floor(sec / 60);
    const returnMin = min < 10 ? `0${min}` : `${min}`;
    const second = Math.floor(sec % 60);
    const returnSec = second < 10 ? `0${second}` : `${second}`
    return `${returnMin}:${returnSec}`
  }

  const togglePlayPause = () => {
    const prevValue = itPlay
    setItPlay(!prevValue)
    if(!prevValue) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  }

  const changeTimeline = () => {
    audioPlayer.current.currentTime = timelineBar.current.value;
    timelineBar.current.style.setProperty(`${timelineBar.current.value / duration * 100}%`)
    setCurrentTime(timelineBar.current.value)
  }



console.log(db.list);
  return (
    <div className='media'>
      <audio onLoadedMetadata={e => setDuration(e.target.duration)} ref={audioPlayer} src={require(`../music/${db.list[1].src}.mp3`)}></audio>
      <div className='media_main'>
        <div>{calculateTime(currentTime)}</div>
        <img src={require(`../icon/${db.icon[0].backward}.png`)} alt="backward" />
        <img onClick={togglePlayPause} 
          src={itPlay ? require(`../icon/${db.icon[0].pause}.png`) : 
            require(`../icon/${db.icon[0].play}.png`)}
          alt="play" />
        <img src={require(`../icon/${db.icon[0].forward}.png`)} alt="forward" />
        <div>
          <input type="range" />
        </div>
        <div>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
      </div>
      <div className='media_timeline'>
        <input defaultValue='0' type="range" ref={timelineBar} onChange={changeTimeline}/>
      </div>
    </div>
  )
}

export default Media