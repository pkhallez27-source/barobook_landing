import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing'; // 파일명이 LandingPage.tsx라면 './pages/LandingPage' 로 변경
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
    return (
        <Router>
            <Routes>
                {/* 1. 메인 랜딩 페이지 */}
                <Route path="/" element={<Landing />} />

                {/* 2. 로그인 페이지 */}
                <Route path="/login" element={<Login />} />

                {/* 3. 관리자 페이지 (Admin 내부 useEffect에서 토큰 검증 후 없으면 /login으로 자동 이동) */}
                <Route path="/admin" element={<Admin />} />

                {/* 4. 잘못된 경로로 접근 시 메인 랜딩 페이지로 리다이렉트 */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
} 

export default App;