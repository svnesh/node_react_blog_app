import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import blog1 from "../img/blog1.jpg"
import blog2 from "../img/blog2.jpg"
import blog3 from "../img/blog3.jpg"



// const posts = [
// 	{
// 		id: 1,
// 		title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
// 		desc: "Dicta, debitis assumenda sapiente reiciendis soluta, officia consequatur, quibusdam sed est corporis temporibus? Iste nam sequi fuga tempora amet. Eius, dolor. Velit. soluta, officia consequatur, quibusdam sed est corporis temporibus? Iste nam sequi fuga tempora amet. Eius, dolor. Velit",
//     img: blog1 
// 	},
//   {
// 		id: 2,
// 		title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
// 		desc: "Dicta, debitis assumenda sapiente reiciendis soluta, officia consequatur, quibusdam sed est corporis temporibus? Iste nam sequi fuga tempora amet. Eius, dolor. Velit. soluta, officia consequatur, quibusdam sed est corporis temporibus? Iste nam sequi fuga tempora amet. Eius, dolor. Velit",
//     img: blog2 
// 	},
//   {
// 		id: 3,
// 		title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
// 		desc: "Dicta, debitis assumenda sapiente reiciendis soluta, officia consequatur, quibusdam sed est corporis temporibus? Iste nam sequi fuga tempora amet. Eius, dolor. Velit. soluta, officia consequatur, quibusdam sed est corporis temporibus? Iste nam sequi fuga tempora amet. Eius, dolor. Velit",
//     img: blog3 
// 	},
// ]

const Home = () => {
  
  const [posts, setPosts] = useState([])
  const cat = useLocation().search;
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`/posts${cat}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  }, [cat])

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='home'>
      <div className="posts">
        {posts.map(post=>(
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img !== "" ? `../upload/${post.img}` : blog1} alt="" />
            </div>
            <div className="content">
              <Link className='link' to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <Link className='link' to={`/post/${post.id}`}>
                <button>Read more</button>
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home