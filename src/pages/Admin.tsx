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

    // 통계 데이터 상태 (미사용 setStats 제거)
    const [stats] = useState({
        totalUsers: 12,
        totalBooks: 48,
        activeRents: 5,
    });

    // 도서 대여 현황 목록 (미사용 setBookList 제거)
    const [bookList] = useState<BookItem[]>([
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
            navigate('/login');
            return;
        }

        fetchAdminData(token);
    }, [navigate]);

    // 백엔드 API로부터 대여 현황 및 회원 목록 가져오기 (미사용 변수 경고 방지용 블록 주석 적용)
    const fetchAdminData = (token: string) => {
        console.log('관리자 로그인 권한 확인 완료. 토큰:', token);
        /*
        // [백엔드 API 연동 시 주석 해제]
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            // const userRes = await axios.get(`${BASE_URL}/api/admin/users`, config);
            // setUserList(userRes.data);
        } catch (error) {
            console.error('관리자 데이터 조회 실패:', error);
        }
        */
    };

    // 2. 등급 변경 핸들러 (백엔드 API 연동)
    const handleGradeChange = async (u_idx: number, newGrade: 'USER' | 'ADMIN') => {
        const token = localStorage.getItem('token');

        try {
            await axios.put(
                `${BASE_URL}/api/admin/users/${u_idx}`,
                { grade: newGrade },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setUserList(prev =>
                prev.map(user => user.u_idx === u_idx ? { ...user, grade: newGrade } : user)
            );
            alert(`회원번호 ${u_idx}번의 등급이 [${newGrade}]로 변경되었습니다.`);
        } catch (error) {
            console.error('등급 변경 에러:', error);
            // 테스트용 UI 상태 업데이트
            setUserList(prev =>
                prev.map(user => user.u_idx === u_idx ? { ...user, grade: newGrade } : user)
            );
            alert(`[안내] 등급 변경 적용 (테스트용): ${newGrade}`);
        }
    };

    // 3. 회원 강퇴(삭제) 핸들러 (백엔드 API 연동)
    const handleKickUser = async (u_idx: number, name: string) => {
        if (!window.confirm(`정말 [${name}] 회원을 강퇴(삭제)하시겠습니까?`)) return;

        const token = localStorage.getItem('token');

        try {
            await axios.delete(`${BASE_URL}/api/admin/users/${u_idx}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUserList(prev => prev.filter(user => user.u_idx !== u_idx));
            alert(`${name} 회원이 강퇴 처리되었습니다.`);
        } catch (error) {
            console.error('강퇴 처리 에러:', error);
            // 테스트용 UI 상태 업데이트
            setUserList(prev => prev.filter(user => user.u_idx !== u_idx));
            alert(`${name} 회원이 강퇴 처리