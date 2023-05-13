const express = require("express");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// users database

const users = {
  userID: {
    id: "userID",
    firstName: "Landon",
    lastName: "Pryce",
    dateOfBirth: "1992-09-21",
    profilePicture: `./images/Jason.jpeg`,
    bio: `Landon is a rising star in the world of hip-hop. With hard-hitting beats and intelligent lyrics, J-Cart has quickly made a name for himself in the industry. His debut album, "Rise and Grind," was a critical and commercial success, earning him comparisons to some of the greatest rappers of all time.`,
  },
  user2ID: {
    id: "user2ID",
    firstName: "Amelia",
    lastName: "Gracious",
    dateOfBirth: "1999-05-07",
    profilePicture: `./images/eliz.jpg`,
    bio: `Amelia is a world-renowned jazz singer and pianist. Her smooth vocals and intricate piano solos have earned her critical acclaim and a dedicated fanbase. With over 20 albums to her name, Sarah continues to push the boundaries of jazz music and inspire audiences around the globe.`,
  },
  user3ID: {
    id: "user3ID",
    firstName: "Leo",
    lastName: "Clarke",
    dateOfBirth: "1998-06-17",
    profilePicture: `./images/liz.jpg`,
    bio: `Leo is a rock legend who has been at the forefront of the genre for over three decades. With his signature guitar riffs and powerful vocals, David has inspired countless musicians and fans alike. His live shows are legendary, and his albums have sold millions of copies worldwide. David is a true icon of rock music and shows no signs of slowing down.`,
  },
};

// helper function to create id for new user

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

// route for homepage

app.get("/", (req, res) => {
  res.status(200);
  const templateVars = {
    users,
  };
  res.render("users_index", templateVars);
});


// route for add new user page
app.get("/users/new", (req, res) => {
  const templateVars = {
    users,
  };
  res.render("users_new", templateVars);
});

// route to add a new user 
app.post("/", (req, res) => {
  const newUserID = generateRandomString();
  const { firstName, lastName, dateOfBirth, profilePicture, bio } = req.body;
  users[newUserID] = {
    newUserID,
    firstName,
    lastName,
    dateOfBirth,
    profilePicture,
    bio,
  };

  res.render("users_index", { users });
  res.redirect("/");
});




// route to update user's profile 

app.post("/users/:id/update", (req, res) => {
  const userID = req.params.id;
  const user = users[userID];
  const bio = req.body.bio ? req.body.bio : user.bio;
  const { firstName, lastName, dateOfBirth, profilePicture } = req.body;

  users[userID] = {
    ...users[userID],
    firstName,
    lastName,
    dateOfBirth,
    profilePicture,
    bio,
  };

  res.redirect(`/users/${userID}/show`);
});


// route to view user's page


app.get("/users/:id/show", (req, res) => {
  const userID = req.params.id;
  const user = users[userID];
  if (!user) {
    res.status(404).send("User not found");
  } else {
    return res.render("users_show", { user });
  }
});


// route to delete a user
app.post("/users/:id/delete", (req, res) => {
  const userID = req.body.id;

  if (!users.hasOwnProperty(userID)) {
    res.status(404).send("User not found");
  } else {
    delete users[userID];

    res.redirect("/");
  }
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
