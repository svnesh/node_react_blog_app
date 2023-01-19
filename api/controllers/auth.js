import {db} from "../db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const register = (req,res) => {
    
    //check existing user
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(q, [req.body.email, req.body.username], (err,data) => {
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists");

        //Hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
        const values = [req.body.username, req.body.email, hash];

        db.query(q, [values], (err, data)=>{
            if(err) return res.json(err);
            return res.status(200).json("User has been created");
        });
    });
}
export const login = (req,res) => {
    
    //check user credetials
    const q = "SELECT * from users WHERE username = ?";

    db.query(q, [req.body.username], (err,data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User does not exists");

        //
        const isPassCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        
        if(!isPassCorrect) return res.status(400).json("Username or password is wrong")

        const token = jwt.sign({id: data[0].id}, "jwtkey");
        const {password, ...other} = data[0]

        res.cookie("access_token", token, {
            httpOnly:true
        }).status(200).json(other)
    })

}
export const logout = (req,res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out") 
};