import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {

  const [title, setTitle] = useState("...");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/title`).then((response) => {
      response.data[0] ? setTitle(response.data[0].title) : setTitle('kein Titel verfügbar')
    });
  }, []);

  return (
    <div>
        Home
        <h1>{title}</h1>
    </div>
  );
}

export default Home;
