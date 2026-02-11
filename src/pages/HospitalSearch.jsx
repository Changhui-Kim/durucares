import React from 'react';
import Badge from '../components/Badge';
import { INITIAL_CANDIDATES } from '../data/mockData';

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

export default HospitalSearch;
