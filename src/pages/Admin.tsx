import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 백엔드 기본 도메인 주소
const BASE_URL = 'http://barobook.kro.kr';

// 회원 데이터 타입 정의
interface UserItem {
    u_idx: number;
    u_id: string;
    name: string;
    email: string;
    grade: 'USER' | 'ADMIN';
}

// 도서 대여 데이터 타입 정의
interface BookItem {
    idx: number;
    u_id: string;
    title: string;
    status: number; // 1: 대여 중, 2: 반납 임박, 3: 연체
    rent_s_date: string;
    rent_e_date: string;
    d_day: string;
}

function Admin() {
    const navigate = useNavigate();

    // 통계 데이터 상태
    const [stats, setStats] = useState({
        totalUsers: 12,
        totalBooks: 48,
        activeRents: 5,
    });

    // 도서 대여 현황 목록
    const [bookList, setBookList] = useState<BookItem[]>([
        { idx: 1, u_id: 'user_01 (박기현)', title: '사피엔스', status: 1, rent_s_date: '2026-10-10', rent_e_date: '2026-10-24', d_day: 'D-9' },
        { idx: 2, u_id: 'user_02 (김진형)', title: '트렌드 코리아 2024', status: 3, rent_s_date: '2026-09-25', rent_e_date: '2026-10-09', d_day: '+6일 연체' },
        { idx: 3, u_id: 'user_03 (추형호)', title: '디자인의 디자인', status: 2, rent_s_date: '2026-10-12', rent_e_date: '2026-10-17', d_day: 'D-2 (임박)' },
    ]);

    // 가입된 회원 목록
    const [userList, setUserList] = useState<UserItem[]>([
        { u_idx: 1, u_id: 'user_01', name: '박기현', email: 'kihyun@example.com', grade: 'ADMIN' },
        { u_idx: 2, u_id: 'user_02', name: '김진형', email: 'jinhyung@example.com', grade: 'USER' },
        { u_idx: 3, u_id: 'user_03', name: '추형호', email: 'hyungho@example.com', grade: 'USER' },
        { u_idx: 4, u_id: 'user_04', name: '이흥수', email: 'heungsu@example.com', grade: 'USER' },
    ]);

    // 1. 페이지 접속 시 로그인 권한(토큰) 확인 및 초기 데이터 조회
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('관리자 권한이 필요합니다. 로그인해 주세요.');
            navigate('/login'); // 로그인 페이지 경로에 맞게 수정 가능
            return;
        }

        // 백엔드 데이터 불러오기 함수 실행
        fetchAdminData(token);
    }, [navigate]);

    // 백엔드 API로부터 대여 현황 및 회원 목록 가져오기
    const fetchAdminData = async (token: string) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            // ※ 흥수 씨 API 명세서 엔드포인트에 맞춰 주소 수정 가능
            // const userRes = await axios.get(`${BASE_URL}/api/admin/users`, config);
            // setUserList(userRes.data);

            // const bookRes = await axios.get(`${BASE_URL}/api/admin/books`, config);
            // setBookList(bookRes.data);
        } catch (error) {
            console.error('관리자 데이터 조회 실패:', error);
        }
    };

    // 2. 등급 변경 핸들러 (백엔드 API 연동)
    const handleGradeChange = async (u_idx: number, newGrade: 'USER' | 'ADMIN') => {
        const token = localStorage.getItem('token');

        try {
            // 백엔드 API 호출 (Bearer 토큰 포함)
            await axios.put(
                `${BASE_URL}/api/admin/users/${u_idx}`,
                { grade: newGrade },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // 성공 시 화면 상태 업데이트
            setUserList(prev =>
                prev.map(user => user.u_idx === u_idx ? { ...user, grade: newGrade } : user)
            );
            alert(`회원번호 ${u_idx}번의 등급이 [${newGrade}]로 변경되었습니다.`);
        } catch (error) {
            console.error('등급 변경 에러:', error);
            // 개발 중 서버 연결 실패 시에도 UI 테스트용으로 상태 변경 유지
            setUserList(prev =>
                prev.map(user => user.u_idx === u_idx ? { ...user, grade: newGrade } : user)
            );
            alert(`[안내] 서버 통신 실패 (테스트용 UI 변경 적용): ${newGrade}`);
        }
    };

    // 3. 회원 강퇴(삭제) 핸들러 (백엔드 API 연동)
    const handleKickUser = async (u_idx: number, name: string) => {
        if (!window.confirm(`정말 [${name}] 회원을 강퇴(삭제)하시겠습니까?`)) return;

        const token = localStorage.getItem('token');

        try {
            // 백엔드 삭제 API 호출
            await axios.delete(`${BASE_URL}/api/admin/users/${u_idx}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUserList(prev => prev.filter(user => user.u_idx !== u_idx));
            alert(`${name} 회원이 강퇴 처리되었습니다.`);
        } catch (error) {
            console.error('강퇴 처리 에러:', error);
            // 백엔드 삭제 실패 시에도 화면에서 제거해 보는 테스트 코드
            setUserList(prev => prev.filter(user => user.u_idx !== u_idx));
            alert(`${name} 회원이 강퇴 처리되었습니다. (테스트)`);
        }
    };

    // 대여 상태 뱃지 렌더링 함수
    const renderStatusBadge = (status: number) => {
        switch (status) {
            case 1:
                return <Badge bg="success">대여 중</Badge>;
            case 2:
                return <Badge bg="warning" text="dark">반납 임박</Badge>;
            case 3:
                return <Badge bg="danger">연체</Badge>;
            default:
                return <Badge bg="secondary">완료</Badge>;
        }
    };

    // D-Day / 남은 기간 렌더링 함수
    const renderDDayBadge = (status: number, d_day: string) => {
        switch (status) {
            case 3:
                return <span className="fw-bold text-danger">{d_day}</span>;
            case 2:
                return <span className="fw-bold text-warning text-dark">{d_day}</span>;
            default:
                return <span className="text-muted small">{d_day}</span>;
        }
    };

    return (
        <div style={{ backgroundColor: '#F5F0E6', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#2B2927' }}>

            {/* 관리자 상단 네비게이션바 */}
            <div className="py-3 px-5 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}>
                <div className="fw-bold fs-5 d-flex align-items-center gap-2">
                    <span>📖</span> BAROBOOK <span className="text-warning fs-6">| Admin Console</span>
                </div>
                <a
                    href="/"
                    className="text-decoration-none small px-3 py-1 rounded"
                    style={{ color: '#AAAAAA', backgroundColor: '#333333' }}
                >
                    ← 랜딩 페이지로 돌아가기
                </a>
            </div>

            {/* 메인 콘텐츠 영역 */}
            <Container fluid className="px-4 px-lg-5 my-4 flex-grow-1">

                {/* 상단 통계 요약 카드 영역 */}
                <Row className="g-4 mb-4">
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 p-4" style={{ backgroundColor: '#FAF9F5' }}>
                            <span className="text-muted small text-uppercase fw-bold">Total Users</span>
                            <h2 className="fw-bold mt-2 mb-0">{stats.totalUsers}명</h2>
                            <p className="text-muted small mt-1 mb-0">가입된 전체 회원 수</p>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 p-4" style={{ backgroundColor: '#FAF9F5' }}>
                            <span className="text-muted small text-uppercase fw-bold">Total Books</span>
                            <h2 className="fw-bold mt-2 mb-0">{stats.totalBooks}권</h2>
                            <p className="text-muted small mt-1 mb-0">등록된 전체 도서 수</p>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 p-4" style={{ backgroundColor: '#FAF9F5' }}>
                            <span className="text-muted small text-uppercase fw-bold">Active Rents & Overdue</span>
                            <h2 className="fw-bold text-danger mt-2 mb-0">{stats.activeRents}권</h2>
                            <p className="text-muted small mt-1 mb-0">현재 대여 중 및 연체 도서</p>
                        </Card>
                    </Col>
                </Row>

                {/* 1. 도서 대여 및 상태 관리 테이블 */}
                <Card className="border-0 shadow-sm rounded-4 p-4 mb-4" style={{ backgroundColor: '#FAF9F5' }}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h4 className="fw-bold mb-1">도서 대여 및 현황 모니터링</h4>
                            <p className="text-muted small mb-0">사용자들의 도서 대여 현황(tb_book_list) 및 반납 잔여 기간을 모니터링합니다.</p>
                        </div>
                        <Button variant="dark" size="sm" onClick={() => fetchAdminData(localStorage.getItem('token') || '')}>
                            새로고침
                        </Button>
                    </div>

                    <Table responsive hover className="align-middle mb-0">
                        <thead className="table-light">
                        <tr>
                            <th>Index</th>
                            <th>사용자 정보 (u_idx)</th>
                            <th>도서 제목</th>
                            <th>대여 상태</th>
                            <th>대여 시작일</th>
                            <th>반납 예정일</th>
                            <th>남은 기간 / 상태</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookList.map((item) => (
                            <tr key={item.idx}>
                                <td className="fw-bold">{item.idx}</td>
                                <td>{item.u_id}</td>
                                <td>{item.title}</td>
                                <td>{renderStatusBadge(item.status)}</td>
                                <td className="text-muted small">{item.rent_s_date}</td>
                                <td className="text-muted small">{item.rent_e_date}</td>
                                <td>{renderDDayBadge(item.status, item.d_day)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card>

                {/* 2. 가입 회원 및 등급 관리 테이블 */}
                <Card className="border-0 shadow-sm rounded-4 p-4" style={{ backgroundColor: '#FAF9F5' }}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h4 className="fw-bold mb-1">가입 회원 및 등급 관리</h4>
                            <p className="text-muted small mb-0">가입된 회원 목록(tb_users)을 확인하고 등급 설정 및 강퇴 조치를 수행합니다.</p>
                        </div>
                    </div>

                    <Table responsive hover className="align-middle mb-0">
                        <thead className="table-light">
                        <tr>
                            <th>u_idx</th>
                            <th>아이디 (u_id)</th>
                            <th>이름</th>
                            <th>이메일</th>
                            <th>현재 등급 (Grade)</th>
                            <th>등급 설정</th>
                            <th>관리 조치</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userList.map((user) => (
                            <tr key={user.u_idx}>
                                <td className="fw-bold">{user.u_idx}</td>
                                <td>{user.u_id}</td>
                                <td>{user.name}</td>
                                <td className="text-muted small">{user.email}</td>
                                <td>
                                    {user.grade === 'ADMIN' ? (
                                        <Badge bg="danger">ADMIN (관리자)</Badge>
                                    ) : (
                                        <Badge bg="primary">USER (일반)</Badge>
                                    )}
                                </td>
                                <td>
                                    <Form.Select
                                        size="sm"
                                        style={{ width: '130px' }}
                                        value={user.grade}
                                        onChange={(e) => handleGradeChange(user.u_idx, e.target.value as 'USER' | 'ADMIN')}
                                    >
                                        <option value="USER">USER (일반)</option>
                                        <option value="ADMIN">ADMIN (관리자)</option>
                                    </Form.Select>
                                </td>
                                <td>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleKickUser(user.u_idx, user.name)}
                                    >
                                        강퇴
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card>

            </Container>
        </div>
    );
}

export default Admin;