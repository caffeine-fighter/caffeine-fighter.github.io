---
title: "만든 것과 배운 것"
description: "제품 개발, ML 시스템 연구와 알고리즘 문제 해결을 한곳에 정리한 카페인파이터의 포트폴리오"
date: 2026-08-15T00:00:00+09:00
lastmod: 2026-08-15T00:00:00+09:00
draft: false
layout: "portfolio"
url: "/portfolio/"
slug: "portfolio"
comments: false
toc: false
eyebrow: "CAFFEINE FIGHTER / PORTFOLIO"
lead: "C++과 Python을 주로 쓰고, 제품 개발과 ML 시스템 실험을 오간다. 맡은 일은 실제로 돌아가는 상태까지 가져가려고 한다."
actions:
  - label: "GitHub"
    url: "https://github.com/caffeine-fighter"
  - label: "이력서"
    url: "/resume/"
  - label: "프로필"
    url: "/profile/"
---

<div class="portfolio-facts" aria-label="핵심 정보">
  <div><strong>3.86 / 4.30</strong><span>전체 GPA</span></div>
  <div><strong>4.18 / 4.30</strong><span>첨단융합학부 전공 GPA</span></div>
  <div><strong>5개 전공</strong><span>주전공 1 / 복수전공 4</span></div>
  <div><strong>CM / Diamond III</strong><span>Codeforces / BOJ</span></div>
</div>

## 먼저 보는 작업

<section class="portfolio-project" id="ttuns">
  <header>
    <div><span class="portfolio-number">01</span><h3>TTUNS</h3></div>
    <time>2025.10 - 현재</time>
  </header>
  <p class="portfolio-summary">서울대학교 강의 시간표, 교수/강의실 검색과 빈 강의실 조회를 한 흐름에 묶은 서비스다. 화면만 맡지 않고 API와 데이터 구조, 배포 뒤 유지보수까지 함께 했다.</p>
  <dl class="portfolio-details">
    <div><dt>기여</dt><dd>React/Next.js 화면, REST API, PostgreSQL 스키마, 외부 강의 데이터 정규화</dd></div>
    <div><dt>결과</dt><dd>Google Play 100회 이상 다운로드 / 사용자 제보를 반영해 검색과 시간표 기능 운영</dd></div>
    <div><dt>기술</dt><dd>TypeScript / React / Next.js / Node.js / PostgreSQL / REST API</dd></div>
  </dl>
  <p class="portfolio-links"><a href="https://play.google.com/store/apps/details?id=com.ttuns" target="_blank" rel="noopener noreferrer">Google Play</a></p>
</section>

<section class="portfolio-project" id="snustudy">
  <header>
    <div><span class="portfolio-number">02</span><h3>설스터디(SnuStudy)</h3></div>
    <time>2026.02</time>
  </header>
  <p class="portfolio-summary">서울대 기반 학습 멘토링 MVP다. 멘티가 계획을 세우고 과제를 확인하는 화면부터 멘토 대시보드까지 모바일 사용 흐름을 만들었다.</p>
  <dl class="portfolio-details">
    <div><dt>기여</dt><dd>멘티 플래너/과제 상세/피드백, 멘토 대시보드, 공통 UI와 Supabase 연동 구조</dd></div>
    <div><dt>결과</dt><dd>Blaybus MVP 개발 해커톤 우수상 / 하단 내비게이션 겹침과 스크롤 오류 수정</dd></div>
    <div><dt>기술</dt><dd>JavaScript / React / Next.js / Tailwind CSS / Supabase</dd></div>
  </dl>
  <p class="portfolio-links"><a href="https://github.com/Bus-tayo/SnuStudy" target="_blank" rel="noopener noreferrer">GitHub</a></p>
</section>

<section class="portfolio-project" id="subway-game">
  <header>
    <div><span class="portfolio-number">03</span><h3>지하철 게임</h3></div>
    <time>현재 107만 조회</time>
  </header>
  <p class="portfolio-summary">짧게 소비되는 웹 게임을 실제 사용량이 생긴 뒤에도 고칠 수 있게 만들었다. 메인 개발자로 다국가 데이터와 실시간 기능을 한 코드베이스에서 관리했다.</p>
  <dl class="portfolio-details">
    <div><dt>기여</dt><dd>5개국 데이터 / 한국어, 영어, 일본어 / Realtime 대전과 랭킹 / 게임 데이터 검증</dd></div>
    <div><dt>결과</dt><dd>공개 후 현재까지 조회수 107만 회</dd></div>
    <div><dt>기술</dt><dd>JavaScript / HTML/CSS / Supabase Realtime / PostgreSQL</dd></div>
  </dl>
  <p class="portfolio-links"><a href="https://github.com/Team-DreamState/SubwayGuessr" target="_blank" rel="noopener noreferrer">GitHub</a></p>
</section>

## 모델과 시스템을 다룬 작업

