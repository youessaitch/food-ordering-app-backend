import { auth } from "express-oauth2-jwt-bearer";
import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });

export const jwtParse = async(req: Request, res: Response, next: NextFunction)=>{
  const {authorization} = req.headers;

  if(!authorization || !authorization.startsWith("Bearer ")){
    return res.sendStatus(401);
  }

  //Bearer token -> we are taking token from the header
  const token = authorization.split(" ")[1];
  //now we need to decode the token using jsonwebtoken npm package

  try{
    const decoded = jwt.decode(token) as jwt.JwtPayload; 
    const auth0Id = decoded.sub; //sub is the subject of the token, which is the user id

    const user = await User.findOne({auth0Id});

    if(!user){
      return res.sendStatus(401);
    }

    req.auth0Id = auth0Id as string; //store the auth0 id in the request object
    req.userId = user._id.toString(); //store the user id in the request object
    next();

  }catch(error){
    return res.sendStatus(401); //unauthorized
  }

};