---
title: "Portfolio"
description: "직접 만든 서비스와 ML 대회, 개인 연구에서 한 일을 정리한 포트폴리오"
date: 2026-08-15T00:00:00+09:00
lastmod: 2026-08-15T00:00:00+09:00
draft: false
layout: "portfolio"
url: "/portfolio/"
slug: "portfolio"
comments: false
toc: false
intro: "수업, 연구와 대회에서 만든 것 가운데 지금도 설명할 수 있는 작업을 골랐다. 팀 프로젝트는 내가 한 일을 따로 적었다. 제목에 링크가 있으면 코드나 서비스를 볼 수 있다."
---

<section class="document-section" id="products">
  <h2>서비스 개발</h2>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://play.google.com/store/apps/details?id=com.ttuns" target="_blank" rel="noopener noreferrer">TTUNS</a></h3><time>2025.10 - 현재</time></div>
    <p>서울대 강의 시간표를 만들고 교수/강의실과 빈 강의실까지 한곳에서 찾을 수 있게 만든 서비스다. 화면과 REST API, PostgreSQL 스키마, 외부 강의 데이터 정리까지 직접 맡고 있다.</p>
    <ul>
      <li>Google Play 100회 이상 다운로드</li>
      <li>출시 뒤 사용자 제보를 받아 교수명 검색, 시간표 저장과 강의실 데이터 오류를 수정</li>
    </ul>
    <p class="entry-meta">TypeScript / React / Next.js / Node.js / PostgreSQL / REST API</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/Bus-tayo/SnuStudy" target="_blank" rel="noopener noreferrer">설스터디 (SnuStudy)</a></h3><time>2026.02</time></div>
    <p>멘티가 계획을 세우고 과제를 관리하면 멘토가 피드백을 남기는 MVP다. 멘티 플래너, 과제/피드백 화면과 멘토 대시보드를 만들고 Supabase를 연결했다.</p>
    <ul>
      <li>Blaybus MVP 개발 해커톤 우수상</li>
      <li>모바일 화면에서 하단 메뉴가 겹치거나 스크롤이 막히던 문제를 대회 중 수정</li>
    </ul>
    <p class="entry-meta">JavaScript / React / Next.js / Tailwind CSS / Supabase</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/Team-DreamState/SubwayGuessr" target="_blank" rel="noopener noreferrer">지하철 게임</a></h3><time>현재</time></div>
    <p>5개국 지하철 데이터를 사용하는 웹 게임이다. 메인 개발을 맡아 한국어/영어/일본어 처리, 실시간 대전과 랭킹을 하나의 코드베이스에 묶었다.</p>
    <ul>
      <li>각국 게임 데이터를 모아 검증하고 Supabase Realtime으로 대전 기능 구현</li>
      <li>게임을 소개한 공개 콘텐츠 현재 107만 회 조회</li>
    </ul>
    <p class="entry-meta">TypeScript / Next.js / Supabase Realtime / PostgreSQL</p>
  </div>
</section>

