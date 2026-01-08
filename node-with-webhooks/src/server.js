require("dotenv").config();
const express = require("express");
const axios = require("axios").default;
const logger = require('./logger');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3120;

app.use(express.json());

// Routes
app.use('/users', userRoutes);

app.get("/", (req, res) =>
  res.send(`
  <html>
    <head><title>User Management API</title></head>
    <body>
      <h1>User Management API</h1>
      <p>Endpoints: GET/POST /users, GET/PUT/DELETE /users/:id</p>
      <img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" alt="Cool kid doing thumbs up" />
    </body>
  </html>
`)
);

app.post("/github", (req, res) => {
  const content = ":wave: Hi mom!";
  const avatarUrl =
    "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif";
  axios
    .post(process.env.DISCORD_WEBHOOK_URL, {
      content: content,
      embeds: [
        {
          image: {
            url: avatarUrl,
          },
        },
      ],
    })
    .then((discordResponse) => {
      console.log("Success!");
      res.status(204).send();
    })
    .catch((err) => console.error(`Error sending to Discord: ${err}`));
});

// Centralized error handling
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
});
