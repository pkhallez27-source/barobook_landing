import React, { useState } from 'react';

interface LoginProps {
    onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('아이디와 비밀번호를 모두 입력해 주세요.');
            return;
        }

        setError('');
        console.log('로그인 정보 제출:', { email, password });

        if (onLoginSuccess) {
            onLoginSuccess();
        }
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center min-vh-100"
            style={{
                background: 'linear-gradient(135deg, #eef2f3 0%, #8e9eab 100%)',
                fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif"
            }}
        >
            <div
                className="card border-0 shadow-lg p-4 p-md-5 rounded-4"
                style={{ width: '100%', maxWidth: '420px', backgroundColor: '#ffffff' }}
            >
                {/* 상단 로고 & 타이틀 */}
                <div className="text-center mb-4">
                    <div
                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                        style={{ width: '64px', height: '64px', backgroundColor: '#eef2f7', color: '#1B3B6F' }}
                    >
                        {/* 자물쇠 아이콘 SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.28.132.581.24.829.24s.548-.108.829-.24a11.777 11.777 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
                        </svg>
                    </div>
                    <h3 className="fw-bold text-dark mb-1">바로북 관리자</h3>
                    <p className="text-muted small mb-0">서비스 관리를 위해 로그인해 주세요.</p>
                </div>

                {/* 에러 알림창 */}
                {error && (
                    <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3 text-center" role="alert">
                        {error}
                    </div>
                )}

                {/* 로그인 폼 */}
                <form onSubmit={handleSubmit}>
                    {/* 부트스트랩 플로팅 레이블 적용 */}
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control rounded-3"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingInput" className="text-muted">이메일 주소</label>
                    </div>

                    <div className="form-floating mb-4">
                        <input
                            type="password"
                            className="form-control rounded-3"
                            id="floatingPassword"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword" className="text-muted">비밀번호</label>
                    </div>

                    <button
                        type="submit"
                        className="btn w-100 py-3 fw-bold rounded-3 text-white shadow-sm"
                        style={{
                            backgroundColor: '#1B3B6F',
                            border: 'none',
                        }}
                    >
                        로그인하기
                    </button>
                </form>

                <div className="text-center mt-4">
          <span className="text-muted" style={{ fontSize: '0.8rem' }}>
            © BAROBOOK Admin Management System
          </span>
                </div>
            </div>
        </div>
    );
};

export default Login;