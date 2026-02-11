import React from 'react';
import { User, Building2, ArrowRight } from 'lucide-react';

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

export default LandingPage;
