# TEAM5 Term Project

## 팀원
- **20220813 이찬우** - 조장, 프론트엔드 개발자, 보고서 작성
- **20220770 유정우** - 프론트엔드 개발자, PPT 작성
- **20215925 오기택** - 백엔드 개발자, 발표
- **20220902 홍희훈** - 백엔드 개발자, 보고서 작성
- **20191336 홍준영** - 프로젝트 매니저, 보고서 작성

## 프로젝트 개요
**이슈 관리 시스템**

소프트웨어 개발 과정에서 조직/단체의 필요에 의해 이슈 목록과 내용 등을 체계적으로 관리하는 프로그램

## 프로젝트 기능과 설명
- **홈페이지 로그인과 회원가입**
- **프로젝트 생성**
- **프로젝트 내의 계정의 역할에 따른 이슈 수정 권한**
- **프로젝트와 이슈 조회 및 검색**
- **이슈를 등록하고 수정 및 관리**
- **프로젝트 내의 이슈를 분석**
- **이슈에 대한 코멘트를 등록**
- **다중 인터페이스 사용 (React, Java Swing)**
- **웹 서비스 배포**

## 코드 실행 방법

### 프론트엔드
Node.js 설치 필수

1. cd SEProject/src/main/fronted
2. yarn 설치
   npm install yarn
3. 패키지 설치 및 업데이트
   yarn install
   yarn upgrade react-scripts

4. 홈페이지 사용 라이브러리 설치 명령어
1) yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/system @emotion/react @emotion/styled
2) yarn add @mui/x-charts prop-types
3) yarn add typescript @babel/plugin-syntax-flow @babel/plugin-transform-react-jsx

5. 홈페이지 시작명령어
   yarn start //

### 백엔드
SEProject/src/main/jave의 SeProjectApplication 실행

### Swing
java 17이상 설치 필수
SEProject-0.0.1-SNAPSHOT.jar을 실행
