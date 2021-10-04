import dotenv from 'dotenv';
import express from 'express';
import request from 'request';
import cors from 'cors';
import path from 'path';

dotenv.config()
const port = process.env.PROXY_SERVER_PORT;
const clientPort = process.env.CLIENT_PORT;
const apiUrl = process.env.API_SERVER_BASE_URL + ":" + process.env.API_SERVER_PORT + process.env.BACKEND_API_ROOT;
const __dirname = path.resolve();


const corsOptions = {
  origin: "http://localhost:${clientPort}",
};

const app = express();
app.options('*', cors(corsOptions))

app.use(process.env.BACKEND_API_ROOT, cors(corsOptions), (req, res) => {
    if(req.get('Referrer') == void 0) {
      // If the referrer is undefined then return 404.  This can happen if
      // someone tries to go directly to the API without being referred from
      // the react code.  This check is no substitute for using a token based
      // auth to protect the downstream API but is used to keep out the 
      // casual authenticated user.
      res.status(404).send();
    }
    else {
      const request_url = `${apiUrl}${req.url}`;
      req.pipe(request(request_url)).pipe(res);
      console.log("".concat(req.method).concat(" ").concat(request_url).concat(" ").concat(res.statusCode));
    }
});

/* liveness and health */
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'UP' });
});

app.get('/liveness', (req, res) => {
  res.status(200).send({ status: 'UP' });
});

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => console.log(`Listening on port ${port}`));