<section class="document-section" id="ml">
  <h2>ML과 연구</h2>
  <div class="entry">
    <div class="entry-heading"><h3>SNU AI Challenge</h3><time>2026.08 / 본선</time></div>
    <p>24GB GPU 한 장으로 27B 모델을 학습하고 추론해야 했다. 팀장을 맡아 Qwen3.6-27B를 4-bit QLoRA로 학습했다. 답안 후보의 순서를 바꾸면 결과가 흔들려, 같은 문제를 네 가지 순서로 추론한 뒤 후보 번호를 원래대로 되돌려 다수결했다.</p>
    <ul>
      <li>24-view 방식보다 추론량 83.3% 절감</li>
      <li>공개 점수 0.93193에서 0.93542로 개선</li>
    </ul>
    <p class="entry-meta">Python / PyTorch / Transformers / PEFT / bitsandbytes / NF4 / BF16</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>fastMRI Challenge</h3><time>2026 / 팀장</time></div>
    <p>가속 MRI 복원 대회에서 데이터 로더와 학습/검증, 제출 파일 생성 코드를 맡았다. 가속도별로 VarNet을 따로 학습하고 SSIM을 기준으로 실험을 비교했다. checkpoint와 실행 설정은 VESSL에 남겨 팀원이 같은 실험을 다시 돌릴 수 있게 했다.</p>
    <p class="entry-meta">Python / PyTorch / VarNet / NumPy / HDF5 / SSIM / VESSL</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/chaejinlim235/QuantumCylinder" target="_blank" rel="noopener noreferrer">QuantumCylinder / QDiffRecover</a></h3><time>2026.06 - 현재</time></div>
    <p>양자상태 ensemble의 관측값을 복원하는 방법을 실험했다. 조건을 바꿔 반복 실행하고 결과를 비교하는 코드를 만들었다. 양자정보경진대회 본선 뒤에도 작업을 접지 않고 QDiffRecover라는 개인 연구로 분리해 이어가고 있다.</p>
    <p class="entry-meta">Python / NumPy / PyTorch / 양자 상태 복원</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/Generated-by-AI/IndexGuard" target="_blank" rel="noopener noreferrer">IndexGuard</a></h3><time>2026.07 / CODEGATE 본선</time></div>
    <p>RAG에 들어갈 원본 문서가 바뀌었는지 색인 전에 검사하는 도구다. CODEGATE에서는 문서 수집, 무결성 확인과 색인 제어를 맡았다. PDF/DOCX/HWPX를 같은 형식으로 정리한 뒤 diff와 SHA-256으로 변경을 남기고, 위험 분석 결과에 따라 실제 색인을 막도록 했다.</p>
    <p class="entry-meta">Python / FastAPI / Pydantic / HWPX/XML / SHA-256 / RAG</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>Stable Diffusion 1.5 개인 연구</h3><time>2022.10 - 2023.07</time></div>
    <p>생성형 AI 코딩 도구가 지금처럼 흔하지 않았던 2022년, Stable Diffusion 1.5 공개 코드와 문서를 읽으며 학습 환경을 처음부터 구성했다. 이미지를 모아 중복과 태그를 정리하고 checkpoint와 LoRA를 직접 학습했다. 이후 ML Systems Lab에 지원할 때도 이 연구를 자료로 제출했다.</p>
    <p class="entry-meta">Python / PyTorch / Stable Diffusion 1.5 / LoRA</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>ML Systems Lab</h3><time>2025.06 - 2025.08 / 2026.02 - 2026.07</time></div>
    <p>모델 점수만 보는 대신 학습이 느려지거나 GPU 메모리가 부족해지는 조건을 살폈다. Diffusion과 LoRA 학습의 시간/메모리를 비교하고 Attention과 병렬 처리의 병목을 프로파일링했다. OOM이 난 조건과 학습이 불안정했던 설정도 함께 기록했다.</p>
    <p class="entry-meta">PyTorch / CUDA / Diffusion / LoRA / Attention / GPU profiling</p>
  </div>
</section>

<section class="document-section" id="more-work">
  <h2>그 밖의 작업</h2>
  <ul class="compact-list">
    <li><strong>Jane Street ETC Trading Bot</strong> (2026.05) — market making, ADR pair trading, ETF basket arbitrage 전략과 주문/포지션 처리를 구현해 ETC @ Seoul에서 우승했다.</li>
    <li><strong>Dan:Celestial</strong> (2023.01 - 2024.10) — 문서 번역과 현지화, 디자인, 웹 개발을 약 1년 10개월 동안 함께했다.</li>
    <li><strong>ContestEarnings</strong> (2026.07 - 현재) — AI 대회의 상금과 공식 출처를 한곳에 모아보려고 만든 작은 개인 프로젝트다.</li>
    <li><strong>FOMO Break</strong> (2026.06) — 공개 시세와 비슷한 과거 구간을 찾아 보여 주는 MVP다. 팀장으로 기획과 풀스택 개발을 맡았다.</li>
    <li><strong>K-HTML 해커톤</strong> (2025.08) — AI 모델을 웹 화면에 연결하는 부분을 맡았고 대상을 받았다.</li>
    <li><strong>두근두근 애니뮤</strong> (2025.08) — Unity 서브 개발에 참여했고 전체 사운드 디렉션을 맡았다.</li>
    <li><strong>아이리스 Discord Bot</strong> (2022) — 급식/시간표 조회와 음악 기능을 넣은 Discord 봇이다. 알고리즘 문제풀이를 벗어나 처음 끝까지 만들어 본 개인 서비스였다.</li>
  </ul>
