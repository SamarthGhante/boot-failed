const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require("express-rate-limit");
const CryptoJS = require('crypto-js');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

app.set('trust proxy', 1);

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 Hour
    max: 100 // limit each IP to 100 requests per windowMs
  });

app.use(limiter);  

app.set("view engine", "ejs");
app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://*.ch.eng.run',
    credentials: true,
}));

const SECRET_KEY = "winniethepooh";

app.post('/auth', (req, res) => {
    const { username, password } = req.body;

    if (username === 'system0' && password === '5yc0re') {
        // If the username and password are correct, create a JWT
        const token = jwt.sign({ username }, SECRET_KEY);
        // Send the JWT in a cookie
        res.cookie('token', token);
        res.status(200).send();
    } else {
        res.status(401).send();
    }
});

app.get('/retroshop', (req, res) => {
    // Read the JWT from the cookie
    const token = req.cookies.token;

    if (!token) {
        return res.render("errorPage", {errorCode:403, errorMessage:"You have not authenticated yourself to access this page!", errorFallback:"Please go back & ", errorFallbackRoute:"Login"});
    }

    try {
        // Verify and decode the JWT
        const data = jwt.verify(token, SECRET_KEY);

        // Check if the username is 'admin'
        if (data.username === 'samarth' || data.username === 'SAMARTH') {
            res.render("marketplace");
        } else {
            res.render("errorPage", {errorCode:401, errorMessage:"Hello system0, You are not authorized to access this page!", errorFallback:"Only 'samarth' is allowed to access this page ", errorFallbackRoute:"Login"});
        }
    } catch {
        // If the JWT is invalid, respond with a 401 status code
        res.render("heckerMeme");
    }
});


function rot47Decode(input) {
    return input.replace(/[!-~]/g, function(c) {
        return String.fromCharCode((c.charCodeAt(0) - 33 + 47) % 94 + 33);
    });
}

// Salt for the price
const spell = '36cc6f4082acd41f3d05cc1d43387e70';

app.use(express.json()); // for parsing application/json

app.post('/buy', (req, res) => {
    let {amount, price, hash1, hash2} = req.body;

    // Decode the hashes
    let decodedAmount = CryptoJS.MD5(amount.toString()).toString();
    let decodedPrice = rot47Decode(hash2);

    // Check if amount and price match with decoded hashes
    if (hash1 === decodedAmount && (price + spell).toString() === decodedPrice) {
        // Check if the decoded price is less than or equal to 5
        if (price <= 5) {
            // Check if the decoded amount is equal to 8
            if (amount === 8) {
                return res.status(200).send("VishwaCTF{s3r_y0u_d353rv3_t0_w1n}");
            } else {
                return res.status(200).send("Purchase successful");
            }
        } else {
            return res.status(401).send("Insufficient balance");
        }
    } else {
        res.status(401).send('Data Has Been Tempered!');
    }
});


// Home Page!
app.get("/", (req, res) => {
    res.render("homePage");
});

// Login Page!
app.get("/e8e53a51ba308caf79e4628357787f65", (req, res) =>{
    res.render("loginPage");
});

app.get('/robots.txt', (req, res) => {
    // res.send("User-agent: *\nNote: This App Has Rate Limit (100Reqs | 60mins) \n\nthis route might help you: /e8e53a51ba308caf79e4628357787f65");
    res.render("robots");
});


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
