import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {

  const [title, setTitle] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/title`).then((response) => {
      response.data[0] ? setTitle(response.data[0].title) : setTitle("")
    });
  }, []);

  const onChange = () => {
    axios.put(`${process.env.REACT_APP_API_URL}/title`,{
      title: title
    }).then((response) => {
      setTitle("")
    });
  }
    

  return (
    <div>
        Test<br/>
        {title !== null? 
          <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)}/><br/>
            <button onClick={onChange}>Submit</button>
          </div> 
        : 
        null}
    </div>
  );
}

export default Test;