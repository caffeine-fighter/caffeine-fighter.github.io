---
title: "Resume"
description: "서울대학교에서 융합데이터과학을 공부하며 소프트웨어와 ML 시스템을 만드는 카페인파이터의 이력서"
date: 2026-07-16T00:00:00+09:00
lastmod: 2026-08-15T00:00:00+09:00
slug: "resume"
url: "/resume/"
layout: "portfolio"
comments: false
toc: false
draft: false
eyebrow: "CAFFEINE FIGHTER / RESUME"
lead: "서울대학교에서 융합데이터과학을 주전공으로 공부한다. C++과 Python을 가장 자주 쓰며, 소프트웨어 개발과 ML 시스템 연구를 오간다."
actions:
  - label: "포트폴리오"
    url: "/portfolio/"
  - label: "GitHub"
    url: "https://github.com/caffeine-fighter"
  - label: "프로필"
    url: "/profile/"
---

<div class="portfolio-facts" aria-label="핵심 정보">
  <div><strong>3.86 / 4.30</strong><span>전체 GPA</span></div>
  <div><strong>4.18 / 4.30</strong><span>첨단융합학부 전공 GPA</span></div>
  <div><strong>5개 전공</strong><span>주전공 1 / 복수전공 4</span></div>
  <div><strong>CM / Diamond III</strong><span>Codeforces / Baekjoon</span></div>
</div>

## 학력

<div class="portfolio-columns portfolio-columns--education">
  <section>
    <h3>서울대학교</h3>
    <p><strong>첨단융합학부 / 2024.03 - 현재</strong></p>
    <p>5학기 85학점 이수. 융합데이터과학을 주전공으로, 수리과학/음악학/컴퓨터공학/차세대지능형반도체를 복수전공으로 이수 중이다.</p>
    <ul>
      <li>전체 GPA 3.86/4.30</li>
      <li>첨단융합학부 전공 GPA 4.18/4.30</li>
      <li>첨단융합학부 비교과 활동우수상</li>
    </ul>
  </section>
  <section>
    <h3>세종과학예술영재학교</h3>
    <p><strong>7기 / 2021.03 - 2024.02</strong></p>
    <p>신입생 수석 입학 / GPA 4.10/4.30 졸업. 수학, 정보와 과학 글쓰기 대회에 꾸준히 참가했다.</p>
    <ul>
      <li>수학사고력챌린지 금상 / 전 문항 최고점 1위</li>
      <li>정보올림피아드 및 CTF 전부 수상</li>
      <li>재학 중 매 학기 독서우수상 금상</li>
    </ul>
  </section>
</div>

## 기술

<dl class="portfolio-skill-list">
  <div><dt>언어</dt><dd><strong>C++ / Python</strong>을 주로 사용한다. C++은 알고리즘과 성능이 중요한 구현에, Python은 모델 학습/실험 자동화/데이터 처리와 빠른 프로토타이핑에 쓴다.</dd></div>
  <div><dt>소프트웨어</dt><dd>TypeScript / React / Next.js / Node.js / REST API / PostgreSQL / Supabase / Drizzle ORM</dd></div>
  <div><dt>AI/ML</dt><dd>PyTorch / CUDA / Diffusion / LoRA / Attention / QLoRA / PEFT / VarNet / HDF5 / SSIM / VESSL</dd></div>
  <div><dt>도구</dt><dd>Git / Linux / Docker / GPU profiling</dd></div>
</dl>

## 연구 경험

<div class="portfolio-list">
  <article>
    <header><h3>ML Systems Lab</h3><time>2025.06 - 2025.08 / 2026.02 - 2026.07</time></header>
    <p>Diffusion Model과 LoRA의 품질, 메모리 사용량과 처리 속도를 비교하고 Attention/병렬 처리의 GPU 병목을 분석했다. 실행 조건과 실패한 설정까지 남겨 실험을 다시 재현할 수 있게 했다.</p>
    <span>PyTorch / CUDA / Diffusion / LoRA / Attention / GPU profiling</span>
  </article>
  <article>
    <header><h3>Stable Diffusion 1.5 개인 연구</h3><time>2022.10 - 2023.07</time></header>
    <p>2022년 말 공개 코드와 문서를 직접 맞춰 가며 데이터 구성부터 checkpoint/LoRA fine-tuning까지 완성했다. 자료가 적던 시기에 필요한 기술을 독학해 실제 학습 결과까지 만든 첫 ML 프로젝트다.</p>
    <span>Python / PyTorch / Stable Diffusion 1.5 / LoRA</span>
  </article>
</div>

## 주요 개발 경험

