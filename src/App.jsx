import React, { useState, useEffect } from 'react';
import {
  Users, Building2, Search, MapPin, Calendar, CheckCircle2,
  AlertCircle, ChevronRight, User, Briefcase, FileText,
  Settings, Bell, Menu, X, Star, Heart, ArrowRight, Home,
  Clock, MoreHorizontal, Filter, AlertTriangle, BookOpen, Globe, Lock,
  CreditCard, Wallet, PlusCircle
} from 'lucide-react';

// --- CONSTANTS ---
const MATCH_COST = 10000; // Cost per interview proposal (10,000 Credits)

// --- MOCK DATA ---

const MOCK_HOSPITALS = [
  { id: 1, name: "서울시니어스 강남점", loc: "서울 강남구", img: "🏥", jobs: 3, verified: true, desc: "최신 시설을 갖춘 도심형 프리미엄 요양병원입니다." },
  { id: 2, name: "행복한요양병원", loc: "경기 성남시", img: "🏥", jobs: 1, verified: true, desc: "가족 같은 분위기의 환자 중심 병원입니다." },
  { id: 3, name: "푸른솔요양병원", loc: "인천 연수구", img: "🏥", jobs: 0, verified: false, desc: "자연 친화적인 환경의 요양 시설." },
];

const MOCK_JOBS = [
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
const INITIAL_CANDIDATES = [
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

// --- SHARED COMPONENTS ---

const Badge = ({ children, type = 'neutral' }) => {
  const styles = {
    neutral: "bg-gray-100 text-gray-800",
    primary: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    indigo: "bg-indigo-100 text-indigo-800",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[type]}`}>
      {children}
    </span>
  );
};

const ProgressBar = ({ value, label }) => (
  <div className="w-full">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-blue-700">{label}</span>
      <span className="text-sm font-medium text-blue-700">{value}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

// Credit Confirmation Modal
const CreditConfirmationModal = ({ isOpen, onClose, onConfirm, currentCredits, cost }) => {
  if (!isOpen) return null;

  const remainingCredits = currentCredits - cost;
  const isInsufficient = remainingCredits < 0;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 transform transition-all scale-100">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
          <Wallet className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-bold text-center text-slate-800 mb-2">
          크레딧이 소모됩니다
        </h3>
        <p className="text-sm text-center text-gray-600 mb-6 leading-relaxed">
          면접 제안을 진행하면 크레딧이 차감되며,<br />
          해당 매칭은 <strong>매칭 성공</strong> 상태로 전환됩니다.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">현재 보유 크레딧</span>
            <span className="font-bold text-slate-700">{currentCredits.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">소모 예정 크레딧</span>
            <span className="font-bold text-red-600">- {cost.toLocaleString()}</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between text-base">
            <span className="font-medium text-slate-800">예상 잔액</span>
            <span className={`font-bold ${isInsufficient ? 'text-red-600' : 'text-blue-600'}`}>
              {remainingCredits.toLocaleString()}
            </span>
          </div>
        </div>

        {isInsufficient && (
          <p className="text-xs text-red-500 text-center mb-4">
            ⚠️ 잔액이 부족합니다. 크레딧을 충전해주세요.
          </p>
        )}

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            disabled={isInsufficient}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-white transition-colors
              ${isInsufficient ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

// --- PAGES ---

// 1. Landing Page
const LandingPage = ({ onSelectRole }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">
        외국인 요양보호사와 요양병원을<br />
        <span className="text-blue-600">AI로 가장 빠르게 연결</span>합니다
      </h1>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl">
        복잡한 서류 검증부터 매칭까지, 케어커넥트가 도와드립니다.
      </p>
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <button onClick={() => onSelectRole('caregiver')} className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500 border-2 border-transparent transition-all text-left">
          <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-200">
            <User className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">요양보호사로 시작하기</h3>
          <p className="text-gray-500">일자리를 찾고 계신가요? <br /> 검증된 병원에서 안심하고 근무하세요.</p>
          <div className="mt-6 flex items-center text-blue-600 font-semibold">일자리 찾기 <ArrowRight className="ml-2 w-4 h-4" /></div>
        </button>
        <button onClick={() => onSelectRole('hospital')} className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500 border-2 border-transparent transition-all text-left">
          <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200">
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">병원으로 시작하기</h3>
          <p className="text-gray-500">인력이 필요하신가요? <br /> AI가 추천하는 맞춤형 인재를 만나보세요.</p>
          <div className="mt-6 flex items-center text-blue-600 font-semibold">인재 매칭받기 <ArrowRight className="ml-2 w-4 h-4" /></div>
        </button>
      </div>
    </div>
  </div>
);

// 2. Caregiver Flow
const CaregiverJobSearch = ({ onNavigate }) => {
  const [filterLoc, setFilterLoc] = useState('all');
  const filteredHospitals = MOCK_HOSPITALS.filter(h => filterLoc === 'all' || h.loc.includes(filterLoc));

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">병원 찾기</h2>
        <div className="flex space-x-2">
          <select className="border rounded-lg px-3 py-2 text-sm bg-white" value={filterLoc} onChange={(e) => setFilterLoc(e.target.value)}>
            <option value="all">지역 전체</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
          </select>
        </div>
      </div>
      {filteredHospitals.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map(hospital => (
            <div key={hospital.id} onClick={() => onNavigate('hospital_detail', { hospital })} className="bg-white rounded-xl shadow-sm border hover:shadow-md cursor-pointer transition-all overflow-hidden">
              <div className="h-32 bg-slate-100 flex items-center justify-center text-4xl">{hospital.img}</div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2"><h3 className="font-bold text-lg">{hospital.name}</h3>{hospital.verified && <Badge type="primary">인증병원</Badge>}</div>
                <div className="flex items-center text-gray-500 text-sm mb-4"><MapPin className="w-4 h-4 mr-1" />{hospital.loc}</div>
                <div className="text-sm text-gray-600 line-clamp-2 mb-4">{hospital.desc}</div>
                <div className="flex items-center justify-between pt-4 border-t"><span className="text-sm text-gray-500">진행중인 공고</span><span className="font-bold text-blue-600">{hospital.jobs}건</span></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed"><p className="text-gray-500">현재 조건에 맞는 병원이 없습니다.</p></div>
      )}
    </div>
  );
};

const CaregiverProfile = () => (
  <div className="p-6 max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">마이페이지</h2>
    <div className="bg-blue-50 p-6 rounded-xl mb-8 flex items-center justify-between">
      <div className="flex-1 mr-8">
        <h3 className="font-bold text-blue-900 mb-2">내 프로필 완성도</h3>
        <ProgressBar value={75} label="작성률" />
        <p className="text-xs text-blue-700 mt-2">* 정보 완성도가 높을수록 매칭 정확도가 올라갑니다.</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">정보 수정하기</button>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-2"><div className="bg-green-100 p-1 rounded"><Users className="w-4 h-4 text-green-700" /></div><h3 className="font-bold text-lg">기본 정보 (1차)</h3><Badge type="success">모두 공개</Badge></div>
        <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
          <div><label className="text-xs text-gray-400 block mb-1">이름</label><p className="font-medium">김마리아</p></div>
          <div><label className="text-xs text-gray-400 block mb-1">자격증</label><p className="font-medium">요양보호사 1급</p></div>
          <div><label className="text-xs text-gray-400 block mb-1">경력</label><p className="font-medium">3년 6개월</p></div>
          <div><label className="text-xs text-gray-400 block mb-1">한국어 능력</label><p className="font-medium">TOPIK 4급 (의사소통 원활)</p></div>
        </div>
        <p className="text-xs text-gray-400 px-2">이 정보는 병원 검색 결과에 노출됩니다.</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-2"><div className="bg-red-100 p-1 rounded"><AlertCircle className="w-4 h-4 text-red-700" /></div><h3 className="font-bold text-lg">상세 정보 (2차)</h3><Badge type="warning">조건부 공개</Badge></div>
        <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4 opacity-90 relative">
          <div><label className="text-xs text-gray-400 block mb-1">비자 정보</label><p className="font-medium">H-2 (만료일: 2026.12)</p></div>
          <div><label className="text-xs text-gray-400 block mb-1">학력</label><p className="font-medium">고등학교 졸업</p></div>
          <div><label className="text-xs text-gray-400 block mb-1">희망 급여</label><p className="font-medium">월 240만원 이상</p></div>
          <div><label className="text-xs text-gray-400 block mb-1">연락처</label><p className="font-medium">010-****-1234</p></div>
        </div>
        <p className="text-xs text-gray-400 px-2">이 정보는 <strong>매칭이 성사되거나 지원한 병원</strong>에만 공개됩니다.</p>
      </div>
    </div>
  </div>
);

// 3. Hospital Dashboard
const HospitalDashboard = ({ onNavigate, candidates, credits }) => {
  const uncheckedCount = candidates.filter(c => c.status === 'unchecked').length;
  const aiCount = candidates.filter(c => c.isAiRecommended).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">대시보드</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center justify-between">
          <div><p className="text-sm text-gray-500 mb-1">진행 중 채용공고</p><p className="text-3xl font-bold text-slate-800">2<span className="text-sm font-normal text-gray-400 ml-1">건</span></p></div>
          <div className="bg-blue-50 p-3 rounded-full text-blue-600"><Briefcase className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center justify-between">
          <div><p className="text-sm text-gray-500 mb-1">미확인 지원자</p><p className="text-3xl font-bold text-red-600">{uncheckedCount}<span className="text-sm font-normal text-gray-400 ml-1">명</span></p></div>
          <div className="bg-red-50 p-3 rounded-full text-red-600"><Users className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center justify-between">
          <div><p className="text-sm text-gray-500 mb-1">AI 추천 인재</p><p className="text-3xl font-bold text-indigo-600">{aiCount}<span className="text-sm font-normal text-gray-400 ml-1">명</span></p></div>
          <div className="bg-indigo-50 p-3 rounded-full text-indigo-600"><Star className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center justify-between ring-1 ring-blue-100">
          <div>
            <p className="text-sm text-gray-500 mb-1">보유 크레딧</p>
            <p className="text-2xl font-bold text-slate-800 tracking-tight">{credits.toLocaleString()}</p>
            <button onClick={() => onNavigate('credit_charge')} className="text-xs text-blue-600 font-bold hover:underline mt-1 flex items-center"><PlusCircle className="w-3 h-3 mr-1" />충전하기</button>
          </div>
          <div className="bg-yellow-50 p-3 rounded-full text-yellow-600"><CreditCard className="w-6 h-6" /></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between"><h3 className="font-bold text-lg text-slate-800">내 채용공고 관리</h3><button className="text-sm text-blue-600 font-medium hover:underline">+ 새 공고 등록</button></div>
          {MOCK_JOBS.map(job => (
            <div key={job.id} onClick={() => onNavigate('job_detail', { jobId: job.id })} className="bg-white border rounded-xl p-5 hover:shadow-md cursor-pointer transition-all flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-2 mb-2"><h4 className="font-bold text-lg">{job.title}</h4>{job.status === 'open' ? <Badge type="success">모집중</Badge> : <Badge>마감</Badge>}</div>
                <div className="text-sm text-gray-500 space-x-3"><span>{job.salary}</span><span>•</span><span>{job.type}</span><span>•</span><span>{job.period}</span></div>
              </div>
              <div className="text-right"><div className="text-sm text-gray-500 mb-1">지원자</div><div className="font-bold text-2xl text-blue-600">{job.applicants}</div></div>
            </div>
          ))}
        </div>
        <div className="bg-slate-50 rounded-xl p-6 h-fit">
          <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center"><Star className="w-5 h-5 text-yellow-500 mr-2" />AI 추천 인재</h3>
          <div className="space-y-4">
            {candidates.filter(c => c.score > 80 && c.isAiRecommended).slice(0, 3).map(candidate => (
              <div key={candidate.id} className="bg-white p-3 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-2">
                  <div><span className="font-bold block">{candidate.name}</span><span className="text-xs text-gray-500">{candidate.nationality} • {candidate.age}세</span></div>
                  <span className="text-indigo-600 font-bold text-lg">{candidate.score}점</span>
                </div>
                <div className="flex flex-wrap gap-1">{candidate.tags.map(tag => <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">#{tag}</span>)}</div>
              </div>
            ))}
            <button onClick={() => onNavigate('search')} className="w-full py-2 text-sm text-center text-gray-500 hover:text-blue-600 mt-2">인재 더보기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Job Detail Page
const JobDetail = ({ jobId, onNavigate, candidates, onRequestInterview }) => {
  const job = MOCK_JOBS.find(j => j.id === jobId) || MOCK_JOBS[0];
  const [activeTab, setActiveTab] = useState('pipeline');

  const handleProposeInterview = (id) => onRequestInterview(id);

  const handleViewCandidate = (id) => {
    onNavigate('candidate_detail', { candidateId: id });
  };

  const aiRecommended = candidates.filter(c => c.isAiRecommended);
  const allApplicants = candidates.filter(c => c.hasApplied);

  const pipelineColumns = [
    { id: 'unchecked', label: '미확인 지원자', color: 'bg-red-50 text-red-800' },
    { id: 'reviewing', label: '서류 검토중', color: 'bg-yellow-50 text-yellow-800' },
    { id: 'interview', label: '면접 진행', color: 'bg-blue-50 text-blue-800' },
    { id: 'hired', label: '채용 완료', color: 'bg-green-50 text-green-800' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen pb-20">
      <button onClick={() => onNavigate('dashboard')} className="flex items-center text-gray-500 hover:text-gray-900 mb-4">
        <ArrowRight className="w-4 h-4 mr-1 rotate-180" /> 목록으로 돌아가기
      </button>

      <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-2xl font-bold text-slate-800">{job.title}</h1>
              {job.status === 'open' ? <Badge type="success">모집중</Badge> : <Badge>마감</Badge>}
            </div>
            <div className="flex space-x-4 text-sm text-gray-600">
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {job.hospital}</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {job.type}</span>
              <span className="font-medium text-blue-600">{job.salary}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">지원자 수</div>
            <div className="font-bold text-2xl text-blue-600">{allApplicants.length}</div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <Star className="w-5 h-5 text-indigo-500 mr-2 fill-indigo-500" />
          이 공고에 딱 맞는 AI 추천 인재
        </h3>
        <div className="flex overflow-x-auto pb-4 space-x-4">
          {aiRecommended.slice(0, 5).map(c => {
            const isApplied = c.hasApplied;
            return (
              <div key={c.id} className={`min-w-[280px] rounded-xl border p-5 shadow-sm transition-all flex flex-col ${isApplied ? 'bg-white border-indigo-100 ring-1 ring-indigo-50' : 'bg-slate-50 border-gray-200'}`}>
                <div className="flex justify-between items-start mb-3">
                  {isApplied ? <Badge type="indigo">지원 완료</Badge> : <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-1 rounded-full font-bold">지원서 대기중</span>}
                  <div className="text-xl font-bold text-indigo-600">{c.score}점</div>
                </div>
                {isApplied ? (
                  <>
                    <h4 className="font-bold text-lg mb-1">{c.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{c.nationality} • {c.exp}</p>
                    <div className="flex flex-wrap gap-1 mb-4">{c.tags.map(tag => <span key={tag} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">#{tag}</span>)}</div>
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <button onClick={() => handleViewCandidate(c.id)} className="border border-gray-300 rounded-lg py-2 text-xs font-medium hover:bg-gray-50">상세 정보</button>
                      <button onClick={() => handleProposeInterview(c.id)} disabled={c.status === 'interview'} className={`rounded-lg py-2 text-xs font-medium ${c.status === 'interview' ? 'bg-green-100 text-green-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>{c.status === 'interview' ? '면접 진행중' : '면접 제안'}</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="font-bold text-lg mb-1 text-slate-400 filter blur-[2px]">김OO</h4>
                    <p className="text-sm text-gray-500 mb-3">{c.nationality} • 경력 {c.exp}</p>
                    <div className="flex flex-wrap gap-1 mb-4 opacity-70">{c.tags.slice(0, 2).map(tag => <span key={tag} className="text-xs bg-gray-200 px-1.5 py-0.5 rounded text-gray-500">#{tag}</span>)}</div>
                    <div className="grid grid-cols-1 mt-auto">
                      <button onClick={() => handleViewCandidate(c.id)} className="border border-gray-300 rounded-lg py-2 text-xs font-medium hover:bg-gray-50 bg-white">상세 정보</button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-6 mb-6 border-b">
          <button onClick={() => setActiveTab('pipeline')} className={`pb-3 px-1 font-bold text-sm flex items-center border-b-2 transition-colors ${activeTab === 'pipeline' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}><Building2 className="w-4 h-4 mr-2" />채용 진행 현황</button>
          <button onClick={() => setActiveTab('list')} className={`pb-3 px-1 font-bold text-sm flex items-center border-b-2 transition-colors ${activeTab === 'list' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}><Users className="w-4 h-4 mr-2" />전체 지원자 목록<span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{allApplicants.length}</span></button>
        </div>

        {activeTab === 'pipeline' ? (
          <div className="grid grid-cols-4 gap-4 min-h-[400px]">
            {pipelineColumns.map(col => {
              const colCandidates = allApplicants.filter(c => c.status === col.id);
              return (
                <div key={col.id} className="bg-slate-50 rounded-xl border flex flex-col h-full">
                  <div className={`p-3 font-bold text-sm border-b rounded-t-xl flex justify-between items-center ${col.color}`}>{col.label}<span className="bg-white/50 px-2 py-0.5 rounded-full text-xs">{colCandidates.length}</span></div>
                  <div className="p-2 space-y-2 flex-1 overflow-y-auto max-h-[500px]">
                    {colCandidates.map(c => (
                      <div key={c.id} onClick={() => handleViewCandidate(c.id)} className={`bg-white p-3 rounded-lg border shadow-sm cursor-pointer hover:shadow-md transition-all group relative ${col.id === 'unchecked' ? 'border-l-4 border-l-red-400' : 'border-gray-200'}`}>
                        <div className="flex justify-between items-start mb-1"><span className="font-bold text-slate-800">{c.name}</span>{c.isAiRecommended && <Star className="w-3 h-3 text-indigo-500 fill-indigo-500" />}</div>
                        <p className="text-xs text-gray-500">{c.nationality} • {c.exp}</p>

                        {col.id === 'reviewing' && (
                          <div className="mt-2 pt-2 border-t hidden group-hover:flex justify-end">
                            <button onClick={(e) => { e.stopPropagation(); handleProposeInterview(c.id); }} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 font-medium">면접 제안</button>
                          </div>
                        )}
                      </div>
                    ))}
                    {colCandidates.length === 0 && <div className="h-full flex items-center justify-center text-xs text-gray-400 italic py-10">없음</div>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b"><tr><th className="px-6 py-3 font-medium">이름</th><th className="px-6 py-3 font-medium">국적 / 비자</th><th className="px-6 py-3 font-medium">경력</th><th className="px-6 py-3 font-medium">현재 단계</th><th className="px-6 py-3 font-medium">관리</th></tr></thead>
              <tbody className="divide-y">
                {allApplicants.map(c => (
                  <tr key={c.id} onClick={() => handleViewCandidate(c.id)} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 font-medium flex items-center">{c.isAiRecommended && <Star className="w-3 h-3 text-indigo-500 fill-indigo-500 mr-2" />}{c.name}</td>
                    <td className="px-6 py-4 text-gray-600">{c.nationality} ({c.visa})</td>
                    <td className="px-6 py-4 text-gray-600">{c.exp}</td>
                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-medium ${c.status === 'unchecked' ? 'bg-red-100 text-red-700' : c.status === 'reviewing' ? 'bg-yellow-100 text-yellow-700' : c.status === 'interview' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{c.status === 'unchecked' ? '미확인' : c.status === 'reviewing' ? '검토중' : c.status === 'interview' ? '면접중' : '합격'}</span></td>
                    <td className="px-6 py-4"><button className="text-gray-400 hover:text-blue-600"><ChevronRight className="w-5 h-5" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// 5. Credit Charge Page
const CreditChargePage = ({ currentCredits, onCharge, onBack }) => {
  const chargeOptions = [
    { label: "10,000 P", value: 10000, price: "10,000원" },
    { label: "50,000 P", value: 50000, price: "50,000원", bonus: "+5%" },
    { label: "100,000 P", value: 100000, price: "100,000원", bonus: "+10%" },
  ];

  const handleCharge = (amount) => {
    if (window.confirm(`${amount.toLocaleString()}원을 결제하시겠습니까? (테스트)`)) {
      onCharge(amount);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto min-h-screen flex flex-col justify-center">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-slate-900 mb-6 self-start">
        <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> 돌아가기
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
        <div className="bg-slate-800 p-6 text-white text-center">
          <p className="text-slate-300 text-sm mb-1">현재 보유 크레딧</p>
          <h1 className="text-3xl font-bold">{currentCredits.toLocaleString()} P</h1>
        </div>

        <div className="p-6">
          <h2 className="font-bold text-lg mb-4 text-slate-800">충전 금액 선택</h2>
          <div className="space-y-3">
            {chargeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleCharge(opt.value)}
                className="w-full flex justify-between items-center p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 group-hover:bg-blue-200">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-slate-800">{opt.label}</span>
                    {opt.bonus && <span className="text-xs text-red-500 font-bold">{opt.bonus} 추가 적립</span>}
                  </div>
                </div>
                <span className="font-medium text-gray-500 group-hover:text-blue-600">{opt.price}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-center text-gray-400 mt-6">
            * 본 페이지는 프로토타입이며 실제 결제는 이루어지지 않습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

// 6. HospitalSearch Component (Restored)
const HospitalSearch = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">인재 검색</h2>
        <div className="text-sm text-gray-500">검색 결과: <span className="font-bold text-blue-600">12명</span>의 추천 인재가 있습니다.</div>
      </div>
      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0 space-y-6">
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <h3 className="font-bold mb-4 text-sm">필터</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">국적</label>
                <select className="w-full border rounded p-2 text-sm"><option>전체</option><option>중국</option><option>베트남</option><option>필리핀</option></select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">한국어 능력</label>
                <div className="space-y-2">
                  <label className="flex items-center text-sm"><input type="checkbox" className="mr-2" /> 네이티브 수준</label>
                  <label className="flex items-center text-sm"><input type="checkbox" className="mr-2" /> 의사소통 가능</label>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">자격증 여부</label>
                <label className="flex items-center text-sm"><input type="checkbox" className="mr-2" defaultChecked /> 요양보호사 자격증</label>
              </div>
            </div>
            <button className="w-full bg-slate-800 text-white py-2 rounded-lg text-sm mt-6">검색 적용</button>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          {INITIAL_CANDIDATES.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-xl border shadow-sm flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">{c.gender === '남' ? '👨' : '👩'}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1"><h3 className="font-bold text-lg">{c.name}</h3><Badge type="neutral">{c.age}세</Badge>{c.verification === 'certified' && <Badge type="primary">인증회원</Badge>}</div>
                  <div className="text-sm text-gray-500 mb-2">{c.nationality} • {c.visa} • 경력 {c.exp}</div>
                  <div className="flex gap-2">{c.tags.map(t => <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>)}</div>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="text-sm text-gray-400 mb-4">기본 정보만 공개됨 (1차)</div>
                <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">정보 공개 요청</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 7. Candidate Detail Page (Unchanged)
const CandidateDetail = ({ candidate, onNavigate, onBack, onRequestInterview }) => {
  const isVisaWarning = candidate.visaRemaining.includes('개월');
  const isBlind = !candidate.hasApplied;

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen pb-20">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-slate-900 mb-6 group">
        <ArrowRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
        채용 상세 페이지로 돌아가기
      </button>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-slate-800">{isBlind ? "비공개 (지원 전)" : candidate.name}</h1>
          {candidate.isAiRecommended && <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold flex items-center"><Star className="w-3 h-3 mr-1 fill-current" /> AI 추천 {candidate.score}점</span>}
          {isBlind ? <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">지원서 대기중</span> : <span className={`px-3 py-1 rounded-full text-sm font-medium ${candidate.status === 'unchecked' ? 'bg-red-100 text-red-700' : candidate.status === 'reviewing' ? 'bg-yellow-100 text-yellow-700' : candidate.status === 'interview' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{candidate.status === 'unchecked' ? '미확인' : candidate.status === 'reviewing' ? '서류 검토중' : candidate.status === 'interview' ? '면접 진행중' : '합격'}</span>}
        </div>
        <div className="text-sm text-gray-500">최종 정보 수정일: {candidate.lastUpdated}</div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><User className="w-5 h-5 mr-2 text-gray-500" /> 기본 인적 정보</h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div><span className="block text-xs text-gray-500 mb-1">이름</span><span className={`font-medium ${isBlind ? 'text-gray-400 blur-sm select-none' : 'text-slate-800'}`}>{isBlind ? "김OO" : candidate.name}</span></div>
              <div><span className="block text-xs text-gray-500 mb-1">나이 / 성별</span><span className={`font-medium ${isBlind ? 'text-gray-400 blur-sm select-none' : 'text-slate-800'}`}>{isBlind ? "00세 / 성별" : `${candidate.age}세 / ${candidate.gender}`}</span></div>
              <div><span className="block text-xs text-gray-500 mb-1">국적</span><span className="font-medium text-slate-800">{candidate.nationality}</span></div>
              <div><span className="block text-xs text-gray-500 mb-1">종교 (선택)</span><span className={`font-medium ${isBlind ? 'text-gray-400 blur-sm select-none' : 'text-slate-800'}`}>{isBlind ? "종교무관" : candidate.religion}</span></div>
              <div className="col-span-2 border-t pt-4"><span className="block text-xs text-gray-500 mb-1">주소</span><span className={`font-medium ${isBlind ? 'text-gray-400 blur-sm select-none' : 'text-slate-800'}`}>{isBlind ? "주소 비공개" : candidate.address}</span></div>
              <div className="col-span-2"><span className="block text-xs text-gray-500 mb-1">연락처</span><span className={`font-medium ${isBlind ? 'text-gray-400 blur-sm select-none' : 'text-slate-800'}`}>{isBlind ? "010-****-****" : candidate.contact}</span></div>
            </div>
            {isBlind && <div className="mt-4 flex items-center justify-center p-2 bg-gray-50 rounded-lg text-xs text-gray-500"><Lock className="w-3 h-3 mr-1" /> 기본 정보는 지원서 제출 후 공개됩니다.</div>}
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><Briefcase className="w-5 h-5 mr-2 text-gray-500" /> 근무 조건 및 경험</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg"><span className="block text-xs text-gray-500 mb-1">희망 근무 지역</span><div className="font-medium text-slate-800">{candidate.workRegion}</div></div>
                <div className="bg-gray-50 p-3 rounded-lg"><span className="block text-xs text-gray-500 mb-1">근무 가능 형태</span><div className="font-medium text-slate-800">{candidate.workType}</div></div>
                <div className="bg-gray-50 p-3 rounded-lg"><span className="block text-xs text-gray-500 mb-1">근무 시작 가능일</span><div className="font-medium text-slate-800">{candidate.workStart}</div></div>
              </div>
              <div className="border-t pt-4"><h3 className="font-bold text-sm mb-2 text-slate-700">경력 요약</h3><p className="text-sm text-gray-600 bg-slate-50 p-3 rounded-lg">{candidate.expSummary}</p></div>
              <div className="border-t pt-4"><h3 className="font-bold text-sm mb-2 text-slate-700">신체적 제약 사항</h3><p className="text-sm text-gray-600">{candidate.physicalLimit}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><FileText className="w-5 h-5 mr-2 text-gray-500" /> 자기소개</h2>
            {isBlind ? <div className="bg-gray-50 p-8 rounded-lg text-sm text-gray-400 flex flex-col items-center justify-center border-2 border-dashed border-gray-200"><Lock className="w-6 h-6 mb-2 text-gray-300" />해당 정보는 지원서 제출 후 확인할 수 있습니다</div> : <div className="bg-slate-50 p-4 rounded-lg text-sm leading-relaxed text-gray-700 whitespace-pre-line">{candidate.selfIntro}</div>}
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><BookOpen className="w-5 h-5 mr-2 text-gray-500" /> 학력 및 자격</h2>
            <div className="space-y-4">
              <div><span className="block text-xs text-gray-500 mb-1">최종 학력</span><div className="font-medium text-slate-800">{candidate.edu}</div></div>
              <div><span className="block text-xs text-gray-500 mb-1">보유 자격증</span><div className="flex flex-wrap gap-2 mt-1">{candidate.licenses.map((lic, idx) => <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">{lic}</span>)}</div></div>
              <div><span className="block text-xs text-gray-500 mb-1">한국어 능력</span><div className="font-bold text-indigo-600 text-lg">{candidate.korean}</div></div>
            </div>
          </div>
          <div className={`bg-white rounded-xl border p-6 shadow-sm ${isVisaWarning ? 'border-red-200 ring-4 ring-red-50' : ''}`}>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><Globe className="w-5 h-5 mr-2 text-gray-500" /> 비자 정보</h2>
            {isVisaWarning && <div className="bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-bold flex items-center mb-4"><AlertTriangle className="w-4 h-4 mr-2" /> 비자 만료 임박</div>}
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2"><span className="text-sm text-gray-500">비자 종류</span><span className="font-medium">{candidate.visa}</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-sm text-gray-500">만료일</span><span className="font-medium">{candidate.visaDate}</span></div>
              <div className="flex justify-between"><span className="text-sm text-gray-500">잔여 기간</span><span className={`font-bold ${isVisaWarning ? 'text-red-600' : 'text-green-600'}`}>{candidate.visaRemaining}</span></div>
            </div>
          </div>
          {!isBlind && (
            <div className="bg-slate-800 rounded-xl p-6 text-white shadow-lg">
              <h3 className="font-bold mb-2">채용 의사가 있으신가요?</h3>
              <p className="text-sm text-slate-300 mb-4">면접을 제안하면 지원자에게 알림이 전송되며, 채용 단계가 '면접 진행'으로 변경됩니다.</p>
              <button onClick={() => onRequestInterview(candidate.id)} disabled={candidate.status === 'interview'} className={`w-full font-bold py-3 rounded-lg transition-colors ${candidate.status === 'interview' ? 'bg-green-600 cursor-default' : 'bg-blue-600 hover:bg-blue-500'}`}>{candidate.status === 'interview' ? '면접 제안 완료' : '면접 제안하기'}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- APP SHELL ---

const App = () => {
  const [role, setRole] = useState(null);
  const [page, setPage] = useState('landing');
  const [navParams, setNavParams] = useState({});
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [credits, setCredits] = useState(50000);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, candidateId: null });

  const handleNavigate = (targetPage, params = {}) => {
    setPage(targetPage);
    setNavParams(params);
    window.scrollTo(0, 0);
    if (targetPage === 'candidate_detail' && params.candidateId) {
      setCandidates(prev => prev.map(c => {
        if (c.id === params.candidateId && c.status === 'unchecked') return { ...c, status: 'reviewing' };
        return c;
      }));
    }
  };

  const handleOpenCreditModal = (candidateId) => setModalConfig({ isOpen: true, candidateId });
  const handleCloseCreditModal = () => setModalConfig({ isOpen: false, candidateId: null });

  const handleConfirmMatch = () => {
    if (credits < MATCH_COST) {
      alert("크레딧이 부족합니다. 충전 후 다시 시도해주세요.");
      return;
    }
    setCredits(prev => prev - MATCH_COST);
    if (modalConfig.candidateId) {
      setCandidates(prev => prev.map(c => c.id === modalConfig.candidateId ? { ...c, status: 'interview' } : c));
    }
    handleCloseCreditModal();
    alert("면접 제안이 완료되었습니다. (크레딧 차감 완료)");
  };

  const handleChargeCredits = (amount) => {
    setCredits(prev => prev + amount);
    alert(`${amount.toLocaleString()} 크레딧 충전이 완료되었습니다.`);
    handleNavigate('dashboard');
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'caregiver') handleNavigate('caregiver_search');
    else handleNavigate('dashboard');
  };

  const handleLogout = () => {
    setRole(null);
    setPage('landing');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-white border-b sticky top-0 z-50 h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavigate(role ? (role === 'hospital' ? 'dashboard' : 'caregiver_search') : 'landing')}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-2"><Heart className="w-5 h-5 fill-current" /></div>
            <span className="font-bold text-xl tracking-tight text-slate-900">DuruCares</span>
          </div>
          {role === 'caregiver' && <nav className="hidden md:flex space-x-8 text-sm font-medium"><button onClick={() => handleNavigate('caregiver_search')} className={`${page === 'caregiver_search' ? 'text-blue-600' : 'text-gray-500'}`}>병원 찾기</button><button onClick={() => handleNavigate('caregiver_profile')} className={`${page === 'caregiver_profile' ? 'text-blue-600' : 'text-gray-500'}`}>마이페이지</button></nav>}
          {role === 'hospital' && <nav className="hidden md:flex space-x-8 text-sm font-medium"><button onClick={() => handleNavigate('dashboard')} className={`${page === 'dashboard' ? 'text-blue-600' : 'text-gray-500'}`}>대시보드</button><button onClick={() => handleNavigate('search')} className={`${page === 'search' ? 'text-blue-600' : 'text-gray-500'}`}>인재 검색</button></nav>}
          <div className="flex items-center space-x-4">
            {role ? (
              <>
                <div className="relative"><Bell className="w-5 h-5 text-gray-500" /><span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span></div>
                <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-slate-900">로그아웃</button>
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden"><User className="w-full h-full p-1 text-gray-500" /></div>
              </>
            ) : (
              <div className="flex space-x-4 text-sm font-medium text-gray-600"><span>홈</span><span>회사소개</span><span>서비스 소개</span></div>
            )}
          </div>
        </div>
      </header>

      <main>
        {page === 'landing' && <LandingPage onSelectRole={handleRoleSelect} />}
        {page === 'caregiver_search' && <CaregiverJobSearch onNavigate={handleNavigate} />}
        {page === 'caregiver_profile' && <CaregiverProfile />}
        {page === 'dashboard' && <HospitalDashboard onNavigate={handleNavigate} candidates={candidates} credits={credits} />}
        {page === 'job_detail' && <JobDetail jobId={navParams.jobId} onNavigate={handleNavigate} candidates={candidates} onRequestInterview={handleOpenCreditModal} />}
        {page === 'candidate_detail' && <CandidateDetail candidate={candidates.find(c => c.id === navParams.candidateId)} onNavigate={handleNavigate} onBack={() => handleNavigate('job_detail', { jobId: 201 })} onRequestInterview={handleOpenCreditModal} />}
        {page === 'credit_charge' && <CreditChargePage currentCredits={credits} onCharge={handleChargeCredits} onBack={() => handleNavigate('dashboard')} />}
        {page === 'search' && <HospitalSearch />}

        {page === 'hospital_detail' && (
          <div className="max-w-4xl mx-auto p-6">
            <button onClick={() => handleNavigate('caregiver_search')} className="text-gray-500 mb-4 flex items-center text-sm"><ArrowRight className="w-4 h-4 rotate-180 mr-1" /> 목록으로</button>
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="text-6xl mb-4">{navParams.hospital?.img}</div>
              <h2 className="text-3xl font-bold mb-2">{navParams.hospital?.name}</h2>
              <p className="text-gray-500 mb-8">{navParams.hospital?.desc}</p>
              <div className="text-left border-t pt-8"><h3 className="font-bold mb-4">현재 채용중인 공고</h3><div className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer"><div><h4 className="font-bold">주간 전담 요양보호사</h4><p className="text-sm text-gray-500">월 250만원 • 식사 제공</p></div><button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">지원하기</button></div></div>
            </div>
          </div>
        )}
      </main>

      <CreditConfirmationModal isOpen={modalConfig.isOpen} onClose={handleCloseCreditModal} onConfirm={handleConfirmMatch} currentCredits={credits} cost={MATCH_COST} />
    </div>
  );
};

export default App;