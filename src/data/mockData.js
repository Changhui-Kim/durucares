
export const MATCH_COST = 10000; // Cost per interview proposal (10,000 Credits)

export const MOCK_HOSPITALS = [
    { id: 1, name: "서울시니어스 강남점", loc: "서울 강남구", img: "🏥", jobs: 3, verified: true, desc: "최신 시설을 갖춘 도심형 프리미엄 요양병원입니다." },
    { id: 2, name: "행복한요양병원", loc: "경기 성남시", img: "🏥", jobs: 1, verified: true, desc: "가족 같은 분위기의 환자 중심 병원입니다." },
    { id: 3, name: "푸른솔요양병원", loc: "인천 연수구", img: "🏥", jobs: 0, verified: false, desc: "자연 친화적인 환경의 요양 시설." },
];

export const MOCK_JOBS = [
    {
        id: 201, title: "오후/야간 전담 요양보호사 모집", hospital: "서울시니어스 강남점",
        salary: "월 250만원", period: "1년 이상", type: "계약직",
        status: "open", applicants: 5, aiMatches: 3
    },
    {
        id: 202, title: "주말 파트타임 구합니다", hospital: "서울시니어스 강남점",
        salary: "시급 1.3만원", period: "6개월", type: "파트타임",
        status: "closed", applicants: 12, aiMatches: 0
    }
];

// Enhanced Candidate Data
export const INITIAL_CANDIDATES = [
    {
        id: 101, name: "김마리아", age: 45, nationality: "베트남", visa: "H-2",
        korean: "TOPIK 4급", exp: "3년", score: 98,
        status: "reviewing", isAiRecommended: true, hasApplied: true,
        tags: ["치매케어우수", "야간근무가능"], verification: "certified",
        edu: "하노이 고등학교 졸업", gender: "여", details: "성실하고 힘이 셉니다.",
        address: "경기도 수원시 팔달구", contact: "010-1234-5678", religion: "천주교",
        licenses: ["요양보호사 1급", "운전면허 2종"],
        visaDate: "2026.12.31", visaRemaining: "1년 10개월",
        workRegion: "서울, 경기 남부", workType: "주간 / 야간 전담", workStart: "즉시 가능",
        expSummary: "한국 요양병원 근무 3년 (치매 병동 전담)", physicalLimit: "없음 (40kg 이상 들 수 있음)",
        selfIntro: "저는 베트남에서 간호 조무사로 일했던 경험이 있어 환자 돌봄에 익숙합니다. 한국 어르신들을 부모님처럼 모시겠습니다. 야간 근무도 문제 없습니다.",
        lastUpdated: "2025.02.10"
    },
    {
        id: 102, name: "이철수", age: 38, nationality: "중국", visa: "F-4",
        korean: "네이티브", exp: "5년", score: 95,
        status: "not_applied", isAiRecommended: true, hasApplied: false,
        tags: ["운전가능", "즉시출근"], verification: "certified",
        edu: "연변과학기술대학 졸업", gender: "남", details: "한국 거주 10년차입니다.",
        address: "서울시 구로구", contact: "010-9876-5432", religion: "무교",
        licenses: ["요양보호사 1급", "간호조무사"],
        visaDate: "2025.06.30", visaRemaining: "4개월",
        workRegion: "서울 전역", workType: "교대 근무 선호", workStart: "2주 후 가능",
        expSummary: "재가 방문 요양 2년, 요양원 3년", physicalLimit: "허리 디스크 약간 있음 (무거운 짐 주의)",
        selfIntro: "성실함이 저의 가장 큰 무기입니다. 남자 요양보호사가 필요한 곳에서 힘쓰는 일과 운전까지 도맡아 할 수 있습니다.",
        lastUpdated: "2025.02.01"
    },
    {
        id: 103, name: "수잔", age: 29, nationality: "필리핀", visa: "E-9",
        korean: "TOPIK 2급", exp: "1년", score: 88,
        status: "interview", isAiRecommended: true, hasApplied: true,
        tags: ["영어능통"], verification: "pending",
        edu: "필리핀 국립대 간호학과 중퇴", gender: "여", details: "배우려는 자세가 되어있습니다.",
        address: "인천시 부평구", contact: "010-5555-7777", religion: "기독교",
        licenses: ["요양보호사 교육 이수"],
        visaDate: "2027.03.15", visaRemaining: "2년",
        workRegion: "인천, 부천", workType: "주간 근무", workStart: "협의 필요",
        expSummary: "필리핀 병원 실습 1년", physicalLimit: "없음",
        selfIntro: "아직 한국어가 서툴지만 열심히 배우고 있습니다. 밝은 미소로 환자분들에게 힘이 되어드리고 싶습니다.",
        lastUpdated: "2025.02.12"
    },
    {
        id: 104, name: "박영희", age: 52, nationality: "중국 (조선족)", visa: "F-4",
        korean: "네이티브", exp: "10년", score: 75,
        status: "unchecked", isAiRecommended: false, hasApplied: true,
        tags: ["경력직", "조리불가"], verification: "certified",
        edu: "고졸", gender: "여", details: "오래 일할 곳 찾습니다.",
        address: "서울시 영등포구", contact: "010-1111-2222", religion: "불교",
        licenses: ["요양보호사 1급", "한식조리사"],
        visaDate: "2028.01.01", visaRemaining: "3년",
        workRegion: "서울 영등포, 구로", workType: "파트타임 가능", workStart: "즉시 가능",
        expSummary: "한국 식당 5년, 간병인 5년", physicalLimit: "관절염 약간 있음",
        selfIntro: "경력이 많아 눈치가 빠릅니다. 식사 도움과 말벗 해드리는 것을 잘합니다. 오래 일할 수 있는 병원을 찾습니다.",
        lastUpdated: "2025.01.20"
    },
    {
        id: 105, name: "응우옌", age: 24, nationality: "베트남", visa: "D-2",
        korean: "TOPIK 3급", exp: "신입", score: 60,
        status: "unchecked", isAiRecommended: false, hasApplied: true,
        tags: ["성실함"], verification: "pending",
        edu: "한국 대학교 재학중", gender: "남", details: "주말만 가능합니다.",
        address: "서울시 동대문구", contact: "010-3333-4444", religion: "무교",
        licenses: ["없음"],
        visaDate: "2026.02.28", visaRemaining: "1년",
        workRegion: "서울 강북", workType: "주말 파트타임", workStart: "학기 중 가능",
        expSummary: "편의점 아르바이트 1년", physicalLimit: "없음",
        selfIntro: "한국에서 대학을 다니고 있는 유학생입니다. 학비 마련을 위해 주말에 요양보호 보조 업무를 하고 싶습니다.",
        lastUpdated: "2025.02.14"
    },
];
