const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const knex = require("knex");

const signup = require("./controllers/signup");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		port: 5432,
		user: "postgres",
		password: "test",
		database: "smart-brain",
	},
});

db.select("*")
	.from("users")
	.then((data) => {
		//  console.log(data);
	});

const app = express();
const saltRounds = 10;

app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
// 	res.send(database.users);
// });

const hash1 = "$2b$10$njNA.3R1SWg4B5j4UyxeT.jL5qBiHk4vdQPw5kgwPQWM5Ii9jicnm";
app.post("/signin", (req, res) => {
	signin.handleSignin(req, res, db, bcrypt);
});

app.post("/signup", (req, res) => {
	signup.handleSignup(req, res, db, bcrypt, saltRounds);
});

app.get("/profile/:id", (req, res) => {
	profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
	image.handleImage(req, res, db);
});

app.post("/imageURL", (req, res) => {
	image.handleAPICall(req, res);
});

app.listen(3000, () => {
	console.log("App is running");
});