<section class="portfolio-project" id="snu-ai-challenge">
  <header>
    <div><span class="portfolio-number">04</span><h3>SNU AI Challenge</h3></div>
    <time>2026.08 / 본선</time>
  </header>
  <p class="portfolio-summary">팀장으로 Qwen3.6-27B를 24GB GPU 한 장에서 학습하고 추론할 수 있는 파이프라인을 맞췄다. 입력 순서 편향을 줄이되 추론량이 지나치게 커지지 않는 방법을 찾았다.</p>
  <dl class="portfolio-details">
    <div><dt>기여</dt><dd>4-bit QLoRA 학습 / 네 개의 균형 잡힌 view와 좌표 복원 투표 / 최종 실행과 제출 관리</dd></div>
    <div><dt>결과</dt><dd>24-view 대비 추론량 83.3% 절감 / 공개 점수 0.93193에서 0.93542로 개선</dd></div>
    <div><dt>기술</dt><dd>Python / PyTorch / Transformers / PEFT / bitsandbytes / NF4 / BF16</dd></div>
  </dl>
</section>

<section class="portfolio-project" id="fastmri">
  <header>
    <div><span class="portfolio-number">05</span><h3>fastMRI Challenge</h3></div>
    <time>2026 / 팀장</time>
  </header>
  <p class="portfolio-summary">가속 MRI 데이터의 학습, 검증과 제출 경로를 하나로 맞췄다. 점수만 확인하지 않고 checkpoint와 실행 환경을 함께 남겨 같은 결과를 다시 낼 수 있게 했다.</p>
  <dl class="portfolio-details">
    <div><dt>기여</dt><dd>HDF5 데이터 로더 / 가속도별 VarNet 학습과 추론 / SSIM 평가 / 제출 패키지 관리</dd></div>
    <div><dt>운영</dt><dd>VESSL 실험 추적 / checkpoint와 설정 기록 / 팀 개발 일정과 최종 제출 관리</dd></div>
    <div><dt>기술</dt><dd>Python / PyTorch / VarNet / NumPy / HDF5 / SSIM / VESSL</dd></div>
  </dl>
</section>

<section class="portfolio-project" id="quantum-cylinder">
  <header>
    <div><span class="portfolio-number">06</span><h3>QuantumCylinder / QDiffRecover</h3></div>
    <time>2026.06 - 현재</time>
  </header>
  <p class="portfolio-summary">양자상태 ensemble에서 관측값을 복원하는 실험을 설계하고 자동화했다. 대회 본선이 끝난 뒤에는 QDiffRecover라는 개인 연구로 분리해 계속 확인하고 있다.</p>
  <dl class="portfolio-details">
    <div><dt>기여</dt><dd>실험 설계 / 복원 알고리즘 구현 / 반복 실행과 결과 비교 자동화 / 팀장</dd></div>
    <div><dt>결과</dt><dd>2026.07 양자정보경진대회 본선 / 후속 단독 연구 진행</dd></div>
    <div><dt>기술</dt><dd>Python / NumPy / PyTorch / Quantum State Reconstruction / Experiment Automation</dd></div>
  </dl>
  <p class="portfolio-links"><a href="https://github.com/chaejinlim235/QuantumCylinder" target="_blank" rel="noopener noreferrer">GitHub</a></p>
</section>

<section class="portfolio-project" id="indexguard">
  <header>
    <div><span class="portfolio-number">07</span><h3>IndexGuard</h3></div>
    <time>2026.07 / CODEGATE 본선</time>
  </header>
  <p class="portfolio-summary">문서가 RAG 지식베이스에 들어가기 전에 변경과 위험 요소를 확인하는 게이트웨이다. 문서 파싱부터 해시 검증, 분석 서비스와 승인 상태를 실제 데모 흐름으로 연결했다.</p>
  <dl class="portfolio-details">
    <div><dt>기여</dt><dd>PDF/DOCX/HWPX 정규화와 diff / SHA-256 버전 확인 / 위험 분석 API와 색인 차단 흐름</dd></div>
    <div><dt>설계</dt><dd>FastAPI 서비스 계약 / 실패 시 HOLD 상태 유지 / 문서 변경 뒤 이전 승인 무효화</dd></div>
    <div><dt>기술</dt><dd>Python / FastAPI / Pydantic / HWPX/XML / SHA-256 / RAG</dd></div>
  </dl>
  <p class="portfolio-links"><a href="https://github.com/Generated-by-AI/IndexGuard" target="_blank" rel="noopener noreferrer">GitHub</a></p>
</section>

