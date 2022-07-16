import { useRef, useState,useEffect } from 'react'
import './Media.scss'


const Media = ({ db, currentSong, setCurrentSong }) => {

  const [itPlay, setItPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
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
    const returnSec = second < 10 ? `0${second}` : `${second}`;
    return `${returnMin}:${returnSec}`;
  }

  const togglePlayPause = () => {
    setItPlay(!itPlay);
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
    const index = db.list.findIndex(x=> x.title === currentSong.title);
    if(index === 0) {
      setCurrentSong(db.list[db.list.length - 1]);
    } else {
      setCurrentSong(db.list[index - 1]);
    }
    if(!itPlay) {
      togglePlayPause();
    }
  }

  const forwardTime = () => {
    const index = db.list.findIndex(x=> x.title === currentSong.title);
    if(index === db.list.length - 1) {
      setCurrentSong(db.list[0]);
    } else {
      setCurrentSong(db.list[index + 1]);
    }
    if(!itPlay) {
      togglePlayPause();
    }
  }

  const changeVolume = (e) => {
    audioPlayer.current.volume = e.target.value / 100
  }

  const autoPlaylist = (i) =>{
    animationRef.current = requestAnimationFrame(itPlayback);
    return i
  }

  return (
    <div className='media'>
      <audio onLoadedMetadata={e=> setDuration(e.target.value)} onEnded={forwardTime} autoPlay={itPlay && autoPlaylist(currentSong)} ref={audioPlayer} src={require(`../music/${currentSong.src}.mp3`)}></audio>
      <div className='media_main'>
        <div>{calculateTime(currentTime)}</div>
        <img onClick={backwardTime} src={require(`../icon/${db.icon[0].backward}.png`)} alt="backward" />
        <img onClick={togglePlayPause}
          src={require(`../icon/${itPlay ? db.icon[0].pause : db.icon[0].play}.png`)}
          alt="play" />
        <img onClick={forwardTime} src={require(`../icon/${db.icon[0].forward}.png`)} alt="forward" />
        <div>
          <input onChange={changeVolume} defaultValue='100' type="range" />
        </div>
        <div>{duration ? calculateTime(duration) : '00:00'}</div>
      </div>
      <div className='media_timeline'>
        <input className='timelineBar' step='0.1' defaultValue='0' type="range" ref={timelineBar} onChange={changeTimeline}/>
      </div>
    </div>
  )
}

export default Media;