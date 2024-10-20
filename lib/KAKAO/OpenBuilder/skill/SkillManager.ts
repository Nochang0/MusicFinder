import * as SkillTemplate_V2 from '../types/skill-type.ts';
import { baseMold } from '../types/skill-type.ts';

class SubFunctions {
	// 템플릿 기본설정 빌드
	protected static _build(_skillForm: SkillTemplate_V2.TemplateType): baseMold {
		return { version: "2.0", template: { outputs: [_skillForm] } };
	}
}


class SkillManager extends SubFunctions {
	
	// 템플릿 기본설정 빌드 (카로셀 용)
	public static buildTemplate(skillForm: SkillTemplate_V2.TemplateType): baseMold {
		return { version: "2.0", template: { outputs: [skillForm] } };
	}
	
	// 버튼 세부 템플릿 출력 (action: 버튼 동작, label: 버튼 명, SuppleOption: 부가 설정 값)
	public static buildButton(action: SkillTemplate_V2.ButtonType, label: string, SuppleOption: any): SkillTemplate_V2.ButtonForm {
		// 필수 요소
		let basicForm: SkillTemplate_V2.ButtonForm = {
			action: action,
			label: label
		};
		
		switch(action) {
			case 'webLink': 		// URL 리다이렉트
				basicForm.webLinkUrl = SuppleOption;
				break;
			case 'message':			// 메세지 보내기
				basicForm.messageText = SuppleOption;
				break;
			case 'phone':			// 전화하기
				basicForm.phoneNumber = SuppleOption;
				break;
			case 'block':			// 챗봇블록 상호작용
				basicForm.blockId = SuppleOption;
				break;
			case 'share': break;	// 공유하기
			default: break;
		}
		return basicForm;
	}
	
	// 텍스트형 메세지
	public static simpleText(text: string): baseMold {
		// 메세지 구성
		const skill: SkillTemplate_V2.SimpleText = { simpleText: { text: text } };
		// Template Build
		const _buildForm: baseMold = SkillManager._build(skill);
		return _buildForm;
	}
	
	// 이미지형 메세지
	public static simpleImage(imageUrl: string, altText: string): baseMold {
		// 메세지 구성
		const skill: SkillTemplate_V2.SimpleImage = {
			simpleImage: {
				imageUrl: imageUrl,
				altText: altText,
			}
		};
		// Template Build
		const _buildForm: baseMold = SkillManager._build(skill);
		return _buildForm;
	}
	
	// 텍스트 카드형 메세지 (카로셀 설정)
	public static textCard(isBuild: boolean, title?: string | undefined, description?: string | undefined, buttonOption?: SkillTemplate_V2.ButtonForm | false, forwardable?: boolean): baseMold | SkillTemplate_V2.TextCard {
		
		// 메세지 구성
		const skill: SkillTemplate_V2.TextCard = {
			textCard: {
				title: title || '',
				description: description || '',
				buttons: !buttonOption ? [] : [buttonOption],
				forwardable: false || forwardable
			}
		};
		// 카로셀 용 빌드 제한
		if (!isBuild) return skill;
		// Template Build
		const _buildForm: baseMold = SkillManager._build(skill);
		return _buildForm;
	}
	
	// 기본 카드형 메세지 (카로셀 설정)
	public static basicCard(isBuild: boolean, thumbnailOption: SkillTemplate_V2.ThumbnailForm, title?: string | undefined, description?: string | undefined, buttonOption?: SkillTemplate_V2.ButtonForm | false, forwardable?: boolean): baseMold | SkillTemplate_V2.BasicCard {
		// 메세지 구성
		const skill: SkillTemplate_V2.BasicCard = {
			basicCard: {
				thumbnail: thumbnailOption,
				title: title || '',
				description: description || '',
				buttons: !buttonOption ? [] : [buttonOption],
				forwardable: !forwardable ? false : forwardable
			}
		};
		// 카로셀 용 빌드 제한
		if (!isBuild) return skill;
		// Template Build
		const _buildForm: baseMold = SkillManager._build(skill);
		return _buildForm;
	}
	
	// 카로셀형 메세지
	public static carousel(type: SkillTemplate_V2.CaroselType, items: SkillTemplate_V2.CaroselItemType, headerOption?: Object | undefined): baseMold {
		// 메세지 구성
		const skill: SkillTemplate_V2.Carousel = {
			carousel: {
				type: type,
				items: items || [],
				header: !headerOption ? {} : headerOption
			}
		};
		// Template Build
		const _buildForm: baseMold = SkillManager._build(skill);
		return _buildForm;
	}
}

export default SkillManager;