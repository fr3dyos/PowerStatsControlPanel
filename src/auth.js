const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
//const dotenv = require("dotenv");
//dotenv.config({ path: "./src/.env" });

const users = [{ 
    _id: 1, 
    username: "adm", 
    password: "$2a$10$LCNgHH7lOuBwZb0pbh24u..wA9qPDAktfSU0totk1JLxpD0TPRk8S",
    email: "contato@luiztools.com.br"
},{ 
    _id: 2, 
    username: "adm2", 
    password: "$2a$10$LCNgHH7lOuBwZb0pbh24u..wA9qPDAktfSU0totk1JLxpD0TPRk8S",
    email: "contato@luiztools.com.br"
},{ 
    _id: 3, 
    username: "adm3", 
    password: "$2a$10$LCNgHH7lOuBwZb0pbh24u..wA9qPDAktfSU0totk1JLxpD0TPRk8S",
    email: "contato@luiztools.com.br"
}];

module.exports = function (passport) {
  function findUser(username) {
      console.log(username);
    return users.find((user) => user.username === username);
  }

  function findUserById(id) {
    return users.find((user) => user._id === id);
  }

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    try {
      const user = findUserById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        try {
          const user = findUser(username);

          // usuário inexistente
          if (!user) {
            return done(null, false);
          }

          // comparando as senhas
          const isValid = bcrypt.compareSync(password, user.password);
          console.log("isValid:"+isValid);
          if (!isValid) return done(null, false);

          return done(null, user);
        } catch (err) {
          done(err, false);
        }
      }
    )
  );
};
