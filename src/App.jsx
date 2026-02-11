import React, { useState } from 'react';
import { Heart, Bell, User, Moon, Sun } from 'lucide-react';

import LandingPage from './pages/LandingPage';
import CaregiverJobSearch from './pages/CaregiverJobSearch';
import CaregiverProfile from './pages/CaregiverProfile';
import HospitalDashboard from './pages/HospitalDashboard';
import JobDetail from './pages/JobDetail';
import CreditChargePage from './pages/CreditChargePage';
import HospitalSearch from './pages/HospitalSearch';
import CandidateDetail from './pages/CandidateDetail';
import HospitalDetail from './pages/HospitalDetail';

import CreditConfirmationModal from './components/CreditConfirmationModal';

import { INITIAL_CANDIDATES, MATCH_COST } from './data/mockData';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const AppContent = () => {
  const [role, setRole] = useState(null);
  const [page, setPage] = useState('landing');
  const [navParams, setNavParams] = useState({});
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [credits, setCredits] = useState(50000);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, candidateId: null });
  const { theme, toggleTheme } = useTheme();

  const handleNavigate = (targetPage, params = {}) => {
    setPage(targetPage);
    setNavParams(params);
    window.scrollTo(0, 0);
    if (targetPage === 'candidate_detail' && params.candidateId) {
      setCandidates(prev => prev.map(c => {
        if (c.id === params.candidateId && c.status === 'unchecked') return { ...c, status: 'reviewing' };
        return c;
      }));
    }
  };

  const handleOpenCreditModal = (candidateId) => setModalConfig({ isOpen: true, candidateId });
  const handleCloseCreditModal = () => setModalConfig({ isOpen: false, candidateId: null });

  const handleConfirmMatch = () => {
    if (credits < MATCH_COST) {
      alert("크레딧이 부족합니다. 충전 후 다시 시도해주세요.");
      return;
    }
    setCredits(prev => prev - MATCH_COST);
    if (modalConfig.candidateId) {
      setCandidates(prev => prev.map(c => c.id === modalConfig.candidateId ? { ...c, status: 'interview' } : c));
    }
    handleCloseCreditModal();
    alert("면접 제안이 완료되었습니다. (크레딧 차감 완료)");
  };

  const handleChargeCredits = (amount) => {
    setCredits(prev => prev + amount);
    alert(`${amount.toLocaleString()} 크레딧 충전이 완료되었습니다.`);
    handleNavigate('dashboard');
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'caregiver') handleNavigate('caregiver_search');
    else handleNavigate('dashboard');
  };

  const handleLogout = () => {
    setRole(null);
    setPage('landing');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <header className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 sticky top-0 z-50 h-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavigate(role ? (role === 'hospital' ? 'dashboard' : 'caregiver_search') : 'landing')}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-2"><Heart className="w-5 h-5 fill-current" /></div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">DuruCares</span>
          </div>
          {role === 'caregiver' && <nav className="hidden md:flex space-x-8 text-sm font-medium"><button onClick={() => handleNavigate('caregiver_search')} className={`${page === 'caregiver_search' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}>병원 찾기</button><button onClick={() => handleNavigate('caregiver_profile')} className={`${page === 'caregiver_profile' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}>마이페이지</button></nav>}
          {role === 'hospital' && <nav className="hidden md:flex space-x-8 text-sm font-medium"><button onClick={() => handleNavigate('dashboard')} className={`${page === 'dashboard' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}>대시보드</button><button onClick={() => handleNavigate('search')} className={`${page === 'search' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}>인재 검색</button></nav>}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {role ? (
              <>
                <div className="relative"><Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" /><span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span></div>
                <button onClick={handleLogout} className="text-sm text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white">로그아웃</button>
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden"><User className="w-full h-full p-1 text-gray-500 dark:text-gray-300" /></div>
              </>
            ) : (
              <div className="flex space-x-4 text-sm font-medium text-gray-600 dark:text-gray-300"><span>홈</span><span>회사소개</span><span>서비스 소개</span></div>
            )}
          </div>
        </div>
      </header>

      <main>
        {page === 'landing' && <LandingPage onSelectRole={handleRoleSelect} />}
        {page === 'caregiver_search' && <CaregiverJobSearch onNavigate={handleNavigate} />}
        {page === 'caregiver_profile' && <CaregiverProfile />}
        {page === 'dashboard' && <HospitalDashboard onNavigate={handleNavigate} candidates={candidates} credits={credits} />}
        {page === 'job_detail' && <JobDetail jobId={navParams.jobId} onNavigate={handleNavigate} candidates={candidates} onRequestInterview={handleOpenCreditModal} />}
        {page === 'candidate_detail' && <CandidateDetail candidate={candidates.find(c => c.id === navParams.candidateId)} onNavigate={handleNavigate} onBack={() => handleNavigate('job_detail', { jobId: 201 })} onRequestInterview={handleOpenCreditModal} />}
        {page === 'credit_charge' && <CreditChargePage currentCredits={credits} onCharge={handleChargeCredits} onBack={() => handleNavigate('dashboard')} />}
        {page === 'search' && <HospitalSearch />}

        {page === 'hospital_detail' && <HospitalDetail hospital={navParams.hospital} onNavigate={handleNavigate} />}
      </main>

      <CreditConfirmationModal isOpen={modalConfig.isOpen} onClose={handleCloseCreditModal} onConfirm={handleConfirmMatch} currentCredits={credits} cost={MATCH_COST} />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;