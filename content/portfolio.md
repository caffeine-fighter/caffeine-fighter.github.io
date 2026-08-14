---
title: "Portfolio"
description: "웹 서비스, ML 대회와 개인 연구에서 맡았던 작업을 정리한 포트폴리오"
date: 2026-08-15T00:00:00+09:00
lastmod: 2026-08-15T00:00:00+09:00
draft: false
layout: "portfolio"
url: "/portfolio/"
slug: "portfolio"
comments: false
toc: false
intro: "웹 서비스, ML 대회와 개인 연구에서 맡았던 일을 정리했다. 공개된 코드나 서비스가 있는 경우 제목에 링크를 걸었다."
---

<section class="document-section" id="products">
  <h2>서비스</h2>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://play.google.com/store/apps/details?id=com.ttuns" target="_blank" rel="noopener noreferrer">TTUNS</a></h3><time>2025.10 - 현재</time></div>
    <p>서울대학교 강의 시간표와 교수/강의실 검색, 빈 강의실 조회를 제공하는 서비스다. React/Next.js 화면, REST API, PostgreSQL 스키마와 외부 강의 데이터 정규화를 맡았다.</p>
    <ul>
      <li>Google Play 100회 이상 다운로드</li>
      <li>사용자 제보를 재현해 검색 조건, 시간표 저장과 강의실 데이터를 수정</li>
    </ul>
    <p class="entry-meta">TypeScript / React / Next.js / Node.js / PostgreSQL / REST API</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/Bus-tayo/SnuStudy" target="_blank" rel="noopener noreferrer">설스터디 (SnuStudy)</a></h3><time>2026.02</time></div>
    <p>서울대 기반 학습 멘토링 MVP. 멘티 플래너, 과제와 피드백 화면, 멘토 대시보드와 Supabase 연동을 맡았다.</p>
    <ul>
      <li>Blaybus MVP 개발 해커톤 우수상</li>
      <li>모바일 하단 내비게이션 겹침과 스크롤 오류 수정</li>
    </ul>
    <p class="entry-meta">JavaScript / React / Next.js / Tailwind CSS / Supabase</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/Team-DreamState/SubwayGuessr" target="_blank" rel="noopener noreferrer">지하철 게임</a></h3><time>현재</time></div>
    <p>메인 개발자로 5개국 데이터와 한국어/영어/일본어, 실시간 대전과 랭킹을 한 코드베이스에서 관리했다.</p>
    <ul>
      <li>게임 데이터 수집과 검증, Supabase Realtime 대전 구현</li>
      <li>게임을 소개한 공개 콘텐츠 현재 107만 회 조회</li>
    </ul>
    <p class="entry-meta">TypeScript / Next.js / Supabase Realtime / PostgreSQL</p>
  </div>
</section>

<section class="document-section" id="ml">
  <h2>ML과 연구</h2>
  <div class="entry">
    <div class="entry-heading"><h3>SNU AI Challenge</h3><time>2026.08 / 본선</time></div>
    <p>팀장을 맡아 Qwen3.6-27B를 24GB GPU 한 장에서 학습하고 추론했다. 4-bit QLoRA로 학습하고, 입력 순서 편향을 줄이기 위해 네 개 view의 결과를 원래 좌표로 돌려 투표했다.</p>
    <ul>
      <li>24-view 방식보다 추론량 83.3% 절감</li>
      <li>공개 점수 0.93193에서 0.93542로 개선</li>
    </ul>
    <p class="entry-meta">Python / PyTorch / Transformers / PEFT / bitsandbytes / NF4 / BF16</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>fastMRI Challenge</h3><time>2026 / 팀장</time></div>
    <p>가속 MRI 데이터의 로딩부터 학습, 검증과 제출까지 맡았다. 가속도별 VarNet을 학습하고 SSIM으로 평가했으며, VESSL에 checkpoint와 실행 설정을 기록했다.</p>
    <p class="entry-meta">Python / PyTorch / VarNet / NumPy / HDF5 / SSIM / VESSL</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/chaejinlim235/QuantumCylinder" target="_blank" rel="noopener noreferrer">QuantumCylinder / QDiffRecover</a></h3><time>2026.06 - 현재</time></div>
    <p>양자상태 ensemble에서 관측값을 복원하는 실험을 설계하고 반복 실행과 결과 비교를 자동화했다. 양자정보경진대회 본선 이후에는 QDiffRecover라는 개인 연구로 분리해 계속 진행하고 있다.</p>
    <p class="entry-meta">Python / NumPy / PyTorch / quantum state reconstruction</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/Generated-by-AI/IndexGuard" target="_blank" rel="noopener noreferrer">IndexGuard</a></h3><time>2026.07 / CODEGATE 본선</time></div>
    <p>문서가 RAG 지식베이스에 들어가기 전에 변경 여부와 위험 요소를 확인하는 게이트웨이를 만들었다. PDF/DOCX/HWPX 정규화와 diff, SHA-256 버전 확인, 위험 분석 API와 색인 차단을 구현했다.</p>
    <p class="entry-meta">Python / FastAPI / Pydantic / HWPX/XML / SHA-256 / RAG</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>Stable Diffusion 1.5 개인 연구</h3><time>2022.10 - 2023.07</time></div>
    <p>Stable Diffusion 1.5가 나온 직후 공개 코드와 문서를 따라 데이터셋, checkpoint와 LoRA 학습을 직접 구성했다. 수집한 이미지의 중복과 태그를 정리하고 학습 결과를 비교했다.</p>
    <p class="entry-meta">Python / PyTorch / Stable Diffusion 1.5 / LoRA</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>ML Systems Lab</h3><time>2025.06 - 2025.08 / 2026.02 - 2026.07</time></div>
    <p>Diffusion과 LoRA 학습의 결과, GPU 메모리와 처리 시간을 비교했다. Attention과 병렬 처리의 병목을 프로파일링하고 OOM이나 불안정 학습 조건도 기록했다.</p>
    <p class="entry-meta">PyTorch / CUDA / Diffusion / LoRA / Attention / GPU profiling</p>
  </div>
