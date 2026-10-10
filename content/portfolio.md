---
title: "Portfolio"
description: "직접 만든 서비스와 ML 대회, 개인 연구에서 한 일을 정리한 포트폴리오"
date: 2026-08-15T00:00:00+09:00
lastmod: 2026-10-11T00:00:00+09:00
draft: false
layout: "portfolio"
url: "/portfolio/"
slug: "portfolio"
comments: false
toc: false
intro: "한지후 · 서울대학교 첨단융합학부. ML 대회와 웹 서비스에서 맡은 작업, 사용한 기술, 실험 결과."
---

<section class="document-section" id="products">
  <h2>서비스 개발</h2>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://play.google.com/store/apps/details?id=com.ttuns" target="_blank" rel="noopener noreferrer">TTUNS</a></h3><time>2025.10 - 현재</time></div>
    <p>React·Next.js로 시간표, 교수·강의실 검색, 빈 강의실 조회 화면을 만들었다. Node.js REST API와 PostgreSQL 스키마를 작성하고 외부 강의 데이터를 정리했다.</p>
    <ul>
      <li>건물 번호와 호실 번호 모두에 하이픈이 들어가는 강의실 ID를 처리했다. 마지막 하이픈 뒤가 두 자리 이하의 정수이면 마지막에서 두 번째 하이픈을 기준으로 건물과 호실을 나누도록 수정했다.</li>
      <li>출시 뒤 사용자 제보를 받아 교수명 검색, 시간표 저장과 강의실 데이터 오류를 수정</li>
    </ul>
    <p class="entry-meta">TypeScript / React / Next.js / Node.js / PostgreSQL / REST API</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/yoonhero/kicearena/" target="_blank" rel="noopener noreferrer">KICE Arena · Co-Founder</a></h3><time>2026</time></div>
    <p>Co-Founder로 정식 출시 전 레이팅 시스템과 프론트엔드·UI 제작에 참여했다.</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/Bus-tayo/SnuStudy" target="_blank" rel="noopener noreferrer">설스터디 (SnuStudy)</a></h3><time>2026.02</time></div>
    <p>React·Next.js로 멘티 플래너, 과제·피드백 화면과 멘토 대시보드를 만들고 Supabase를 연결했다. PDF 보고서 기능을 제안해 팀에서 구현했고, 대회에서 서비스의 차별점으로 평가받았다.</p>
    <ul>
      <li>참가자 200명 이상인 Blaybus MVP 개발 해커톤에서 3위·우수상</li>
      <li>모바일 화면에서 하단 메뉴가 겹치거나 스크롤이 막히던 문제를 대회 중 수정</li>
    </ul>
    <p class="entry-meta">JavaScript / React / Next.js / Tailwind CSS / Supabase</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>지하철 게임</h3><time>현재</time></div>
    <p>메인 개발자로 5개국 지하철 데이터를 사용하는 웹 게임을 만들었다. 한국어·영어·일본어 UI를 작성하고 Supabase Realtime과 PostgreSQL로 실시간 대전과 랭킹을 구현했다.</p>
    <ul>
      <li>게임 소개 콘텐츠 누적 조회수 107만 회</li>
    </ul>
    <p class="entry-meta">TypeScript / Next.js / Supabase Realtime / PostgreSQL</p>
  </div>
</section>

