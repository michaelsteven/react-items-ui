const express = require('express');
const request = require('request')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const port = process.env.PROXY_SERVER_PORT;
const apiUrl = process.env.API_SERVER_BASE_URL + ":" + process.env.API_SERVER_PORT + process.env.BACKEND_API_ROOT

const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true)
    },
}
const app = express();
app.options('*', cors(corsOptions))

app.use(process.env.BACKEND_API_ROOT, cors(corsOptions), (req, res) => {
    const request_url = `${apiUrl}${req.url}`
    console.log(request_url)
    req.pipe(request(request_url)).pipe(res)
});

/* liveness and health */
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'UP' });
});

app.get('/liveness', (req, res) => {
  res.status(200).send({ status: 'UP' });
});

app.use(cors())

app.listen(port, () => console.log(`Listening on port ${port}`));