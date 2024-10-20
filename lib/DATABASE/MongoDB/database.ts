import { MongoClient, Collection, UpdateWriteOpResult } from 'mongodb';
import moment from 'moment-timezone';

interface UserList {
  [key: string]: {
    Name: string;
    UserId: string;
    UUID: string;
    ChannelId: string;
    service: {
      expiredAt: string | number;
      isUse: boolean;
    };
    Account: {
      id: number;
      pw: number;
    };
  };
}

interface UserInfo {
  roomid: string;
  name: string;
  userid: string;
}