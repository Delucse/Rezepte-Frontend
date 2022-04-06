import React, { useState, createRef } from 'react';

import imageCompression from 'browser-image-compression';
import axios from 'axios';

function Test() {

  const [description, setDescription] = useState(null);
  const [pictures, setPictures] = useState([]);
  const imageRef = createRef()

  const onHandleFileInput = async (e) => {

    var targetFiles = [...e.target.files];

    if(targetFiles.length + pictures.length > 4){
      alert('Insgesamt zu viele Bilder. Es dürfen nur maximal vier Bilder hochgeladen werden.')
      return
    }

    var error = false
    var index = 0
    while (!error && index < targetFiles.length){
      if(!["image/jpeg","image/png"].includes(targetFiles[index].type)){
        error = true;
      }
      index += 1;
    }
    if(error){
      alert('Falsches Dateiformat.')
      return;
    }

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 600,
      useWebWorker: true,
      // onProgress: (percent) => {console.log(percent)}
    }
    const promises = targetFiles.map(file =>  {
     return imageCompression(file, options)
      .then(compressedBlob => {
          // Conver the blob to file
          return new File([compressedBlob], file.name, { type: file.type, lastModified: Date.now()})
      })
      .catch(e => {
        console.log('image', e)  
      });
    })
    const files = await Promise.all(promises);
    setPictures(pictures.concat(files));   
  }

  const submit = () => {
    var newPictures = new FormData();
    newPictures.append("description", description);
    pictures.forEach(pic => {
      newPictures.append("pictures", pic)
    });
    axios.post(`${process.env.REACT_APP_API_URL}/pictures`, newPictures).then((response) => {
      setDescription("")
      setPictures([])
      imageRef.current.value = null
    }).catch(err => {
      console.log(err)
    });
  }

  const onDelete = (file) => {
    var filteredFiles = pictures.filter(pic => pic !== file);
    setPictures(filteredFiles);
  }
    
  return (
    <div>
        Bilder hochladen<br/>
          <div style={{margin: '20px'}}>
            <input type="text" value={description ? description : ""} onChange={(e) => setDescription(e.target.value)}/><br/>
            <input type="file" accept="image/png, image/jpeg" onChange={onHandleFileInput} multiple ref={imageRef} disabled={pictures.length > 3}/><br/>
          </div>
          <div>
            {pictures.map((pic, index) => 
              <div key={index}><img src={URL.createObjectURL(pic)} alt="" height="200px"/>
              <button onClick={() => onDelete(pic)}>löschen</button>
              <div>{`Größe: ${(pic.size / 1024 / 1024).toFixed(2)} MB`}</div>
              </div>
            )}
          </div>
          <button onClick={submit} disabled={description == null || pictures === null} style={{width: '80%', marginTop: '20px'}}>Submit</button>
    </div>
  );
}

export default Test;