<section class="document-section" id="ml">
  <h2>ML과 연구</h2>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/knowin-kyeong/furiosa-opt-gemma4-12B" target="_blank" rel="noopener noreferrer">FuriosaAI MOA 2026 NPU 대회</a></h3><time>2026.09 - 현재</time></div>
    <p>팀원들과 Gemma 4 12B의 Rust 추론 서버와 RNGD NPU 커널을 수정했다. 프리필 요청을 묶어 처리하고 디코드 배치를 늘렸으며 KV 캐시 저장 형식을 바꿨다.</p>
    <ul>
      <li>첫 유효 제출 74.75 tokens/s → 이후 제출 290.10 tokens/s</li>
      <li>동시 요청 수 7 → 32를 포함한 팀 전체 개선 결과. 2026.10.10 제출 기록 기준</li>
    </ul>
    <p class="entry-meta">Rust / Gemma 4 12B / RNGD NPU / KV cache / 추론 서버</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>SNU AI Challenge</h3><time>2026.08 / 본선</time></div>
    <p>모델 학습과 추론 구현을 혼자 맡아 10일 만에 본선에 진출했다. 24GB GPU 한 장에서 4-bit QLoRA로 모델을 학습했다. 같은 문제를 네 가지 입력 순서로 추론하고, 출력을 원래 좌표로 되돌린 뒤 투표하도록 만들었다.</p>
    <ul>
      <li>문제당 추론 횟수 24 → 4 (83.3% 감소)</li>
      <li>공개 점수 0.93193에서 0.93542로 개선</li>
    </ul>
    <p class="entry-meta">Python / PyTorch / Transformers / PEFT / bitsandbytes / NF4 / BF16</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>fastMRI Challenge</h3><time>2026 / 팀장</time></div>
    <p>HDF5 데이터 로더와 PyTorch·VarNet 학습·추론 코드를 작성했다. 가속도별로 VarNet을 학습하고 SSIM으로 결과를 비교했다. 제출 파일 생성 코드를 만들고 VESSL에서 실험 설정과 checkpoint를 관리했다.</p>
    <p class="entry-meta">Python / PyTorch / VarNet / NumPy / HDF5 / SSIM / VESSL</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/chaejinlim235/QuantumCylinder" target="_blank" rel="noopener noreferrer">QuantumCylinder</a></h3><time>2026.06</time></div>
    <p>Python·NumPy·PyTorch로 양자상태 ensemble 복원 알고리즘과 반복 실험 코드를 작성했다. 조건별 결과 비교를 자동화했고, 팀장으로 양자정보경진대회 본선에 참가했다.</p>
    <p class="entry-meta">Python / NumPy / PyTorch / 양자 상태 복원</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>Stable Diffusion 1.5 개인 연구</h3><time>2022.10 - 2023.07</time></div>
    <p>Stable Diffusion 1.5 공개 코드로 학습 환경을 구성했다. 이미지 데이터의 중복과 태그를 정리하고 PyTorch로 checkpoint와 LoRA를 학습했다. 학습 설정별 생성 결과를 비교하고 사용 기록을 작성했다.</p>
    <p class="entry-meta">Python / PyTorch / Stable Diffusion 1.5 / LoRA</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>ML Systems Lab</h3><time>2025.06 - 2025.08 / 2026.02 - 2026.07</time></div>
    <p>PyTorch·CUDA로 Diffusion과 LoRA 학습 실험을 진행했다. 모델 품질, 학습 시간, GPU 메모리 사용량을 비교하고 Attention과 병렬 처리를 프로파일링했다. OOM 발생 조건과 학습이 불안정했던 설정을 기록했다.</p>
    <p class="entry-meta">PyTorch / CUDA / Diffusion / LoRA / Attention / GPU profiling</p>
  </div>
</section>

<section class="document-section" id="more-work">
  <h2>그 밖의 작업</h2>
  <ul class="compact-list">
    <li><strong>Jane Street ETC Trading Bot</strong> (2026.05) — TCP/JSON API로 주문·취소·포지션 처리와 초기 거래 전략을 가장 빠르게 구현해 누적 수익을 벌렸다. 이후 거래 데이터를 분석하고 내부 arena를 만들어 추가 모델을 실험했다. 최종 우승.</li>
    <li><strong>Dan:Celestial</strong> (2023.01 - 2024.10) — 문서 번역과 현지화, 디자인, 웹 개발을 약 1년 10개월 동안 함께했다.</li>
    <li><strong>ContestEarnings</strong> (2026.07 - 현재) — 대회·회차·평가 단계·성과·보상 데이터를 분리해 저장하는 서비스를 만들었다. 로그인, 후기, 정정 제보 기능을 구현했다.</li>
    <li><strong>FOMO Break</strong> (2026.06) — 공개 시세와 비슷한 과거 구간을 찾아 보여 주는 MVP다. 팀장으로 기획과 풀스택 개발을 맡았다.</li>
    <li><strong>K-HTML 해커톤</strong> (2025.08) — AI 모델을 웹 화면에 연결하는 부분을 맡았고 대상을 받았다.</li>
    <li><strong>두근두근 애니뮤</strong> (2025.08) — Unity 서브 개발에 참여했고 전체 사운드 디렉션을 맡았다.</li>
    <li><strong>아이리스 Discord Bot</strong> (2022) — Python·Discord API·웹 스크래핑으로 급식·시간표 조회와 음악 재생 기능을 만들었다.</li>
  </ul>
