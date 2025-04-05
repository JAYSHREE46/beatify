import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AlbumCard = ({ albumDetails }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ width: 200, cursor: "pointer", margin: "10px" }}
      onClick={() => navigate(`/album/${albumDetails.id}`)}
    >
      <CardMedia
        component="img"
        height="200"
        image={albumDetails.images[0]?.url}
        alt={albumDetails.name}
      />
      <CardContent>
        <Typography variant="h6">{albumDetails.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {albumDetails.release_date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AlbumCard;
