import express from "express"
import { addComments, getComments } from "../controllers/comment.js"

const router = express.Router()

router.get("/:id", getComments)
router.post("/:id", addComments)

export default router