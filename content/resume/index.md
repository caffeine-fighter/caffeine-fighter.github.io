---
title: "한지후"
description: "한지후 | 학력, ML 연구, 개발 프로젝트, 수상 및 활동"
date: 2026-07-16T00:00:00+09:00
lastmod: 2026-10-11T00:00:00+09:00
url: "/resume/"
slug: "resume"
layout: "cv"
comments: false
toc: false
draft: false
---

## Current Status

서울대학교 첨단융합학부 학부생. 융합데이터과학 주전공.

## Areas of Interest

ML 시스템, 모델 추론 최적화, 알고리즘.

## Education

### 서울대학교 첨단융합학부 <span class="cv-date">(2024.03 - 현재)</span>

융합데이터과학 주전공. 수리과학·컴퓨터공학·음악학·차세대지능형반도체 복수전공 이수 중.  
전체 GPA 3.86/4.30, 첨단융합학부 전공 GPA 4.18/4.30. 5학기 85학점 이수.

### 세종과학예술영재학교 <span class="cv-date">(2021.03 - 2024.02)</span>

7기 수석 입학. 졸업 GPA 4.07/4.30.

## Awards and Scholarships

**Jane Street ETC @ Seoul 우승** (2026.05)

**Blaybus MVP 개발 해커톤 3위·우수상** (2026.02, 참가자 200명 이상)

**K-HTML 해커톤 대상** (2025.08)

**KT 디지털인재 장학금** (2026년 1학기)

**SNU AI Challenge 본선**, **양자정보경진대회 본선**, **CODEGATE 해커톤 본선** (2026)

**서울대학교 첨단융합학부 비교과 활동우수상**

**수학사고력챌린지 우승·금상** (2023.07, 전 문항 최고점)

**수학탐구토론대회 3위** (고교 재학 중, 개인 참가)

**세과영 지니어스 The Primes 우승** (고교 재학 중)

**CTF 3년 연속 입상** (고교 재학 중, 팀장. 문제 풀이 단독 수행. 2·3년 차 개인 점수 1위)

**정보올림피아드 입상**, **매 학기 독서우수상 금상** (고교 재학 중)

## Research and Technical Experience

### FuriosaAI MOA 2026 NPU 대회 <span class="cv-date">(2026.09 - 현재)</span>

