---
title: "2026 양자정보경진대회 후기: QuantumCylinder"
description: "양자정보를 처음 배운 팀이 3일 동안 어디까지 갔는가"
date: 2026-07-01T23:40:00+09:00
lastmod: 2026-07-29T00:00:00+09:00
slug: "20260701-quantum-cylinder-contest-review"
image:
math: true
license:
comments: true
build:
  list: always
categories:
  - "hackathon-ai-coding-contest-reviews"
tags:
  - "양자정보경진대회"
  - "QuantumCylinder"
  - "해커톤"
  - "Qiskit"
  - "IBM QPU"
  - "Hermes agent"
  - "논문화"
  - "후기"
---

## 글을 쓰며

2026 양자정보경진대회가 끝났다.

최종 저장소는 아래에 남겨 둔다.

> GitHub: <https://github.com/chaejinlim235/QuantumCylinder/>

팀원은 GitHub 아이디로만 적는다.

- 팀장 `chaejinlim235` (POSTECH 26')
- 팀원 `caffeine-fighter` (SNU TI 24')
- 팀원 `koi312500` (DGIST 26')
- 팀원 `dreamerghost77` (SNU TI 26')

5월에 팀이 꾸려졌을 때부터 예선, 3일간의 본선, 제출까지 순서대로 적어 본다.

저장소에는 최종 코드와 문서가 남아 있지만, 그것만 봐서는 어떤 실험을 왜 버렸고 어떤 결과를 왜 본문에 남겼는지 알기 어렵다. 그 사이에 내렸던 판단들을 잊기 전에 적어 두려고 한다.

## 참가 배경

양자정보경진대회 전날까지 나는 SKYSH 해커톤에 있었다.

거기서 우리 팀은 업비트 공개 데이터로 시장이 얼마나 과열됐는지 살펴서, 사용자가 감정적으로 매수·매도하기 전에 한 번 멈추게 하는 **FOMO Break**를 만들었다. 나는 제품 방향과 MVP 구현을 주로 맡아 백엔드 API, Historical Mirror, Decision Pause, 프론트엔드 시연 화면까지 끝까지 붙들고 있었다.

> SKYSH 후기: <https://caffeine-fighter.github.io/p/20260629-fomo-break-hackathon-review/>

그 대회가 끝난 바로 다음 날 양자정보경진대회가 시작됐다. 체력은 이미 많이 빠진 상태였다. 최근 여러 대회와 프로그램 결과가 기대만큼 나오지 않아서 나를 다시 증명할 결과가 급했고, 상금도 필요했다. 경험이나 쌓자는 마음으로 들어간 대회는 아니었다.

도구 쓰는 방식도 이어졌다. SKYSH에서는 Codex를 처음으로 본격적인 개발 보조 도구로 썼고, 이번에는 자동화된 **Hermes agent**를 반복 실험에 붙였다. 하루 만에 제품을 만드는 대회를 끝내고, 바로 다음 날부터 여러 시드와 후보를 밤새 돌리며 근거를 쌓는 대회로 넘어간 셈이다.

## 팀 결성과 예선

팀은 5월 초에 만들어졌다. 양자정보 전문가가 모인 팀은 아니었다. 처음 반응부터 “이걸 학부생이 제대로 할 수 있나?”에 가까웠다.

지정문제는 여러 개였다. Trotterized quantum simulation, neutral atom QPU에서의 QUBO, Quantum Machine Learning, Dynamic Circuit 같은 주제가 있었고, 우리는 3번과 4번 사이에서 고민했다.

3번에는 Quantum DDPM, random unitary, diffusion, circuit depth, noise, hardware-efficient reverse process가 한꺼번에 들어 있었다. 4번 Dynamic Circuit도 재밌어 보였지만, 3번은 생성형 모델과 Qiskit 구현 경험을 같이 써먹을 수 있을 것 같았다.

정답이 정해진 계산 문제는 아니었다. 기본 구조를 이해한 다음 실험과 해석을 직접 만들어야 했다. 잘 풀면 우리만의 결과가 나오겠지만, 잘못 풀면 실험만 잔뜩 늘어놓고 결론은 하나도 못 낼 수 있었다. 그래도 3번을 골랐다.

팀명 후보로는 네 명이 모인 예측 불가능한 팀이라는 뜻의 **4 body problem**도 있었는데, 최종 이름은 **QuantumCylinder**가 됐다.

예선 신청서는 급하게 썼다. 팀장인 `chaejinlim235`가 참가 신청과 서류 제출을 주도했고, 나머지는 각자의 연구·개발·딥러닝 경험을 보태면서 문장과 내용을 검토했다.

이때쯤 우리 팀 성격도 대충 정해졌다. 양자정보 전문팀이라기보다는 구현과 실험으로 밀어붙이는 팀이었고, 생성형 AI와 QML을 연결해 보고 싶어 했다. 모르는 걸 아는 척하지 않고, 할 수 있는 주장과 할 수 없는 주장을 나누려는 팀이기도 했다.

본선 진출 소식을 들었을 때는 솔직히 “이게 되네” 싶었다. 그런데 계절학기, 다른 대회, 개인 일정까지 겹쳐서 준비할 시간이 부족했다. 그래도 이미 붙었고, 이런 대회를 직접 해 볼 기회도 흔치 않았다. 끝까지 가 보기로 했다.

## 준비 과정

본선 전 며칠 동안 Qiskit, IBM Quantum Learning, QML 자료와 작년 문제를 공부했다. 돌려 볼 만한 노트북 후보와 관련 논문도 모았다. 준비가 충분했다고는 못 하겠다.

양자정보경진대회는 보통의 웹·앱 해커톤과 결이 달랐다. 웹 해커톤이면 일단 사용자가 누를 화면과 API부터 만들면 된다. 여기서는 코드가 돈다고 끝이 아니었다. 그 결과가 물리적으로 왜 말이 되는지, 어떤 지표로 비교할지, 어디까지 주장해도 되는지를 같이 설명해야 했다.

“양자”라는 단어가 붙었다고 그럴듯해 보이는 회로를 늘어놓고 싶지는 않았다. 서로 다른 방법을 같은 지표로 비교하고, 말할 수 있는 것과 없는 것을 나눠 두기로 했다.

처음부터 정해 둔 선은 이랬다.

- quantum advantage나 hardware advantage를 주장하지 않는다.
- full trainable QuDDPM을 구현했다고 말하지 않는다.
- Hamiltonian projected diffusion이 random-unitary diffusion보다 항상 좋다고 말하지 않는다.
- continuous basis가 axis-only보다 압도적으로 좋다고 말하지 않는다.
- IBM QPU 실행은 실제 장비에서 작은 회로가 동작했는지 확인한 것이지 성능 우위의 증명이 아니다.

발표를 약하게 만들려고 정한 제약은 아니었다. 작은 toy experiment를 큰 말로 포장하면 그 순간부터 결과물 전체를 믿기 어려워진다.

## 대회 중 경과

### Day 1 — Problem 1: random-unitary scrambling

본선은 6월 29일에 시작됐다.

문제는 기초 역할을 하는 Problem 1, 2와 사실상 자유 주제인 Problem 3으로 나뉘어 있었다. 바로 Problem 3에 뛰어드는 건 위험했다. Problem 1, 2가 흔들리면 뒤의 이야기도 설 수가 없다. 그렇다고 기초 문제에 하루를 다 쓸 수도 없었다. 그래서 첫날 기준선을 빨리 잠그고 Problem 3으로 넘어가야 한다고 생각했다.

Problem 1에서는 \(\lvert 00\rangle\) 근처의 2-qubit target ensemble \(S_0\)를 만들고 pure-state fidelity를 바탕으로 ensemble distance를 계산했다.

- fidelity-kernel MMD
- cost \(1-F\) 기반 Wasserstein-type distance

그다음 random single-qubit rotations와 entangling operation을 걸어 diffusion trajectory를 만들었다. 초기 cluster structure는 천천히 퍼진다기보다 빠르게 무너지면서 Haar-like reference level 근처로 갔고, 이걸 strong-scrambling 과정으로 해석했다.

최종 Haar reference baseline은 다음과 같았다.

\[
\begin{aligned}
D_{\mathrm{MMD}} &= 0.869583 \pm 0.024043,\\
W_{1-F} &= 0.724439 \pm 0.021491.
\end{aligned}
\]

이 값은 학습 목표가 아니고, random-unitary diffusion이 strong-scrambling regime에 들어갔는지 판단하려고 둔 기준선이었다.

### Day 1 — Problem 2: Hamiltonian projected diffusion

Problem 2에서는 2-qubit data system \(M\)에 complement qubit \(F\)를 붙여 3-qubit system을 만들고, 고정 Hamiltonian으로 시간 진화시킨 뒤 complement qubit을 projection해서 data ensemble을 얻었다.

\[
H=\sum_j \left(h_xX_j+h_yY_j\right)
  +J\sum_j X_jX_{j+1},
\]

\[
h_x=0.8090,\qquad h_y=0.9045,\qquad J=1.0.
\]

random gate-level control과 Hamiltonian/time/projection control을 Problem 1과 같은 지표로 비교해 보려는 것이었다.

random-unitary diffusion은 fluctuation과 saturation이 빨리 나타나는 strong scrambling 기준선으로 봤고, Hamiltonian projected diffusion은 고정 Hamiltonian 아래에서 time과 projection choice를 조절하는 방식으로 봤다. 어느 쪽이 항상 낫다고 할 수는 없었다.

첫 한 시간 남짓 만에 Problem 1, 2의 기본 방향과 계산 뼈대는 나왔다. 진짜 승부는 자유도가 큰 Problem 3의 실험과 해석에서 날 것 같았다.

물론 초안이 빨리 나왔다고 제출물이 완성된 건 아니었다. 둘째 날까지도 metric 설명, resource comparison, figure readability를 계속 손봤다. Problem 3를 파면서도 기본 문제에서 감점받지 않도록 두 답안을 같이 챙겨야 했다.

### Day 1 저녁 — 실험과 보고서의 속도가 갈리다

첫날 오후 7시쯤에는 코드와 실험이 보고서보다 한참 앞서 있었다. 나는 이미 Problem 3으로 넘어가야 한다고 봤지만, 다른 팀원들은 Problem 1, 2 보고서부터 마무리해야 한다고 생각했다.

코드가 아무리 앞서가도 제출물에서 수식, 문장, 그림이 서로 다른 말을 하면 소용이 없다. 그래서 나도 보고서 작성에 들어갔다. 최신 결과를 계속 반영하고 팀원들에게 검토를 부탁하면서 수식과 문장, figure를 맞춰 나갔다.

검토가 어느 정도 끝난 뒤에는 내 컴퓨터와 `dreamerghost77`의 컴퓨터를 각각 주·보조 실험 장비로 두고 밤새 자동화 실험을 돌렸다. 그때부터는 코드를 만든다기보다 실험과 문서를 동시에 굴리는 체력전이었다.

이 무렵부터 내가 맡는 일이 확 늘었다. 실험 설계, 핵심 구현, 자동화 스크립트, 결과 확인, 보고서 초안이 내 쪽으로 몰리기 시작했다. 막히면 내가 풀고, 숫자가 이상하면 내가 다시 돌리고, 보고서 논리가 흔들리면 내가 다시 이었다.

팀원들도 각자 작업을 하고 있었지만, 어떤 결과물을 누가 끝까지 책임지는지는 아직 흐릿했다. 첫날부터 이걸 더 구체적으로 나눴어야 했다.

### Day 1 밤–Day 2 새벽 — distance만 좋으면 된다는 생각을 버리다

Problem 3에서는 complement qubit을 측정하고 특정 결과만 남기는 post-selection을 denoising의 대리 과정으로 봤다. 전체 \(M+F\) system은 unitary하게 진화하지만, complement qubit을 측정해 일부 결과만 남기면 data system \(M\)에는 effective non-unitary map이 작용한다.

처음 질문은 단순했다.

- 이 map이 target ensemble 쪽으로 상태를 수축시키는가?
- 수축시키더라도 diversity를 망가뜨리지 않는가?
- post-selection success probability가 너무 낮지는 않은가?

처음에는 MMD나 Wasserstein-type distance가 많이 줄어드는 후보만 찾으면 된다고 생각했는데, 금방 틀렸다는 걸 알았다. 모든 상태를 target 근처 한 점으로 collapse시키면 거리는 좋아 보여도 ensemble diversity가 사라진다. 다양성을 죽여서 숫자만 좋게 만든 걸 denoising이라고 할 수는 없다.

가장 강한 반례가 collapse-to-centroid였다.

```text
collapse-to-centroid
MMD improvement: 0.859292
Wasserstein improvement: 0.714276
diversity retention: 0.000000
```

거리만 보면 다른 후보를 전부 압도했지만 다양성은 정확히 0이었다. 이걸 본 뒤로 distance를 최대한 낮추는 방향은 버렸다.

대신 Problem 3는 아래 세 지표를 같이 보기로 했다.

- denoising gain
- post-selection success probability
- diversity retention

Problem 3는 손으로 몇 번 돌려 보고 끝낼 문제가 아니었다. 시드 하나에서 숫자가 좋게 나왔다고 본문에 쓸 수는 없다. 그래서 Hermes agent와 자동화 스크립트를 반복 실험과 후보 검증에 붙였다.

내 메인 자동화는 완료된 cycle 60까지를 근거로 삼았다. `dreamerghost77`의 별도 머신에서는 cycle 28까지 돌면서 20-seed sweep 14회와 252개 이상의 hybrid toy run이 남았다. 최종 20-seed gate에서는 20/20으로 `use_as_main`이 재현됐다.

몇 번 돌렸는지보다, 같은 판단이 독립된 실행에서도 유지되는지 보고 싶었다. 우연히 좋은 숫자 하나를 주운 게 아니라는 근거가 있어야 했다.

### Day 2 오전 — axis-only와 continuous basis

자동화 결과가 쌓이자 continuous measurement-basis post-selection 후보가 눈에 들어왔다.

```text
median MMD improvement: 0.097056
median Wasserstein improvement: 0.147983
median axis-only score margin: 0.010000
median diversity retention: 0.823217
median success probability: 0.468122
```

continuous basis가 좋아 보이긴 했지만 axis-only 대비 margin은 작았다. 그래서 “continuous basis가 압도적으로 우월하다”는 말은 쓰지 않기로 했다.

20개 시드가 모두 최종 채택 기준을 통과하긴 했지만, 더 잘게 나눈 120개 row 중 18개에서는 axis-only 대비 margin이 양수가 아니었다. 그러니까 `20/20 use_as_main`은 모든 입력 조건에서 continuous basis가 이겼다는 뜻이 아니다. 여러 시드를 합친 전체 경향이 본문 후보로 쓸 만큼 재현됐다는 뜻이다.

\(Z/X/Y\) Pauli measurement basis만 허용하는 axis-only projection은 해석하기 쉬운 discrete baseline으로 두고, continuous basis는 이걸 Bloch sphere 위의 일반 측정 방향으로 넓힌 controlled modification으로 정리했다.

비교를 좀 더 분명하게 보려고 collapse 방어 표도 만들었다.

```text
method                 MMD gain    W gain      diversity
collapse-to-centroid   0.859292    0.714276    0.000000
axis-only              0.086055    0.142594    0.810592
continuous basis       0.097056    0.147983    0.823217
```

distance가 가장 낮다고 좋은 denoising인 건 아니었다. measurement basis는 data ensemble에 작용하는 effective non-unitary map의 방향과 강도를 바꾸고, 그 과정에서 recoverability, success probability, diversity retention 사이에 trade-off가 생긴다. 3-b에서 말하려던 건 이거였다.

```text
3-b. Controlled modification:
measurement basis controls the recoverability-success-diversity trade-off
```

시드마다 가장 좋은 파라미터를 새로 고르면 cherry-picking 의심을 피하기 어렵다. 그래서 train seed 1–10에서 고른

\[
(\tau,\theta,\phi)=(1.794737,\ 1.832596,\ 3.141593)
\]

을 holdout seed 11–20에 그대로 적용했다.

60/60 row에서 개선이 유지됐다.

```text
median MMD improvement: 0.073421
median Wasserstein improvement: 0.136641
median diversity retention: 0.790676
median success probability: 0.477322
```

시드마다 최적값을 다시 찾는 oracle grid-best보다는 숫자가 약했다. 그래도 고정된 파라미터가 처음 보는 시드에서도 통했으니, 주장의 근거로는 이쪽이 더 정직했다.

### Day 2 오후 — 3-b의 분석에서 3-c를 만들다

중간 피드백에서 중요한 지적을 받았다. 3-b가 숫자 나열로 끝나면 무엇을 분석했는지 안 보이고, 3-c도 앞의 결과와 상관없는 새 아이디어처럼 보인다는 얘기였다. 맞는 말이었다.

그전까지 우리는 좋은 후보를 여러 개 모으고 있었다. 하지만 제출 답안에서는 controlled modification이 뭔지, 어떤 trade-off가 드러났는지, 그 분석에서 다음 방법이 왜 나왔는지가 이어져야 했다.

그래서 질문을 다시 적었다.

- 이 숫자는 물리적으로 무엇을 의미하는가?
- axis-only baseline은 왜 필요한가?
- continuous basis의 margin이 작다면 무엇을 주장해야 하는가?
- 3-c는 3-b의 분석에서 자연스럽게 나오는가?
- success probability가 낮아지는 것을 어떻게 비용으로 설명할 것인가?

여기서 나온 게 **two-way projected denoising**이다.

아이디어는 단순했다. measurement-induced non-unitary contraction을 한 번 더 걸면 distance를 더 줄일 수 있지 않을까? 대신 post-selection을 두 번 통과해야 하니 성공확률은 떨어질 것이다.

앞의 3-b 수치는 \(20\text{ seeds}\times6\text{ input steps}\), 총 120개 row를 요약한 값이다. 아래 3-c 비교는 후보끼리 같은 조건에서 바로 비교하려고 \(5\text{ seeds}\times3\text{ input steps}\), 총 15개 row만 썼다. 그래서 3-b의 continuous 수치와 아래 one-way reference 수치를 같은 모집단처럼 놓고 비교하면 안 된다.

이 15-row 비교표에서 one-way continuous reference는 이랬다.

```text
one-way continuous reference
median MMD improvement: 0.056388
median Wasserstein improvement: 0.120620
median diversity retention: 0.848836
median success probability: 0.467554
```

two-way 결과는 이랬다.

```text
two-way post-selection
median MMD improvement: 0.101374
median Wasserstein improvement: 0.136426
median diversity retention: 0.829273
median success probability: 0.227065
```

같은 비교 안에서 두 distance gain은 커졌지만 success probability는 절반 가까이 떨어졌고 diversity도 조금 줄었다. 더 강하지만 더 비싼 방법일 거라는 예상 그대로였다. 3-b에서 본 trade-off가 더 세게 드러난 셈이다.

actor-critic은 숫자가 더 세게 나올 수 있었다. 하지만 raw target ensemble을 reward로 쓰는 target-aware toy에 가까워서, 본문 주장에서 빼고 부록의 보조 결과로 내렸다. 숫자가 제일 큰 후보보다 문제에서 자연스럽게 나온 후보를 앞에 두고 싶었다.

### Day 1 저녁–Day 2 — 대회 답안과 후속 연구를 나누기 시작하다

둘째 날 저녁부터는 이 결과를 대회가 끝난 뒤에도 살릴 수 있을지 생각하기 시작했다.

첫날 저녁에 만들어 둔 `06_paper_triage.md`에는 논문 한 편에 45분 넘게 쓰지 않고, Problem 1, 2에 필요한 정의와 비교 논리만 가져오도록 읽을 범위를 잘라 뒀다. 대회 중에 논문을 완전히 이해하려다 시간을 다 날리지 않으려고 만든 문서였다.

둘째 날에는 `22_overnight_problem_3_evidence_handoff.md`, `24_problem_3_method_portfolio.md`, `26_problem_3b_to_3c_storyline.md`를 차례로 만들면서 어떤 근거를 본문에 두고 뭘 부록으로 내릴지 정했다. continuous basis의 작은 margin은 숨기지 않았고, actor-critic은 target-aware라서 부록으로 내렸다. 3-c 본문 제안으로는 3-b 분석에서 자연스럽게 나온 two-way post-selection만 남겼다.

대회 답안과 논문이 될 만한 연구 노트는 기준이 다르다. 논문이 되려면 실험이 많은 것만으로는 부족하고, 질문 하나와 기준선, 제안, 한계가 있어야 한다.

이때 잡은 전체 흐름은 이랬다.

```text
Problem 1/2 baseline comparison
→ Problem 3(b) recoverability-success-diversity trade-off
→ Problem 3(c) two-way post-selection improvement
→ IBM QPU validation as appendix-level hardware execution
```

그렇다고 당시 결과물이 바로 논문이 될 만큼 완성됐다는 건 아니다. 작은 toy setting에 시드도 제한적이었고, state-vector simulation 위주의 benchmark였다. 그래도 후속 연구로 밀어 볼 질문은 생겼다.

- measurement basis를 effective non-unitary projected map의 control knob으로 볼 수 있는가?
- denoising을 distance 하나가 아니라 recoverability, success probability와 diversity retention의 trade-off로 평가할 수 있는가?
- two-way scheme을 숫자 장난이 아니라 3-b 분석에서 나온 확장으로 설명할 수 있는가?
- IBM QPU 결과를 성능 주장이 아닌 hardware-execution feasibility check로 어디까지 쓸 수 있는가?

### IBM QPU — 작은 것만 정확히 확인하다

IBM QPU에서 전체 benchmark를 다시 돌린 건 아니다. Problem 3(b)의 measurement-basis mechanism이 작은 실제 회로에서도 보이는지만 확인했다.

```text
backend: ibm_fez
2048 shots, 12 circuits job 완료
4096 shots, 20 circuits job 완료
```

대표 값은 이랬다.

\[
\begin{array}{c|cc}
\beta & \Pr(F=0) & \mathrm{entropy}\\
\hline
0       & 0.881738 & 1.375447\\
0.25\pi & 0.893164 & 1.492915\\
0.50\pi & 0.661377 & 1.581403\\
0.75\pi & 0.351270 & 1.736465
\end{array}
\]

측정 basis가 바뀌면 post-selection 관련 관측값도 바뀌었다. 결과는 딱 여기까지다. 본 benchmark는 여전히 state-vector simulation 기반이고, 실제 QPU에서 성능 우위를 증명한 게 아니다.

이 작은 검증 하나에도 README와 관련 문서, token/API key/CRN 노출 방지, dry-run mode, 제출한 job metadata 저장 여부까지 챙겨야 했다. 대회 제출물에서는 이런 운영 안전성도 과학적 주장만큼 신경 써야 했다.

### Day 3 — 연구보다 제출이 더 어려웠다

마지막 날은 연구보다는 배포 작업에 가까웠다.

처음에는 `solution_1.ipynb` 하나를 최종 답안으로 하려고 했다. 그런데 심사위원이 짧은 시간 안에 어느 파일이 어느 문제의 답인지 바로 찾을 수 있게 세 개로 나눴다.

```text
submission/usb_package/solution/
  Problem 1.ipynb
  Problem 2.ipynb
  Problem 3.ipynb
```

USB에는 노트북 세 개뿐 아니라 발표 PDF, `src/`, `scripts/`, `tests/`, `submission/run_all.py`, 재현 명령과 README까지 같이 들어가야 했다. 결과가 좋아도 어디 있는지 찾기 어렵거나 재현 명령이 없으면 심사위원 입장에서는 믿기 어렵다.

여기서 사고가 났다.

마지막 날 새벽 1시쯤 자러 가면서, 나는 `submission/usb_package/` 전체를 넣어 달라고 정확히 못 박지 못하고 저장소를 복제해 달라는 식으로 말했다. 오전 8시 40분쯤 확인해 보니 USB에는 `submission` 아래 `solution` 폴더만 들어가 있었다.

“최종 제출물”이 어디까지인지 팀 안에서 서로 다르게 이해하고 있었던 거다. 나는 전체 패키지를 생각했고, 다른 쪽은 심사위원이 주로 볼 노트북을 생각했다. 마감은 가까웠고 저장소도 커서 그 자리에서 온전히 고치기 어려웠다.

누구 한 사람 능력 탓으로 볼 일은 아니었다. 뭘 복사해야 하는지 파일 경로까지 적어서 확인하지 않은 내 지시도 부족했다. 제출 직전 파일 복사는 단순 작업처럼 보여도 프로젝트를 믿을 수 있느냐가 걸린 마지막 단계였다.

발표자료는 영어 자료 하나로 통일했다. 본선에서는 같은 자료로 5분짜리 핵심 흐름을, 결선에서는 15분짜리 전체 흐름을 쓰는 구조였다. 발표자료를 두 개 만들면 마지막 수정이 서로 어긋날 수 있어서, 자료 하나 안에서 경로만 나눴다.

최종 발표 흐름은 이랬다.

1. Problem 1: random-unitary scrambling과 Haar-like reference
2. Problem 2: Hamiltonian projected diffusion과 resource/control-cost comparison
3. Problem 3(a): measurement-induced denoising baseline
4. Problem 3(b): measurement basis가 recoverability-success-diversity trade-off를 조절한다는 분석
5. Problem 3(c): 3-b 분석에서 나온 two-way post-selection
6. IBM Cloud/QPU validation: 작은 대표 회로의 실제 장비 실행 검증

실험을 늘어놓는 게 목적은 아니었다. 3-b에서 trade-off를 분석했고 3-c가 그 분석에서 나온 제안이라는 흐름을 5분 안에 보여 줘야 했다. 한 문장으로 줄이면, 작은 quantum diffusion 설정에서 measurement basis를 effective non-unitary projected map의 조절 장치로 보고, denoising을 distance 하나가 아니라 recoverability, success probability와 diversity retention의 trade-off로 평가해 보려 한 프로젝트였다.

### 최종적으로 나뉜 역할

저장소의 최종 기록을 기준으로 나는 전체 실험 설계, 핵심 구현, Problem 1·2·3 코드 통합, 지표와 결과 검수, IBM QPU 검증, 재현 명령과 최종 패키지 정리를 맡았다.

`koi312500`은 코드와 Qiskit 해석이 맞는지 검수하고 제출 패키지와 발표자료를 정리했다. `chaejinlim235`는 코드와 결과 해석, Problem 3(a,b)의 이야기 구성, 최종 노트북·보고서·발표자료 제작을 도왔다. `dreamerghost77`은 물리적 해석, Problem 3(c)의 trade-off 해석, 보조 실험과 그림·표·재현 기록 정리를 맡았다.

다들 분명히 기여했다. 다만 핵심 실험과 구현, 자동화, 통합의 압박이 내 쪽에 많이 몰렸던 것도 사실이다. 팀원들에게 고마웠지만, 대회의 기술적인 부분을 혼자 끌고 가는 것 같다고 느낀 순간도 많았다.

이제 제출과 발표가 끝났고 결과만 남았다.

## 결과

수상 구조는 둘째 날에 들었다. 결선 4팀, 멘토 특별상 2팀, IBM/Pasqal QPU 사용 관련 상 2팀이었다. 내가 이해하기로는 전체 20팀 중 주제별 2팀, 총 8팀이 어떤 식으로든 상을 받는 구조였다.

결선에 못 가더라도 특별상은 받을 수 있겠다고 생각했다. 그래서 작년 우승팀 저장소와 우리 저장소를 계속 비교했다. README가 심사위원에게 바로 읽히는지, 그림과 표가 잘 보이는지, 코드가 재현되는지, 적어도 3일 동안 어디까지 밀어붙였는지가 남는지 끝까지 고쳤다.

수상자 발표가 시작될 때까지도 한편으로는 특별상을 기대했고, 다른 한편으로는 이 결과를 어떻게 논문으로 만들지 생각하고 있었다. 머릿속에서는 대회가 아직 끝나지 않은 상태였다. 둘째 날 저녁부터 figure 재구성, 기준선 보강, limitation 정리, 개인 fork 계획을 생각하고 있었고, 결과가 어떻든 저장소를 다시 파서 연구다운 모양으로 만들 생각이었다.

수상하지 못했다.

아무 이름도 불리지 않았을 때는 대회 하나 졌다는 느낌보다, 내가 연구 주제로 보기 시작한 작업이 그 자리에서 아무 공식적인 이름도 얻지 못했다는 느낌이 더 컸다.

전날 SKYSH에서도 결과물을 끝까지 만들었고, 이어진 대회에서도 3일 동안 실험, 구현, 보고서, 제출물을 붙잡고 있었다. 두 일정이 연달아 끝난 순간에는 전체 사진 촬영 자리에 남아 있기 힘들 만큼 무너졌다. 나를 증명할 결과와 상금이 둘 다 절실했던 때라 3일이 통째로 물거품이 된 것 같았다.

상금은 핑계가 아니라 실제로 필요했다. 그래서 “좋은 경험이었다”는 말로 바로 넘어가기 어려웠다. 경험과 저장소가 남았다는 건 알았지만, 그 순간에는 공식적인 결과도 현실적인 보상도 다 사라졌다는 감각이 먼저 왔다.

결과가 아쉬운 것과 팀원들에게 고마운 건 별개다. `chaejinlim235`, `koi312500`, `dreamerghost77`은 각자의 방식으로 끝까지 기여했다. 그러면서도 핵심 기술 실행과 통합이 내 쪽에 많이 몰렸다는 외로움은 남았다. 고마움과 외로움이 같이 있었다.

대회가 끝나고 심사위원과 출제자의 설명을 들으면서 내가 놓친 것도 보였다. Problem 1, 2는 문제 감을 잡기 위한 부분이고, 진짜 핵심은 자유롭게 연구하는 Problem 3에 가까웠다. 결과가 아주 압도적으로 갈렸다기보다는 발표에서 잘 전달한 팀이 좋은 평가를 받은 면도 있다고 들었다.

## 오답노트

### 좋은 실험과 좋은 제출물을 구분하지 못했다

가장 크게 놓친 건 좋은 실험과 좋은 제출물이 서로 다른 결과물이라는 점이었다.

결과와 숫자를 보여 주면 어느 정도는 전달될 거라고 생각했다. Problem 3의 숫자와 재현성에는 자신이 있었다. 하지만 심사위원이 처음 보는 5분 안에 “우리가 무엇을 발견했고, 왜 이 발견이 문제의 자유도를 제대로 사용한 것인지”를 이해시키기에는 부족했다.

실험은 후보를 찾고 숫자를 검증하면 된다. 제출물은 그중 핵심 주장 하나를 골라서, 그게 왜 문제 요구에 맞는지, 근거가 뭐고 한계가 어디까지인지를 짧은 시간 안에 전달해야 한다.

숫자와 figure는 있었다. 그런데 Problem 3의 발견이 왜 Problem 1, 2보다 중요한지, 특별상을 줄 만한 지점이 뭔지를 발표 첫 문장부터 더 날카롭게 잘라 보여 줬어야 했다. 3-b에서 3-c가 나오는 흐름을 막판에야 정리한 것도 늦었다.

실험을 많이 했다고 발표가 저절로 촘촘해지지는 않았다. 오히려 후보와 수치가 많을수록 더 과감하게 버렸어야 했다. 다음에는 첫날 안에 발표의 핵심 문장을 임시로라도 정하고, 실험은 그 문장을 검증하거나 반박하는 것만 남길 생각이다.

### 역할을 도움의 단위로 나눴다

팀원이 네 명이라고 일이 저절로 네 갈래로 나뉘지는 않는다. 처음부터 각자 끝까지 책임질 산출물과 마감 시각을 정했어야 했다. “도와줄게”가 아니라 “오늘 몇 시까지 이 파일을 낸다”는 식으로.

```text
1. 구현 담당: 오늘 밤까지 실행 가능한 baseline 1개
2. 실험 담당: seed sweep 결과 표 1개
3. 문서 담당: 문제 해석과 관련 문헌 요약 2페이지
4. 발표 담당: 5분 발표 흐름과 그림 배치
5. 통합 담당: 최종 저장소와 패키지 구조 관리
```

이번에는 이런 구조가 늦게 잡혀서 핵심 기술 실행과 통합이 나한테 많이 몰렸다. 다음에는 역할을 사람이나 분야로만 나누지 않고 파일명, 완료 조건, 마감 시각까지 정할 것이다.

그때는 요청해서 중간 결과를 받아도, 그게 최종 코드와 보고서에 맞물리지 않으면 결국 내가 다시 통합하는 경우가 많았다. 팀원이 작업을 했다는 것과 그 산출물이 제출물 안에서 완결됐다는 건 다른 얘기다. 다음에는 담당자가 초안만 만들고 끝내지 않고, 테스트, 설명 문장, 최종 파일 반영까지 자기 파트로 가져가게 하려고 한다.

이렇게 쓰면 팀원을 탓하는 것처럼 보일 수도 있다는 건 안다. 실제로 세 사람은 발표자료, 보고서 정리, 물리적 해석, 구현 검토와 보조 실험을 맡아 줬다. 다만 고맙다는 말을 하려고 내가 받은 압박까지 없던 일로 만들고 싶지는 않다. 문제가 생길 때마다 마지막 책임이 나한테 돌아오는 구조는 다음 대회 전에 꼭 바꿔야 한다.

### 제출 패키지를 너무 늦게 확정했다

USB 사고는 마지막 순간의 실수였지만 원인은 더 앞에 있었다. 최종 제출 폴더를 일찍 확정하지 않았고, 다른 사람이 같은 경로를 보고 그대로 복사할 수 있는 체크리스트도 만들지 않았다.

다음에는 마감 최소 두 시간 전에 제출 패키지를 확정하고, 한 명이 복사하면 다른 한 명이 README, 실행 명령, 비밀정보 검사, 실제 USB 내용을 교차로 확인하게 할 것이다.

## 잘한 점

### 한계를 숨기지 않았다

continuous basis가 axis-only보다 조금 좋게 나왔지만 margin이 작다는 건 그대로 적었다. actor-critic이 강한 숫자를 냈어도 target-aware라는 한계를 밝혔다. IBM QPU job이 실제로 완료됐어도 hardware advantage라고 하지 않았다.

해커톤에서는 세게 말하는 게 유리해 보일 때가 많은데, 이번에는 정확하게 말하는 쪽을 골랐다.

### 같은 지표를 끝까지 유지했다

Problem 1부터 3까지 fidelity 기반 MMD와 Wasserstein-type distance를 계속 썼다. 그래서 random-unitary, Hamiltonian projected diffusion, measurement-induced denoising을 각각 다른 말로 포장하지 않고 같은 눈금에서 비교할 수 있었다. distance만 좋아지는 collapse가 왜 실패인지도 이 지표와 diversity를 나란히 놓고 보니 드러났다.

### 자동화 결과를 근거로 바꿨다

Hermes agent는 코드를 대신 써 주는 용도로만 쓰지 않았다. 여러 시드와 독립 실행에서 같은 경향이 유지되는지, 본문에 올릴 후보가 기준을 통과하는지를 반복해서 확인하는 데 썼다.

시드 sweep, 고정 파라미터 holdout, collapse 방어 표, 별도 머신의 반복 실행이 있었기 때문에 Problem 3의 주장에 조금 더 책임을 질 수 있었다.

### 마지막에 이야기 구조를 다시 세웠다

처음부터 3-b와 3-c가 깔끔했던 건 아니다. 중간에는 후보가 너무 많아서 뭐가 본문인지 흐려졌다. 피드백을 받고 나서 3-b는 분석, 3-c는 그 분석에서 나온 제안이 되도록 다시 짰다. 숫자가 제일 큰 actor-critic을 내리고 two-way post-selection을 본문에 둔 것도 그래서였다.

## 앞으로

QuantumCylinder는 full trainable QuDDPM이 아니고, quantum advantage나 hardware advantage를 보인 프로젝트도 아니다. continuous basis가 언제나 axis-only보다 강하다는 결과도 아니다.

그래도 마음에 남는 건 있다. 좋은 숫자를 위해 ensemble diversity를 죽이지 않았고, distance뿐 아니라 success probability와 diversity retention을 같이 봤다. IBM QPU 실행도 본 benchmark인 것처럼 부풀리지 않았다. denoising을 가장 낮은 distance 하나로 평가할 수는 없고, 복원성, 성공확률, 다양성 보존 사이의 trade-off를 정직하게 설명해야 한다는 게 이번에 얻은 생각이다.

둘째 날부터 이미 대회 이후의 확장을 생각했고, 대회가 끝난 뒤에는 개인 fork를 만들어 저장소를 다시 보기 시작했다. 당장 논문이 된다고 말할 단계는 아니다.

앞으로 필요한 건 이렇다.

- 더 많은 시드와 독립적인 반복 실행
- 엄밀한 Born-weighted projected ensemble 재현
- noise model 비교
- hardware run 확장
- collapse, axis-only와 classical baseline 보강
- 결과를 하나의 논문 주장으로 좁히는 작업

수상하지 못했다는 사실은 바뀌지 않는다. 그렇다고 3일 동안 내가 실제로 한 일까지 사라지는 건 아니다. 낯선 문제의 실험을 설계하고, 핵심 코드를 구현하고, 자동화하고, 결과를 검수하고, 문서와 제출 가능한 패키지까지 밀어붙였다.

이 글과 개인 fork를 만든 이유도 그거다. 팀전에서는 결과물의 소유권과 기여가 여러 사람 사이에 섞이고, 최종 순위 한 줄이 그 과정을 다 대신해 버리기 쉽다. 그래서 내가 실제로 설계하고 구현하고 판단한 범위는 코드와 문서로 남겨 두고 싶었다. 수상 여부와 별개로, 다음에 팀을 꾸리거나 연구를 이어 갈 때 다시 꺼내 볼 근거가 된다.

서류상 팀장은 `chaejinlim235`였고, 본선 현장에서 기술 방향과 통합은 사실상 내가 이끌었다. 이 정도 규모의 대회에서 이런 역할을 맡은 건 처음이었다. 잘한 부분도 있었고, 다음에는 더 선명하게 나눠야 할 부분도 있었다.

내년에 다시 기회가 생기면 각자 자기 파트를 끝까지 책임지는 팀을 꾸려서 우승을 노려 보고 싶다. 올해는 문제 고르는 법, 기준선을 일찍 확정하는 법, 자동화 실험 돌리는 법, 발표의 핵심 주장을 세우는 법, 제출 패키지를 미리 확정하는 법을 몸으로 배웠다.

마지막으로 3일 동안 함께한 `chaejinlim235`, `dreamerghost77`, `koi312500`에게 고맙다. 결과가 아쉽다고 해서 세 사람이 실제로 해 준 일까지 지우고 싶지는 않다.

수상은 못 했다. 그래도 이 코드가 3일짜리 제출물로 끝나는지는 내가 더 해 보면 알 수 있다.
