import React, { useState, createRef } from 'react';
import axios from 'axios';

function Test() {

  const [description, setDescription] = useState(null);
  const [pictures, setPictures] = useState(null);
  const imageRef = createRef()

  const submit = () => {
    var newPictures = new FormData();
    newPictures.append("description", description);
    pictures && [...pictures].forEach(pic => {
      newPictures.append("pictures", pic)
    });
    axios.post(`${process.env.REACT_APP_API_URL}/pictures`, newPictures).then((response) => {
      setDescription("")
      setPictures(null)
      imageRef.current.value = null
      console.log(response.data)
    }).catch(err => {
      console.log(err)
    });
  }
    
  return (
    <div>
        Bilder hochladen<br/>
          <div>
            <input type="text" value={description ? description : ""} onChange={(e) => setDescription(e.target.value)}/><br/>
            <input type="file" accept="image/*" onChange={(e) => setPictures(e.target.files)} multiple ref={imageRef}/><br/>
            <button onClick={submit} disabled={description == null || pictures === null}>Submit</button>
          </div> 
    </div>
  );
}

export default Test;