</section>

<section class="document-section" id="performance-operations">
  <h2>공연 기획과 운영</h2>
  <div class="entry">
    <div class="entry-heading"><h3>서울대학교 락 페스티벌 관악 앰프 업</h3><time>2024.10 - 2025.04</time></div>
    <p>서울대학교 락 페스티벌 관악 앰프 업의 초기 기획과 행사 운영을 공동으로 맡았다.</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>문화자치위원회 PILOT 공연장 조성·공연 사업</h3><time>2025.06 - 2025.10</time></div>
    <p>풍산마당 공연장 조성과 공연 사업을 공동 기획·운영했다. 공연 공간 확보와 참여 팀 조율을 맡았다.</p>
  </div>
</section>

<section class="document-section" id="skills">
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
    <li><time>2026.02</time><span>Blaybus MVP 개발 해커톤 3위·우수상 (참가자 200명 이상)</span></li>
    <li><time>2025.08</time><span>K-HTML 해커톤 대상</span></li>
    <li><time>2026</time><span>2026 KT디지털인재장학생</span></li>
    <li><time>2023.07</time><span>수학사고력챌린지 우승·금상 (전 문항 최고점)</span></li>
    <li><time>2022.05</time><span>수학탐구토론대회 3위 — 3인 팀 대회에 단독 참가. 나머지 수상팀은 모두 3인 팀</span></li>
    <li><time>고교 재학 중</time><span>CTF 3년 연속 입상 — 팀장으로 문제 풀이 단독 수행. 2·3년 차 개인 점수 1위</span></li>
  </ul>
  <div class="entry">
    <p>fastMRI Challenge, AGENT:24, SKYSH MVP와 양자정보경진대회에서 팀장을 맡았다. SNU AI Challenge는 모델 학습과 추론 구현을 혼자 수행했다. 대학 동아리 8곳에서 임원으로 활동했다.</p>
    <ul class="compact-list">
      <li><strong>피치</strong> — 창설에 참여한 초대 부회장. 초기 운영 체계와 역할 분담을 마련했다.</li>
      <li><strong>TIMEOUT</strong> — 문화부장으로 장소 선정, 예약, 정산과 행사 운영을 맡았다.</li>
      <li><strong>상하이앨리스관악단</strong> — 창설에 참여했으며 초대 홍보부장으로 공식 메일·SNS와 대외 연락, 행사 부스 운영을 맡았다.</li>
      <li><strong>코미코토</strong> — 회계로 합주실, 공연곡, 회원 등급과 행정 서류를 관리했고 지금은 자문위원으로 참여한다.</li>
      <li><strong>설다연</strong> — 회계로 운영비의 흐름과 정산을 관리했다.</li>
      <li><strong>SCSC</strong> — 임원과 소모임 관리자를 맡았고, 음악 제작 프로젝트 PIG를 이끌었다.</li>
      <li><strong>사운드림</strong> — 미화부장과 소모임장으로 행사 기획, 설비, 예약과 행정 실무를 맡았다.</li>
      <li><strong>휴림</strong> — 운영진으로 활동하고 있다.</li>
    </ul>
    <p>11개교 학생이 참여하는 초정밀모델학회에서 2대 부회장과 3대 회장을 맡았다.</p>
  </div>
</section>

<section class="document-section" id="music-and-publications">
  <h2>음악과 출판</h2>
  <ul class="compact-list">
    <li><strong>음주가무</strong> (2025.09 - 2026.02) — 오리지널 밴드를 창설하고 리더를 맡았다. 기타, 작곡, 믹싱·마스터링을 담당했다.</li>
    <li><strong>soundream.zip</strong> (2025) — 동아리 컴필레이션 앨범에 곡을 수록했다.</li>
    <li><strong>『공부의 디테일: 중등부터 시작하는 공부법의 모든 것』 공동 저자</strong> (2025)</li>
  </ul>
</section>
