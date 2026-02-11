import React from 'react';
import { Wallet } from 'lucide-react';

const CreditConfirmationModal = ({ isOpen, onClose, onConfirm, currentCredits, cost }) => {
    if (!isOpen) return null;

    const remainingCredits = currentCredits - cost;
    const isInsufficient = remainingCredits < 0;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 transform transition-all scale-100">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                    <Wallet className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-center text-slate-800 mb-2">
                    크레딧이 소모됩니다
                </h3>
                <p className="text-sm text-center text-gray-600 mb-6 leading-relaxed">
                    면접 제안을 진행하면 크레딧이 차감되며,<br />
                    해당 매칭은 <strong>매칭 성공</strong> 상태로 전환됩니다.
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">현재 보유 크레딧</span>
                        <span className="font-bold text-slate-700">{currentCredits.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">소모 예정 크레딧</span>
                        <span className="font-bold text-red-600">- {cost.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between text-base">
                        <span className="font-medium text-slate-800">예상 잔액</span>
                        <span className={`font-bold ${isInsufficient ? 'text-red-600' : 'text-blue-600'}`}>
                            {remainingCredits.toLocaleString()}
                        </span>
                    </div>
                </div>

                {isInsufficient && (
                    <p className="text-xs text-red-500 text-center mb-4">
                        ⚠️ 잔액이 부족합니다. 크레딧을 충전해주세요.
                    </p>
                )}

                <div className="flex space-x-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isInsufficient}
                        className={`flex-1 py-3 px-4 rounded-lg font-bold text-white transition-colors
              ${isInsufficient ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreditConfirmationModal;
