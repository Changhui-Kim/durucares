import React from 'react';
import { CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import Badge from '../components/Badge';

const CreditChargePage = ({ currentCredits, onCharge, onBack }) => {
    const chargeOptions = [
        { amount: 10000, price: 10000, bonus: 0, popular: false },
        { amount: 30000, price: 30000, bonus: 1000, popular: false },
        { amount: 50000, price: 45000, bonus: 5000, popular: true, tag: "BEST" },
        { amount: 100000, price: 85000, bonus: 15000, popular: false, tag: "15% 할인" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 transition-colors">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" /> 대시보드로 돌아가기
                </button>
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">크레딧 충전</h1>
                    <p className="text-gray-600 dark:text-gray-400">인재 매칭과 면접 제안을 위해 크레딧을 충전하세요.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border dark:border-slate-700 p-8 mb-10 text-center transition-colors">
                    <p className="text-gray-500 dark:text-gray-400 mb-2">현재 보유 크레딧</p>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <CreditCard className="w-8 h-8 mr-3" />
                        {currentCredits.toLocaleString()} <span className="text-xl ml-1 text-slate-600 dark:text-slate-400 font-medium">C</span>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {chargeOptions.map((option, idx) => (
                        <div key={idx} className={`relative bg-white dark:bg-slate-800 rounded-xl p-6 border dark:border-slate-700 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ${option.popular ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-md' : 'shadow-sm'}`}>
                            {option.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 dark:bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">추천 상품</div>}
                            {option.tag && !option.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 dark:bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">{option.tag}</div>}
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{option.amount.toLocaleString()} C</h3>
                                {option.bonus > 0 && <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-4">+ {option.bonus.toLocaleString()} C 보너스</p>}
                                {!option.bonus && <p className="text-xs text-transparent mb-4">.</p>}
                                <div className="border-t dark:border-slate-700 my-4"></div>
                                <div className="text-lg font-bold text-slate-900 dark:text-white mb-4">{option.price.toLocaleString()}원</div>
                                <button onClick={() => onCharge(option.amount + option.bonus)} className={`w-full py-2 rounded-lg text-sm font-bold transition-colors ${option.popular ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500' : 'bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'}`}>충전하기</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 bg-gray-50 dark:bg-slate-800/50 rounded-xl p-6 transition-colors">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" /> 이용 안내</h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
                        <li>충전된 크레딧은 유효기간 없이 사용 가능합니다.</li>
                        <li>면접 제안 1건당 10,000 크레딧이 차감됩니다.</li>
                        <li>매칭이 성사되지 않을 경우, 차감된 크레딧의 50%가 환급됩니다.</li>
                        <li>환불은 결제 후 7일 이내 사용하지 않은 크레딧에 한해 가능합니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CreditChargePage;
