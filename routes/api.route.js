require('dotenv').config();
const router = require('express').Router();
const { google } = require('googleapis');

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;


var refresh_token_test;
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:3000'

);

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post("/create-tokens", async (req, res, next) => {
  try {
    const { code } = req.body;
    const { tokens } = await oauth2Client.getToken(code);
    res.send(tokens);
    refresh_token_test = tokens.refresh_token;
    console.log(refresh_token_test);
  } catch (error) {
    next(error);
  }
});

router.post('/create-event', async (req, res, next) => {
  try {
    console.log(req.body);
    const { summary, description, location, startDateTime, endDateTime } = req.body;
    oauth2Client.setCredentials({ refresh_token: refresh_token_test });
    const calendar = google.calendar('v3');
    console.log("To this step or not???");
    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      requestBody: {
        summary: summary,
        description: description,
        location: location,
        colorId: '5',
        start: {
          dateTime: new Date(startDateTime),
        },
        end: {
          dateTime: new Date(endDateTime),
        },
        attendees: [
          {
            email: 'sexytub9999@gmail.com',
          },
        ]
      },
    })
    console.log("To this step or not???");
    res.send(response)

  } catch (error) {
    next(error);
  }
})

module.exports = router;

// Colon ID:
// 1 blue
// 2 green
// 3 purple
// 4 red
// 5 yellow
// 6 orange
// 7 turquoise
// 8 gray
// 9 bold blue
// 10 bold green
// 11 bold red