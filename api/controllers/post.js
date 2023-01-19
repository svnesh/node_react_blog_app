import jwt from "jsonwebtoken"
import { db } from "../db.js";

export const getPosts = (req,res) => {
    
    //Get all posts
    const q = req.query.cat ? "SELECT * from posts WHERE cat = ?" :  "SELECT * from posts";

    db.query(q, [req.query.cat], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
export const getPost = (req,res) => {
    
    //Get single post
    const q = "SELECT p.id, `username`,`title`,`desc`,`date`,`cat`,p.img FROM users u JOIN posts p on u.id=p.uid WHERE p.id=?";

    db.query(q, [req.params.id], (err,data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    });
}

export const deletePost = (req,res) => {
    
    //Delete a post
    const token = req.cookies?.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userinfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        const postID = req.params.id
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

        db.query(q, [postID, userinfo.id], (err,data) => {
            if(err) return res.status(403).json("You can only delete your posts");
            return res.json("Post has been deleted");
        });

    })
    

}
export const updatePost = (req,res) => {
    
    //update a post
    const token = req.cookies?.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userinfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        const postID = req.params.id
        const q = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id`=? and `uid`=?";
        const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

        db.query(q, [...values, postID, userinfo.id], (err,data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post added successfully");
        });
    })
}

export const addPost = (req,res) => {
    
    //Adding new post
    const token = req.cookies?.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userinfo)=>{
        if(err) return res.status(403).json("Token is not valid")
        const q = "INSERT INTO posts(`title`,`desc`,`date`,`img`,`uid`,`cat`) VALUES (?)";
        const values = [req.body.title, req.body.desc, req.body.date, req.body.img, userinfo.id, req.body.cat];

        db.query(q, [values], (err,data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post added successfully");
        });
    })
}