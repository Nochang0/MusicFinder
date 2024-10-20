// .env
import dotenv from "dotenv";
dotenv.config();

// 라이브러리
import fs from 'fs';
import os from 'os';
import url from 'url';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// Express Option
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// import GPT from './routes/chatgpt';
// import API from './routes/myapi';
// import Home from './routes/proxy';

// Router List
// app.use('/', proxy);

app.get('/', async (req, res) => res.send('Hello, World!'));

app.listen(process.env.PORT, async () => console.log(`Server is running at http://localhost:${process.env.PORT}`));
