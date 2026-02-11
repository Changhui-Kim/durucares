import React from 'react';
import { ArrowRight, Star, User, Lock, Briefcase, FileText, BookOpen, Globe, AlertTriangle } from 'lucide-react';

const CandidateDetail = ({ candidate, onNavigate, onBack, onRequestInterview }) => {
    const isVisaWarning = candidate.visaRemaining.includes('개월');
    const isBlind = !candidate.hasApplied;

    return (
        <div className="p-6 max-w-5xl mx-auto min-h-screen pb-20">
            <button onClick={onBack} className="flex items-center text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white mb-6 group transition-colors">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
                채용 상세 페이지로 돌아가기
            </button>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{isBlind ? "비공개 (지원 전)" : candidate.name}</h1>
                    {candidate.isAiRecommended && <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-bold flex items-center"><Star className="w-3 h-3 mr-1 fill-current" /> AI 추천 {candidate.score}점</span>}
                    {isBlind ? <span className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">지원서 대기중</span> : <span className={`px-3 py-1 rounded-full text-sm font-medium ${candidate.status === 'unchecked' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' : candidate.status === 'reviewing' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' : candidate.status === 'interview' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'}`}>{candidate.status === 'unchecked' ? '미확인' : candidate.status === 'reviewing' ? '서류 검토중' : candidate.status === 'interview' ? '면접 진행중' : '합격'}</span>}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">최종 정보 수정일: {candidate.lastUpdated}</div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-6 shadow-sm transition-colors">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center"><User className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" /> 기본 인적 정보</h2>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                            <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">이름</span><span className={`font-medium ${isBlind ? 'text-gray-400 dark:text-gray-600 blur-sm select-none' : 'text-slate-800 dark:text-gray-200'}`}>{isBlind ? "김OO" : candidate.name}</span></div>
                            <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">나이 / 성별</span><span className={`font-medium ${isBlind ? 'text-gray-400 dark:text-gray-600 blur-sm select-none' : 'text-slate-800 dark:text-gray-200'}`}>{isBlind ? "00세 / 성별" : `${candidate.age}세 / ${candidate.gender}`}</span></div>
                            <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">국적</span><span className="font-medium text-slate-800 dark:text-gray-200">{candidate.nationality}</span></div>
                            <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">종교 (선택)</span><span className={`font-medium ${isBlind ? 'text-gray-400 dark:text-gray-600 blur-sm select-none' : 'text-slate-800 dark:text-gray-200'}`}>{isBlind ? "종교무관" : candidate.religion}</span></div>
                            <div className="col-span-2 border-t dark:border-slate-700 pt-4"><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">주소</span><span className={`font-medium ${isBlind ? 'text-gray-400 dark:text-gray-600 blur-sm select-none' : 'text-slate-800 dark:text-gray-200'}`}>{isBlind ? "주소 비공개" : candidate.address}</span></div>
                            <div className="col-span-2"><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">연락처</span><span className={`font-medium ${isBlind ? 'text-gray-400 dark:text-gray-600 blur-sm select-none' : 'text-slate-800 dark:text-gray-200'}`}>{isBlind ? "010-****-****" : candidate.contact}</span></div>
                        </div>
                        {isBlind && <div className="mt-4 flex items-center justify-center p-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg text-xs text-gray-500 dark:text-gray-400"><Lock className="w-3 h-3 mr-1" /> 기본 정보는 지원서 제출 후 공개됩니다.</div>}
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-6 shadow-sm transition-colors">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center"><Briefcase className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" /> 근무 조건 및 경험</h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 dark:bg-slate-700/50 p-3 rounded-lg"><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">희망 근무 지역</span><div className="font-medium text-slate-800 dark:text-gray-200">{candidate.workRegion}</div></div>
                                <div className="bg-gray-50 dark:bg-slate-700/50 p-3 rounded-lg"><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">근무 가능 형태</span><div className="font-medium text-slate-800 dark:text-gray-200">{candidate.workType}</div></div>
                                <div className="bg-gray-50 dark:bg-slate-700/50 p-3 rounded-lg"><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">근무 시작 가능일</span><div className="font-medium text-slate-800 dark:text-gray-200">{candidate.workStart}</div></div>
                            </div>
                            <div className="border-t dark:border-slate-700 pt-4"><h3 className="font-bold text-sm mb-2 text-slate-700 dark:text-gray-300">경력 요약</h3><p className="text-sm text-gray-600 dark:text-gray-400 bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg">{candidate.expSummary}</p></div>
                            <div className="border-t dark:border-slate-700 pt-4"><h3 className="font-bold text-sm mb-2 text-slate-700 dark:text-gray-300">신체적 제약 사항</h3><p className="text-sm text-gray-600 dark:text-gray-400">{candidate.physicalLimit}</p></div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-6 shadow-sm transition-colors">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center"><FileText className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" /> 자기소개</h2>
                        {isBlind ? <div className="bg-gray-50 dark:bg-slate-700/50 p-8 rounded-lg text-sm text-gray-400 dark:text-gray-500 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-slate-600"><Lock className="w-6 h-6 mb-2 text-gray-300 dark:text-gray-600" />해당 정보는 지원서 제출 후 확인할 수 있습니다</div> : <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">{candidate.selfIntro}</div>}
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-6 shadow-sm transition-colors">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center"><BookOpen className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" /> 학력 및 자격</h2>
                        <div className="space-y-4">
                            <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">최종 학력</span><div className="font-medium text-slate-800 dark:text-gray-200">{candidate.edu}</div></div>
                            <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">보유 자격증</span><div className="flex flex-wrap gap-2 mt-1">{candidate.licenses.map((lic, idx) => <span key={idx} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-bold">{lic}</span>)}</div></div>
                            <div><span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">한국어 능력</span><div className="font-bold text-indigo-600 dark:text-indigo-400 text-lg">{candidate.korean}</div></div>
                        </div>
                    </div>
                    <div className={`bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 p-6 shadow-sm transition-colors ${isVisaWarning ? 'border-red-200 dark:border-red-900/50 ring-4 ring-red-50 dark:ring-red-900/20' : ''}`}>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center"><Globe className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" /> 비자 정보</h2>
                        {isVisaWarning && <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-sm font-bold flex items-center mb-4"><AlertTriangle className="w-4 h-4 mr-2" /> 비자 만료 임박</div>}
                        <div className="space-y-3">
                            <div className="flex justify-between border-b dark:border-slate-700 pb-2"><span className="text-sm text-gray-500 dark:text-gray-400">비자 종류</span><span className="font-medium text-slate-900 dark:text-gray-200">{candidate.visa}</span></div>
                            <div className="flex justify-between border-b dark:border-slate-700 pb-2"><span className="text-sm text-gray-500 dark:text-gray-400">만료일</span><span className="font-medium text-slate-900 dark:text-gray-200">{candidate.visaDate}</span></div>
                            <div className="flex justify-between"><span className="text-sm text-gray-500 dark:text-gray-400">잔여 기간</span><span className={`font-bold ${isVisaWarning ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{candidate.visaRemaining}</span></div>
                        </div>
                    </div>
                    {!isBlind && (
                        <div className="bg-slate-800 dark:bg-slate-700 rounded-xl p-6 text-white shadow-lg transition-colors">
                            <h3 className="font-bold mb-2">채용 의사가 있으신가요?</h3>
                            <p className="text-sm text-slate-300 dark:text-gray-300 mb-4">면접을 제안하면 지원자에게 알림이 전송되며, 채용 단계가 '면접 진행'으로 변경됩니다.</p>
                            <button onClick={() => onRequestInterview(candidate.id)} disabled={candidate.status === 'interview'} className={`w-full font-bold py-3 rounded-lg transition-colors ${candidate.status === 'interview' ? 'bg-green-600 cursor-default' : 'bg-blue-600 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500'}`}>{candidate.status === 'interview' ? '면접 제안 완료' : '면접 제안하기'}</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CandidateDetail;
