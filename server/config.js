const { initializeApp } = require("firebase/app");
require("dotenv").config();

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	databaseURL: process.env.DATABASE_URL,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGEBUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
};

const config = initializeApp(firebaseConfig);

//module.exports = initializeApp(firebaseConfig);
module.exports = config;
