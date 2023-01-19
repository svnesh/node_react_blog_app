import jwt from "jsonwebtoken"
import { db } from "../db.js";

export const getComments = (req,res) => {
    
    //Get comments for post
    const q = "SELECT `username`,`cdate`,`ctext` FROM users u JOIN comments c ON u.id=c.cuid WHERE c.pid=?";

    db.query(q, [req.params.id], (err,data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    });
}


export const addComments = (req,res) => {
    
    //Add comments for post
    const token = req.cookies?.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userinfo)=>{
        const postID = req.params.id
        const q = "INSERT INTO comments(`cdate`,`ctext`,`cuid`,`pid`) VALUES (?)";
        const values = [req.body.cdate, req.body.ctext, userinfo.id, postID]

        db.query(q, [values], (err,data) => {
            if(err) return res.json(err);
            return res.status(200).json(data);
        });
    })
}
