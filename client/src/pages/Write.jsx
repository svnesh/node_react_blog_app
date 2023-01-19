import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom';
import moment from "moment"

const Write = () => {

  const state = useLocation().state
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const navigate = useNavigate();

  const upload = async ()=>{
    try{
      const formData = new FormData();
      if (file){
        formData.append("file", file);
        const res = await axios.post("/upload", formData);
        return res.data;
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleClick = async e =>{
    e.preventDefault()
    const imgURL = await upload()

    try{
      state ? await axios.put(`/posts/${state.id}`, {
        title,desc:value,cat,img:file ? imgURL : ""
      })
      : await axios.post("/posts", {
        title,desc:value,cat,img:file ? imgURL : "",date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      });
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
        <div className='editorcontainer'>
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h2>Publish</h2>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display:"none"}} type="file" name="" id="file" onChange={e=>setFile(e.target.files[0])}/>
          <label htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>

        <div className="item">
          <h2>Category</h2>
          <div className="cat">
            <input type="radio" checked={cat === "art"} name="cat" value="art" id="art" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="art">Art & Literature</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "science"} name="cat" value="science" id="tech" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="science">Science & Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "health"} name="cat" value="health" id="health" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="health">Health & Clinical</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "travel"} name="cat" value="travel" id="travel" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="travel">Travel</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "movies"} name="cat" value="movies" id="movies" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="movies">Movies</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "other"} name="cat" value="other" id="other" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="other">Other</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write