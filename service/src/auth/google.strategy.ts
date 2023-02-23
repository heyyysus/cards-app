import GoogleStrategy from "passport-google-oauth20";
import * as dotenv from "dotenv";
import pool from "../util/db";
dotenv.config();

const strategy = new GoogleStrategy.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'localhost:3000/oauth2/redirect/google',
    scope: [ 'email', 'profile' ],
    state: true
  },
  function verify(accessToken, refreshToken, profile, cb) {
    //FIND USER
  }
)

export default strategy;