팀원들과 Gemma 4 12B의 Rust 추론 서버와 RNGD NPU 커널 수정. 프리필 요청 묶음 처리, 디코드 배치 확장, KV 캐시 저장 형식 변경.  
첫 유효 제출 74.75 tokens/s → 이후 제출 290.10 tokens/s. 동시 요청 수 7 → 32를 포함한 팀 전체 개선 결과. 2026.10.10 제출 기록 기준.  
[코드·실험 기록](https://github.com/knowin-kyeong/furiosa-opt-gemma4-12B)

### ML Systems Lab, 서울대학교 <span class="cv-date">(2025.06 - 2025.08 / 2026.02 - 2026.07)</span>

PyTorch·CUDA를 이용한 Diffusion·LoRA 학습 실험. 모델 품질·GPU 메모리·실행시간 비교, Attention·병렬 처리 프로파일링.

### SNU AI Challenge · 팀장 <span class="cv-date">(2026.08)</span>

모델 학습과 추론 구현을 혼자 맡아 10일 만에 본선 진출. 24GB GPU 한 장에서 4-bit QLoRA 학습.  
입력 순서를 바꾼 네 개 조합의 출력을 원래 좌표로 되돌려 투표하도록 구성. 문제당 추론 횟수 24 → 4, 공개 점수 0.93193 → 0.93542.

### Jane Street ETC @ Seoul <span class="cv-date">(2026.05)</span>

TCP/JSON API를 이용한 주문·취소·포지션 관리와 거래 전략 구현. 초기 전략을 가장 빠르게 수립해 누적 수익 확보. 거래 데이터 분석 및 내부 arena 구축 후 추가 모델 실험. 최종 우승.

### fastMRI Challenge · 팀장 <span class="cv-date">(2026)</span>

HDF5 데이터 로더와 PyTorch·VarNet 학습·추론 코드 구현. SSIM 평가, VESSL 실험·체크포인트 관리.

### QuantumCylinder / QDiffRecover <span class="cv-date">(2026.06 - 현재)</span>

Python·NumPy·PyTorch를 이용한 양자상태 ensemble 복원 실험. 팀장으로 복원 알고리즘 구현 및 반복 실험 자동화. 본선 이후 QDiffRecover 단독 연구.  
[GitHub](https://github.com/chaejinlim235/QuantumCylinder)

### Stable Diffusion 1.5 개인 연구 <span class="cv-date">(2022.10 - 2023.07)</span>

학습 데이터 구성, PyTorch를 이용한 checkpoint·LoRA fine-tuning 및 생성 결과 비교.

## Selected Software Projects

### TTUNS · 개발 <span class="cv-date">(2025.10 - 현재)</span>

React·Next.js·Node.js·PostgreSQL을 이용한 서울대학교 시간표 서비스. 화면, REST API, DB 스키마 및 외부 강의 데이터 처리 담당.  
건물 번호와 호실 번호에 하이픈이 포함된 강의실 ID의 분리 규칙 수정. 마지막 하이픈 뒤가 두 자리 이하의 정수인 경우, 마지막에서 두 번째 하이픈을 기준으로 건물·호실 분리.  
[Google Play](https://play.google.com/store/apps/details?id=com.ttuns)

### KICE Arena · 개발 참여 <span class="cv-date">(2026)</span>

개발 도중 합류해 레이팅 시스템과 프론트엔드·UI 제작 참여.  
[GitHub](https://github.com/yoonhero/kicearena/)

### 설스터디(SnuStudy) · 개발 <span class="cv-date">(2026.02)</span>

React·Next.js·Supabase를 이용한 멘티 플래너, 피드백 화면 및 멘토 대시보드 구현. PDF 보고서 기능 제안·팀 적용. Blaybus MVP 개발 해커톤 3위·우수상.  
[GitHub](https://github.com/Bus-tayo/SnuStudy)

### 지하철 게임 · 메인 개발

5개국 데이터와 한국어·영어·일본어 UI 구현. Supabase Realtime·PostgreSQL을 이용한 실시간 대전 및 랭킹 기능 개발. 게임 소개 콘텐츠 누적 조회수 107만 회.

### Dan:Celestial <span class="cv-date">(2023.01 - 2024.10)</span>

웹 개발, UI 디자인, 문서 번역 및 현지화.

## Teaching and Algorithmic Programming

### 서울대학교 교과목 튜터 <span class="cv-date">(2025 - 2026)</span>

컴퓨팅: 2025년 1·2학기, 2026년 1학기. 프로그래밍 개발 방법론: 2026년 1학기. 학생 코드 리뷰·디버깅 지도. 기초물리학 1 튜터 활동.

### 알고리즘 대회 및 지도

[Codeforces Candidate Master — PastelRain](https://codeforces.com/profile/PastelRain)  
[백준 Diamond III — pleiades1](https://www.acmicpc.net/user/pleiades1)  
중학생 프로그래밍 지도. 지도 학생 NYPC 12-15세 부문 수상.

## Activities

### 동아리 운영

피치 초대 부회장·창설 참여 / 상하이앨리스관악단 초대 홍보부장·창설 참여 / TIMEOUT 문화부장 / 코미코토 회계·자문위원 / 설다연 회계 / SCSC 임원·소모임 관리자 / 사운드림 시설 담당·소모임장 / 휴림 조직위원.

### 초정밀모델학회

11개교 학생 참여 학회. 2대 부회장·3대 회장.

### 공연 및 음악 제작

서울대학교 락 페스티벌 관악 앰프 업 공동 기획·운영 (2024.10 - 2025.04).  
문화자치위원회 PILOT 공연장 조성·공연 사업 공동 기획·운영 (2025.06 - 2025.10).  
오리지널 밴드 음주가무 창설·리더, 기타·작곡·믹싱·마스터링 (2025.09 - 2026.02).  
개인 앨범 soundream.zip 발매 (2025). Unity 게임 두근두근 애니뮤 메인 사운드 디렉터·개발 보조 (2025.08).

## Publications

### 『공부의 디테일: 중등부터 시작하는 공부법의 모든 것』 공동 저자 <span class="cv-date">(2025)</span>

‘4분의 3 공부법’과 ‘구조화 공부법’ 칼럼 집필.

## Technical Skills

**언어:** C++, Python, TypeScript, JavaScript, SQL  
**ML:** PyTorch, CUDA, Transformers, PEFT, LoRA·QLoRA, VarNet  
**웹:** React, Next.js, Node.js, FastAPI, PostgreSQL, Supabase, Drizzle ORM  
**도구:** Git, Linux, Docker, VESSL
