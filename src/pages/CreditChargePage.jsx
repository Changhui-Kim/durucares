import React from 'react';
import { ArrowRight, CreditCard } from 'lucide-react';

const CreditChargePage = ({ currentCredits, onCharge, onBack }) => {
    const chargeOptions = [
        { label: "10,000 P", value: 10000, price: "10,000원" },
        { label: "50,000 P", value: 50000, price: "50,000원", bonus: "+5%" },
        { label: "100,000 P", value: 100000, price: "100,000원", bonus: "+10%" },
    ];

    const handleCharge = (amount) => {
        if (window.confirm(`${amount.toLocaleString()}원을 결제하시겠습니까? (테스트)`)) {
            onCharge(amount);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto min-h-screen flex flex-col justify-center">
            <button onClick={onBack} className="flex items-center text-gray-500 hover:text-slate-900 mb-6 self-start">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> 돌아가기
            </button>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
                <div className="bg-slate-800 p-6 text-white text-center">
                    <p className="text-slate-300 text-sm mb-1">현재 보유 크레딧</p>
                    <h1 className="text-3xl font-bold">{currentCredits.toLocaleString()} P</h1>
                </div>

                <div className="p-6">
                    <h2 className="font-bold text-lg mb-4 text-slate-800">충전 금액 선택</h2>
                    <div className="space-y-3">
                        {chargeOptions.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => handleCharge(opt.value)}
                                className="w-full flex justify-between items-center p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                            >
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 group-hover:bg-blue-200">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <span className="block font-bold text-slate-800">{opt.label}</span>
                                        {opt.bonus && <span className="text-xs text-red-500 font-bold">{opt.bonus} 추가 적립</span>}
                                    </div>
                                </div>
                                <span className="font-medium text-gray-500 group-hover:text-blue-600">{opt.price}</span>
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-6">
                        * 본 페이지는 프로토타입이며 실제 결제는 이루어지지 않습니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreditChargePage;
