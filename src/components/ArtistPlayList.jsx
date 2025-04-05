import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import VerifiedIcon from '@mui/icons-material/Verified';
import '../utils/musicplayer.scss';
import MusicPlayer from '../utils/MusicPlayer';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginCancel } from '../store/loginSlice';

const ArtistPlayList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [artistTrack, setArtistTrack] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const ID = window.location.search.split('?id=')[1];
  const AccessToken = useSelector((state)=>state.login.loginDetails?.access_token);
  const globalArtist = useSelector((state)=>state.artist?.artistDetails);

  const artistTopTrack =async  ()=>{
    const URL = `https://api.spotify.com/v1/artists/${ID}/top-tracks?market=IN`;
    try {
      const res = await axios.get(URL, {
        headers: {
          'Authorization': `Bearer ${AccessToken}`
        }
      })
      setArtistTrack(res.data?.tracks);
    } catch (err) {
      dispatch(loginCancel());
      navigate('/login');
      return ;
    }
  }

  useEffect(()=>{
    artistTopTrack();
    if (globalArtist?.length > 0){
      globalArtist.forEach((item)=>{
        if (item.id === ID){
          setSelectedArtist(item);
          return ;
        }
      })
    }
  },[])

  const style = {
    backgroundImage: `url(${selectedArtist?.images[0].url})`
  }

  return (
    <div className="selectedArtist_main_box" >
      <section className="music_player" style={style}>
        <div className="artist_name">
          {selectedArtist?.name}
          <div className="artist_follower">
            <p className="verified">
              <VerifiedIcon sx={{ fill:"green" }} /> verified artist
            </p>
            {selectedArtist?.followers?.total.toLocaleString()}
          </div>
        </div>
      </section>
      {
        artistTrack?.map((item, index)=>{
          return <MusicPlayer artistAlbum={item} key={index} index={index} hide={true} />
        })
      }
    </div>
  )
}

export default ArtistPlayList