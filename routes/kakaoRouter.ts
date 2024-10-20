// Library
import * as url from 'url';
import express, { Request, Response, NextFunction, Router } from 'express';

// Router List (Express Event)
const KakaoRouter: Router = express.Router();


// Channel Router List
import MusicFinder from './channel/MusicFinder.ts'; // 통합 노래방 기능 채널 담당 경로
KakaoRouter.use('/MusicFinder', MusicFinder);


// 에러로 인한 서버 종료 방지 이벤트
process.on('uncaughtException', (error: Error) => {
    console.log(error);
});


export default KakaoRouter;