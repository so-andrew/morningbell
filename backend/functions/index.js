const functions = require("firebase-functions");
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
const admin = require("firebase-admin");

const serviceAccount = {
    "type": "service_account",
    "project_id": "buzzer-app-a1303",
    "private_key_id": functions.config().admin.private_key_id,
    "private_key": functions.config().admin.private_key.replace(/\\n/g, '\n'),
    "client_email": "firebase-adminsdk-cu5up@buzzer-app-a1303.iam.gserviceaccount.com",
    "client_id": "104687496656991507750",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cu5up%40buzzer-app-a1303.iam.gserviceaccount.com"
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://buzzer-app-a1303-default-rtdb.firebaseio.com",
    databaseAuthVariableOverride: {
        uid: "buzzer-app-service-worker"
    }
});

// Routes
app.use('/api/create', require('./routes/api/create'));
app.use('/api/join', require('./routes/api/join'));
app.use('/api/hostjoin', require('./routes/api/hostjoin'));

exports.app = functions.https.onRequest(app);