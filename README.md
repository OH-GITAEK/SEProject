# TEAM5 Term Project

## 팀원
- **20220813 이찬우** - 조장, 프론트엔드 개발자, 보고서 작성
- **20220770 유정우** - 프론트엔드 개발자, PPT 작성
- **20215925 오기택** - 백엔드 개발자, 발표
- **20220902 홍희훈** - 백엔드 개발자, 보고서 작성
- **20191336 홍준영** - 프로젝트 매니저, 보고서 작성
  -구체적인 기여도는 보고서 마지막 부분에 추가-

## 프로젝트 개요
**이슈 관리 시스템**

소프트웨어 개발 과정에서 조직/단체의 필요에 의해 이슈 목록과 내용 등을 체계적으로 관리하는 프로그램

## 깃허브 주소 및 스웨거(api 명세) 주소
1. 깃허브 : https://github.com/OH-GITAEK/SEProject
2. 웹 서비스 주소 : http://se.term-project.p-e.kr
3. 스웨거(API 명세) : http://api.term-project.p-e.kr

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

## 서비스 이용 방법
###발표 동영상 4에서 자세히 설명

### Swing
java 17이상 설치 필수
SEProject-0.0.1-SNAPSHOT.jar을 실행

### AWS 배포
http://se.term-project.p-e.kr/

### 이용 방법 간단 가이드
1. 회원가입 및 로그인 ( 기본 계정 admin / PL1~2 / dev1~10 / tester1~5 존재 - name/email/password모두 이름과 동일)
2. 프로젝트 생성 ( PL, dev, tester 계정들 입력 ) ( 프로젝트를 생성한 사람 자동으로 관리자로 설정 )
3. 해당 프로젝트에 tester로 등록된 계정들은 이슈 생성가능 및 이슈 통계 확인 가능
4. 해당 프로젝트에 PL로 등록된 계정들은 new 상태의 이슈들을 검색하고 dev로 등록된 계정들을 assignee로 배정 가능 ( 이슈의 상태를 assigned로 변경 )
5. assignee배정 과정에서 추천 기능을 사용하여 적절한 assignee를 추천받을 수 있음 ( 웹의 경우 추천 버튼 / swing의 경우 Issues페이지의 "개발자 추천"버튼 이용
6. 해당 프로젝트에 dev로 등록된 계정들은 자신에게 배정된 이슈를 검색하고 문제를 해결 후 코멘트를 추가하여 이슈를 fixed로 바꿈 ( 이슈의 상태가 fixed로 변경 )
7. 해당 프로젝트에 tester로 등록된 계정들은 상태가 fixed인 이슈를 검색하고 적절히 고쳐진 이슈에 대해 resolved로 상태 변경
8. 해당 프로젝트에 PL로 등록된 계정들은 resolved 상태인 이슈들을 선택해서 closed로 바꿈.

### 추가적으로 만든 기능 ( 보고서와 발표에서 상세 설명 )
1. 키워드라는 필드를 만들어서 각각의 이슈들이 어떤 내용의 이슈인지 더 빠르게 파악 가능
2. 적절한 담당자를 추천하는 기능
3. 웹(aws)과 GUI(swing)을 통한 다중인터페이스 구현

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