<div class="portfolio-list">
  <article>
    <header><h3>TTUNS</h3><time>2025.10 - 현재</time></header>
    <p>서울대학교 시간표 서비스의 화면/API/데이터 구조와 배포 뒤 유지보수를 맡았다. 사용자 제보를 실제 입력으로 재현하며 검색과 시간표 기능을 고쳤다.</p>
    <span>TypeScript / React / Next.js / Node.js / PostgreSQL</span>
  </article>
  <article>
    <header><h3>SNU AI Challenge</h3><time>2026.08</time></header>
    <p>팀장으로 언어 모델 fine-tuning 실험을 설계하고 학습/평가 흐름을 정리해 본선에 진출했다.</p>
    <span>Python / PyTorch / Qwen3.6-27B / QLoRA / PEFT / NF4 / BF16 / TTA</span>
  </article>
  <article>
    <header><h3>fastMRI Challenge</h3><time>2026</time></header>
    <p>팀장으로 MRI 복원 모델의 학습과 평가를 구성했다. 데이터 로딩, 실험 설정과 제출 결과를 한 흐름으로 관리했다.</p>
    <span>Python / PyTorch / VarNet / HDF5 / SSIM / VESSL</span>
  </article>
  <article>
    <header><h3>설스터디 (SnuStudy)</h3><time>2026.02</time></header>
    <p>멘티 플래너와 멘토 대시보드, Supabase 연동 구조를 구현했다. Blaybus MVP 개발 해커톤 우수상을 받았다.</p>
    <span>TypeScript / React / Next.js / Supabase / Tailwind CSS</span>
    <a href="https://github.com/Bus-tayo/SnuStudy" target="_blank" rel="noopener noreferrer">GitHub</a>
  </article>
  <article>
    <header><h3>지하철 게임</h3><time>현재</time></header>
    <p>메인 개발자로 5개국 데이터, 3개 언어와 실시간 대전/랭킹 기능을 구현했다. 공개 콘텐츠는 현재까지 107만 회 조회됐다.</p>
    <span>TypeScript / Next.js / Supabase Realtime / PostgreSQL</span>
    <a href="https://github.com/Team-DreamState/SubwayGuessr" target="_blank" rel="noopener noreferrer">GitHub</a>
  </article>
  <article>
    <header><h3>QuantumCylinder / QDiffRecover</h3><time>2026.06 - 현재</time></header>
    <p>양자상태 ensemble 복원 실험을 설계하고 구현/자동화했다. 대회가 끝난 뒤에도 후속 단독 연구를 이어 가고 있다.</p>
    <span>Python / NumPy / PyTorch / experiment automation</span>
    <a href="https://github.com/chaejinlim235/QuantumCylinder" target="_blank" rel="noopener noreferrer">GitHub</a>
  </article>
</div>

## 수상과 성과

<ul class="portfolio-plain-list">
  <li><time>2026.08</time><span>SNU AI Challenge 본선 / 팀장</span></li>
  <li><time>2026.07</time><span>CODEGATE 해커톤 본선</span></li>
  <li><time>2026.07</time><span>양자정보경진대회 본선 / 팀장</span></li>
  <li><time>2026.05</time><span>Jane Street ETC @ Seoul Winner</span></li>
  <li><time>2026.02</time><span>Blaybus MVP 개발 해커톤 우수상</span></li>
  <li><time>2025.08</time><span>K-HTML 해커톤 대상</span></li>
  <li><time>2023.07</time><span>수학사고력챌린지 금상 / 전 문항 최고점 1위</span></li>
</ul>

## 리더십과 교육

<div class="portfolio-columns">
  <section>
    <h3>팀과 조직 운영</h3>
    <p>SNU AI Challenge, fastMRI Challenge, SKYSH MVP, 양자정보경진대회와 AGENT:24에서 팀장을 맡았다. 11개교 대학생이 참여한 초정밀모델학회의 2대 부회장과 3대 회장을 지냈고, 총 8개 동아리에서 임원으로 활동했다.</p>
  </section>
  <section>
    <h3>튜터링</h3>
    <p>서울대학교에서 프로그래밍 개발 방법론, 컴퓨팅 핵심/기초와 기초물리학 1 튜터를 맡았다. 코드 리뷰와 디버깅을 돕고, 중학생 프로그래밍 지도를 NYPC 12-15세 부문 수상까지 이어 간 경험이 있다.</p>
  </section>
</div>

## 연락

Seoul, South Korea<br>
[lumina@snu.ac.kr](mailto:lumina@snu.ac.kr) / [GitHub](https://github.com/caffeine-fighter)
