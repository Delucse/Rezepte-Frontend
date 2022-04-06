import React, {useEffect, useState} from 'react';

import axios from 'axios';
import moment from 'moment';

function Pictures() {

  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/pictures`).then((response) => {
      setPictures(response.data)
    });
  }, []);

  return (pictures.map((pic, index) => {
    return( 
      <div style={{textAlign: 'left'}} key={index}>
        <div>{pic.description} (hochgeladen am {moment(pic.createdAt, moment.ISO_8601).format("DD.MM.YYYY HH:mm:ss")} Uhr)</div>
        <img src={`${process.env.REACT_APP_API_URL}/media/${pic.file}`} alt={pic.description} height="200px"/>
      </div>
    )}
  ));
}

export default Pictures;
