---
title: "Portfolio"
description: "AI 에이전트 기반 ML 대회, 직접 만든 서비스와 개인 프로젝트에서 한 일을 정리한 포트폴리오"
date: 2026-08-15T00:00:00+09:00
lastmod: 2026-10-20T00:00:00+09:00
draft: false
layout: "portfolio"
url: "/portfolio/"
slug: "portfolio"
comments: false
toc: false
intro: "한지후(Christopher Han) · 서울대학교 첨단융합학부. 알고리즘을 기반으로 AI 코딩 에이전트를 활용해 ML 대회와 서비스를 만든 과정과 결과."
---

<section class="document-section" id="products">
  <h2>서비스 개발</h2>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://play.google.com/store/apps/details?id=com.ttuns" target="_blank" rel="noopener noreferrer">TTUNS</a></h3><time>2025.10 - 현재</time></div>
    <p>서울대학교 시간표, 교수·강의실 검색, 빈 강의실 조회 서비스다. 외부 강의 데이터를 정리하고 DB 스키마 설계를 맡았다.</p>
    <ul>
      <li>건물 번호와 호실 번호 모두에 하이픈이 들어가는 강의실 ID를 처리했다. 마지막 하이픈 뒤가 두 자리 이하의 정수이면 마지막에서 두 번째 하이픈을 기준으로 건물과 호실을 나누도록 수정했다.</li>
      <li>출시 뒤 사용자 제보를 받아 교수명 검색, 시간표 저장과 강의실 데이터 오류를 수정</li>
    </ul>
      </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/yoonhero/kicearena/" target="_blank" rel="noopener noreferrer">KICE Arena · Co-Founder</a></h3><time>2026</time></div>
    <p>정식 출시 전 Co-Founder로 합류했다. 개발에서는 레이팅 시스템 설계와 프론트엔드·UI 제작에 참여했고, 출시 준비 과정에서 마케팅과 커뮤니티 운영을 맡았다.</p>
    <ul>
      <li>홍보용 릴스 제작을 자동화하는 파이프라인을 구축했다.</li>
      <li>사용자 디스코드 서버를 운영·관리했다.</li>
    </ul>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3><a href="https://github.com/Bus-tayo/SnuStudy" target="_blank" rel="noopener noreferrer">설스터디 (SnuStudy)</a></h3><time>2026.02</time></div>
    <p>멘토링 플래너 서비스의 멘티 플래너와 멘토 대시보드를 만들고 PDF 보고서 기능을 제안했다. 참가자 200명 이상인 Blaybus MVP 개발 해커톤에서 3위·우수상을 받았다.</p>
      </div>
  <div class="entry">
    <div class="entry-heading"><h3>지하철 게임</h3><time>현재</time></div>
    <p>메인 개발자로 5개국 지하철 데이터를 사용하는 웹 게임을 만들었다. 데이터를 정리하고 한국어·영어·일본어 UI와 랭킹 기능을 구현했다.</p>
    <ul>
      <li>게임 소개 콘텐츠 누적 조회수 107만 회</li>
    </ul>
      </div>
</section>

<section class="document-section" id="ml">
  <h2>ML 대회와 실험</h2>
  <div class="entry">
    <div class="entry-heading"><h3>AI 에이전트 기반 ML 대회 운영</h3><time>2026 - 현재</time></div>
    <p>10개 이상의 ML 대회에 참가해 약 80%에서 본선에 진출했다. Codex 에이전트를 역할별로 나눠 병렬로 돌리고 방법론 탐색과 구현을 맡긴다. 역할 분담, 실험 설계, 결과 검증과 제출 판단은 직접 한다. 실험마다 버전 번호와 보고서를 남기고, 결과가 이상하면 먼저 되돌린 뒤 원인을 좁힌다.</p>
    <ul>
      <li>첫 ML 대회인 fastMRI Challenge에서 운영 전반을 에이전트에 맡겼다가, 방법론 탐색에 쓸 시간을 한 방법론의 파인튜닝에 써 버렸다. 이후 대회부터는 에이전트에 방법론 탐색만 맡기고 전체 진행은 직접 관리한다.</li>
      <li>검증 점수와 리더보드 점수의 차이가 일정하다는 에이전트의 가정을 의심했고, 학습 직전에 그 가정이 틀렸음을 확인했다.</li>
      <li>에이전트의 판단은 팀원과의 논의, Codex와 Claude의 교차 검증으로 확인한다.</li>
    </ul>
    <p class="entry-meta">Codex / Claude / 병렬 실험 / 실험 버전 관리</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>SNU AI Challenge</h3><time>2026.08 / 본선</time></div>
    <p>모델 학습과 추론 파이프라인을 혼자 맡아 10일 만에 본선에 진출했다. 24GB GPU 한 장에서 4-bit QLoRA로 모델을 학습했다. 같은 문제를 네 가지 입력 순서로 추론하고, 출력을 원래 좌표로 되돌린 뒤 투표하도록 만들었다.</p>
    <ul>
      <li>문제당 추론 횟수 24 → 4 (83.3% 감소)</li>
      <li>공개 점수 0.93193에서 0.93542로 개선</li>
    </ul>
    <p class="entry-meta">Python / PyTorch / Transformers / PEFT / QLoRA</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>Stable Diffusion 1.5 개인 프로젝트</h3><time>2022.10 - 2023.07</time></div>
    <p>Stable Diffusion 1.5 공개 코드로 학습 환경을 구성했다. 이미지 데이터의 중복과 태그를 정리하고 PyTorch로 checkpoint와 LoRA를 학습했다. 학습 설정별 생성 결과를 비교하고 사용 기록을 작성했다.</p>
    <p class="entry-meta">Python / PyTorch / Stable Diffusion 1.5 / LoRA</p>
  </div>
  <div class="entry">
    <div class="entry-heading"><h3>ML Systems Lab</h3><time>2025.06 - 2025.08 / 2026.02 - 2026.07</time></div>
    <p>PyTorch로 Diffusion과 LoRA 학습 실험을 진행했다. 설정별 모델 품질, 학습 시간, GPU 메모리 사용량을 비교했다.</p>
    <p class="entry-meta">PyTorch / Diffusion / LoRA</p>
  </div>
</section>

<section class="document-section" id="more-work">
  <h2>그 밖의 작업</h2>
  <ul class="compact-list">
    <li><strong>Jane Street ETC Trading Bot</strong> (2026.05) — 거래소 API로 주문·취소·포지션 처리와 초기 거래 전략을 가장 빠르게 구현해 누적 수익을 벌렸다. 이후 거래 데이터를 분석하고 내부 arena를 만들어 추가 모델을 실험했다. 최종 우승.</li>
    <li><strong>Dan:Celestial</strong> (2023.01 - 2024.10) — 문서 번역과 현지화, 디자인, 웹 개발을 약 1년 10개월 동안 함께했다.</li>
    <li><strong>두근두근 애니뮤</strong> (2025.08) — Unity 서브 개발에 참여했고 전체 사운드 디렉션을 맡았다.</li>
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
    <li><strong>주력</strong><span>C++ / Python (알고리즘·PS)</span></li>
    <li><strong>ML</strong><span>PyTorch / Transformers / PEFT / LoRA·QLoRA</span></li>
    <li><strong>도구</strong><span>Git / AI 코딩 에이전트 (Codex, Claude)</span></li>
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
    <p>fastMRI Challenge, AGENT:24, SKYSH MVP와 양자정보경진대회에서 팀장을 맡았다. SNU AI Challenge는 모델 학습과 추론 파이프라인을 혼자 맡았다. 대학 동아리 8곳에서 임원으로 활동했다.</p>
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
