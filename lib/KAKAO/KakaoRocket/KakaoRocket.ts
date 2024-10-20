import Config from './config.ts';				// 환경변수
import Client from './client/client.ts';		// 로그인
import User from './user/user.ts';				// 유저
import Chat from './chat/chat.ts';				// 채팅
import Channel from './channel/channel.ts';		// 채널


class KakaoRocket {
	static Config = Config;
	static Client = Client;
	static User = User;
	static Chat = Chat;
	static Channel = Channel;
}

export default KakaoRocket;