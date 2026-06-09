export const company = {
  name: 'ENV-DX',
  tagline: '환경을 데이터로, 현장을 시스템으로',
  intro: [
    'ENV-DX는 폐기물·수질·대기 환경 관리의 디지털 전환을 선도하는 환경 DX 전문 기업입니다.',
    '현장 실무 7년의 도메인 경험을 기반으로, 중소 환경업체가 실제로 필요한 데이터 분석·법정 문서 자동화·IoT 모니터링 솔루션을 설계하고 제공합니다.',
  ],
  offices: [
    {
      label: '본사',
      address: '부산광역시 동구 중앙대로 000, 000호',
      tel: '051-000-0000',
      fax: '051-000-0001',
    },
  ],
  familySites: [
    { name: '환경부', url: 'https://www.me.go.kr' },
    { name: '올바로시스템', url: 'https://www.allbaro.or.kr' },
    { name: '환경산업기술원', url: 'https://www.keiti.re.kr' },
    { name: '고용24', url: 'https://www.work24.go.kr' },
  ],
  footerLinks: [
    { label: '개인정보처리방침', to: '/privacy', strong: true },
    { label: '이용약관', to: '/terms', strong: false },
  ],
  copyright: 'Copyright © ENV-DX. All rights reserved.',
}

export const nav = [
  {
    label: '회사소개',
    to: '/about/greeting',
    children: [
      { label: 'CEO 인사말',   to: '/about/greeting' },
      { label: '비전/가치',    to: '/about/vision'   },
      { label: '연혁',         to: '/about/history'  },
      { label: '브랜드 소개',  to: '/about/brand'    },
    ],
  },
  {
    label: '사업소개',
    to: '/services/waste-dx',
    children: [
      { label: '폐기물 DX',        to: '/services/waste-dx'   },
      { label: '수질·대기 모니터링', to: '/services/monitor'    },
      { label: '법정 문서 자동화',  to: '/services/legal-doc'  },
      { label: 'AI 환경 분석',     to: '/services/ai-analysis'},
    ],
  },
  {
    label: '동영상',
    to: '/videos',
    children: [
      { label: 'AI 관련',     to: '/videos' },
      { label: 'AI 리터러시', to: '/videos' },
    ],
  },
  {
    label: '문의',
    to: '/contact',
    children: [
      { label: '도입 문의', to: '/contact' },
    ],
  },
]

export const serviceCards = [
  {
    key: 'waste-dx',
    to: '/services/waste-dx',
    title: '폐기물 DX',
    desc: '올바로시스템 연동 · 전자 위수탁 자동화 · 처리실적 대시보드',
  },
  {
    key: 'monitor',
    to: '/services/monitor',
    title: '수질·대기 모니터링',
    desc: 'IoT 방지시설 센서 연동 · 방류수 자동 측정 · 실시간 대시보드',
  },
  {
    key: 'legal-doc',
    to: '/services/legal-doc',
    title: '법정 문서 자동화',
    desc: 'AI 기반 환경 법령 서류 초안 작성 · 규정 준수 자동 검토',
  },
  {
    key: 'ai-analysis',
    to: '/services/ai-analysis',
    title: 'AI 환경 분석',
    desc: '환경 데이터 이상 감지 · 오염 추이 예측 · AI 리터러시 교육',
  },
]

export const serviceDetail = {
  'waste-dx': {
    title: '폐기물 DX',
    summary: '올바로시스템 연동부터 처리실적 데이터 분석까지',
    body: [
      '전자 위수탁 인계서 자동 처리, 처리실적 데이터 분석, 법정 보고 자동화로 일 평균 8건 이상의 수탁·배출 서류를 데이터 파이프라인으로 전환합니다.',
      '올바로시스템과의 API 연동을 통해 실시간으로 위수탁 현황을 모니터링하고, 이상 건수를 자동으로 알림합니다.',
    ],
    highlights: ['올바로시스템 연동', '전자 위수탁 자동화', '처리실적 대시보드', '이상 건수 알림'],
  },
  monitor: {
    title: '수질·대기 모니터링',
    summary: 'IoT 센서와 AI가 결합된 방지시설 관제',
    body: [
      '수질·대기 오염방지시설에 IoT 센서를 연동하여 운영일지를 자동 생성하고 방류수·배출가스를 실시간 모니터링합니다.',
      '방류수 COD 자가측정 데이터를 시계열로 누적하여 이상 패턴 감지 및 법정 기준 초과 예측 모델을 제공합니다.',
    ],
    highlights: ['IoT 센서 연동', '방류수 자동 측정', '실시간 대시보드', '법정 기준 초과 예측'],
  },
  'legal-doc': {
    title: '법정 문서 자동화',
    summary: 'AI가 초안을 작성하고 사람이 검토한다',
    body: [
      '수탁확인서·처리실적보고·위수탁 계약서 등 환경 법정 서류를 AI로 자동 작성하고 규정 준수 여부를 실시간으로 검토합니다.',
      'LLM 기반 서류 초안 생성과 규정 DB 기반 검증을 결합해 검토 시간을 대폭 단축합니다.',
    ],
    highlights: ['AI 서류 초안 작성', '규정 준수 자동 검토', '전자 서명 연동', '감사 이력 관리'],
  },
  'ai-analysis': {
    title: 'AI 환경 분석',
    summary: '환경 데이터의 이상을 먼저 찾아낸다',
    body: [
      '환경 측정 데이터의 이상값을 AI로 자동 감지하고 오염물질 배출 추이를 예측합니다.',
      '환경 담당자를 위한 AI 리터러시 교육 콘텐츠와 실무 적용 가이드도 함께 제공합니다.',
    ],
    highlights: ['이상값 자동 감지', '오염 추이 예측', 'AI 리터러시 교육', '실무 적용 가이드'],
  },
}

