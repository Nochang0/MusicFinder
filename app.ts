// .env
import dotenv from "dotenv";
dotenv.config();

// Library
import fs from 'fs';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import { EventEmitter } from 'events';
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response, NextFunction } from 'express';

// Express Option
const app: Application = express();

// Custom Router
import Kakao_Router from './routes/kakaoRouter';		// 카카오 관련 API

// Router List
app.use('/kakao', Kakao_Router);

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 시작 세팅 이벤트
const Emitter = new EventEmitter();


// 서버 접속 테스트
// app.use('/', async (req: Request, res: Response, next: NextFunction) => res.status(200).send("Hello World!"));


// Run Server
app.listen(process.env.PORT || process.env.PORT, () => {
	Emitter.emit('setting');
	console.log(`Custom API Server on port ${process.env.PORT}!`);
});


// 에러로 인한 서버 종료 방지 이벤트
process.on('uncaughtException', (error: Error) => {
    console.log(error);
});


export default app;