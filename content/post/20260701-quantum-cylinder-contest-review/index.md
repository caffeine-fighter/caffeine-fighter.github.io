---
title: "2026 양자정보경진대회 후기: QuantumCylinder"
description: "양자정보를 처음 배운 팀이 3일 동안 어디까지 갔는가"
date: 2026-07-01T23:40:00+09:00
lastmod: 2026-07-27T01:00:00+09:00
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

팀원은 모두 GitHub 아이디로만 적는다.

- 팀장 `chaejinlim235` (POSTECH 26')
- 팀원 `caffeine-fighter` (SNU TI 24')
- 팀원 `koi312500` (DGIST 26')
- 팀원 `dreamerghost77` (SNU TI 26')

팀이 만들어진 5월부터 예선, 3일간의 본선과 제출 순간까지 당시의 순서대로 적는다.

저장소에는 최종 코드와 문서가 남아 있지만, 그것만 보면 왜 어떤 실험을 버렸고 어떤 결과를 본문에 남겼는지는 알기 어렵다. 이 글은 숫자와 파일 사이에 있었던 판단을 복원하는 기록이다.

## 참가 배경

양자정보경진대회 전날까지 나는 SKYSH 해커톤에 있었다.

그곳에서 우리 팀은 업비트 공개 데이터로 시장의 과열 상태를 살피고, 사용자가 감정적으로 매수·매도하기 전에 한 번 멈추게 하는 **FOMO Break**를 만들었다. 나는 제품 방향과 MVP 구현의 중심을 맡아 백엔드 API, Historical Mirror, Decision Pause와 프론트엔드 시연 화면을 끝까지 붙들었다.

> SKYSH 후기: <https://caffeine-fighter.github.io/p/20260629-fomo-break-hackathon-review/>

대회를 마친 바로 다음 날 양자정보경진대회가 시작됐다. 체력은 이미 많이 빠져 있었다. 최근 여러 대회와 프로그램의 결과가 기대대로 이어지지 않았고, 나를 다시 증명할 결과가 급했다. 상금도 필요했다. 그냥 경험이나 쌓자는 마음으로 들어간 대회는 아니었다.

도구를 쓰는 방식도 두 대회가 이어져 있었다. SKYSH에서는 Codex를 처음으로 본격적인 개발 보조 도구로 썼다. 이번에는 자동화된 **Hermes agent**를 반복 실험에 붙였다. 하루 안에 제품을 만드는 대회 다음 날, 여러 시드와 후보를 밤새 돌리고 근거를 쌓는 대회로 그대로 넘어간 셈이었다.

## 팀 결성과 예선

팀은 5월 초에 만들어졌다. 처음부터 양자정보 전문가가 모인 팀은 아니었다. 첫 반응부터 “이걸 학부생이 제대로 할 수 있나?”에 가까웠다.

지정문제는 여러 개였다. Trotterized quantum simulation, neutral atom QPU에서의 QUBO, Quantum Machine Learning과 Dynamic Circuit 같은 주제가 있었고, 우리는 그중 3번과 4번을 두고 고민했다.

3번에는 Quantum DDPM, random unitary, diffusion, circuit depth, noise, hardware-efficient reverse process가 한꺼번에 들어 있었다. 4번의 Dynamic Circuit도 흥미로웠지만, 3번은 생성형 모델과 Qiskit 구현 경험을 엮을 수 있어 보였다.

정답이 정해진 계산 문제가 아니라, 기본 구조를 이해한 뒤 직접 실험과 해석을 만들어야 하는 문제였다. 잘 풀면 우리만의 결과를 만들 수 있고, 잘못 풀면 실험만 잔뜩 늘어놓고 아무 결론도 내리지 못할 수 있었다.

그래도 3번을 골랐다.

팀명 후보로는 네 명이 모인 예측 불가능한 팀이라는 뜻의 **4 body problem**도 있었다. 최종 이름은 **QuantumCylinder**가 됐다.

예선 신청서는 급하게 썼다. `chaejinlim235`가 팀장으로 참가 신청과 서류 제출을 주도했고, 나머지 팀원들은 각자의 연구·개발·딥러닝 경험을 보태고 문체와 내용을 검수했다.

이 과정에서 우리 팀의 성격도 어느 정도 정해졌다.

- 양자정보 전문팀이라기보다 구현과 실험으로 밀어붙이는 팀
- 생성형 AI와 QML을 연결해 보려는 팀
- 모르는 것을 아는 척하지 않고 가능한 주장과 불가능한 주장을 나누는 팀

본선 진출 소식을 들었을 때 반응은 솔직히 “이게 되네”에 가까웠다. 동시에 계절학기와 다른 대회, 개인 일정까지 겹쳐 준비 시간은 부족했다. 그래도 이미 붙었고 이런 대회를 직접 경험할 기회도 흔하지 않았다.

끝까지 가 보기로 했다.

## 준비 과정

본선 전 며칠 동안 Qiskit, IBM Quantum Learning, QML 자료와 작년 문제를 공부했다. 실행 가능한 노트북 후보와 관련 논문도 모았다. 준비가 충분했다고 말할 수는 없다.

양자정보경진대회는 일반적인 웹·앱 해커톤과 결이 달랐다. 웹 해커톤이라면 우선 사용자가 누를 화면과 API부터 만들 수 있다. 여기서는 코드가 돈다는 것만으로는 아무 의미가 없었다. 왜 그 결과가 물리적으로 말이 되는지, 어떤 지표로 비교할지, 어디까지 주장해도 되는지를 함께 설명해야 했다.

“양자”라는 단어가 붙었다는 이유만으로 무언가 있어 보이는 회로를 늘어놓고 싶지는 않았다. 서로 다른 방법을 같은 지표 위에서 비교하고, 말할 수 있는 것과 말할 수 없는 것을 나누기로 했다.

처음부터 정한 선은 다음과 같았다.

- quantum advantage나 hardware advantage를 주장하지 않는다.
- full trainable QuDDPM을 구현했다고 말하지 않는다.
- Hamiltonian projected diffusion이 random-unitary diffusion보다 항상 좋다고 말하지 않는다.
- continuous basis가 axis-only보다 압도적으로 좋다고 말하지 않는다.
- IBM QPU 실행은 실제 장비에서 작은 회로가 동작했는지 확인한 것이지 성능 우위의 증명이 아니다.

이 제약은 발표를 약하게 만들기 위한 것이 아니었다. 작은 toy experiment를 큰 말로 포장하는 순간 결과물 전체를 믿기 어려워진다. 강하게 말하는 것보다 정확하게 말하는 쪽을 택했다.

## 대회 중 경과

### Day 1 — Problem 1: random-unitary scrambling

본선은 6월 29일에 시작됐다.

문제는 기초 역할을 하는 Problem 1과 2, 사실상 자유 주제인 Problem 3으로 나뉘었다. 처음부터 Problem 3에 뛰어들면 위험했다. Problem 1과 2가 흔들리면 뒤의 이야기도 설 수 없었다. 그렇다고 기초 문제에 하루를 모두 쓸 수도 없었다.

나는 첫날 빠르게 기준선을 잠그고 Problem 3으로 넘어가야 한다고 판단했다.

Problem 1에서는 `|00>` 근처의 2-qubit target ensemble `S0`를 만들고 pure-state fidelity를 바탕으로 ensemble distance를 계산했다.

- fidelity-kernel MMD
- cost `1 - F` 기반 Wasserstein-type distance

그 뒤 random single-qubit rotations와 entangling operation을 적용해 diffusion trajectory를 만들었다. 초기 cluster structure가 천천히 퍼진다기보다 빠르게 무너져 Haar-like reference level 근처로 가는 strong-scrambling 과정으로 해석했다.

최종 Haar reference baseline은 다음과 같았다.

```text
D_MMD = 0.869583 +/- 0.024043
W_{1-F} = 0.724439 +/- 0.021491
```

이 값은 학습 목표가 아니었다. random-unitary diffusion이 strong-scrambling regime에 들어갔는지를 판단하기 위한 기준선이었다.

### Day 1 — Problem 2: Hamiltonian projected diffusion

Problem 2에서는 2-qubit data system `M`에 complement qubit `F`를 붙여 3-qubit system을 만들었다. 고정 Hamiltonian으로 시간 진화를 수행한 뒤 complement qubit을 projection해 data ensemble을 얻었다.

```text
H = sum_j (hx X_j + hy Y_j) + J sum_j X_j X_{j+1}
hx = 0.8090, hy = 0.9045, J = 1.0
```

목적은 random gate-level control과 Hamiltonian/time/projection control을 Problem 1과 같은 지표 위에서 비교하는 것이었다.

random-unitary diffusion은 fluctuation과 saturation이 빠르게 나타나는 strong scrambling 기준선으로 해석했다. Hamiltonian projected diffusion은 고정 Hamiltonian 아래에서 time과 projection choice를 조절하는 방식이었다. 어느 한쪽이 항상 더 좋다고 말할 수는 없었다.

첫 한 시간 남짓 동안 Problem 1과 2의 기본 방향과 계산 뼈대는 빠르게 만들었다. 나는 진짜 승부가 자유도가 큰 Problem 3의 실험과 해석에서 날 것 같았다.

다만 초안이 빨리 나왔다고 최종 제출물이 완성된 것은 아니었다. 둘째 날까지도 metric 설명, resource comparison과 figure readability를 계속 보강했다. Problem 3를 파면서도 기본 문제에서 감점받지 않도록 두 답안을 함께 관리해야 했다.

### Day 1 저녁 — 실험과 보고서의 속도가 갈리다

첫날 오후 7시쯤에는 코드와 실험이 보고서보다 훨씬 앞서가고 있었다. 나는 이미 Problem 3으로 넘어가야 한다고 봤지만, 다른 팀원들은 Problem 1과 2의 보고서를 먼저 마무리해야 한다고 생각했다.

코드가 앞서 나가도 제출물에서 수식과 문장과 그림이 서로 다른 말을 하면 아무 소용이 없다. 그래서 나도 보고서 작성에 직접 들어갔다. 최신 결과를 계속 반영하고 팀원들에게 검토를 부탁하면서 수식, 문장과 figure를 맞췄다.

검토가 어느 정도 끝난 뒤 내 컴퓨터와 `dreamerghost77`의 컴퓨터를 각각 주·보조 실험 장비로 두고 밤새 자동화 실험을 돌렸다. 그때부터는 코드를 만드는 대회라기보다 실험과 문서를 동시에 굴리는 체력전이었다.

이 시점부터 내 역할도 급격히 커졌다. 실험 설계와 핵심 구현, 자동화 스크립트, 결과 확인과 보고서 초안이 내 쪽에 많이 모이기 시작했다. 문제가 막히면 내가 풀어야 했고, 숫자가 이상하면 내가 다시 돌렸으며, 보고서의 논리가 흔들리면 내가 다시 연결했다.

팀원들도 각자의 작업을 진행하고 있었지만, 누가 어느 결과물을 끝까지 소유하는지는 아직 선명하지 않았다. 첫날부터 이 구조를 더 구체적으로 나눴어야 했다.

### Day 1 밤–Day 2 새벽 — distance만 좋으면 된다는 생각을 버리다

Problem 3에서는 complement qubit을 측정하고 특정 결과만 선택하는 post-selection을 denoising의 대리 과정으로 보았다. 전체 `M+F` system은 unitary하게 진화하지만, complement qubit을 측정해 일부 결과만 남기면 data system `M`에는 effective non-unitary map이 작용한다.

처음 질문은 단순했다.

- 이 map이 target ensemble 쪽으로 상태를 수축시키는가?
- 수축시키더라도 diversity를 망가뜨리지 않는가?
- post-selection success probability가 너무 낮지는 않은가?

처음에는 MMD나 Wasserstein-type distance가 많이 줄어드는 후보를 찾으면 된다고 생각했다. 곧 그 판단이 틀렸다는 것을 알았다. 모든 상태를 target 근처 한 점으로 collapse시키면 거리는 좋아 보이지만 ensemble diversity는 사라진다. 그건 denoising이 아니라 다양성을 죽여 숫자만 좋게 만든 것이다.

가장 강한 반례는 collapse-to-centroid였다.

```text
collapse-to-centroid
MMD improvement: 0.859292
Wasserstein improvement: 0.714276
diversity retention: 0.000000
```

거리만 보면 다른 모든 후보를 압도했다. 하지만 다양성은 정확히 0이었다. 이 결과를 본 뒤부터 가장 낮은 distance를 찾는 문제를 버렸다.

Problem 3의 언어를 세 가지로 다시 정리했다.

- denoising gain
- post-selection success probability
- diversity retention

세 지표를 같이 봐야 했다.

Problem 3는 손으로 몇 번 돌리고 끝낼 수 있는 문제가 아니었다. 시드 하나에서 숫자가 좋게 나왔다고 본문 주장으로 쓸 수 없었다. 그래서 Hermes agent와 자동화 스크립트를 반복 실험과 후보 검증에 붙였다.

내 메인 자동화는 완료된 cycle 60까지를 근거로 삼았다. `dreamerghost77`의 별도 머신에서는 cycle 28까지, 20-seed sweep 14회와 252개 이상의 hybrid toy run을 남겼다. 최종 20-seed gate에서는 20/20으로 `use_as_main`을 재현했다.

여러 번 돌렸다는 사실 자체보다, 같은 판단이 독립적인 실행에서도 살아남았다는 점이 중요했다. 우연히 좋은 숫자 하나를 주운 것이 아니라는 근거가 필요했다.

### Day 2 오전 — axis-only와 continuous basis

자동화 결과가 쌓이자 continuous measurement-basis post-selection 후보가 보였다.

```text
median MMD improvement: 0.097056
median Wasserstein improvement: 0.147983
median axis-only score margin: 0.010000
median diversity retention: 0.823217
median success probability: 0.468122
```

continuous basis가 좋아 보였지만 axis-only 대비 margin은 작았다. 그래서 “continuous basis가 압도적으로 우월하다”는 말은 버렸다.

20개 시드 모두 최종 채택 기준은 통과했지만, 더 잘게 나눈 120개 row 중 18개에서는 axis-only 대비 margin이 양수가 아니었다. `20/20 use_as_main`은 모든 입력 조건에서 continuous basis가 이겼다는 뜻이 아니었다. 여러 시드를 합친 전체 경향이 본문 후보로 사용할 만큼 재현됐다는 뜻이었다.

`Z/X/Y` Pauli measurement basis만 허용하는 axis-only projection을 해석 가능한 discrete baseline으로 뒀다. continuous basis는 이를 Bloch sphere 위의 일반 측정 방향으로 넓힌 controlled modification으로 정리했다.

비교를 더 분명하게 보기 위해 collapse 방어 표도 만들었다.

```text
method                 MMD gain    W gain      diversity
collapse-to-centroid   0.859292    0.714276    0.000000
axis-only              0.086055    0.142594    0.810592
continuous basis       0.097056    0.147983    0.823217
```

좋은 denoising은 distance가 가장 낮은 방법이 아니었다. measurement basis가 data ensemble에 작용하는 effective non-unitary map의 방향과 강도를 바꾸고, 그 과정에서 recoverability, success probability와 diversity retention 사이의 trade-off가 생긴다는 점이 핵심이었다.

```text
3-b. Controlled modification:
measurement basis controls the recoverability-success-diversity trade-off
```

시드마다 가장 좋은 파라미터를 다시 고르면 cherry-picking이라는 의심을 피하기 어렵다. 그래서 train seed 1–10에서 고른 `(tau, theta, phi)=(1.794737, 1.832596, 3.141593)`을 holdout seed 11–20에 그대로 적용했다.

60/60 row에서 개선이 유지됐다.

```text
median MMD improvement: 0.073421
median Wasserstein improvement: 0.136641
median diversity retention: 0.790676
median success probability: 0.477322
```

매 시드에서 최적값을 다시 찾는 oracle grid-best보다 숫자는 약했다. 대신 고정된 파라미터가 처음 보지 않은 시드에서도 작동했다는 점에서 주장하기에는 더 정직한 근거였다.

### Day 2 오후 — 3-b의 분석에서 3-c를 만들다

중간 피드백에서 중요한 지적을 받았다. 3-b가 숫자 나열에 그치면 어떤 특징을 분석한 것인지 보이지 않고, 3-c도 앞의 결과와 관계없는 새 아이디어처럼 보인다는 내용이었다.

맞는 말이었다.

그전까지 우리는 좋은 후보를 여러 개 모으고 있었다. 하지만 제출 답안에서는 controlled modification이 무엇이고, 어떤 trade-off를 드러냈으며, 그 분석에서 다음 방법이 왜 나왔는지를 이어야 했다.

질문을 다시 정리했다.

- 이 숫자는 물리적으로 무엇을 의미하는가?
- axis-only baseline은 왜 필요한가?
- continuous basis의 margin이 작다면 무엇을 주장해야 하는가?
- 3-c는 3-b의 분석에서 자연스럽게 나오는가?
- success probability가 낮아지는 것을 어떻게 비용으로 설명할 것인가?

그 질문에서 **two-way projected denoising**을 만들었다.

아이디어는 단순했다. measurement-induced non-unitary contraction을 한 번 더 적용하면 distance를 더 줄일 수 있지 않을까? 대신 두 번의 post-selection을 통과해야 하니 성공확률은 낮아질 것이다.

앞의 3-b 수치는 `20 seeds × 6 input steps`, 총 120개 row를 요약한 값이었다. 아래 3-c 비교는 후보끼리 같은 조건에서 직접 비교하기 위해 `5 seeds × 3 input steps`, 총 15개 row만 사용했다. 따라서 3-b의 continuous 수치와 아래 one-way reference 수치를 그대로 같은 모집단처럼 비교하면 안 된다.

이 15-row 비교표에서 one-way continuous reference는 다음과 같았다.

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

동일한 비교 안에서 두 distance gain은 커졌지만 success probability가 절반 가까이 떨어졌고 diversity도 조금 줄었다. 더 강하지만 더 비싼 방법이라는 예상 그대로였다. 무조건 더 좋은 방법이 아니라, 3-b에서 발견한 trade-off를 더 강하게 보여주는 방법이었다.

actor-critic은 더 강한 숫자를 만들 수 있었다. 하지만 raw target ensemble을 reward로 쓰는 target-aware toy에 가까웠다. 그래서 본문 주장이 아니라 부록의 보조 결과로 내렸다.

숫자가 가장 큰 후보보다 문제에서 자연스럽게 나온 후보를 앞에 뒀다.

### Day 1 저녁–Day 2 — 대회 답안과 후속 연구를 나누기 시작하다

둘째 날 저녁부터는 이 결과를 대회가 끝난 뒤에도 살릴 수 있을지 생각했다.

첫날 저녁에 만들어 둔 `06_paper_triage.md`에서는 논문 한 편에 45분 이상 쓰지 않고 Problem 1과 2에 필요한 정의와 비교 논리만 가져오도록 읽기 범위를 잘랐다. 대회 중에 논문을 완전히 이해하려다 시간을 모두 쓰지 않기 위한 문서였다.

둘째 날에는 `22_overnight_problem_3_evidence_handoff.md`, `24_problem_3_method_portfolio.md`, `26_problem_3b_to_3c_storyline.md`를 차례로 만들며 어떤 근거를 본문에 두고 무엇을 부록으로 내릴지 정했다. continuous basis의 작은 margin은 숨기지 않았고, actor-critic은 target-aware라는 이유로 부록으로 내렸다. two-way post-selection만 3-b 분석에서 자연스럽게 나온 3-c 본문 제안으로 남겼다.

대회 답안과 논문화 가능한 연구 노트의 기준은 달랐다. 논문이 되려면 실험이 많기만 해서는 안 된다. 하나의 질문과 기준선, 제안, 한계가 있어야 한다.

이때 정한 전체 흐름은 다음과 같았다.

```text
Problem 1/2 baseline comparison
→ Problem 3(b) recoverability-success-diversity trade-off
→ Problem 3(c) two-way post-selection improvement
→ IBM QPU validation as appendix-level hardware execution
```

당시 결과물이 바로 논문이 될 정도로 완성됐다는 뜻은 아니다. 작은 toy setting, 제한된 시드와 state-vector simulation 중심의 benchmark였다. 그래도 후속 연구로 밀어볼 질문은 생겼다.

- measurement basis를 effective non-unitary projected map의 control knob으로 볼 수 있는가?
- denoising을 distance 하나가 아니라 recoverability, success probability와 diversity retention의 trade-off로 평가할 수 있는가?
- two-way scheme을 숫자 장난이 아니라 3-b 분석에서 나온 확장으로 설명할 수 있는가?
- IBM QPU 결과를 성능 주장이 아닌 hardware-execution feasibility check로 어디까지 쓸 수 있는가?

### IBM QPU — 작은 것만 정확히 확인하다

IBM QPU에서 전체 benchmark를 다시 수행한 것은 아니다. Problem 3(b)의 measurement-basis mechanism이 작은 실제 회로에서도 관찰되는지만 확인했다.

```text
backend: ibm_fez
2048 shots, 12 circuits job 완료
4096 shots, 20 circuits job 완료
```

대표 값은 다음과 같았다.

```text
beta 0.0000pi: p(F=0)=0.881738, entropy=1.375447
beta 0.2500pi: p(F=0)=0.893164, entropy=1.492915
beta 0.5000pi: p(F=0)=0.661377, entropy=1.581403
beta 0.7500pi: p(F=0)=0.351270, entropy=1.736465
```

측정 basis가 달라질 때 post-selection 관련 관측값도 달라졌다. 여기까지가 결과였다. 본 benchmark는 여전히 state-vector simulation 기반이며, 실제 QPU에서 성능 우위를 증명한 것이 아니다.

이 작은 검증에도 README와 관련 문서, token/API key/CRN 노출 방지, dry-run mode, 제출한 job metadata 저장 여부를 확인해야 했다. 대회 제출물에서는 과학적 주장만큼 운영 안전성도 중요했다.

### Day 3 — 연구보다 제출이 더 어려웠다

마지막 날은 연구보다 배포 엔지니어링에 가까웠다.

처음에는 `solution_1.ipynb` 하나를 최종 답안으로 보려 했다. 그러나 심사위원이 짧은 시간 안에 어느 파일이 어느 문제에 답하는지 바로 찾을 수 있도록 세 개로 나눴다.

```text
submission/usb_package/solution/
  Problem 1.ipynb
  Problem 2.ipynb
  Problem 3.ipynb
```

USB에는 노트북 세 개만이 아니라 발표 PDF, `src/`, `scripts/`, `tests/`, `submission/run_all.py`, 재현 명령과 README가 함께 들어가야 했다. 좋은 결과도 어디에 있는지 찾기 어렵거나 재현 명령이 없으면 심사위원에게는 신뢰하기 어려운 결과가 된다.

여기서 사고가 났다.

마지막 날 새벽 1시쯤 자러 가며 나는 `submission/usb_package/` 전체를 넣어 달라고 정확히 못 박지 못하고 저장소를 복제해 달라는 식으로 말했다. 오전 8시 40분쯤 확인했을 때 USB에는 `submission` 아래의 `solution` 폴더만 들어가 있었다.

팀 안에서 “최종 제출물”이 가리키는 범위를 서로 다르게 이해한 것이다. 나는 전체 패키지를 생각했고, 다른 쪽에서는 심사위원이 주로 볼 노트북을 생각했다. 마감이 가까웠고 저장소도 커서 그 자리에서 온전히 고치기 어려웠다.

누구 한 사람의 능력 문제로 볼 일은 아니었다. 무엇을 복사해야 하는지 파일 경로까지 적어 확인하지 않은 내 지시도 부족했다. 제출 직전의 파일 복사는 단순 작업처럼 보여도 프로젝트의 신뢰도를 결정하는 마지막 단계였다.

발표자료는 영어 자료 하나로 통일했다. 본선에서는 같은 자료의 5분 핵심 흐름을, 결선에서는 15분 전체 흐름을 쓰는 구조였다. 별도의 발표자료를 두 개 만들면 마지막 수정이 서로 어긋날 수 있어 하나의 자료 안에서 경로만 나눴다.

최종 발표 흐름은 다음과 같았다.

1. Problem 1: random-unitary scrambling과 Haar-like reference
2. Problem 2: Hamiltonian projected diffusion과 resource/control-cost comparison
3. Problem 3(a): measurement-induced denoising baseline
4. Problem 3(b): measurement basis가 recoverability-success-diversity trade-off를 조절한다는 분석
5. Problem 3(c): 3-b 분석에서 나온 two-way post-selection
6. IBM Cloud/QPU validation: 작은 대표 회로의 실제 장비 실행 검증

핵심은 여러 실험을 늘어놓는 것이 아니었다. 3-b에서 trade-off를 분석했고, 3-c가 그 분석에서 나온 제안이라는 흐름을 5분 안에 보여줘야 했다.

> QuantumCylinder의 핵심은 작은 quantum diffusion 설정에서 measurement basis를 effective non-unitary projected map의 조절 장치로 보고, distance 하나가 아니라 recoverability, success probability와 diversity retention의 trade-off로 denoising을 평가하려 했다는 점이다.

### 최종적으로 나뉜 역할

저장소의 최종 기록을 기준으로 나는 전체 실험 설계, 핵심 구현, Problem 1·2·3 코드 통합, 지표와 결과 검수, IBM QPU 검증, 재현 명령과 최종 패키지 정리를 맡았다.

`koi312500`은 코드와 Qiskit 해석의 일치 여부를 검수하고 제출 패키지와 발표자료를 정리했다. `chaejinlim235`는 코드와 결과 해석, Problem 3(a,b)의 이야기 구성, 최종 노트북·보고서·발표자료 제작을 도왔다. `dreamerghost77`은 물리적 해석, Problem 3(c)의 trade-off 해석, 보조 실험과 그림·표·재현 기록 정리를 맡았다.

각자의 기여는 분명히 있었다. 다만 핵심 실험과 구현, 자동화와 통합의 압박이 내 쪽에 많이 몰렸던 것도 사실이다. 팀원들에게 고마웠고, 동시에 혼자 대회의 기술 실행을 끌고 가는 것처럼 느껴진 순간도 많았다.

이제 제출과 발표가 끝났고 결과만 남아 있었다.

## 결과

결과를 기다리는 동안 판단의 전제가 된 수상 구조는 둘째 날에 들었다. 결선 4팀, 멘토 특별상 2팀, IBM/Pasqal QPU 사용 관련 상 2팀이었다. 내가 이해한 바로는 전체 20팀 중 주제별 2팀, 총 8팀이 어떤 형태로든 상을 받는 구조였다.

결선에 들지 못하더라도 특별상은 받을 수 있다고 생각했다. 그래서 작년 우승팀 저장소와 우리 저장소를 계속 비교했다. README가 심사위원에게 바로 읽히는지, 그림과 표가 보이는지, 코드가 재현되는지, 최소한 3일 동안 어디까지 밀어붙였는지가 남는지 끝까지 고쳤다.

수상자 발표가 시작될 때까지도 한쪽으로는 특별상을 기대했다. 다른 한쪽으로는 이 결과를 어떻게 논문화할지 생각하고 있었다.

수상하지 못했다.

아무 이름도 불리지 않았을 때는 대회에서 한 번 졌다는 감정보다, 내가 연구 주제로 보기 시작한 작업이 그 자리에서는 아무 공식적인 이름도 얻지 못했다는 감각이 더 컸다.

그 순간이 이상했던 이유는 수상자 발표가 시작될 때까지도 머릿속에서 대회가 끝나지 않았기 때문이다. 둘째 날 저녁부터 이미 figure 재구성, 기준선 보강, limitation 정리와 개인 fork 계획을 생각하고 있었다. 한쪽에서는 혹시 특별상이라도 받을 수 있지 않을까 기다렸고, 다른 한쪽에서는 결과가 무엇이든 저장소를 어떻게 다시 파서 연구다운 형태로 만들지를 생각했다.

전날 SKYSH에서도 결과물을 끝까지 만들었다. 이어진 대회에서도 3일 동안 실험, 구현, 보고서와 제출물을 붙잡았다. 두 일정이 연달아 끝난 순간에는 전체 사진 촬영 자리에 남아 있기 힘들 정도로 무너졌다. 나를 증명할 결과와 상금이 모두 절실했던 시기라 3일이 통째로 물거품이 된 것 같았다.

상금은 부차적인 핑계가 아니었다. 실제로 필요했다. 그래서 “좋은 경험을 했다”는 말만으로 바로 정리하기 어려웠다. 경험과 저장소가 남았다는 사실은 알고 있었지만, 그 순간에는 공식적인 결과와 현실적인 보상이 모두 사라졌다는 감각이 먼저였다.

결과가 아쉬운 것과 팀원들에게 고마운 것은 별개였다. `chaejinlim235`, `koi312500`, `dreamerghost77`은 각자의 방식으로 끝까지 기여했다. 동시에 핵심 기술 실행과 통합이 내 쪽에 많이 몰렸다는 외로움도 남아 있었다.

고마움과 외로움은 동시에 존재할 수 있었다.

대회가 끝난 뒤 심사위원과 출제자의 설명을 들으며 내가 놓친 것도 보였다. Problem 1과 2는 문제의 감을 잡기 위한 부분이고, 진짜 핵심은 자유롭게 연구하는 Problem 3에 가까웠다. 결과가 아주 압도적으로 갈렸다기보다 발표에서 잘 전달한 팀이 좋은 평가를 받은 측면도 있다고 들었다.

## 오답노트

### 좋은 실험과 좋은 제출물을 구분하지 못했다

가장 크게 놓친 것은 좋은 실험과 좋은 제출물이 서로 다른 결과물이라는 점이었다.

나는 결과와 숫자를 제시하면 어느 정도 전달될 것이라고 생각했다. Problem 3의 숫자와 재현성에는 자신이 있었다. 하지만 심사위원이 처음 보는 5분 안에 “우리가 무엇을 발견했고, 왜 이 발견이 문제의 자유도를 제대로 사용한 것인지”를 이해하게 만드는 데에는 부족했다.

실험은 후보를 찾고 숫자를 검증하면 된다. 제출물은 그중 하나의 핵심 주장을 고르고, 왜 문제 요구에 맞는지, 어떤 근거가 있으며 어디까지가 한계인지를 짧은 시간 안에 전달해야 한다.

우리에게 숫자와 figure는 있었다. 하지만 Problem 3의 발견이 왜 Problem 1과 2보다 중요한지, 특별상을 줄 만한 지점이 무엇인지까지 발표의 첫 문장부터 더 날카롭게 잘랐어야 했다. 3-b에서 3-c가 나오는 흐름을 마지막에야 정리한 것도 늦었다.

실험을 많이 한 사실이 발표의 밀도를 자동으로 높여 주지는 않았다. 오히려 후보와 수치가 많을수록 무엇이 핵심인지 더 과감하게 버려야 했다.

다음에는 첫날 안에 발표의 핵심 문장을 임시로라도 정하고, 실험은 그 문장을 검증하거나 반박하는 것만 남길 것이다.

### 역할을 도움의 단위로 나눴다

팀원이 네 명이라고 일이 자동으로 네 갈래로 나뉘지는 않는다. 초반부터 각자가 끝까지 소유할 산출물과 마감 시각을 정했어야 했다.

“도와주겠다”가 아니라 “오늘 몇 시까지 어떤 파일을 낸다”가 되어야 했다.

```text
1. 구현 담당: 오늘 밤까지 실행 가능한 baseline 1개
2. 실험 담당: seed sweep 결과 표 1개
3. 문서 담당: 문제 해석과 관련 문헌 요약 2페이지
4. 발표 담당: 5분 발표 흐름과 그림 배치
5. 통합 담당: 최종 저장소와 패키지 구조 관리
```

이번에는 이 구조가 늦게 생겨 핵심 기술 실행과 통합이 내게 많이 몰렸다. 다음에는 역할을 사람이나 분야만으로 나누지 않고 파일명, 완료 조건과 마감 시각까지 내려갈 것이다.

당시에는 요청을 하고 중간 결과를 받은 뒤에도, 그것이 최종 코드와 보고서에서 맞물리지 않으면 다시 내가 통합하는 경우가 많았다. 팀원이 작업했다는 사실과 그 산출물이 제출물 안에서 독립적으로 완결됐다는 사실은 다르다. 다음에는 각 담당자가 초안만 만드는 데서 끝나지 않고 테스트, 설명 문장과 최종 파일 반영까지 자기 파트를 소유하게 할 것이다.

이렇게 쓰면 팀원을 탓하는 것처럼 보일 수 있다는 것도 안다. 실제로 세 사람은 발표자료, 보고서 정리, 물리적 해석, 구현 검토와 보조 실험을 맡아 줬다. 다만 고마움을 말하기 위해 내가 받은 압박까지 없었던 일로 만들고 싶지는 않다. 문제가 생길 때마다 마지막 책임이 내게 돌아오는 구조는 다음 대회 전에 반드시 바꿔야 한다.

### 제출 패키지를 너무 늦게 확정했다

USB 사고는 마지막 순간의 실수였지만 원인은 더 앞에 있었다. 최종 제출 폴더를 일찍 확정하지 않았고, 다른 사람이 같은 경로를 보고 그대로 복사할 수 있는 체크리스트도 만들지 않았다.

다음에는 마감 최소 두 시간 전에 제출 패키지를 확정한다. 한 명이 복사하고 다른 한 명이 README, 실행 명령, 비밀정보 검사와 실제 USB 내용을 교차검증하게 할 것이다.

## 잘한 점

### 큰 주장을 만들기 위해 한계를 숨기지 않았다

continuous basis가 axis-only보다 조금 좋게 나왔지만 margin이 작다는 점을 숨기지 않았다. actor-critic이 강한 숫자를 냈지만 target-aware라는 한계를 명시했다. IBM QPU job이 실제로 완료됐어도 hardware advantage라고 말하지 않았다.

해커톤에서는 강한 말이 유리해 보일 때가 많다. 이번에는 강한 말보다 정확한 말을 택했다.

### 같은 지표를 끝까지 유지했다

Problem 1부터 3까지 fidelity 기반 MMD와 Wasserstein-type distance를 유지했다. 덕분에 random-unitary, Hamiltonian projected diffusion과 measurement-induced denoising을 서로 다른 말로 포장하지 않고 같은 눈금에서 비교할 수 있었다.

distance만 좋아지는 collapse가 왜 실패인지도 같은 지표와 diversity를 함께 놓으면서 드러났다.

### 자동화 결과를 근거로 바꿨다

Hermes agent를 단순히 코드를 대신 써 주는 도구로 쓰지 않았다. 여러 시드와 독립 실행에서 같은 경향이 살아남는지 확인하고, 본문에 올릴 후보가 기준을 통과하는지 반복해서 검사하는 데 사용했다.

시드 sweep, 고정 파라미터 holdout, collapse 방어 표와 별도 머신의 반복 실행이 있었기 때문에 Problem 3의 주장을 조금 더 책임질 수 있었다.

### 마지막에 이야기 구조를 다시 세웠다

처음부터 3-b와 3-c가 깔끔했던 것은 아니다. 중간에는 후보가 너무 많았고 무엇이 본문인지 흐려졌다. 피드백을 받은 뒤 3-b가 분석이고, 3-c가 그 분석에서 나온 제안이 되도록 다시 정리했다.

숫자가 가장 큰 actor-critic을 내리고 two-way post-selection을 본문에 둔 것도 이 기준 덕분이었다.

## 앞으로

QuantumCylinder는 full trainable QuDDPM도 아니고 quantum advantage나 hardware advantage를 보인 프로젝트도 아니다. continuous basis가 언제나 axis-only보다 강하다는 결과도 아니다.

그래도 마음에 남는다. 좋은 숫자를 위해 ensemble diversity를 죽이지 않았고, distance만이 아니라 success probability와 diversity retention을 함께 봤다. IBM QPU 실행도 본 benchmark인 것처럼 부풀리지 않았다.

> 좋은 denoising은 가장 낮은 distance 하나로 정해지는 것이 아니라, 복원성, 성공확률, 다양성 보존 사이의 trade-off를 얼마나 정직하게 설명하느냐로 정해진다.

둘째 날부터 이미 대회 이후의 확장을 생각했고, 대회가 끝난 뒤에는 개인 fork를 만들어 저장소를 다시 보기 시작했다. 당장 논문이 된다고 말할 단계는 아니다.

앞으로 필요한 것은 분명하다.

- 더 많은 시드와 독립적인 반복 실행
- 엄밀한 Born-weighted projected ensemble 재현
- noise model 비교
- hardware run 확장
- collapse, axis-only와 classical baseline 보강
- 결과를 하나의 논문 주장으로 좁히는 작업

수상하지 못했다는 사실은 바뀌지 않는다. 그렇다고 내가 3일 동안 실제로 한 일까지 사라지는 것은 아니다. 나는 낯선 문제의 실험을 설계하고, 핵심 코드를 구현하고, 자동화하고, 결과를 검수하고, 문서와 제출 가능한 패키지까지 밀어붙였다.

대회가 끝난 뒤 이 글과 개인 fork를 만든 이유도 같다. 팀전에서는 결과물의 소유권과 기여가 여러 사람 사이에 섞이고, 최종 순위 한 줄이 그 과정 전체를 대신하기 쉽다. 그래서 내가 실제로 설계하고 구현하고 판단한 범위는 코드와 문서로 남겨야 한다. 수상 여부와 별개로 다음 팀을 꾸리거나 연구를 이어 갈 때 확인할 수 있는 근거가 되기 때문이다.

서류상 팀장은 `chaejinlim235`였고, 나는 본선 현장에서 기술 방향과 통합을 사실상 이끌었다. 이 규모의 대회에서 처음 맡은 역할이었다. 잘한 부분도 있었고, 다음에는 더 선명하게 나눠야 할 부분도 있었다.

내년에 다시 기회가 생긴다면 각자가 자기 파트를 끝까지 소유하는 팀을 꾸려 우승을 노리고 싶다. 올해 문제를 고르는 법, 기준선을 일찍 확정하는 법, 자동화 실험을 돌리는 법, 발표의 핵심 주장을 세우는 법과 제출 패키지를 미리 확정하는 법을 몸으로 배웠다.

마지막으로 3일 동안 함께한 `chaejinlim235`, `dreamerghost77`, `koi312500`에게 고맙다. 결과가 아쉽다고 해서 세 사람이 실제로 해 준 일까지 지우고 싶지는 않다.

수상은 못 했다. 그래도 이 코드가 3일짜리 제출물로 끝나는지는 내가 더 해 보면 알 수 있다.
