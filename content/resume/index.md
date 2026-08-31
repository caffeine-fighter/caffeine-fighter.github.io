---
title: "Resume"
description: "서울대학교에서 융합데이터과학을 공부하며 소프트웨어와 ML 시스템을 다룬 이력"
date: 2026-07-16T00:00:00+09:00
lastmod: 2026-08-31T00:00:00+09:00
slug: "resume"
url: "/resume/"
layout: "portfolio"
comments: false
toc: false
draft: false
intro: "서울대학교 첨단융합학부에서 융합데이터과학을 공부하고 있다. C++과 Python으로 웹 서비스와 ML 시스템을 만들며, Jane Street ETC @ Seoul에서 거래 전략을 구현해 우승했다."
---

<section class="document-section" id="education">
  <h2>학력</h2>
  <div class="entry">
    <div class="entry-heading"><h3>서울대학교 첨단융합학부</h3><time>2024.03 - 현재</time></div>
    <p>융합데이터과학을 주전공으로 공부한다. 수리과학, 음악학, 컴퓨터공학, 차세대지능형반도체를 복수전공으로 이수 중이다.</p>
    <ul>
      <li>5학기 85학점 이수</li>
      <li>전체 GPA 3.86/4.30, 첨단융합학부 전공 GPA 4.18/4.30</li>
      <li>첨단융합학부 비교과 활동우수상</li>
    </ul>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>세종과학예술영재학교</h3><time>2021.03 - 2024.02</time></div>
    <p>7기 수석 입학, GPA 4.10/4.30으로 졸업했다.</p>
    <ul>
      <li>수학사고력챌린지 금상, 전 문항 최고점 1위</li>
      <li>교내 정보올림피아드 2회, CTF 3회 수상</li>
      <li>재학 중 매 학기 독서우수상 금상</li>
    </ul>
  </div>
</section>

<section class="document-section" id="skills">
  <h2>기술</h2>
  <ul class="skill-list">
    <li><strong>언어</strong><span>C++ / Python / TypeScript / JavaScript / SQL</span></li>
    <li><strong>웹</strong><span>React / Next.js / Node.js / REST API / PostgreSQL / Supabase / Drizzle ORM</span></li>
    <li><strong>ML</strong><span>PyTorch / CUDA / Transformers / PEFT / Diffusion / LoRA / VarNet</span></li>
    <li><strong>환경</strong><span>Git / Linux / Docker / VESSL / GPU profiling</span></li>
  </ul>
</section>

<section class="document-section" id="research">
  <h2>연구</h2>
  <div class="entry">
    <div class="entry-heading"><h3>ML Systems Lab</h3><time>2025.06 - 2025.08 / 2026.02 - 2026.07</time></div>
    <p>Diffusion과 LoRA 학습을 돌리며 결과, GPU 메모리와 처리 시간을 비교했다. Attention과 병렬 처리에서 병목이 생기는 구간을 프로파일링했고, OOM이나 불안정 학습이 났던 설정도 함께 기록했다.</p>
    <p class="entry-meta">PyTorch / CUDA / Diffusion / LoRA / Attention / GPU profiling</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>Stable Diffusion 1.5 개인 연구</h3><time>2022.10 - 2023.07</time></div>
    <p>Stable Diffusion 1.5가 나온 직후 공개 코드와 문서를 따라 데이터셋을 만들고 checkpoint와 LoRA를 직접 학습했다. 당시에는 지금처럼 LLM에 물어볼 수 없어서 에러 로그와 구현을 하나씩 대조하며 완성했다.</p>
    <p class="entry-meta">Python / PyTorch / Stable Diffusion 1.5 / LoRA</p>
  </div>
</section>

