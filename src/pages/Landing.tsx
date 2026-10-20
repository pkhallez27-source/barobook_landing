import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainAppImage from '../assets/mainapp.png';

function LandingPage() {
    // 스크롤 시 섹션 및 카드/타이틀들이 나타나도록 감지하는 이펙트
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.fade-in-section');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="landing-page bg-light min-vh-100 d-flex flex-column justify-content-between">

            {/* 스크롤 애니메이션 및 순차 등장 스타일 */}
            <style>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          will-change: opacity, transform;
        }
        .fade-in-active {
          opacity: 1;
          transform: translateY(0);
        }
        /* 순차적 등장 지연 시간 (Stagger 효과) */
        .delay-0 { transition-delay: 0.0s; }
        .delay-1 { transition-delay: 0.15s; }
        .delay-2 { transition-delay: 0.3s; }
        .delay-3 { transition-delay: 0.45s; }
      `}</style>

            {/* 1. 상단 네비게이션 바 */}
            <nav className="navbar navbar-dark bg-dark px-4 py-3 shadow-sm">
                <div className="container-fluid">
                    <span className="navbar-brand fw-bold fs-4">📚 바로북 (Barobook)</span>
                </div>
            </nav>

            {/* [블록 1] 메인 히어로 섹션 */}
            <header id="home" className="hero-section bg-white text-dark py-5 border-bottom fade-in-section">
                <div className="container px-4 py-5">
                    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div className="col-10 col-sm-8 col-lg-6 text-center">
                            <div className="p-2 bg-white rounded-4 shadow border d-inline-block" style={{ maxWidth: '320px' }}>
                                <img
                                    src={mainAppImage}
                                    alt="바로북 앱 메인 화면"
                                    className="img-fluid rounded-3"
                                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
                                당신의 독서 습관을 완성하는 가장 스마트한 방법
                            </h1>
                            <p className="lead text-muted mb-4">
                                읽은 책을 기록하고, 완독 통계를 한눈에 확인하며, 모바일과 PC에서 언제 어디서나 간편하게 관리하세요.
                            </p>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <a
                                    href="http://barobook.kro.kr/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-lg px-4 fw-bold shadow-sm"
                                >
                                    🚀 바로북앱 바로가기
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* [블록 2] 주요 기능 소개 카드 섹션 (타이틀 및 카드별 순차 등장) */}
            <section id="features" className="py-5 bg-light">
                <div className="container px-4 py-5">
                    <div className="text-center mb-5 fade-in-section delay-0">
                        <h2 className="fw-bold">✨ 주요 기능 소개</h2>
                        <p className="text-muted">바로북 서비스가 제공하는 핵심 기능들을 만나보세요.</p>
                    </div>
                    <div className="row g-4 py-2">

                        <div className="col-md-4 fade-in-section delay-1">
                            <div className="card h-100 border-0 shadow-sm p-3">
                                <div className="card-body">
                                    <div className="fs-1 mb-3">📱</div>
                                    <h3 className="card-title h5 fw-bold">모바일 / PC 실시간 동기화</h3>
                                    <p className="card-text text-muted mt-3">
                                        모바일 앱과 PC 관리자 페이지가 하나의 데이터베이스로 연동되어 언제 어디서나 동일한 기록을 실시간으로 확인할 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 fade-in-section delay-2">
                            <div className="card h-100 border-0 shadow-sm p-3">
                                <div className="card-body">
                                    <div className="fs-1 mb-3">📊</div>
                                    <h3 className="card-title h5 fw-bold">완독 통계 리포트</h3>
                                    <p className="card-text text-muted mt-3">
                                        총 완독 도서 수, 전체 도서 현황, 독서 진행률 등을 직관적인 통계 카드 형태로 제공하여 성취감을 높여줍니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 fade-in-section delay-3">
                            <div className="card h-100 border-0 shadow-sm p-3">
                                <div className="card-body">
                                    <div className="fs-1 mb-3">🔍</div>
                                    <h3 className="card-title h5 fw-bold">도서 검색 및 바코드 스캔</h3>
                                    <p className="card-text text-muted mt-3">
                                        카카오 도서 검색 API와 카메라 바코드 스캐너 기능을 통해 책 정보를 일일이 입력할 필요 없이 간편하게 등록하세요.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* [블록 3] 이용 방법 / 프로세스 섹션 (타이틀 및 단계별 항목 순차 등장) */}
            <section className="py-5 bg-white border-top">
                <div className="container px-4 py-5">
                    <div className="text-center mb-5 fade-in-section delay-0">
                        <h2 className="fw-bold">🛠️ 이렇게 사용하세요</h2>
                        <p className="text-muted">간단한 3단계를 통해 독서 기록을 시작해 보세요.</p>
                    </div>
                    <div className="row g-4 text-center">

                        <div className="col-md-4 fade-in-section delay-1">
                            <div className="p-3">
                                <div className="display-5 fw-bold text-primary mb-3">01</div>
                                <h4 className="fw-bold h5">도서 등록</h4>
                                <p className="text-muted mt-2">바코드 스캔이나 검색으로 읽고 있는 책을 간편하게 추가합니다.</p>
                            </div>
                        </div>

                        <div className="col-md-4 fade-in-section delay-2">
                            <div className="p-3">
                                <div className="display-5 fw-bold text-primary mb-3">02</div>
                                <h4 className="fw-bold h5">기록 및 관리</h4>
                                <p className="text-muted mt-2">독서 노트와 상태 변화를 기록하며 나만의 독서 습관을 만듭니다.</p>
                            </div>
                        </div>

                        <div className="col-md-4 fade-in-section delay-3">
                            <div className="p-3">
                                <div className="display-5 fw-bold text-primary mb-3">03</div>
                                <h4 className="fw-bold h5">통계 확인</h4>
                                <p className="text-muted mt-2">모바일과 PC에서 완독 현황과 통계 리포트를 실시간으로 확인합니다.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* [블록 4] 하단 CTA 배너 및 푸터 */}
            <section className="py-5 bg-primary text-white text-center fade-in-section">
                <div className="container py-4">
                    <h2 className="fw-bold mb-3">지금 바로 스마트한 독서를 시작해보세요!</h2>
                    <p className="lead mb-4 text-white-50">바로북과 함께 당신의 독서 성장을 기록해 드립니다.</p>
                    <a
                        href="http://barobook.kro.kr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-light btn-lg fw-bold px-5 text-primary shadow"
                    >
                        바로북앱 바로가기
                    </a>
                </div>
            </section>

            <footer className="bg-dark text-white text-center py-4">
                <div className="container">
                    <p className="mb-0 text-white-50">
                        &copy; 2026 Barobook Project Team. All rights reserved.
                        <a href="/admin" className="text-white-50 text-decoration-none ms-3 fw-bold">
                            [ADMIN]
                        </a>
                    </p>
                </div>
            </footer>

        </div>
    );
}

export default LandingPage;