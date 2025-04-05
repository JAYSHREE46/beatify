import React from 'react'
import Grid from '@mui/material/Grid'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import './card.scss';
import { useNavigate } from 'react-router-dom';

const Card = ({artistDetails, url}) => {
  const navigate = useNavigate();
  const handleURL = ()=>{
    navigate(url);
  }

  return (
    <Grid item>
      <div className="card" onClick={handleURL}>
        <section>
          <div className="card_image">
            <img alt="user" src={artistDetails?.images[0].url} />
          </div>
        </section>
        <PlayCircleFilledIcon className="start_icon" />
        <div className="card_details">
          <b> {artistDetails?.name} </b>
          <p>  {artistDetails?.type} </p>
        </div>
      </div>
    </Grid>
  )
}

export default Card