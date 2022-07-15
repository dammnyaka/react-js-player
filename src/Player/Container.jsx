import React from 'react'
import './Container.scss'

const Container = ({ db}) => {




  return (
    <div className='container'>
      <div className='content'>
        <div className='content_img'>
          <img src={require(`../img/${db.list[0].img_src}.jpg`)} alt=""/>
          <div className='content_playlist'>playlist</div>
        </div>
        <div className='content_info'>
          <div className='content_artist'>artist</div>
          <div className='content_title'>title</div>
        </div>
      </div>
    </div>
  )
}

export default Container