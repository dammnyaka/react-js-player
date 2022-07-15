// import React from 'react'
import { useRef, useState,useEffect } from 'react'
import './Media.scss'




const Media = ({db}) => {

  const [itPlay, setItPlay] = useState(false);
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const audioPlayer = useRef();
  const timelineBar = useRef();
  const animationRef = useRef();

  useEffect(()=> {
    const sec = Math.floor(audioPlayer.current.duration);
    setDuration(sec);
    timelineBar.current.max = sec;
    
  },[audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  const calculateTime = (sec) => {
    const min = Math.floor(sec / 60);
    const returnMin = min < 10 ? `0${min}` : `${min}`;
    const second = Math.floor(sec % 60);
    const returnSec = second < 10 ? `0${second}` : `${second}`
    return `${returnMin}:${returnSec}`
  }

  const togglePlayPause = () => {
    // const prevValue = itPlay
    setItPlay(!itPlay)
    if(!itPlay) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(itPlayback);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const itPlayback = () => {
    timelineBar.current.value = audioPlayer.current.currentTime;
    animationRef.current = requestAnimationFrame(itPlayback);
    changePlayTime();
  }

  const changeTimeline = () => {
    audioPlayer.current.currentTime = timelineBar.current.value;
    changePlayTime();
  }

  const changePlayTime = () => {
    timelineBar.current.style.setProperty('--width',`${timelineBar.current.value / duration * 100}%`);
    setCurrentTime(timelineBar.current.value);
  }

  const backwardTime = () => {
    timelineBar.current.value = Number(timelineBar.current.value) - 10;
    changeTimeline()
  }

  const forwardTime = () => {
    timelineBar.current.value = Number(timelineBar.current.value) + 10;
    changeTimeline()
  }

console.log(timelineBar.current);
  return (
    <div className='media'>
      <audio  ref={audioPlayer} src={require(`../music/${db.list[3].src}.mp3`)}></audio>
      <div className='media_main'>
        <div>{calculateTime(currentTime)}</div>
        <img onClick={backwardTime} src={require(`../icon/${db.icon[0].backward}.png`)} alt="backward" />
        <img onClick={togglePlayPause} 
          src={itPlay ? require(`../icon/${db.icon[0].pause}.png`) : 
            require(`../icon/${db.icon[0].play}.png`)}
          alt="play" />
        <img onClick={forwardTime} src={require(`../icon/${db.icon[0].forward}.png`)} alt="forward" />
        <div>
          <input type="range" />
        </div>
        <div>{duration ? calculateTime(duration) : '00:00'}</div>
      </div>
      <div className='media_timeline'>
        <input className='timelineBar' step='0.016' defaultValue='0' type="range" ref={timelineBar} onChange={changeTimeline}/>
      </div>
    </div>
  )
}

export default Media