</section>

<section class="document-section" id="skills">
  <h2 id="performance-operations">공연 기획과 운영</h2>
  <div class="entry">
    <div class="entry-heading"><h3>서울대학교 락 페스티벌 관악 앰프 업</h3><time>2024.10 - 2025.04</time></div>
    <p>락 페스티벌의 초기 기획부터 참여해 운영 구조를 함께 구상하고, 공동 기획·운영을 맡았다.</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>문화자치위원회 PILOT 공연장 조성·공연 사업</h3><time>2025.06 - 2025.10</time></div>
    <p>서울대학교 문화자치위원회의 풍산마당 공연장 조성과 공연 사업을 공동 기획·운영했다. 공연 공간 확보와 참여 팀 조율, 공연이 열릴 수 있는 환경과 운영 원칙을 만드는 일에 참여했다.</p>
  </div>
</section>

<section class="document-section" id="technical-skills">
  <h2>자주 쓰는 기술</h2>
  <ul class="skill-list">
    <li><strong>언어</strong><span>C++ / Python / TypeScript / JavaScript / SQL</span></li>
    <li><strong>ML</strong><span>PyTorch / CUDA / Transformers / PEFT / Diffusion / LoRA / GPU profiling</span></li>
    <li><strong>웹</strong><span>React / Next.js / Node.js / REST API / PostgreSQL / Supabase / Cloudflare</span></li>
    <li><strong>환경</strong><span>Git / Linux / Docker / VESSL</span></li>
  </ul>
</section>

<section class="document-section" id="awards">
  <h2>대회와 운영 경험</h2>
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
    <p>SNU AI Challenge, fastMRI Challenge, AGENT:24, SKYSH MVP와 양자정보경진대회에서 팀장을 맡았다. 대학에서는 성격이 다른 8개 동아리의 임원으로 일했다. 공연팀, 학술 동아리와 취미 동아리에서 사람을 모으고 일정과 예산을 맞추는 일을 계속 맡아 왔다.</p>
    <ul class="compact-list">
      <li><strong>피치</strong> — 초대 부회장으로 초기 운영 체계와 역할 분담을 잡았다.</li>
      <li><strong>TIMEOUT</strong> — 문화부장으로 장소 선정, 예약, 정산과 행사 운영을 맡았다.</li>
      <li><strong>상하이앨리스관악단</strong> — 홍보부장으로 공식 메일과 대외 연락, 행사 부스 운영을 맡고 있다.</li>
      <li><strong>Comicoto</strong> — 회계로 합주실, 공연곡, 회원 등급과 행정 서류를 관리했고 지금은 자문위원으로 참여한다.</li>
      <li><strong>설다연</strong> — 회계로 운영비의 흐름과 정산을 관리했다.</li>
      <li><strong>SCSC</strong> — 임원과 소모임 관리자를 맡았고, 음악 제작 프로젝트 PIG를 이끌었다.</li>
      <li><strong>사운드림</strong> — 미화부장과 소모임장으로 행사 기획, 설비, 예약과 행정 실무를 맡았다.</li>
      <li><strong>휴림</strong> — 운영진으로 활동하고 있다.</li>
    </ul>
    <p>초정밀모델학회에서는 2대 부회장과 3대 회장을 지냈다. 개발 대회에서는 제출 가능한 결과물을 끝까지 맞췄고, 동아리에서는 다음 사람이 이어서 운영할 수 있도록 규칙과 기록을 남겼다.</p>
  </div>
</section>
