import React from 'react';
import { Users, AlertCircle } from 'lucide-react';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';

const CaregiverProfile = () => (
    <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">마이페이지</h2>
        <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-xl mb-8 flex items-center justify-between transition-colors">
            <div className="flex-1 mr-8">
                <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">내 프로필 완성도</h3>
                <ProgressBar value={75} label="작성률" />
                <p className="text-xs text-blue-700 dark:text-blue-400 mt-2">* 정보 완성도가 높을수록 매칭 정확도가 올라갑니다.</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors">정보 수정하기</button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-2"><div className="bg-green-100 dark:bg-green-900/50 p-1 rounded"><Users className="w-4 h-4 text-green-700 dark:text-green-300" /></div><h3 className="font-bold text-lg text-slate-800 dark:text-white">기본 정보 (1차)</h3><Badge type="success">모두 공개</Badge></div>
                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-4 transition-colors">
                    <div><label className="text-xs text-gray-400 dark:text-gray-500 block mb-1">이름</label><p className="font-medium text-slate-900 dark:text-gray-200">김마리아</p></div>
                    <div><label className="text-xs text-gray-400 dark:text-gray-500 block mb-1">자격증</label><p className="font-medium text-slate-900 dark:text-gray-200">요양보호사 1급</p></div>
                    <div><label className="text-xs text-gray-400 dark:text-gray-500 block mb-1">경력</label><p className="font-medium text-slate-900 dark:text-gray-200">3년 6개월</p></div>
                    <div><label className="text-xs text-gray-400 dark:text-gray-500 block mb-1">한국어 능력</label><p className="font-medium text-slate-900 dark:text-gray-200">TOPIK 4급 (의사소통 원활)</p></div>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 px-2">이 정보는 병원 검색 결과에 노출됩니다.</p>
            </div>
            <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-2"><div className="bg-red-100 dark:bg-red-900/50 p-1 rounded"><AlertCircle className="w-4 h-4 text-red-700 dark:text-red-300" /></div><h3 className="font-bold text-lg text-slate-800 dark:text-white">상세 정보 (2차)</h3><Badge type="warning">조건부 공개</Badge></div>
                <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-4 opacity-90 relative transition-colors">
                    <div><label className="text-xs text-gray-400 dark:text-gray-500 block mb-1">비자 정보</label><p className="font-medium text-slate-900 dark:text-gray-200">H-2 (만료일: 2026.12)</p></div>
                    <div><label className="text-xs text-gray-400 dark:text-gray-500 block mb-1">학력</label><p className="font-medium text-slate-900 dark:text-gray-200">고등학교 졸업</p></div>
                    <div><label className="text-xs text-gray-400 dark:text-gray-500 block mb-1">희망 급여</label><p className="font-medium text-slate-900 dark:text-gray-200">월 240만원 이상</p></div>
                    <div><label className="text-xs text-gray-400 dark:text-gray-500 block mb-1">연락처</label><p className="font-medium text-slate-900 dark:text-gray-200">010-****-1234</p></div>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 px-2">이 정보는 <strong>매칭이 성사되거나 지원한 병원</strong>에만 공개됩니다.</p>
            </div>
        </div>
    </div>
);

export default CaregiverProfile;
