import { PlayArrow } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { songUpdate } from '../store/selectedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { favSongRemove } from '../store/favSlice';

const MusicPlayer = ({ artistAlbum, index, hide = false }) => {
  const dispatch = useDispatch();
  const favSongList = useSelector((state)=>state.favSong.favSong)
  const secondDuration = (miliSecond)=>{
    const minute = Math.floor(miliSecond/60000);
    const seconds = ((miliSecond%60000) / 1000).toFixed(0);
    return `${minute}:${seconds}`;
  }

  const handlePlay = (album)=>{
    dispatch(songUpdate(album))
  }

  const handleRemove = (event,artistAlbum)=>{
    event.stopPropagation();
    const arr  = favSongList.filter((item)=> item.id !== artistAlbum.id )
    dispatch(favSongRemove(arr));
  }

  return (
    <React.Fragment>
      <div className="song_track" onClick={()=>handlePlay(artistAlbum)}>
        <div className="track_name">
          {index+1}
          <div className="song_image">
            <img alt="song preview" src={artistAlbum?.album?.images[0].url} />
          </div>
          <p>{artistAlbum?.name} </p>
        </div>
        <div className="details">
          <div className="progress">
            {hide && <CircularProgress variant="determinate" value={artistAlbum?.popularity} />}
          </div>
          <div className="duration">
            {hide && (secondDuration(artistAlbum?.duration_ms)+ " min")}
          </div>
          <div className="duration">
            {hide && <PlayArrow className="play_duration" />}
            {!hide && <CloseIcon className="play_duration" onClick={(event)=>handleRemove(event,artistAlbum)} />}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MusicPlayer