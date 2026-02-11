import React from 'react';
import { Briefcase, Users, Star, CreditCard, PlusCircle } from 'lucide-react';
import Badge from '../components/Badge';
import { MOCK_JOBS } from '../data/mockData';

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

export default HospitalDashboard;
