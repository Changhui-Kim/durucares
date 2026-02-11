import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import Badge from '../components/Badge';
import { MOCK_HOSPITALS } from '../data/mockData';

const CaregiverJobSearch = ({ onNavigate }) => {
    const [filterLoc, setFilterLoc] = useState('all');
    const filteredHospitals = MOCK_HOSPITALS.filter(h => filterLoc === 'all' || h.loc.includes(filterLoc));

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">병원 찾기</h2>
                <div className="flex space-x-2">
                    <select className="border dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 dark:text-white" value={filterLoc} onChange={(e) => setFilterLoc(e.target.value)}>
                        <option value="all">지역 전체</option>
                        <option value="서울">서울</option>
                        <option value="경기">경기</option>
                    </select>
                </div>
            </div>
            {filteredHospitals.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHospitals.map(hospital => (
                        <div key={hospital.id} onClick={() => onNavigate('hospital_detail', { hospital })} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700 hover:shadow-md cursor-pointer transition-all overflow-hidden">
                            <div className="h-32 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-4xl">{hospital.img}</div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2"><h3 className="font-bold text-lg text-slate-900 dark:text-white">{hospital.name}</h3>{hospital.verified && <Badge type="primary">인증병원</Badge>}</div>
                                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4"><MapPin className="w-4 h-4 mr-1" />{hospital.loc}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">{hospital.desc}</div>
                                <div className="flex items-center justify-between pt-4 border-t dark:border-slate-700"><span className="text-sm text-gray-500 dark:text-gray-400">진행중인 공고</span><span className="font-bold text-blue-600 dark:text-blue-400">{hospital.jobs}건</span></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-slate-800 rounded-xl border border-dashed dark:border-slate-600"><p className="text-gray-500 dark:text-gray-400">현재 조건에 맞는 병원이 없습니다.</p></div>
            )}
        </div>
    );
};

export default CaregiverJobSearch;
