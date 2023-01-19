import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import blog1 from "../img/blog1.jpg"
import blog2 from "../img/blog2.jpg"
import blog3 from "../img/blog3.jpg"

const Menu = ({cat}) => {

  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`/posts/?cat=${cat}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  }, [cat])

  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Dicta, debitis assumenda sapiente reiciendis soluta, officia consequatur, quibusdam sed est corporis temporibus? Iste nam sequi fuga tempora amet. Eius, dolor. Velit. soluta, officia consequatur, quibusdam sed est corporis temporibus? Iste nam sequi fuga tempora amet. Eius, dolor. Velit",
  //     img: blog1 
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Dicta, debitis assumenda sapiente reiciendis soluta, officia consequatur, quibusdam sed est corporis temporibus? Iste nam sequi fuga tempora amet. Eius, dolor. Velit. soluta, officia consequatur, quibusdam sed est corporis temporibus? Iste nam sequi fuga tempora amet. Eius, dolor. Velit",
  //     img: blog2 
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Dicta, debitis assumenda sapiente reiciendis soluta, officia consequatur, quibusdam sed est corporis temporibus? Iste nam sequi fuga tempora amet. Eius, dolor. Velit. soluta, officia consequatur, quibusdam sed est corporis temporibus? Iste nam sequi fuga tempora amet. Eius, dolor. Velit",
  //     img: blog3 
  //   },
  // ]

  return (
    <div className='menu'>
      <h1>Other posts you may like</h1>
        {posts.map(post =>(
          <div className="post" key={post.id}>
            <img src={post.img !== "" ? post.img : blog1} alt="" />
            <h2>{post.title}</h2>
            <Link className='link' to={`/post/${post.id}`}>
              <button>Read more</button>            
            </Link>

          </div>
        ))}

    </div>
  )
}

export default Menu