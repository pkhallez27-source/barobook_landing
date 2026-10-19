import React from 'react';
import Admin from './pages/Admin';
import Landing from './pages/Landing'; // 또는 LandingPage로 작성하셨다면 './pages/LandingPage'

function App() {
    // 브라우저 주소창 경로 확인
    const path = window.location.pathname;

    // 주소가 /admin 이면 관리자 페이지 컴포넌트를 보여줌
    if (path === '/admin') {
        return <Admin />;
    }

    // 메인 주소일 때 새로 작성한 랜딩 페이지 보여주기
    return <Landing />;
}

export default App;