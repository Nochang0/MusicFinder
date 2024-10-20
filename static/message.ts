/**
 * 카드 내부의 버튼을 정의하는 인터페이스
 * @property {("linkUrl" | "url")} type - 버튼의 타입
 * @property {string} label - 버튼에 표시되는 레이블
 * @property {Object} data - 버튼 클릭 시의 데이터
 * @property {string} [data.androidUrl] - 안드로이드 플랫폼에서 사용되는 URL
 * @property {string} data.url - 버튼 클릭 시 이동할 URL
 */
interface CardButton {
    type: "linkUrl" | "url";
    label: string;
    data: { androidUrl?: string; url: string };
}

/**
 * 카드를 정의하는 인터페이스
 * @property {string} description - 카드의 설명
 * @property {CardButton[]} buttons - 카드 내부의 버튼 목록
 */
interface Card {
    description: string;
    buttons: CardButton[];
}

/**
 * 메시지 컨텐츠를 정의하는 타입
 * @property {("card.text" | "text")} type - 컨텐츠의 타입
 * @property {Card[]} [cards] - 카드 형식의 컨텐츠일 때 사용되는 카드 목록
 * @property {string} [text] - 텍스트 형식의 컨텐츠일 때 사용되는 텍스트
 */
type Contents = { type: "card.text" | "text"; cards?: Card[]; text?: string };

/**
 * 메시지 전송을 담당하는 클래스
 * @property {(plusId: string) => Contents} signUp - 가입 메시지 생성 함수
 * @property {(text: string) => Contents} sendChat - 채팅 메시지 생성 함수
 */
interface Message {
    signUp: (plusId: string) => Contents;
    sendChat: (text: string) => Contents;
}

/**
 * 버튼을 생성하는 함수
 * @function
 * @param {("linkUrl" | "url")} type - 생성할 버튼의 타입
 * @param {string} label - 생성할 버튼의 레이블
 * @param {Object} data - 생성할 버튼의 데이터
 * @returns {CardButton} 생성된 버튼 객체
 */
const createButton = (type: CardButton["type"], label: string, data: CardButton["data"]): CardButton => ({ type, label, data });

/**
 * 메시지 객체
 * @constant
 * @type {Message}
 */
const message: Message = {
    signUp: (plusId: string) => ({
        contents: [{
            type: "card.text",
            cards: [{
                description: `10초 안에 '버튼'을 클릭해 가입을 해주셔야 하며,\n클릭하신 후 다른 채팅을 입력하시면 안됩니다.\n\n'가입 완료 메세지'가 올라오지 않았다면 실패하셨으므로,\n\n다시 메뉴바 또는 마지막 버튼인 '가입'을 이용해 재시도해주세요`,
                buttons: [
                    createButton("linkUrl", "먼저 클릭해주세요.", { androidUrl: "kakaobot://plugin/consultmode" }),
                    createButton("url", "버튼을 클릭해주세요.", { url: `kakaoplus://plusfriend/talk/chat/%40seowoneko/${encodeURI(`회원가입 ${plusId}`)}` }),
                    createButton("url", "가입 다시 시도하기", { url: `kakaoplus://plusfriend/talk/bot/%40seowoneko/${encodeURI(`가입`)}` }),
                ]
            }]
        }]
    }),

    sendChat: (text: string) => ({ contents: [{ type: "text", text }] })
};

export default message;