import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate 추가

interface LoginProps {
    onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const navigate = useNavigate(); // 2. 네비게이트 함수 선언

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. 기본 유효성 검사
        if (!email || !password) {
            setError('아이디와 비밀번호를 모두 입력해 주세요.');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            // 2. 백엔드 로그인 API 통신
            const response = await axios.post('http://barobook.kro.kr/api/login', {
                email: email,
                password: password,
            });

            console.log('로그인 성공 응답:', response.data);

            // 3. 서버에서 내려준 토큰(Token) 추출 및 localStorage 저장
            const token = response.data.token || response.data.accessToken || response.data.data?.token;

            if (token) {
                localStorage.setItem('token', token);
            } else {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            // 4. 로그인 성공 콜백 실행 및 관리자 페이지(/admin)로 이동
            if (onLoginSuccess) {
                onLoginSuccess();
            }

            // 🌟 로그인 성공 시 관리자 페이지로 이동
            navigate('/admin');

        } catch (err: any) {
            console.error('로그인 연동 에러:', err);

            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('로그인 처리 중 오류가 발생했습니다. 아이디와 비밀번호를 확인해 주세요.');
            }
        } finally {
            setIsLoading(false);
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
                <div className="text-center mb-4">
                    <div
                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                        style={{ width: '64px', height: '64px', backgroundColor: '#eef2f7', color: '#1B3B6F' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.28.132.581.24.829.24s.548-.108.829-.24a11.777 11.777 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
                        </svg>
                    </div>
                    <h3 className="fw-bold text-dark mb-1">바로북 관리자</h3>
                    <p className="text-muted small mb-0">서비스 관리를 위해 로그인해 주세요.</p>
                </div>

                {error && (
                    <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3 text-center" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control rounded-3"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
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
                            disabled={isLoading}
                        />
                        <label htmlFor="floatingPassword" className="text-muted">비밀번호</label>
                    </div>

                    <button
                        type="submit"
                        className="btn w-100 py-3 fw-bold rounded-3 text-white shadow-sm"
                        style={{ backgroundColor: '#1B3B6F', border: 'none' }}
                        disabled={isLoading}
                    >
                        {isLoading ? '로그인 처리 중...' : '로그인하기'}
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