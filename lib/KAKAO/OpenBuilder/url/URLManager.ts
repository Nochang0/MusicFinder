/*
 * 유저는 talk, 관리자는 chat 단어 설정
 */

type chatMode = '상담원' | '챗봇';

class URLManager {
	// 상담원 채팅 전환
	public static readonly ConsultChatMode: string = "kakaobot://plugin/consultmode";
	
	// 메세지 전송 리다이렉트 링크 출력 (isMode: {true: 상담원, false: 봇}, channel_search_id: 채널검색 ID, text: 보낼 메세지)
	public static setTalkURL(isMode: chatMode, channel_search_id: string, text: string): string {
		const _chatMode: string = isMode == '상담원' ? 'chat' : 'bot';	// 채팅모드 설정
		return `kakaoplus://plusfriend/talk/${_chatMode}/%40${channel_search_id.trim()}/${encodeURI(text)}`;
	}
}

export default URLManager;