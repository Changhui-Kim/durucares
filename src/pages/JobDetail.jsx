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

export default JobDetail;
