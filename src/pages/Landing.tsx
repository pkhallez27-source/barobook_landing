import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// 이미지 자산 import
import slide1 from '../assets/slide1_start.png';
import slide2 from '../assets/slide2_status.png';
import slide3 from '../assets/slide3_manage.png';

interface SlideItem {
    src: string;
    alt: string;
}

export const LandingPage: React.FC = () => {
    // 메인 카루셀 슬라이더 인덱스 상태
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const slides: SlideItem[] = [
        { src: slide1, alt: '시작화면' },
        { src: slide2, alt: '독서 현황' },
        { src: slide3, alt: '대여/완독 관리' }
    ];

    // 3초 자동 슬라이드 타이머 및 AOS 초기화
    useEffect(() => {
        AOS.init({
            duration: 600,
            once: true,
            offset: 120,
        });

        const timer = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="landing-container overflow-hidden">
            {/* 인디케이터, ADMIN 버튼 및 부드러운 슬라이드 전용 커스텀 스타일 */}
            <style>{`
        .custom-indicators button {
          width: 10px !important;
          height: 10px !important;
          border-radius: 50% !important;
          background-color: #8C7063 !important;
          opacity: 0.3;
          margin: 0 4px !important;
          border: none !important;
          transition: all 0.3s ease;
        }
        .custom-indicators button.active {
          opacity: 1 !important;
          width: 24px !important;
          border-radius: 10px !important;
        }
        .admin-btn {
          font-size: 0.75rem;
          color: #a0a0a0;
          text-decoration: none;
          transition: color 0.2s ease-in-out;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .admin-btn:hover {
          color: #8C7063;
          text-decoration: underline;
        }
        /* Bootstrap 호환성을 높인 부드러운 슬라이드 구조 */
        .carousel-inner {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .carousel-track {
          display: flex;
          transition: transform 0.6s ease-in-out;
          width: 100%;
        }
        .carousel-item-img {
          flex: 0 0 100%;
          width: 100%;
          border-radius: 12px;
        }
      `}</style>

            {/* 네비게이션 바 */}
            <nav className="navbar fixed-top custom-navbar bg-white shadow-sm py-3">
                <div className="container d-flex justify-content-between align-items-center">
                    <a className="navbar-brand fw-bold text-brown m-0" href="#hero">
                        <i className="bi bi-book-half me-2"></i>BAROBOOK
                    </a>

                    {/* 항상 가로로 정렬되는 메뉴 */}
                    <ul className="nav font-weight-medium flex-row gap-3 gap-md-4">
                        <li className="nav-item">
                            <a className="nav-link p-0 text-dark" href="#hero">소개</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link p-0 text-dark" href="#features">주요 기능</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link p-0 text-dark" href="#report">독서 리포트</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* 히어로 섹션 */}
            <section id="hero" className="hero-section text-center text-lg-start pt-5 mt-4">
                <div className="container py-5">
                    <div className="row align-items-center">
                        {/* 좌측 문구 */}
                        <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
                            <span className="badge bg-soft-brown text-brown mb-3 px-3 py-2 rounded-pill fs-6">
                                스마트 독서 기록 노트를 시작해보세요
                            </span>
                            <h1 className="display-4 fw-bold text-dark mb-4 lh-base">
                                책을 기록하는 순간,<br />
                                <span className="text-brown">당신의 독서는 습관</span>이 됩니다.
                            </h1>
                            <p className="lead text-muted mb-4">
                                바쁜 일상 속에서도 간편하게 책을 등록하고,<br className="d-none d-md-block" />
                                나만의 독서 통계와 진행률을 한눈에 관리해 보세요.
                            </p>
                        </div>

                        {/* 우측 메인 앱 목업 슬라이더 */}
                        <div className="col-lg-6 text-center" data-aos="fade-left">
                            <div
                                className="shadow-lg rounded-4 p-3 bg-cream border d-inline-block position-relative"
                                style={{ maxWidth: '320px' }}
                            >
                                <div className="carousel-inner rounded-3 mb-3">
                                    <div className="carousel-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                                        {slides.map((slide, index) => (
                                            <img
                                                key={index}
                                                src={slide.src}
                                                className="d-block w-100 carousel-item-img"
                                                alt={slide.alt}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* 하단 점 3개 (인디케이터) */}
                                <div className="custom-indicators d-flex justify-content-center align-items-center mb-1">
                                    {slides.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={activeIndex === index ? 'active' : ''}
                                            onClick={() => setActiveIndex(index)}
                                            aria-label={`Slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 주요 기능 소개 섹션 */}
            <section id="features" className="py-5 bg-cream">
                <div className="container py-4">
                    <div className="text-center mb-5" data-aos="fade-up">
                        <h2 className="fw-bold text-dark mb-2">BAROBOOK의 핵심 기능</h2>
                        <p className="text-muted">쉽고 빠른 독서 관리로 더 깊은 독서 경험을 선사합니다.</p>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-3" data-aos="fade-up" data-aos-delay="0">
                            <div className="card h-100 border-0 shadow-sm p-4 text-center custom-card">
                                <div className="icon-box mb-3 mx-auto">
                                    <i className="bi bi-qr-code-scan fs-2 text-brown"></i>
                                </div>
                                <h5 className="fw-bold mb-3">빠른 바코드 등록</h5>
                                <p className="text-muted mb-0 small">
                                    책 뒷면의 ISBN 바코드를 카메라로 스캔하여 순식간에 내 서재에 도서를 등록하세요.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-3" data-aos="fade-up" data-aos-delay="100">
                            <div className="card h-100 border-0 shadow-sm p-4 text-center custom-card">
                                <div className="icon-box mb-3 mx-auto">
                                    <i className="bi bi-journal-check fs-2 text-brown"></i>
                                </div>
                                <h5 className="fw-bold mb-3">한곳에 모아보는 서재</h5>
                                <p className="text-muted mb-0 small">
                                    읽는 중인 책, 완독한 책, 읽고 싶은 책까지 한 페이지에서 깔끔하게 관리할 수 있습니다.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-3" data-aos="fade-up" data-aos-delay="200">
                            <div className="card h-100 border-0 shadow-sm p-4 text-center custom-card">
                                <div className="icon-box mb-3 mx-auto">
                                    <i className="bi bi-arrow-left-right fs-2 text-brown"></i>
                                </div>
                                <h5 className="fw-bold mb-3">스마트 대여 관리</h5>
                                <p className="text-muted mb-0 small">
                                    빌린 책과 빌려준 책의 대여 기간 및 반납 D-Day를 잊지 않게 꼼꼼하게 관리하세요.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-3" data-aos="fade-up" data-aos-delay="300">
                            <div className="card h-100 border-0 shadow-sm p-4 text-center custom-card">
                                <div className="icon-box mb-3 mx-auto">
                                    <i className="bi bi-graph-up-arrow fs-2 text-brown"></i>
                                </div>
                                <h5 className="fw-bold mb-3">직관적인 진행률 추적</h5>
                                <p className="text-muted mb-0 small">
                                    목표 독서량 대비 전체 독서 진행률을 가로 그래프와 리포트로 실시간 확인하세요.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 독서 리포트 안내 섹션 */}
            <section id="report" className="py-5">
                <div className="container py-4">
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-6 order-lg-2 text-center" data-aos="zoom-in">
                            <img
                                src={slide2}
                                alt="독서 리포트 현황"
                                className="img-fluid app-mockup shadow rounded-4 border"
                                style={{ maxWidth: '300px' }}
                            />
                        </div>
                        <div className="col-lg-6 order-lg-1 mt-4 mt-lg-0" data-aos="fade-right">
                            <h3 className="fw-bold text-dark mb-3">
                                나만의 독서 성장에 맞춘<br />
                                <span className="text-brown">독서 리포트 제공</span>
                            </h3>
                            <p className="text-muted lead fs-6 mb-4">
                                완독 도서 수와 평균 평점, 독서 목표 달성률을 한눈에 쉽게 시각화해 드립니다.
                                매주 쌓여가는 독서 기록으로 성취감을 느껴보세요.
                            </p>
                            <ul className="list-unstyled text-muted lh-lg">
                                <li className="mb-2">
                                    <i className="bi bi-check-circle-fill text-brown me-2"></i>
                                    완독 권수 및 최근 완독 비율 통계 지원
                                </li>
                                <li>
                                    <i className="bi bi-check-circle-fill text-brown me-2"></i>
                                    대여 및 반납 D-Day 스마트 알림 기능
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 푸터 영역 */}
            <footer className="py-4 custom-footer border-top bg-light">
                <div className="container text-center">
                    <p className="mb-1 text-muted fw-bold">BAROBOOK - 바로북</p>
                    <p className="small text-muted mb-2">&copy; BAROBOOK Team. All rights reserved.</p>

                    {/* 하단 관리자 버튼 */}
                    <div>
                        <button
                            type="button"
                            className="admin-btn"
                            onClick={() => {
                                window.location.href = 'http://localhost:5173/admin';
                            }}
                        >
                            [ADMIN]
                        </button>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;