<section class="document-section" id="development">
  <h2>개발</h2>
  <div class="entry">
    <div class="entry-heading"><h3>Jane Street ETC @ Seoul — Winner</h3><time>2026.05</time></div>
    <p>처음 접한 TCP/JSON 거래 API로 주문·취소·포지션과 메시지 제한을 처리했다. Market making, ADR pair trading과 ETF basket arbitrage를 결합해 대회에서 우승했다.</p>
    <p class="entry-meta">Event-driven Trading / TCP/JSON API / Logging / Backtesting</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>TTUNS</h3><time>2025.10 - 현재</time></div>
    <p>서울대학교 시간표 서비스. React/Next.js 화면, REST API, PostgreSQL 스키마와 외부 강의 데이터 정규화를 맡았다. 배포 뒤 들어온 검색과 시간표 제보도 직접 재현해 고쳤다.</p>
    <p class="entry-meta">TypeScript / React / Next.js / Node.js / PostgreSQL</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>SNU AI Challenge</h3><time>2026.08</time></div>
    <p>팀장을 맡아 Qwen3.6-27B의 4-bit QLoRA 학습과 네 개 view의 투표 추론을 구현했다. 24GB GPU 한 장에서 실행되도록 맞췄고 공개 점수는 0.93193에서 0.93542로 올랐다. 본선에 진출했다.</p>
    <p class="entry-meta">Python / PyTorch / Transformers / PEFT / NF4 / BF16</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/Bus-tayo/SnuStudy" target="_blank" rel="noopener noreferrer">설스터디 (SnuStudy)</a></h3><time>2026.02</time></div>
    <p>멘티 플래너와 과제 화면, 멘토 대시보드, Supabase 연동을 구현했다. Blaybus MVP 개발 해커톤에서 우수상을 받았다.</p>
    <p class="entry-meta">TypeScript / React / Next.js / Supabase / Tailwind CSS</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/Team-DreamState/SubwayGuessr" target="_blank" rel="noopener noreferrer">지하철 게임</a></h3><time>현재</time></div>
    <p>메인 개발자로 5개국 데이터, 한국어/영어/일본어와 실시간 대전/랭킹을 구현했다. 게임을 소개한 공개 콘텐츠는 현재 107만 회 조회됐다.</p>
    <p class="entry-meta">TypeScript / Next.js / Supabase Realtime / PostgreSQL</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>fastMRI Challenge</h3><time>2026</time></div>
    <p>팀장으로 HDF5 데이터 로더, 가속도별 VarNet 학습과 추론, SSIM 평가 코드를 관리했다. VESSL에 checkpoint와 실행 설정을 남기고 제출 파일을 만들었다.</p>
    <p class="entry-meta">Python / PyTorch / VarNet / HDF5 / SSIM / VESSL</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/chaejinlim235/QuantumCylinder" target="_blank" rel="noopener noreferrer">QuantumCylinder / QDiffRecover</a></h3><time>2026.06 - 현재</time></div>
    <p>양자상태 ensemble 복원 실험을 설계하고 반복 실행 코드를 만들었다. 양자정보경진대회 본선 이후에는 QDiffRecover라는 개인 연구로 계속 진행하고 있다.</p>
    <p class="entry-meta">Python / NumPy / PyTorch / experiment automation</p>
  </div>
</section>

<section class="document-section" id="awards">
  <h2>수상</h2>
  <ul class="achievement-list">
    <li><time>2026.05</time><span>Jane Street ETC @ Seoul Winner</span></li>
    <li><time>2026.08</time><span>SNU AI Challenge 본선 / 팀장</span></li>
    <li><time>2026.07</time><span>CODEGATE 해커톤 본선</span></li>
    <li><time>2026.07</time><span>양자정보경진대회 본선 / 팀장</span></li>
    <li><time>2026.02</time><span>Blaybus MVP 개발 해커톤 우수상</span></li>
    <li><time>2025.08</time><span>K-HTML 해커톤 대상</span></li>
    <li><time>2023.07</time><span>수학사고력챌린지 금상 / 전 문항 최고점 1위</span></li>
  </ul>
</section>

<section class="document-section" id="leadership">
  <h2>운영과 교육</h2>
  <div class="entry">
    <div class="entry-heading"><h3>팀과 학생 조직</h3></div>
    <p>SNU AI Challenge, fastMRI Challenge, SKYSH MVP, 양자정보경진대회와 AGENT:24에서 팀장을 맡았다. 총 8개 동아리에서 임원으로 활동했고, 11개교 대학생이 참여한 초정밀모델학회의 2대 부회장과 3대 회장을 지냈다.</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>튜터링</h3></div>
    <p>서울대학교에서 프로그래밍 개발 방법론, 컴퓨팅 핵심/기초와 기초물리학 1 튜터를 맡았다. 중학생 프로그래밍 과외는 3개월간 진행했고 학생이 NYPC 12-15세 부문에서 수상했다.</p>
  </div>
</section>
