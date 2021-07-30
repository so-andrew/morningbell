const express = require('express');
const PORT = process.env.port || 3001;
const app = express();
const cors = require('cors');
var admin = require("firebase-admin");
var serviceAccount = require("./buzzer-app-a1303-firebase-adminsdk-cu5up-14ab4b8101.json");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://buzzer-app-a1303-default-rtdb.firebaseio.com"
});


// Hello world lol
app.get('/', (req, res) => {
    res.send('Hello world!');
});

// Routes
app.use('/api/create', require('./routes/api/create'));
app.use('/api/join', require('./routes/api/join'));

app.listen(PORT, () =>{
    console.log(`Server listening on ${PORT}`);
});