</section>

<section class="document-section" id="more-work">
  <h2>그 밖의 작업</h2>
  <ul class="compact-list">
    <li><strong>Jane Street ETC Trading Bot</strong> (2026.05) — market making, ADR pair trading, ETF basket arbitrage 전략과 주문/포지션 처리를 구현했다. ETC @ Seoul Winner.</li>
    <li><strong>Dan:Celestial</strong> (2023.01 - 2024.10) — 문서 번역, 현지화, 디자인과 웹 개발에 참여했다.</li>
    <li><strong><a href="https://github.com/caffeine-fighter/ContestEarnings" target="_blank" rel="noopener noreferrer">ContestEarnings</a></strong> (2026.07 - 현재) — 대회 상금과 공식 출처를 연결하는 데이터 서비스를 단독 개발했다.</li>
    <li><strong>FOMO Break</strong> (2026.06) — 공개 시세와 과거 유사 구간을 보여 주는 MVP에서 팀장, 기획과 풀스택 개발을 맡았다.</li>
    <li><strong>K-HTML 해커톤</strong> (2025.08) — AI 모델과 웹 통합을 맡아 대상을 받았다.</li>
    <li><strong>두근두근 애니뮤</strong> (2025.08) — Unity 서브 개발과 전체 사운드 디렉션을 맡았다.</li>
    <li><strong>아이리스 Discord Bot</strong> (2022) — Python으로 급식, 시간표, 음악 기능을 만든 첫 개인 서비스다.</li>
  </ul>
</section>

<section class="document-section" id="skills">
  <h2>기술</h2>
  <ul class="skill-list">
    <li><strong>언어</strong><span>C++ / Python / TypeScript / JavaScript / SQL</span></li>
    <li><strong>ML</strong><span>PyTorch / CUDA / Transformers / PEFT / Diffusion / LoRA / GPU profiling</span></li>
    <li><strong>웹</strong><span>React / Next.js / Node.js / REST API / PostgreSQL / Supabase / Cloudflare</span></li>
    <li><strong>환경</strong><span>Git / Linux / Docker / VESSL</span></li>
  </ul>
</section>

<section class="document-section" id="awards">
  <h2>수상과 운영</h2>
  <ul class="achievement-list">
    <li><time>2026.08</time><span>SNU AI Challenge 본선 / 팀장</span></li>
    <li><time>2026.07</time><span>CODEGATE 해커톤 본선</span></li>
    <li><time>2026.07</time><span>양자정보경진대회 본선 / 팀장</span></li>
    <li><time>2026.06</time><span>SKYSH MVP 개발 해커톤 본선 / 팀장</span></li>
    <li><time>2026.05</time><span>Jane Street ETC @ Seoul Winner</span></li>
    <li><time>2026.02</time><span>Blaybus MVP 개발 해커톤 우수상</span></li>
    <li><time>2025.08</time><span>K-HTML 해커톤 대상</span></li>
  </ul>
  <div class="entry">
    <p>SNU AI Challenge, fastMRI Challenge, AGENT:24, SKYSH MVP와 양자정보경진대회에서 팀장을 맡았다. 대학에서는 총 8개 동아리의 임원으로 활동했고, 초정밀모델학회 2대 부회장과 3대 회장을 지냈다.</p>
  </div>
</section>
