import React, { useEffect, useState } from 'react'
import blog1 from "../img/blog1.jpg"
import user1 from "../img/user1.png"
import delimg from "../img/delete.png"
import editimg from "../img/edit.png"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import moment from 'moment'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext';
import axios from 'axios'

const Single = () => {

  const [post, setPost] = useState({})
  const [comments, setComments] = useState([]);
  const [ctext, setcText] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const postID = location.pathname.split("/")[2]
  const {currentUser} = useContext(AuthContext);

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`/posts/${postID}`)
        //console.log(res)
        setPost(res.data)
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  }, [postID])

  useEffect(()=>{
    const fetchComments = async ()=>{
      try{
        const res = await axios.get(`/comments/${postID}`)
        setComments(res.data)
      }catch(err){
        console.log(err)
      }
    };
    fetchComments();
  }, [postID])

  const handleDelete = async () =>{
    try{
      await axios.delete(`/posts/${postID}`)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  const handleComment = async (e) =>{
    try{
      const res = await axios.post(`/comments/${postID}`, {
        cdate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ctext:ctext
      })
      setComments([...comments, {
        cdate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ctext:ctext,
        username: currentUser.username,
        pid: postID
      }])
    }catch(err){
      console.log(err)
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  // const comments = [
  //   {
  //     id: 1,
  //     name: "John",
  //     commenttext: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas non perferendis eum nesciunt aspernatur iste provident nemo labore, minus eius commodi, ut unde voluptatum aliquam amet! At veritatis voluptate minus? Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     img: user1 
  //   },
  //   {
  //     id: 2,
  //     name: "Kumar",
  //     commenttext: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     img: user1
  //   },
  //   {
  //     id: 3,
  //     name: "Suresh",
  //     commenttext: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     img: user1
  //   },
  // ]

  return (
    <div className='single'>
      <div className="content">
        <img src={post.img != "" ? `../upload/${post.img}`: blog1} alt="" />
        <div className="user">
          <img src={user1} alt=""/>
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post?.username && <div className="accessimg">
            <Link to={`/write?edit=2`} state={post}>
              <img src={editimg} alt="" />
            </Link>
            <img src={delimg} alt="" onClick={handleDelete}/>
          </div>}
        </div>
        <h1>{post.title}</h1>
        {getText(post.desc)}

        <div className="comment">
          <h3>Comments</h3>
          <div className="cinput">
            <img src={user1} alt=""/>
            <input type="text" name="ctext" onChange={e=>setcText(e.target.value)} placeholder='Add a comment' />
            <button onClick={handleComment}>Add</button>
          </div>

          <div className="oldcomments">
            {comments.map(comment=>(
              <div className="oldcomment">
                <div className="img" key={comment?.id}>
                  <img src={user1} alt="" />
                </div>
                <div className="commenttext">
                  <span className="username">{comment?.username}</span>
                  <span className='bullet'>&#x2022;</span>
                  <span className="commentdate">{comment?.cdate}</span>
                  <p>{comment?.ctext}</p>
                </div>
              </div>              
            ))}
          </div>
        </div>

      </div>
      
      <div className="menu">
        <Menu cat={post.cat}/>
      </div>
    </div>
  )
}

export default Single