export const notices = [
  { id: 1, title: 'K-뉴딜 아카데미 환경 DX 분야 교육 파트너 선정', date: '2026.06.05' },
  { id: 2, title: '올바로시스템 API 연동 모듈 v2.0 배포',           date: '2026.05.20' },
  { id: 3, title: '수질 COD 예측 모델 정확도 92% 달성 — 실증 결과 발표', date: '2026.04.15' },
  { id: 4, title: '부산·울산·경남 중소 환경업체 DX 지원 사업 참여 신청 안내', date: '2026.03.30' },
]

export const aboutContent = {
  greeting: {
    title: 'CEO 인사말',
    ceo: '대표 유미',
    message: [
      'ENV-DX는 폐기물 처리 현장에서 직접 수행한 실무 경험을 디지털 기술로 전환하는 것에서 출발했습니다.',
      '하루 5~10건의 폐유 수분 분석, 일 평균 8건의 위수탁 서류 처리, 방류수 COD 자가측정—이 모든 반복 업무가 데이터로 전환될 수 있다는 것을 현장에서 깨달았습니다.',
      '저희는 대기업이 아닌 중소 환경업체의 현실에 맞는 솔루션을 만듭니다. 현장을 알기 때문에 현장에 맞는 도구를 설계할 수 있습니다.',
      '환경 관리의 디지털 전환, ENV-DX와 함께 시작하세요.',
    ],
  },
  vision: {
    title: '비전/가치',
    visionStatement: '환경 데이터로 더 안전한 현장을, 더 투명한 관리를',
    values: [
      { title: '현장 중심',   body: '도메인 전문성을 기반으로 실제 현장에서 쓰이는 도구를 만든다.' },
      { title: '데이터 정직', body: '법정 기준에 기반한 측정·기록 습관을 디지털로 이어간다.' },
      { title: '점진적 전환', body: '한 번에 모든 것을 바꾸지 않는다. 현장이 적응할 수 있는 속도로.' },
      { title: '개방적 협력', body: '환경부·올바로시스템·지자체와 열린 연동 구조를 추구한다.' },
    ],
  },
  history: {
    title: '연혁',
    items: [
      { year: '2026', events: ['K-뉴딜 아카데미 환경 DX 교육 파트너 선정', '올바로시스템 API v2 배포'] },
      { year: '2025', events: ['ENV-DX 법인 설립', '수질 COD 예측 모델 개발', '부울경 환경업체 DX 컨설팅 시작'] },
      { year: '2024', events: ['환경 DX 솔루션 기획 시작', '폐기물 위수탁 자동화 프로토타입'] },
      { year: '2017–2020', events: ['(주)지오환경 환경관리부 대리 — 폐유 수분 분석·위수탁 서류·방지시설 관리'] },
    ],
  },
  brand: {
    title: '브랜드 소개',
    concept: 'ENV-DX의 브랜드는 "땅(地·Geo)과 환경(環境)을 데이터로 연결한다"는 의미를 담습니다.',
    colors: [
      { name: 'Sky Blue #0EA5E9', desc: '데이터와 디지털의 흐름' },
      { name: 'Eco Green #16A34A', desc: '환경과 지속 가능성' },
      { name: 'Deep Navy #0C1A2E', desc: '신뢰와 전문성' },
    ],
  },
}

export const inquiryTypes = [
  { value: '',             label: '문의 유형 선택' },
  { value: 'waste-dx',    label: '폐기물 DX 도입 문의' },
  { value: 'monitor',     label: '수질·대기 모니터링 문의' },
  { value: 'legal-doc',   label: '법정 문서 자동화 문의' },
  { value: 'ai-analysis', label: 'AI 환경 분석 문의' },
  { value: 'education',   label: 'AI 리터러시 교육 문의' },
  { value: 'other',       label: '기타 문의' },
]
