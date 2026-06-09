const U = (id, w = 1920) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

// 히어로 슬라이더
export const heroImages = [
  U('1497436072909-60f360e1d4b1'),  // 항공뷰 산림·자연 (환경을 데이터로)
  U('1451187580459-43490279c0fa'),  // 디지털 지구·데이터 (Environmental Data)
]

// ENV DX 밴드 배경
export const bandImage = U('1464822759023-fed622ff2c3b')  // 항공뷰 강·자연 경관

// 서비스 카드 (portrait 640px)
export const serviceCardImages = {
  'waste-dx':    U('1532996122724-e3c354a0b15b', 640),  // 재활용·폐기물 시설
  monitor:       U('1501854140801-50d01698950b', 640),  // 항공뷰 수로·수질
  'legal-doc':   U('1450101499163-c8848c66ca85', 640),  // 문서·데스크
  'ai-analysis': U('1581091226825-a6a2a5aee158', 640),  // 디지털·테크 시각화
}

// SubPage 헤드 배너 (32:9, 1920px)
export const subpageImages = {
  // 회사소개
  greeting:    U('1497366811353-6870744d04b2'),  // 현대적 사무실·미팅
  vision:      U('1519452575417-564c1401ecc0'),  // 비전·전략 이미지
  history:     U('1504711434969-e33886168f5c'),  // 산업·현장 역사
  brand:       U('1542744173-8e7e53415bb0'),     // 기획·창의 작업
  // 사업소개
  'waste-dx':    U('1532996122724-e3c354a0b15b'),  // 폐기물 관리
  monitor:       U('1501854140801-50d01698950b'),  // 수질 모니터링
  'legal-doc':   U('1450101499163-c8848c66ca85'),  // 법정 문서
  'ai-analysis': U('1620712943543-bcc4688e7485'),  // AI 분석 시각화
}