<section class="portfolio-project" id="stable-diffusion">
  <header>
    <div><span class="portfolio-number">08</span><h3>Stable Diffusion 1.5 개인 연구</h3></div>
    <time>2022.10 - 2023.07</time>
  </header>
  <p class="portfolio-summary">2022년 …323 tokens truncated…cumentation / Localization / UI Design</span></article>
  <article><header><h3>ContestEarnings</h3><time>2026.07 - 현재</time></header><p>대회, 회차, 평가 단계, 성과와 보상을 분리한 데이터 서비스를 단독 개발했다. 로그인, 후기, 정정 제보와 배포까지 연결했다.</p><span>TypeScript / Next.js / Drizzle ORM / Cloudflare D1/Workers</span><a href="https://github.com/caffeine-fighter/ContestEarnings" target="_blank" rel="noopener noreferrer">GitHub</a></article>
  <article><header><h3>FOMO Break</h3><time>2026.06</time></header><p>급등장에서 한 번 더 확인할 지표와 과거 유사 구간을 보여 주는 MVP다. 팀장/풀스택/기획을 맡고 92개 커밋으로 시연 흐름을 연결했다.</p><span>Python / REST API / Financial Data Pipeline</span></article>
  <article><header><h3>K-HTML 해커톤</h3><time>2025.08</time></header><p>AI 모델과 웹 구현을 맡아 대상을 받았다. 이후 기업 MOU를 통해 후속 협업으로 이어졌다.</p><span>AI Model / Web Integration / Prototype</span></article>
  <article><header><h3>아이리스 Discord Bot</h3><time>2022</time></header><p>급식, 시간표와 음악 기능을 넣은 첫 개인 서비스다. 기능뿐 아니라 캐릭터의 말투와 사용 흐름도 함께 만들었다.</p><span>Python / Discord API / Web Scraping</span></article>
</div>

## 연구와 기술

<div class="portfolio-columns">
  <section>
    <h3>ML Systems Lab</h3>
    <p><strong>2025.06 - 2025.08 / 2026.02 - 2026.07</strong></p>
    <p>Diffusion과 LoRA 학습에서 모델 품질, GPU 메모리와 처리 속도를 함께 비교했다. Attention과 병렬 처리의 병목을 확인하고, 성공한 설정뿐 아니라 OOM과 불안정 학습 조건도 기록했다.</p>
  </section>
  <section>
    <h3>기술 범위</h3>
    <dl class="portfolio-skill-list">
      <div><dt>언어</dt><dd>C++ / Python / TypeScript / JavaScript / SQL</dd></div>
      <div><dt>AI/시스템</dt><dd>PyTorch / CUDA / Transformers / PEFT / Diffusion / LoRA / GPU Profiling</dd></div>
      <div><dt>제품</dt><dd>React / Next.js / Node.js / REST API / PostgreSQL / Supabase / Cloudflare</dd></div>
      <div><dt>환경</dt><dd>Git / Linux / Docker / VESSL</dd></div>
    </dl>
  </section>
</div>

## 수상과 운영

<div class="portfolio-columns">
  <section>
    <h3>주요 성과</h3>
    <ul class="portfolio-plain-list">
      <li><time>2026.08</time><span>SNU AI Challenge 본선 / 팀장</span></li>
      <li><time>2026.07</time><span>CODEGATE 해커톤 본선</span></li>
      <li><time>2026.07</time><span>양자정보경진대회 본선 / 팀장</span></li>
      <li><time>2026.06</time><span>SKYSH MVP 개발 해커톤 본선 / 팀장</span></li>
      <li><time>2026.05</time><span>Jane Street ETC @ Seoul Winner</span></li>
      <li><time>2026.02</time><span>Blaybus MVP 개발 해커톤 우수상</span></li>
      <li><time>2025.08</time><span>K-HTML 해커톤 대상</span></li>
    </ul>
  </section>
  <section>
    <h3>팀을 맡은 경험</h3>
    <p>SNU AI Challenge, fastMRI Challenge, AGENT:24, SKYSH MVP와 양자정보경진대회에서 팀장을 맡았다. 역할과 일정을 나누고, 마지막에는 실행 경로와 제출물을 직접 맞췄다.</p>
    <p>대학에서는 총 8개 동아리의 임원으로 일했다. 초정밀모델학회 2대 부회장/3대 회장을 비롯해 회계, 홍보, 교육, 소모임과 공연 운영을 맡았다.</p>
  </section>
</div>

## 학력과 문제 해결

<div class="portfolio-columns portfolio-columns--education">
  <section>
    <h3>서울대학교</h3>
    <p><strong>첨단융합학부 / 2024.03 - 현재</strong></p>
    <p>융합데이터과학을 주전공으로, 수리과학/음악학/컴퓨터공학/차세대지능형반도체를 복수전공으로 이수 중이다. 5학기 85학점을 이수했다.</p>
  </section>
  <section>
    <h3>알고리즘</h3>
    <p><a href="https://codeforces.com/profile/PastelRain" target="_blank" rel="noopener noreferrer">Codeforces Candidate Master</a><br><a href="https://www.acmicpc.net/user/pleiades1" target="_blank" rel="noopener noreferrer">Baekjoon Diamond III</a></p>
    <p>그래프, 최단 경로, 플로우, 세그먼트 트리, 동적 계획법과 구성적 알고리즘을 꾸준히 풀었다.</p>
  </section>
</div>
