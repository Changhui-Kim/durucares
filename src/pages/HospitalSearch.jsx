import React from 'react';
import Badge from '../components/Badge';
import { INITIAL_CANDIDATES } from '../data/mockData';

const HospitalSearch = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">인재 검색</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">검색 결과: <span className="font-bold text-blue-600 dark:text-blue-400">12명</span>의 추천 인재가 있습니다.</div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border dark:border-slate-700 shadow-sm transition-colors">
                        <h3 className="font-bold mb-4 text-sm text-slate-900 dark:text-white">필터</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">국적</label>
                                <select className="w-full border dark:border-slate-600 rounded p-2 text-sm bg-white dark:bg-slate-700 dark:text-white"><option>전체</option><option>중국</option><option>베트남</option><option>필리핀</option></select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">한국어 능력</label>
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm text-slate-900 dark:text-gray-200"><input type="checkbox" className="mr-2" /> 네이티브 수준</label>
                                    <label className="flex items-center text-sm text-slate-900 dark:text-gray-200"><input type="checkbox" className="mr-2" /> 의사소통 가능</label>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">자격증 여부</label>
                                <label className="flex items-center text-sm text-slate-900 dark:text-gray-200"><input type="checkbox" className="mr-2" defaultChecked /> 요양보호사 자격증</label>
                            </div>
                        </div>
                        <button className="w-full bg-slate-800 dark:bg-slate-700 text-white py-2 rounded-lg text-sm mt-6 hover:bg-slate-700 dark:hover:bg-slate-600">검색 적용</button>
                    </div>
                </div>
                <div className="flex-1 space-y-4">
                    {INITIAL_CANDIDATES.map((c) => (
                        <div key={c.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-start justify-between transition-colors">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-2xl">{c.gender === '남' ? '👨' : '👩'}</div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1"><h3 className="font-bold text-lg text-slate-900 dark:text-white">{c.name}</h3><Badge type="neutral">{c.age}세</Badge>{c.verification === 'certified' && <Badge type="primary">인증회원</Badge>}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{c.nationality} • {c.visa} • 경력 {c.exp}</div>
                                    <div className="flex gap-2 flex-wrap">{c.tags.map(t => <span key={t} className="text-xs bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-gray-300">{t}</span>)}</div>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end mt-4 sm:mt-0 w-full sm:w-auto">
                                <div className="text-sm text-gray-400 mb-4 hidden sm:block">기본 정보만 공개됨 (1차)</div>
                                <button className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors w-full sm:w-auto">정보 공개 요청</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HospitalSearch;
