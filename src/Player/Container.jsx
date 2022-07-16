import React from 'react'
import { useState } from 'react';
import './Container.scss'

const Container = ({ db, currentSong, setCurrentSong }) => {
  
  const [itPlaylist, itSetPlaylist] = useState(false);
  const [sort, setSort] = useState("asc");
  const [ , setAsd] = useState(db);

  const sorting = (obj) => {
    if(sort === "asc") {
      const res = db.list.sort((a,b) => a[obj].localeCompare(b[obj]));
      setAsd(res);
      setSort("desc");
    }
    if(sort === "desc") {
      const res = db.list.sort((a,b) => b[obj].localeCompare(a[obj]));
      setAsd(res);
      setSort("asc");
    }
  }

  return (
    <div className='container'>
      <div className='content'>
        <div className='content_img'>
          <img className='img_cont' src={require(`../img/${currentSong.img_src}.jpg`)} alt=""/>
          <div className='content_playlist'>
              <div onClick={() => itSetPlaylist(!itPlaylist)} className='playlist'>playlist&ensp;<img style={{width:20,height:20}} src={require(`../icon/${db.icon[0].crotchet}.png`)} alt=""/></div>
              <div className={!itPlaylist ? 'playlist_none' : 'playlist_active'}>
                  <div className='playlist_sort' onClick={()=> sorting("title")}>sort</div>
                {db.list.map(i=> 
                  <div onClick={()=> setCurrentSong(i)} key={i.title} className='playlist_active_cur'>{`${i.artist} - ${i.title}`}</div>)}
              </div>
          </div>
        </div>
        <div className='content_info'>
          <div className='content_title'>{currentSong.title}</div>
          <div className='content_artist'>{currentSong.artist}</div>
        </div>
      </div>
    </div>
  )
}

export default Container