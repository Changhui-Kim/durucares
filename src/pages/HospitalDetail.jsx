import React from 'react';
import { ArrowRight } from 'lucide-react';

const HospitalDetail = ({ hospital, onNavigate }) => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <button onClick={() => onNavigate('caregiver_search')} className="text-gray-500 dark:text-gray-400 mb-4 flex items-center text-sm hover:text-slate-900 dark:hover:text-white transition-colors"><ArrowRight className="w-4 h-4 rotate-180 mr-1" /> 목록으로</button>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-8 text-center border dark:border-slate-700 transition-colors">
                <div className="text-6xl mb-4">{hospital?.img}</div>
                <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">{hospital?.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">{hospital?.desc}</p>
                <div className="text-left border-t dark:border-slate-700 pt-8">
                    <h3 className="font-bold mb-4 text-slate-900 dark:text-white">현재 채용중인 공고</h3>
                    <div className="border dark:border-slate-700 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">주간 전담 요양보호사</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">월 250만원 • 식사 제공</p>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">지원하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HospitalDetail;
