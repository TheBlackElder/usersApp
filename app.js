const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const users = {
  userID: {
    id: "userID",
    firstName: "Landon",
    lastName: "Pryce",
    dateOfBirth: `May 16 1992`,
    profilePicture: `https://www.theblackelder.com/uploads/b/66d350fdbe339ce2e3ff019e88f59d280925839c3758d365cd53a77936e02026/theblackelder.com%20plastic%20overlay_1669829110.png?width=800&optimize=medium&height=480&fit=cover&dpr=2`,
    bio: `I hail from the streets of Scarborough as a self-taught multimedia artist versed in writing poetry, rapping, playing piano and creating visual and digital art.`,
  },
  user2ID: {
    id: "user2ID",
    firstName: "Amelia",
    lastName: "Gracious",
    dateOfBirth: `May 22 1999`,
    profilePicture: `https://www.theblackelder.com/uploads/b/66d350fdbe339ce2e3ff019e88f59d280925839c3758d365cd53a77936e02026/theblackelder.com%20plastic%20overlay_1669829110.png?width=800&optimize=medium&height=480&fit=cover&dpr=2`,
    bio: `I hail from the streets of Scarborough as a self-taught multimedia artist versed in writing poetry, rapping, playing piano and creating visual and digital art.`,
  },
  user3ID: {
    id: "user3ID",
    firstName: "Leo",
    lastName: "Clarke",
    dateOfBirth: `April 16 1992`,
    profilePicture: `https://www.theblackelder.com/uploads/b/66d350fdbe339ce2e3ff019e88f59d280925839c3758d365cd53a77936e02026/theblackeder.com%20plastic%20overlay_1669829110.png?width=800&optimize=medium&height=480&fit=cover&dpr=2`,
    bio: `I hail from the streets of Scarborough as a self-taught multimedia artist versed in writing poetry, rapping, playing piano and creating visual and digital art.`,
  },
};

const profileForUser = (users) => {
  let result = {};
  for (const id in users) {
    if (users[id]) {
      result[id] = users;
    }
  }
  return result;
};

const generateRandomString = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


app.get("/", (req, res) => {
  res.status(200);
  const templateVars = {
    users,
  };
  res.render("users_index", templateVars);
});


app.get("/users/new", (req, res) => {
  const templateVars = {
 users,
  };
  res.render("users_new", templateVars);
});

// app.post("/users/new", (req, res) => {
//   res.render("/");
// });

// app.post("/", (req, res) => {
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const userBirthday = req.body.dateOfBirth;
//   const userPicture = req.body.profilePicture;
//   const userBio = req.body.bio;
//   const templateVars = {
//  firstName,lastName, userBirthday, userPicture, userBio
//   };
//   res.redirect("/", templateVars);
// });

app.post("/", (req, res) => {
  const newUserID = generateRandomString();
  const {firstName, lastName, dateOfBirth, profilePicture, bio } = req.body
  users[newUserID] = 
  {newUserID, firstName, lastName, dateOfBirth, profilePicture, bio }

  const newUser = {
    firstName, lastName, dateOfBirth, profilePicture, bio
  }
  // users.id.push(newUser);

  res.render('users_index', { users });
  res.redirect("/");
});

// app.get("/users/:id", (req, res) => {

//   if (profileForUser(users)) {
//     const templateVars = {
//       user: users,
//     };
//     return res.render("users_show", templateVars);
//   }
// });



app.get("/users/:id", (req, res) => {
  const userID = req.params.userId;
  if (profileForUser(userID, users)) {
    const templateVars = {
      id: userID,
      user: users,
    };
    return res.render("users_show", templateVars);

  }
});

app.post("/users/:id/update", (req, res) => {
  const userID = req.body.id;
 
  if (!users.hasOwnProperty(userID)) {

    res.status(404).send('User not found');
  } else {
 
    delete users[userID];
   
    res.redirect("/");
    }
});

app.post("/users/:id/delete", (req, res) => {
  const userID = req.body.id;
 
  if (!users.hasOwnProperty(userID)) {

    res.status(404).send('User not found');
  } else {
 
    delete users[userID];
   
    res.redirect("/");
    }
});

// app.post("/users/:id/show", (req, res) => {
//   const userID = req.session.userId;
//   const authURLs = urlsForUser(userID, users);
//   if (user) {
//     return res.redirect("/users/show");
//   } else {
//     res.status(401).send("<html><h3>Access denied<h3><html>");
//   }
// });

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
