import React, { useState } from 'react';
import { ArrowRight, MapPin, Clock, Star, Building2, Users, ChevronRight } from 'lucide-react';
import Badge from '../components/Badge';
import { MOCK_JOBS } from '../data/mockData';

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
        { id: 'unchecked', label: '미확인 지원자', color: 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
        { id: 'reviewing', label: '서류 검토중', color: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' },
        { id: 'interview', label: '면접 진행', color: 'bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' },
        { id: 'hired', label: '채용 완료', color: 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen pb-20">
            <button onClick={() => onNavigate('dashboard')} className="flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4 transition-colors">
                <ArrowRight className="w-4 h-4 mr-1 rotate-180" /> 목록으로 돌아가기
            </button>

            <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6 mb-8 shadow-sm transition-colors">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{job.title}</h1>
                            {job.status === 'open' ? <Badge type="success">모집중</Badge> : <Badge>마감</Badge>}
                        </div>
                        <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {job.hospital}</span>
                            <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {job.type}</span>
                            <span className="font-medium text-blue-600 dark:text-blue-400">{job.salary}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">지원자 수</div>
                        <div className="font-bold text-2xl text-blue-600 dark:text-blue-400">{allApplicants.length}</div>
                    </div>
                </div>
            </div>

            <div className="mb-10">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                    <Star className="w-5 h-5 text-indigo-500 mr-2 fill-indigo-500" />
                    이 공고에 딱 맞는 AI 추천 인재
                </h3>
                <div className="flex overflow-x-auto pb-4 space-x-4">
                    {aiRecommended.slice(0, 5).map(c => {
                        const isApplied = c.hasApplied;
                        return (
                            <div key={c.id} className={`min-w-[280px] rounded-xl border dark:border-slate-700 p-5 shadow-sm transition-all flex flex-col ${isApplied ? 'bg-white dark:bg-slate-800 border-indigo-100 dark:border-indigo-900/50 ring-1 ring-indigo-50 dark:ring-indigo-900/30' : 'bg-slate-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700'}`}>
                                <div className="flex justify-between items-start mb-3">
                                    {isApplied ? <Badge type="indigo">지원 완료</Badge> : <span className="bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-300 text-[10px] px-2 py-1 rounded-full font-bold">지원서 대기중</span>}
                                    <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{c.score}점</div>
                                </div>
                                {isApplied ? (
                                    <>
                                        <h4 className="font-bold text-lg mb-1 text-slate-800 dark:text-white">{c.name}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{c.nationality} • {c.exp}</p>
                                        <div className="flex flex-wrap gap-1 mb-4">{c.tags.map(tag => <span key={tag} className="text-xs bg-gray-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300">#{tag}</span>)}</div>
                                        <div className="grid grid-cols-2 gap-2 mt-auto">
                                            <button onClick={() => handleViewCandidate(c.id)} className="border dark:border-slate-600 rounded-lg py-2 text-xs font-medium hover:bg-gray-50 dark:hover:bg-slate-700 text-slate-700 dark:text-gray-300">상세 정보</button>
                                            <button onClick={() => handleProposeInterview(c.id)} disabled={c.status === 'interview'} className={`rounded-lg py-2 text-xs font-medium ${c.status === 'interview' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500'}`}>{c.status === 'interview' ? '면접 진행중' : '면접 제안'}</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h4 className="font-bold text-lg mb-1 text-slate-400 dark:text-slate-500 filter blur-[2px]">김OO</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">{c.nationality} • 경력 {c.exp}</p>
                                        <div className="flex flex-wrap gap-1 mb-4 opacity-70">{c.tags.slice(0, 2).map(tag => <span key={tag} className="text-xs bg-gray-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-gray-500 dark:text-gray-400">#{tag}</span>)}</div>
                                        <div className="grid grid-cols-1 mt-auto">
                                            <button onClick={() => handleViewCandidate(c.id)} className="border dark:border-slate-600 rounded-lg py-2 text-xs font-medium hover:bg-gray-50 dark:hover:bg-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-gray-300">상세 정보</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <div className="flex items-center space-x-6 mb-6 border-b dark:border-slate-700">
                    <button onClick={() => setActiveTab('pipeline')} className={`pb-3 px-1 font-bold text-sm flex items-center border-b-2 transition-colors ${activeTab === 'pipeline' ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}><Building2 className="w-4 h-4 mr-2" />채용 진행 현황</button>
                    <button onClick={() => setActiveTab('list')} className={`pb-3 px-1 font-bold text-sm flex items-center border-b-2 transition-colors ${activeTab === 'list' ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}><Users className="w-4 h-4 mr-2" />전체 지원자 목록<span className="ml-2 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">{allApplicants.length}</span></button>
                </div>

                {activeTab === 'pipeline' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-h-[400px]">
                        {pipelineColumns.map(col => {
                            const colCandidates = allApplicants.filter(c => c.status === col.id);
                            return (
                                <div key={col.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border dark:border-slate-700 flex flex-col h-full">
                                    <div className={`p-3 font-bold text-sm border-b dark:border-slate-700 rounded-t-xl flex justify-between items-center ${col.color}`}>{col.label}<span className="bg-white/50 dark:bg-black/20 px-2 py-0.5 rounded-full text-xs">{colCandidates.length}</span></div>
                                    <div className="p-2 space-y-2 flex-1 overflow-y-auto max-h-[500px]">
                                        {colCandidates.map(c => (
                                            <div key={c.id} onClick={() => handleViewCandidate(c.id)} className={`bg-white dark:bg-slate-800 p-3 rounded-lg border dark:border-slate-700 shadow-sm cursor-pointer hover:shadow-md transition-all group relative ${col.id === 'unchecked' ? 'border-l-4 border-l-red-400 dark:border-l-red-500' : 'border-gray-200'}`}>
                                                <div className="flex justify-between items-start mb-1"><span className="font-bold text-slate-800 dark:text-white">{c.name}</span>{c.isAiRecommended && <Star className="w-3 h-3 text-indigo-500 fill-indigo-500" />}</div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{c.nationality} • {c.exp}</p>

                                                {col.id === 'reviewing' && (
                                                    <div className="mt-2 pt-2 border-t dark:border-slate-700 hidden group-hover:flex justify-end">
                                                        <button onClick={(e) => { e.stopPropagation(); handleProposeInterview(c.id); }} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 font-medium">면접 제안</button>
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
                    <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl overflow-hidden overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-slate-700 text-gray-500 dark:text-gray-400 border-b dark:border-slate-600"><tr><th className="px-6 py-3 font-medium whitespace-nowrap">이름</th><th className="px-6 py-3 font-medium whitespace-nowrap">국적 / 비자</th><th className="px-6 py-3 font-medium whitespace-nowrap">경력</th><th className="px-6 py-3 font-medium whitespace-nowrap">현재 단계</th><th className="px-6 py-3 font-medium whitespace-nowrap">관리</th></tr></thead>
                            <tbody className="divide-y dark:divide-slate-700">
                                {allApplicants.map(c => (
                                    <tr key={c.id} onClick={() => handleViewCandidate(c.id)} className="hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                                        <td className="px-6 py-4 font-medium flex items-center text-slate-900 dark:text-white whitespace-nowrap">{c.isAiRecommended && <Star className="w-3 h-3 text-indigo-500 fill-indigo-500 mr-2" />}{c.name}</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.nationality} ({c.visa})</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">{c.exp}</td>
                                        <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 rounded text-xs font-medium ${c.status === 'unchecked' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' : c.status === 'reviewing' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' : c.status === 'interview' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'}`}>{c.status === 'unchecked' ? '미확인' : c.status === 'reviewing' ? '검토중' : c.status === 'interview' ? '면접중' : '합격'}</span></td>
                                        <td className="px-6 py-4 whitespace-nowrap"><button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"><ChevronRight className="w-5 h-5" /></button></td>
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

export default JobDetail;
