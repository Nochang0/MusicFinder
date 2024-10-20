// Library
import * as fs from 'fs';
import * as url from 'url';
import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction, Router } from 'express';

// Custom Library
import KAKAO from '../../lib/KAKAO/KAKAO.ts';		// 카카오 API

// TypeManager
import TypeManager from '../../typeList/TypeManager.ts';

// 서원냥이 Router (Express Event)
const router: Router = express.Router();

// Channel Router List
import JoinManage from './musicfinder/join.ts';			// 유저 가입 및 탈퇴 관리
router.use('/', JoinManage);

// import ChatManage from './seowon/chat.ts';			// 주요 기능 및 메세지 전송
// router.use('/', ChatManage);


// 에러로 인한 서버 종료 방지 이벤트
process.on('uncaughtException', (error: Error) => console.log(error));

export = router;