import * as KAKAO_OpenBuilder_Types from '../lib/KAKAO/OpenBuilder/types/skill-type';	// KAKAO.OpenBuilder

import * as KAKAO_KakaoRocket_user_Types from '../lib/KAKAO/KakaoRocket/types/user/user-type.ts';
import * as KAKAO_KakaoRocket_chat_Types from '../lib/KAKAO/KakaoRocket/types/chat/chat-type.ts';
import * as KAKAO_KakaoRocket_client_Types from '../lib/KAKAO/KakaoRocket/types/client/client-type.ts';

namespace TypeManager {
	/* KAKAO.OpenBuilder 인터페이스&타입 모음 */
	export interface SkillPayload extends KAKAO_OpenBuilder_Types.SkillPayload {};	// 스킬발화 관련 타입
	export import SkillTemplate = KAKAO_OpenBuilder_Types;			// 템플릿 관련 타입들
	
	/* KAKAO.KakaoRocket 인터페이스&타입 모음 */
	export import KC_userTypes = KAKAO_KakaoRocket_user_Types;		// 유저 관련 타입들
	export import KC_chatTypes = KAKAO_KakaoRocket_chat_Types;		// 채팅 관련 타입들
	export import KC_clientTypes = KAKAO_KakaoRocket_client_Types;	// 로그인 관련 타입들
}

export default TypeManager;