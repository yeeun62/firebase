const express = require("express");
const app = express();
const { getDatabase, ref, onValue } = require("firebase/database");

const config = require("./config");
const db = getDatabase();

app.get("/", function (req, res) {
	const starCountRef = ref(db, "user");
	onValue(starCountRef, (snapshot) => {
		const data = snapshot.val();
		console.log("~~~", data);
		//updateStarCount(postElement, data);
	});
	res.send("~~!");
});

app.listen(80, () => console.log("서버실행"));
