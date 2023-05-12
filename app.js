const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const users = {
  userID: {
    firstName: "Landon",
    lastName: "Pryce",
    dateOfBirth: `May 16 1992`,
    profilePicture: `https://www.theblackelder.com/uploads/b/66d350fdbe339ce2e3ff019e88f59d280925839c3758d365cd53a77936e02026/theblackelder.com%20plastic%20overlay_1669829110.png?width=800&optimize=medium&height=480&fit=cover&dpr=2`,
    bio: `I hail from the streets of Scarborough as a self-taught multimedia artist versed in writing poetry, rapping, playing piano and creating visual and digital art.`,
  },
  user2ID: {
    firstName: "Amelia",
    lastName: "Gracious",
    dateOfBirth: `May 22 1999`,
    profilePicture: `https://www.theblackelder.com/uploads/b/66d350fdbe339ce2e3ff019e88f59d280925839c3758d365cd53a77936e02026/theblackelder.com%20plastic%20overlay_1669829110.png?width=800&optimize=medium&height=480&fit=cover&dpr=2`,
    bio: `I hail from the streets of Scarborough as a self-taught multimedia artist versed in writing poetry, rapping, playing piano and creating visual and digital art.`,
  },
  user3ID: {
    firstName: "Leo",
    lastName: "Clarke",
    dateOfBirth: `April 16 1992`,
    profilePicture: `https://www.theblackelder.com/uploads/b/66d350fdbe339ce2e3ff019e88f59d280925839c3758d365cd53a77936e02026/theblackeder.com%20plastic%20overlay_1669829110.png?width=800&optimize=medium&height=480&fit=cover&dpr=2`,
    bio: `I hail from the streets of Scarborough as a self-taught multimedia artist versed in writing poetry, rapping, playing piano and creating visual and digital art.`,
  },
};

app.get("/", (req, res) => {
  res.status(200);
  const templateVars = {
    user: users,
  };
  res.render("users_index", templateVars);
});

app.get("/users/new", (req, res) => {
  const templateVars = {
    user: users,
  };
  res.render("users_new", templateVars);
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
