import { useRef, useState,useEffect } from 'react'
import './Media.scss'
import WaveSurfer from 'wavesurfer.js';


const Media = ({ db, currentSong, setCurrentSong }) => {

  const [itPlay, setItPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [wavePlay, setWavePlay] = useState({Playing: false, Pos: 0})
  const [waveState, setWaveState] = useState(null)

  const audioPlayer = useRef();
  const timelineBar = useRef();
  const animationRef = useRef();
  const waveformRef = useRef();

  useEffect(()=> {
    if(waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        scrollParent: false,
        barWidth: 3,
        cursorWidth: 1,
        backend: 'MediaElement',
        mediaType: 'audio',
        hideScrollbar: false,
        height: 40,
        progressColor: '#24b89a',
        responsive: 10,
        waveColor: "rgb(0,0,0,0.25)",
        cursorColor: 'transparent',
      });
        wavesurfer.load(audioPlayer.current);
        setWaveState(wavesurfer)
        return () => wavesurfer.destroy();
    }
  },[currentSong])

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
      // audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(itPlayback);
      waveState?.play();
    } else {
      // audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
      waveState?.pause();
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
    // if(!wavePlay.Playing) {
      waveState?.play();
    // }
    return i
  }

  return (
    <div className='media'>
      <audio onLoadedMetadata={e=> setDuration(e.target.value)} onEnded={forwardTime} autoPlay={itPlay && autoPlaylist(currentSong)} ref={audioPlayer} src={require(`../music/${currentSong.src}.mp3`)}></audio>
      <div className='media_main'>
        <div>{calculateTime(currentTime)}</div>
        <img onClick={backwardTime} src={require(`../icon/${db.icon[0].backward}.png`)} alt="backward" />
        <img onClick={togglePlayPause} onKeyDown={togglePlayPause}
          src={require(`../icon/${itPlay ? db.icon[0].pause : db.icon[0].play}.png`)}
          alt="play" />
        <img onClick={forwardTime} src={require(`../icon/${db.icon[0].forward}.png`)} alt="forward" />
        <div>
          <input onChange={changeVolume} defaultValue='100' type="range" />
        </div>
        <div>
          <div>{duration ? calculateTime(duration) : '00:00'}</div>
          <img onClick={()=> setWavePlay(!wavePlay)} className='waveform_img' src={require(`../icon/${db.icon[0].waveform}.png`)} alt="waveform" />
        </div>
      </div>
      <div className='media_timeline'>
        <input className={wavePlay ? 'timelineBar_none' : 'timelineBar'} step='0.1' defaultValue='0' type="range" ref={timelineBar} onChange={changeTimeline}/>
        <div className={wavePlay ? 'waveform' : 'waveform_none'} ref={waveformRef}/>
      </div>
    </div>
  )
}

export default Media;