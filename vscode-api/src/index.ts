import express from 'express';
import { createConnection } from 'typeorm';
import { join } from "path";
import { __prod__ } from './constants';
import { Strategy as GitHubStrategy } from 'passport-github';
import passport from "passport";
require("dotenv-safe").config();

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "todo",
    entities: [join(__dirname, "./entities/*.*")],
    logging: !__prod__,
    synchronize: !__prod__
  })
  passport.serializeUser((user: any, done) => { done(null, user.accessToken) });

  const app = express();

  app.use(passport.initialize());
  passport.use(new GitHubStrategy({

    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3002/auth/github/callback"
  },

     (_accessToken, _refreshToken, profile, cb) => {
       console.log(profile);
       cb(null,{accessToken:'', refreshToken:''});
      //      User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //return cb(err, user);
      //});
    }
  ));

  app.get('/auth/github',
    passport.authenticate('github', {session: false}));

  app.get('/auth/github/callback',
    passport.authenticate('github', {session:false}),
    (_req, res) => {
      // Successful authentication, redirect home.
      //res.redirect('/');
      res.send("you logged correctly");
    });

  app.get("/", (_, res) => {
    res.send("hello");
  })

  app.listen(3002, () => {
    console.log('listening 3002');
  })
}

main();