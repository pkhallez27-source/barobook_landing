import React, { useState } from 'react';
import Admin from './pages/Admin';
import Landing from './pages/Landing';
import Login from './pages/Login'; // 1. 새로 만든 Login 컴포넌트 임포트

function App() {
    // 2. 로그인 상태 관리 (기본값: false - 로그인 안 됨)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 브라우저 주소창 경로 확인
    const path = window.location.pathname;

    // 주소가 /admin 일 때
    if (path === '/admin') {
        // 3. 로그인이 안 되어 있으면 로그인 창을 먼저 띄우고, 로그인 성공 시 관리자 페이지 표시
        if (!isLoggedIn) {
            return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
        }
        return <Admin />;
    }

    // 메인 주소(/)일 때 새로 작성한 랜딩 페이지 보여주기
    return <Landing />;
}

export default App;