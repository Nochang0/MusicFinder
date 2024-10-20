import KAKAO from '../../KAKAO';
import { InsideCodeData, InsideKakaoTokenData } from '../types/WebClientTypes.ts'

async function Example() {
	
	// 카카오 웹 로그인 예전 쿠키 (유효기간이 지난)
	const Old_Cookie: string = "_ga=GA1.2.8986162.1697164196; _karb=D3f9t8yPE2Y7-KGo_1697164245340; _ga_KTER7VTHPK=GS1.2.1697448410.2.0.1697448410.0.0.0; _T_ANO=LuPEC++j8eyVTquvNX/3z9/J5jjM1p3XmpZ/J/9qmtPHVo5a10qtkvNHzf6t1sM3pclYUqhElW/tiFEG+PSXs4eFkiP+czxdmFMdJ6gBg3LePPBmfkWhX1gFfhW8ODVSfJw+OlFW6MlGFDQBq0yCX9MQK+bPnC+6YQMuZIajIGKmMbn7OxFTB/FxMoEjiBGXgKrW6dtfJHrzwFeLHZDzp+IDrawBn3rrp5U7HeE8g3oFkouIwX64soNxwFTqur/pBsmptfIg8CEuTYXa8B19Pgdm5Z7qbI10sJV/P/dc+AcWpRisG/ZWjXEHoP3+JAblqGsyjP1kJwoxzbAOLNM1wQ==; _kawlt=104wvnmFsJ9xHxR53G3SOyObrV-__9YuTfQeYx38qjTGop4zJttkiEhXXgCvrkSGWG-A8YsZ9Wov4WAEJCaKiGruxs4IDRqrOhK9VNRHJWjsH097udYKZNLdsxKxNHSu; _kawltea=1702194414; _karmt=ksCUnpC9IbDXk3RHhBf-f-_hvBmkCTWh4nCyuUxjc8_xVQzNUy1pfGzmOKw_21oG; _karmtea=1704721614; _kahai=5288230154509edfbc4b29334b2c9320f350c3d3976ad56a7317d3018ed6bdaf; _kaslt=3zBXcM3N2TpZD75HepYnCZD737Czw9R4u1Hvk5aL/0Ksc2kck34Xm0DFXjw+ZgByIOiJWU3D/IQlSpqzPwGZVg==";
	
	// 카카오 웹 로그인 최신 쿠키
	const Cookie: string = "_kau=7604d4211ad26e4643c9372cb623cf53bc874dccb0b1cef9a641adf4647ab60a; _kahai=5288230154509edfbc4b29334b2c9320f350c3d3976ad56a7317d3018ed6bdaf; _karb=_LBeSWNEYxVnEu-D_1704957656285; _T_ANO=Sct667CgbjmX5c49Qb/RdqUiWonVmpsOjjBvCaGKv/bW3T57PeKad8cNQjnmnmeoEOqs8pqSkkZ+Q4oBGt1YiD1sfs2YcenRFUiJMGlcawAwOhbofRgV4LjF6wG9d1QUIundjIGp80IlhcYE15mwIP2cdX4r5tWOACW6s0h0PAgrdDCzXI8FT6iEWTlAI/aBnMP6Oqk6DGogK3eqtXbPYSGSJAe6ar/U2FJHp83BIYI5yUSv7zTWYUCtXFa1JKpWjjht6Teie5f11H/x4cMG/xdrDDqWJhUx9OLMy6OODKSqGvYE7cv4HqLC1vU/7VrBpKcJjxTkgJ0V2PlQbyLawg==; _kawlt=VAdcYp1Qkdf1XY0KhZNMBPNXOGTt_vIXDghEPg4vrRPwKKZH4555sfKOlh3_lw3jBPfjuWo7VwGfN6SrlaQE6oEGn8rdkTiXTFj8wpqMKNeY7GUmP2lbehJxm4TYdjms; _kawltea=1705033285; _karmt=DHOHcpVlDJ9s5nqwpxsCygNbP-y7B1ib_fSFx_LPHgQTCHXc6TRU4o2Wym7s6fUU; _karmtea=1707560485; _kaslt=FgUVPwVdZnURuWg8gR/Kwuiz+M4r+MKsJM2XN4imXf8dQm4vncrnxCyZGm322xcCCtdLB0NPATRVaPCt9W7J2Q==";
	
	// 카카오 웹 로그인 & 카카오톡 채널 토큰 가져오기
	const KakaoWebClient: string | boolean = await KAKAO.WebClient.Login(Cookie);
	if (typeof KakaoWebClient === 'boolean') return console.log(KakaoWebClient);
	console.log(KakaoWebClient);
	
	
	/** 이 코드를 테스트할 시 SubFunctions 클래스 함수들을 public 변환
		// 1차 인증 코드 얻기
		const Web_Token: InsideCodeData | boolean = await KAKAO.SubFunctions.getToken(Cookie);
		if (typeof Web_Token === 'boolean') return console.log(Web_Token);

		// 2차 인증 코드 얻기
		const Verify_Code: string | boolean = await KAKAO.SubFunctions.getVerifyCode(Cookie, Web_Token);
		if (typeof Verify_Code === 'boolean') return console.log(Verify_Code);

		// 카카오 채널 토큰 얻기 (refresh_token)
		const Channel_Token: InsideKakaoTokenData | boolean = await KAKAO.SubFunctions.getKakaoToken(Verify_Code);
		if (typeof Channel_Token === 'boolean') return console.log(Channel_Token);
		console.log(Channel_Token);
	*/

}

Example();

// clear && ts-node KakaoWebLoginTest