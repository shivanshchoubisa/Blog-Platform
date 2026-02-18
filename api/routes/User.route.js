import express from "express";
import getUser from "../controllers/User.controller";

const UserRoute = express.Router()

UserRoute.get("/get-user/:userid", getUser)



export default UserRoute