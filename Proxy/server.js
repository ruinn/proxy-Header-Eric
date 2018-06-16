const express = require("express");
const axios = require('axios');
const morgan = require("morgan");
const path = require("path");
const app = express();
const bodyParser= require('body-parser');
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use('/:id', express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.get("/api/locations/hostels/:id/info", async (req, res) => {
	await db.Hostel.find({ id: req.params.id })
		.then(data => {
			res.send(data);
		})
		.catch(error => {
			console.log("error in GET HostelInfo IN SERVER", error);
			res.send(error);
		});
});

app.get("/api/locations/:id/info", async (req, res) => {
	await db.Location.find({ id: req.params.id })
		.then(data => {
			res.send(data);
		})
		.catch(error => {
			console.log("error in GET LocationInfo IN SERVER", error);
			res.send(error);
		});
});

app.get("/locations/hostels", async (req, res) => {
	await db.Location.find()
		.then(data => {
			res.send(data);
		})
		.catch(error => {
			console.log("error in Search IN SERVER", error);
			res.send(error);
		});
});


app.listen(port, () => {
	console.log(`server running at: http://localhost:${port}`);
});
