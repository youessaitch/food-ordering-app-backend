import express from 'express';
import MyUserController from '../controllers/MyUserController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyUserRequest } from '../middleware/validation';

const router = express.Router(); //This line creates a new router object. In Express.js, a router is an object that allows you to define multiple routes that can be used by the Express.js application.

router.get("/", jwtCheck, jwtParse,MyUserController.getCurrentUser);

router.post("/", jwtCheck,MyUserController.createCurrentUser); //When a POST request is made to this path, the jwtCheck middleware function will be called first. If jwtCheck calls next(), then MyUserController.createCurrentUser will be called ; post route at path '/'

router.put("/", jwtCheck, jwtParse,validateMyUserRequest, MyUserController.updateCurrentUser); //to update the current user like name address etc

export default router;