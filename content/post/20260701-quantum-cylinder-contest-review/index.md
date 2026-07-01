---
title: "2026 양자정보경진대회 후기: QuantumCylinder"
description: "SKYSH 해커톤 다음 날, QuantumCylinder로 3일 동안 연구·구현·발표를 밀어붙인 기록"
date: 2026-07-01T23:40:00+09:00
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
  - "후기"
---

2026 양자정보경진대회가 끝났다.

최종 저장소는 팀원 공개 표기를 handle 기준으로 정리한 뒤 다시 연결할 예정이다.

이 글은 수상 여부만 말하는 글이 아니다. 오히려 그 결과까지 가는 과정, 우리가 어떤 상태로 시작했고, 어떤 문제를 골랐고, 3일 동안 어떤 식으로 버텼고, 어디까지 만들었는지를 시간순으로 남기는 회고다.

블로그에서는 팀원 모두를 실명 대신 GitHub handle로만 표기한다.

- `chaejinlim235`
- `caffeine-fighter`
- `koi312500`
- `dreamerghost77`

## 0. 전날: SKYSH 해커톤 직후

양자정보경진대회는 내게 독립된 3일짜리 이벤트가 아니었다. 바로 전날까지 나는 SKYSH 해커톤에 있었다.

그 해커톤에서 우리 팀은 **FOMO Break**라는 제품을 만들었다. 업비트 공개 데이터를 기반으로 FOMO Score, Historical Mirror, KNN Mirror, Decision Pause UX를 붙여 초보 사용자가 감정적인 투자 판단을 하기 전에 한 번 멈추게 하는 MVP였다.

나는 그 팀에서 사실상 제품 방향과 MVP 구현의 중심을 맡았다. 백엔드 API를 연결하고, Historical Mirror를 붙이고, Decision Pause 흐름을 만들고, 프론트엔드 시연 UX까지 끝까지 다듬었다. 결과물은 꽤 괜찮았다고 생각한다. 적어도 우리가 잡은 문제, 구현한 기능, 심사 기준이었던 창의성·완성도·기술성·발전성에 정면으로 답하고 있었다고 믿었다.

하지만 수상하지 못했다. 심지어 최종 발표 기회도 얻지 못했다.

그 직후 바로 다음 날 양자정보경진대회가 시작됐다. 이미 체력은 많이 빠져 있었다. 그런데도 나는 이 대회에 꽤 절실하게 들어갔다. 최근 여러 대회와 프로그램에서 납득하기 어려운 탈락이 이어졌고, 나를 증명할 수 있는 무언가가 급했다. 상금도 필요했다. 그래서 이 대회는 단순한 경험이 아니라, 내게는 다시 한번 결과를 만들어야 하는 판처럼 느껴졌다.

SKYSH 후기는 따로 아래에 남겨 두었다.

> SKYSH 후기: <https://caffeine-fighter.github.io/p/20260629-fomo-break-hackathon-review/>

재밌게도 도구 사용 방식도 두 대회가 이어져 있었다. SKYSH는 내가 처음으로 Codex를 본격적으로 써 본 대회였고, 양자정보경진대회는 내가 처음으로 자동화된 **Hermes agent**를 실험 파이프라인에 붙여 본 대회였다. 전자는 제품을 하루 안에 만들기 위한 개발 보조 도구에 가까웠고, 후자는 여러 seed와 후보를 반복해서 돌리며 실험 근거를 쌓기 위한 자동화 도구에 가까웠다. 두 대회는 결과적으로 모두 수상하지 못했지만, 내가 앞으로 대회를 어떤 방식으로 굴릴 수 있는지에 대해서는 꽤 많은 힌트를 남겼다.

## 1. 팀이 만들어진 과정

팀은 5월 초에 만들어졌다. 처음에는 모두가 양자정보를 잘 아는 팀은 아니었다. 오히려 대화의 시작은 “이거 학부생이 제대로 할 수 있는 주제인가?”에 가까웠다.

지정문제는 여러 개가 있었다. Trotterized quantum simulation, QUBO on neutral atom QPUs, Quantum Machine Learning, Dynamic Circuit 같은 주제들이 있었고, 우리는 그중 3번과 4번 사이에서 고민했다.

3번 문제에는 Quantum DDPM, random unitary, diffusion, circuit depth, noise, hardware-efficient reverse process 같은 키워드가 있었다. 4번은 Dynamic Circuit 쪽으로 흥미로웠지만, 3번은 생성형 모델과 Qiskit 구현 경험을 엮을 수 있어 보였다.

결국 우리는 3번을 선택했다.

이 선택은 쉬운 선택이 아니었다. 정답이 딱 떨어지는 계산 문제가 아니라, 기본 구조를 이해한 뒤 실험과 해석을 설계해야 하는 문제에 가까웠다. 잘하면 novelty를 만들 수 있지만, 잘못하면 실험 후보만 잔뜩 늘어놓고 아무 결론도 못 낼 수 있었다.

팀명도 여러 후보가 있었다. 초반에는 **4 body problem** 같은 이름도 나왔다. 네 명이 모인 예측 불가능한 팀이라는 농담이었다. 결국 최종 이름은 **QuantumCylinder**가 되었다.

그때까지만 해도 이 이름이 3일 동안 얼마나 많은 notebook, script, figure, report, presentation file을 품게 될지 몰랐다.

## 2. 예선 준비와 본선 진출

예선 신청서도 급하게 썼다. 각자 연구 경험, 개발 경험, 딥러닝 관련 활동을 모아 계획서에 녹였다. `chaejinlim235`가 팀장 역할로 참가 신청과 서류 제출을 주도했고, `koi312500`, `dreamerghost77`, `caffeine-fighter`가 각자 자료를 보태고 문체와 내용 검수를 했다.

이 과정에서 이미 우리 팀의 색이 어느 정도 정해졌다.

- 양자정보 전문팀이라기보다는, 구현과 실험으로 밀어붙이는 팀
- 생성형 AI와 QML을 연결해 보려는 팀
- 모르는 것을 아는 척하기보다는, 가능한 claim과 불가능한 claim을 나누려는 팀

본선 진출 결과가 나왔을 때는 모두 놀랐다. “이게 되네”에 가까운 반응이었다. 동시에 문제도 생겼다. 본선 일정이 계절학기, 다른 대회, 개인 일정과 겹쳤고, 실제 준비 시간은 충분하지 않았다.

그래도 나가기로 했다. 이미 예선을 통과했고, 이런 대회를 직접 경험할 기회가 흔하지는 않았다.

## 3. 본선 전 준비: 공부부터 해야 했다

본선 전 며칠 동안 우리는 Qiskit, IBM Quantum Learning, QML 자료, 작년 문제, 재현 가능한 notebook 후보들을 조금씩 모았다. 하지만 솔직히 말하면 준비가 충분했다고 말하기는 어렵다.

양자정보 경진대회는 일반 개발 해커톤과 결이 달랐다. 웹이나 앱 해커톤에서는 사용자가 누를 수 있는 화면과 API가 빠르게 나오면 어느 정도 방향을 잡을 수 있다. 하지만 이 대회에서는 코드가 돌아가는 것만으로 부족했다. 왜 그 결과가 물리적으로 말이 되는지, 어떤 metric으로 비교해야 하는지, 어떤 claim은 하면 안 되는지까지 설명해야 했다.

우리는 대회장에서 “무언가 있어 보이는 양자 회로”를 많이 늘어놓는 대신, 같은 지표 위에서 비교하고, 말할 수 있는 것과 말할 수 없는 것을 계속 분리하자는 방향을 잡았다.

끝까지 지키려고 한 선은 이랬다.

- quantum advantage를 주장하지 않는다.
- hardware advantage를 주장하지 않는다.
- full trainable QuDDPM을 구현했다고 말하지 않는다.
- Hamiltonian projected diffusion이 random-unitary diffusion보다 항상 좋다고 말하지 않는다.
- continuous basis가 axis-only보다 압도적으로 좋다고 말하지 않는다.
- IBM QPU 실행은 hardware-execution validation이지, 성능 우위의 증명이 아니다.

이 제약들은 발표를 약하게 만드는 장치처럼 보일 수도 있다. 하지만 우리에게는 오히려 안전장치였다. 작은 toy experiment를 너무 큰 말로 포장하는 순간, 프로젝트 전체의 신뢰도가 무너질 수 있다고 생각했다.

## 4. Day 1: 대회 시작, 그리고 Problem 1/2부터 잠그기

6월 29일, 본선이 시작됐다.

우리는 최종적으로 지정문제 3번을 풀었다. 프로젝트는 random-unitary diffusion, Hamiltonian projected diffusion, measurement-induced denoising을 한 흐름으로 묶는 방향으로 잡혔다.

처음부터 Problem 3에 뛰어들면 위험하다고 봤다. Problem 1과 Problem 2가 흔들리면 뒤의 이야기도 설 수 없었다. 그래서 첫날에는 먼저 baseline을 잠그는 데 집중했다.

### Problem 1: random-unitary scrambling

Problem 1에서는 `|00>` 근처의 2-qubit target ensemble `S0`를 만들고, pure-state fidelity 기반으로 ensemble distance를 계산했다.

사용한 지표는 크게 두 가지였다.

- fidelity-kernel MMD
- cost `1 - F` 기반 Wasserstein-type distance

그다음 random single-qubit rotations와 entangling operation을 적용해 diffusion trajectory를 만들었다. 여기서 핵심은 “천천히 퍼지는 diffusion”이 아니라, 초기 cluster structure가 빠르게 무너져 Haar-like reference level 근처로 가는 strong-scrambling 해석이었다.

최종 Haar reference baseline은 다음과 같았다.

```text
D_MMD = 0.869583 +/- 0.024043
W_{1-F} = 0.724439 +/- 0.021491
```

이 수치는 학습 목표가 아니라 기준선이었다. random-unitary diffusion이 strong-scrambling regime으로 들어갔는지 해석하기 위한 reference였다.

### Problem 2: Hamiltonian projected diffusion

Problem 2에서는 2-qubit data system `M`에 complement qubit `F`를 붙여 3-qubit system을 만들고, 고정 Hamiltonian으로 time evolution을 수행한 뒤 complement qubit을 projection해 data ensemble을 얻었다.

사용한 Hamiltonian은 다음 형태였다.

```text
H = sum_j (hx X_j + hy Y_j) + J sum_j X_j X_{j+1}
hx = 0.8090, hy = 0.9045, J = 1.0
```

이 파트의 목적은 random gate-level control과 Hamiltonian/time/projection control을 같은 metric 위에서 비교하는 것이었다. 여기서도 조심해야 했다. Hamiltonian projected diffusion이 항상 더 좋다고 말할 수는 없었다. 우리가 할 수 있는 말은 더 제한적이었다.

random-unitary diffusion은 fluctuation과 saturation이 빠르게 나타나는 strong scrambling baseline으로 해석할 수 있고, Hamiltonian projected diffusion은 fixed Hamiltonian 아래에서 time과 projection choice가 control knob이 되는 방식으로 해석할 수 있었다.

Day 1의 목표는 화려한 결론이 아니라, 이 두 파트를 더 이상 크게 흔들리지 않게 만드는 것이었다.

실제로 첫날 초반에는 Problem 1과 Problem 2의 brief solution을 꽤 빠르게 냈다. 대략 한 시간 남짓한 시간 안에 기본 방향과 핵심 계산의 뼈대를 만들었고, 나는 바로 Problem 3을 잡아야 한다고 생각했다. Problem 1과 2는 감을 잡고 기준선을 세우는 문제에 가깝고, 진짜 승부는 Problem 3의 자유도와 해석에서 날 것 같았기 때문이다.

그래서 첫날 밤에는 Problem 3를 계속 굴리기 위한 준비를 했다. 나와 `dreamerghost77`의 컴퓨터를 각각 메인/보조 실험 머신처럼 쓰고, Hermes agent를 통해 seed sweep과 후보 실험을 자동으로 돌릴 수 있는 구조를 만들 생각이었다. 하지만 여기서 팀 내 진행도 차이가 드러났다. 나는 이미 3번으로 넘어가야 한다고 느끼고 있었지만, 다른 팀원들은 1번과 2번 보고서를 마무리해야 다음으로 갈 수 있다고 느끼고 있었다.

첫날 오후 7시쯤, 나는 실험 진행도와 보고서 진행도 사이에 꽤 큰 괴리가 있다는 것을 봤다. 코드와 실험은 앞으로 가고 있는데, 제출물로 읽힐 보고서는 그 속도를 따라오지 못하고 있었다. 그래서 그때부터는 실험만 밀어붙이는 대신 보고서 작성에도 직접 들어갔다. 계속 최신본을 업데이트하고, 팀원들에게 검토를 부탁하고, 수식과 문장과 figure가 서로 다른 이야기를 하지 않도록 맞췄다.

검토가 어느 정도 끝난 뒤에야 자동화를 다시 붙였다. 그날 밤에는 내 컴퓨터와 `dreamerghost77`의 컴퓨터에서 각각 메인/보조 실험을 돌려 두고 잤다. 사실 그 순간부터 이 대회는 단순 구현 대회가 아니라, 실험 자동화와 문서 업데이트를 동시에 굴리는 endurance game에 가까워졌다.

## 5. Day 1 밤: Problem 3가 진짜 시작됐다

진짜 고생은 Problem 3부터였다.

Problem 3의 핵심은 complement qubit measurement와 post-selection을 denoising proxy로 보는 것이었다. 전체 `M+F` system은 unitary하게 진화하지만, complement qubit을 측정하고 특정 outcome만 선택하면 data system `M`에는 effective non-unitary map이 작용한다.

질문은 이랬다.

- 이 map이 target ensemble 쪽으로 상태들을 수축시키는가?
- 수축시키더라도 diversity를 망가뜨리지 않는가?
- post-selection success probability가 너무 낮지는 않은가?

처음에는 좋은 숫자를 찾는 것이 중요해 보였다. 하지만 곧 알게 됐다. MMD나 Wasserstein-type distance가 줄었다는 것만으로는 충분하지 않았다. 모든 상태를 target 근처 한 점으로 collapse시키면 distance는 좋아 보일 수 있지만, ensemble diversity는 망가진다. 그건 denoising이라기보다 그냥 다양성을 죽이는 것이다.

그래서 Problem 3의 언어는 세 가지로 정리됐다.

- denoising gain
- post-selection success probability
- diversity retention

이 세 지표를 같이 봐야 했다.

## 6. Day 2 새벽: 자동화 스크립트와 Hermes agent

Problem 3는 손으로 몇 번 돌려서 끝낼 수 있는 문제가 아니었다. seed 하나에서 좋은 결과가 나왔다고 claim으로 쓸 수 없었다. 그래서 자동화 스크립트가 필요했다.

이번 대회는 내가 처음으로 자동화된 Hermes agent를 실험 파이프라인에 붙여 본 대회이기도 했다. SKYSH에서 Codex를 제품 구현의 보조 엔진처럼 썼다면, 여기서는 Hermes를 반복 실험과 후보 수확을 위한 보조 실험자처럼 쓰고 싶었다. 좋은 숫자 하나를 우연히 찾는 것이 아니라, 여러 seed에서 같은 경향이 살아남는지 확인하고 싶었다.

이때부터 내 역할은 급격히 커졌다. 실험 설계, 핵심 구현, 자동화 스크립트, 결과 확인, 보고서 초안, 그리고 최신 결과를 보고서와 발표 흐름에 반영하는 작업이 내 쪽에 많이 모였다. 역할별 기여는 분명히 있었다. `chaejinlim235`는 서류상 팀장으로 참가 신청, 일정 관리, 발표자료와 최종 보고서 흐름을 챙겼고, `koi312500`은 Qiskit 구현 해석과 notebook consistency 검수, 제출 형식과 발표자료 정리에 도움을 줬다. `dreamerghost77`은 물리적 해석에서 중요한 도움을 줬고, Problem 3(c)의 trade-off 해석과 보조 실험 실행에도 함께했다.

그럼에도 불구하고 역할과 산출물의 경계가 충분히 선명하지 않아서, 핵심 실험과 구현의 압박이 내 쪽으로 꽤 많이 쏠렸던 것은 사실이다. 문제가 막히면 내가 풀어야 한다고 느꼈고, 숫자가 이상하면 내가 다시 돌려야 했고, 보고서의 논리가 흔들리면 내가 초안을 다시 잡아야 했다. 그래서 외로웠다. 팀원을 원망하고 싶지는 않지만, 3일 동안 기술 실행의 많은 부분을 계속 붙잡고 있다는 감각은 분명 있었다.

동시에 팀원들에게 고마운 마음도 있다. 대회 경험과 준비 시간이 모두 제한적인 상태였고, 이런 형태의 본선형 기술 해커톤도 낯선 편이었다. 그 조건을 생각하면 각자 할 수 있는 만큼 끝까지 해 줬다. 발표자료를 만들고, 보고서를 정리하고, 해석 피드백을 주고, 마지막까지 같이 남아 준 것만으로도 고마웠다. 다만 다음에 같은 규모의 대회를 다시 나간다면, 초반부터 각자의 산출물을 더 명확하게 나누고, 누가 어떤 결과물을 언제까지 낼지 더 구체적으로 정해야겠다고 느꼈다.

## 7. Day 2 오전: continuous basis와 axis-only baseline

둘째 날은 거의 Problem 3에 매달린 날이었다. 동시에 Problem 1과 2도 완전히 버려 둘 수는 없었다. 초반에 brief solution을 빠르게 냈다고 해서 그 답안이 최종 제출물로 바로 쓸 수 있는 상태는 아니었고, 잘못하면 기본 문제에서 감점당할 수 있었다. 그래서 Problem 3를 파면서도 1번과 2번의 취약한 표현, metric 설명, resource comparison, figure readability를 계속 보강했다.

자동화 결과가 조금씩 쌓이면서 continuous measurement-basis post-selection 후보가 보이기 시작했다.

초기 안전한 결과는 대략 다음과 같았다.

```text
median MMD improvement: 0.097056
median Wasserstein improvement: 0.147983
median axis-only score margin: 0.010000
median diversity retention: 0.823217
median success probability: 0.468122
```

이 숫자만 보면 continuous measurement-basis post-selection이 좋아 보인다. 하지만 바로 그 지점이 위험했다.

우리는 “continuous basis가 axis-only보다 압도적으로 좋다”고 말할 수 없었다. 실제로 axis-only 대비 margin은 작았다. 더 중요한 것은 measurement basis가 data ensemble에 작용하는 effective non-unitary map의 방향과 강도를 조절하며, 그 과정에서 recoverability, success probability, diversity retention 사이의 trade-off가 나타난다는 점이었다.

그래서 axis-only projection은 최종 방법이 아니라 discrete baseline으로 내려갔다. `Z/X/Y` Pauli measurement basis만 허용하는 해석 가능한 기준선이었다. continuous measurement-basis post-selection은 axis-only를 Bloch sphere 위의 일반 측정 방향으로 확장한 controlled modification이 되었다.

이때부터 3-b의 역할도 다시 잡혔다.

```text
3-b. Controlled modification:
measurement basis controls the recoverability-success-diversity trade-off
```

## 8. Day 2 오후: 숫자 나열에서 이야기로

중간에 중요한 피드백이 있었다. 3-b에서 숫자만 제시하면 어떤 특징이 있는지 명확히 분석하기 어렵다는 지적이었다. 3-b에서 얻은 분석을 바탕으로 3-c가 자연스럽게 나와야 한다는 말도 있었다.

이 피드백은 맞았다.

그 전까지 Problem 3는 “여러 후보를 돌려봤고, 이 후보가 숫자가 좋았다”처럼 보일 위험이 있었다. 하지만 출제자의 의도에 맞추려면 controlled modification이 무엇인지, 그 modification이 어떤 trade-off를 드러내는지, 그리고 그 분석에서 3-c의 improvement가 어떻게 자연스럽게 나오는지를 보여줘야 했다.

이때 프로젝트가 연구 노트에서 제출 답안으로 바뀌기 시작했다.

중요한 질문은 더 이상 “무슨 실험을 더 돌릴 수 있나”가 아니었다.

- 이 숫자가 무엇을 의미하는가?
- axis-only baseline은 왜 필요한가?
- continuous basis의 margin이 작다면 무엇을 주장해야 하는가?
- 3-c는 3-b 분석에서 자연스럽게 나오는가?
- success probability가 낮아지는 것을 어떻게 비용으로 설명할 것인가?

이 질문에 답하는 과정이 가장 힘들었고, 동시에 가장 많이 배운 부분이었다.

## 9. Problem 3-c: two-way post-selection

3-b에서 trade-off를 보았다면, 3-c는 그 분석에서 나와야 했다.

최종 main으로 둔 것은 **two-way projected denoising**이었다. 아이디어는 단순했다. measurement-induced non-unitary contraction을 한 번 더 적용하면 distance 측면의 improvement를 더 키울 수 있지 않을까? 대신 두 번의 post-selection을 통과해야 하므로 success probability는 낮아질 것이다.

결과도 그런 방향이었다.

```text
median MMD improvement: 0.101374
median Wasserstein improvement: 0.136426
median diversity retention: 0.829273
median success probability: 0.227065
```

즉, two-way post-selection은 더 큰 distance improvement를 만들 수 있지만, success probability를 희생한다. 이것은 unconditional win이 아니라 trade-off improvement였다.

이 결론이 마음에 든 이유는 숫자가 가장 크기 때문이 아니었다. 3-b의 분석에서 자연스럽게 이어졌기 때문이다. “measurement basis가 effective non-unitary map을 조절한다”는 관찰에서 “그 map을 한 번 더 적용하면 어떻게 되나”라는 3-c 질문이 나왔다.

그게 스토리였다.

반대로 actor-critic은 더 강한 숫자를 만들 수 있었지만, raw target ensemble을 reward로 쓰는 target-aware toy에 가까웠다. 그래서 본문 main이 아니라 appendix/optional로 내렸다. 성능 좋은 후보를 무조건 앞에 세우는 것이 아니라, 문제 요구와 claim의 정직성을 기준으로 배치했다.

## 10. IBM QPU validation

IBM Cloud/QPU validation도 중요한 부분이었다.

하지만 여기서도 선을 지켜야 했다. 우리는 IBM QPU에서 전체 benchmark를 다시 수행한 것이 아니다. Problem 3(b)의 measurement-basis mechanism을 작은 hardware-facing representative circuit으로 실행할 수 있는지 확인했다.

최종 기록에 남은 IBM Cloud/QPU mini validation은 다음과 같다.

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

이 결과는 measurement basis가 post-selected projected map을 조절한다는 해석의 hardware-execution validation으로 쓰였다. 본 benchmark는 여전히 state-vector simulation 기반이었다. IBM 결과는 “실제 QPU에서 우위를 보였다”가 아니라, “작은 representative circuit이 실제 IBM backend에서 실행됐고, basis 변화에 따른 post-selection 관련 관측값이 변했다”는 정도로 제한했다.

이 선을 지키는 데 생각보다 많은 문서 작업이 들어갔다. README, IBM QPU 관련 문서, validation docs, token/API key/CRN 노출 방지, dry-run mode, submitted job metadata 저장 여부까지 확인했다.

대회 제출물에서는 과학적 주장만큼이나 운영 안전성이 중요했다.

## 11. Day 3: 제출 패키지와 발표자료

마지막 날은 연구라기보다 배포 엔지니어링에 가까웠다.

최종 judge-facing 구조는 중간에 몇 번 바뀌었다. 처음에는 `solution_1.ipynb` 하나를 중심으로 보는 구조였지만, 마지막에는 다음 세 개의 notebook으로 쪼갰다.

```text
submission/usb_package/solution/
  Problem 1.ipynb
  Problem 2.ipynb
  Problem 3.ipynb
```

이 방향이 더 맞았다. 심사위원이 5분 안에 보는 상황이라면 “최종 답안이 어디 있지?”에서 막히면 안 된다. Problem 1, 2, 3이 각각 어디에 답하는지도 바로 보여야 했다.

동시에 USB package에는 발표 PDF와 source code가 같이 있어야 했다. 단순히 figure/table만 있는 것이 아니라, 실제 `src/`, `scripts/`, `tests/`, `submission/run_all.py`, reproducibility command가 있어야 했다.

여기서 아쉬운 사고도 있었다. 마지막 날 새벽 1시쯤 자러 가기 전, 나는 `submission/usb_package/` 폴더를 그대로 USB에 넣어 달라고 아주 명확히 말하지 못했다. 너무 피곤해서 그냥 repo 전체를 clone해서 넣어 달라는 식으로 이야기했다. 그런데 오전 8시 40분쯤 내려가 확인해 보니, USB에는 `submission` 안의 `solution` 폴더만 들어가 있었다. `src/`, `scripts/`, `tests/`, 재현 명령, README, 전체 패키지 구조가 함께 들어가야 했는데, 그 시점에는 repo 크기도 크고 마감도 가까워서 제대로 고치기 어려웠다.

마감 뒤에 이야기해 보니, 파일 구조에 대한 이해가 서로 달랐다. 나는 전체 `submission/usb_package/` 구조를 기준으로 생각했고, `koi312500`은 심사위원이 주로 notebook을 볼 것이라고 이해했다. 지금 돌아보면 이것은 능력 문제가 아니라 해석과 커뮤니케이션의 mismatch에 가까웠다. 모든 요청과 작업 배분을 내가 하고 있었고, 마지막에는 나도 너무 지쳐서 파일명과 복사 대상을 충분히 구체적으로 말하지 못했다. 그래도 아쉬움은 남는다. 제출 직전의 패키징은 단순 파일 복사가 아니라 프로젝트의 신뢰도를 결정하는 마지막 작업이었기 때문이다.

마지막에는 presentation도 한 덱으로 정리했다. 제출된 것은 15분까지 확장 가능한 영어 deck 하나이고, main round에서는 같은 deck에서 5분 core path만 따라가는 방식이었다. final round에서는 같은 deck을 15분으로 확장한다. 별도 deck을 만들지 않는다는 것도 중요한 제출 방침이었다.

이런 작업은 화려하지 않다. 하지만 실제 심사에서는 매우 중요하다. 좋은 결과도 어디에 있는지 모르거나, figure가 안 보이거나, README가 내부 개발 기록처럼 보이면 신뢰를 잃는다.

## 12. 발표 흐름

최종 발표 흐름은 대략 다음 순서였다.

1. Problem 1: random-unitary scrambling과 Haar-like reference
2. Problem 2: Hamiltonian projected diffusion과 resource/control-cost comparison
3. Problem 3(a): measurement-induced denoising baseline
4. Problem 3(b): measurement basis가 recoverability-success-diversity trade-off를 조절한다는 분석
5. Problem 3(c): 3-b 분석에서 나온 two-way post-selection
6. IBM Cloud/QPU validation: small representative circuit의 hardware-execution validation

이 흐름에서 가장 중요한 것은 Problem 3를 “여러 실험의 전시장”으로 만들지 않는 것이었다. 3-b가 분석이고, 3-c가 그 분석에서 나온 제안이라는 구조를 끝까지 유지해야 했다.

최종 thesis는 이렇게 정리할 수 있다.

> QuantumCylinder suggests that in this small quantum diffusion setting, measurement basis can be treated as a control knob for an effective non-unitary projected map, and the meaningful comparison is not distance alone but the recoverability-success-diversity trade-off.

한국어로 바꾸면 이렇다.

> QuantumCylinder의 핵심은 작은 quantum diffusion 설정에서 measurement basis를 effective non-unitary projected map의 control knob으로 보고, distance만이 아니라 recoverability, success probability, diversity retention의 trade-off로 denoising을 평가하려 했다는 점이다.

## 13. 결과 발표

둘째 날에 수상 구조를 더 자세히 알게 됐다. 내가 이해한 바로는 결선 4팀 외에도 멘토 특별상 2팀, IBM/Pasqal QPU 사용 관련 상 2팀이 있었고, 전체 20팀 중 주제별로 2팀, 총 8팀이 어떤 형태로든 수상하는 구조였다. 결선에 진출하지 못한다면 우리 팀에게 남은 마지막 희망은 멘토 특별상이라고 생각했다. 그래서 더 간절했다.

그때부터는 작년 우승팀의 repository와 우리의 repository를 계속 비교했다. 무엇이 부족한지, README가 충분히 judge-facing인지, figure와 table이 바로 읽히는지, 코드 재현성이 충분한지, special award라도 노릴 수 있을 만큼 성실한 결과물로 보이는지 계속 고쳤다. 결과물 자체가 갑자기 완전히 달라질 수는 없었지만, 적어도 “3일 동안 여기까지 밀어붙였다”는 흔적만큼은 분명하게 남기고 싶었다.

수상하지 못했다.

솔직히 많이 아팠다. 전날 SKYSH에서도 괜찮은 제품을 만들고도 수상하지 못했고, 바로 이어진 양자정보경진대회에서도 3일 동안 실험과 구현과 보고서를 붙잡았지만 결과는 수상으로 이어지지 않았다. 특별상이라도 탈 수 있지 않을까 마지막까지 생각했기 때문에, 아무 이름도 불리지 않았을 때 박탈감이 컸다. 전체 사진 촬영 자리까지 버티기 어렵다고 느낄 만큼 마음이 무너졌다. 내 3일간의 노력이 물거품처럼 느껴졌다.

특히 이 대회는 상금도 기대하고 있었다. 나는 이 시기에 나를 증명할 수단이 너무 급했고, 돈도 필요했다. 대회는 경험이기도 했지만, 동시에 상금이라는 현실적인 목적도 있었다. 그래서 수상하지 못했다는 결과는 단순한 아쉬움 이상으로 다가왔다.

대회가 끝난 뒤 심사위원/출제자분들의 이야기를 들으며 또 한 번 생각이 복잡해졌다. 내가 이해한 취지는, Problem 1과 2는 문제의 감을 잡기 위한 성격이 강했고, Problem 3이 자유롭게 연구해 보라는 핵심 문제에 가까웠다는 것이었다. 다섯 팀의 결과가 아주 압도적으로 갈렸다기보다는, 발표에서 가장 잘 전달한 팀이 좋은 평가를 받은 측면도 있었다고 들었다. 나는 결과만 딱 제시하면 충분할 줄 알았는데, 결국 발표의 중요성을 다시 배웠다. 좋은 실험을 하는 것과 좋은 실험을 5분 안에 설득력 있게 전달하는 것은 다른 능력이었다.

이 글을 단순한 분노로 끝내고 싶지는 않다. 수상하지 못했다는 사실과 별개로, 우리가 3일 동안 무엇을 했는지는 남겨야 한다.

`chaejinlim235`는 팀장으로 예선 신청과 전체 일정, 제출 관리, 발표자료와 최종 보고서 흐름을 챙겼다. `koi312500`은 Qiskit 구현 해석, consistency 검수, Problem 3 이야기 구조에 대한 피드백과 제출 정리를 도왔다. `dreamerghost77`은 물리적 해석과 support worker, figure/table, 발표자료와 보고서 정리에 기여했다. 그리고 나는 실험 설계, 핵심 구현, 자동화 스크립트, 결과 분석, 보고서 초안, 제출 패키지 정리를 계속 붙잡았다.

고마움과 외로움은 동시에 존재할 수 있다.

이번 대회가 내게 남긴 가장 큰 감정은 그 둘의 공존이었다.

## 14. 좋았던 점

가장 좋았던 점은 claim discipline이었다.

우리는 좋은 숫자가 나와도 바로 큰 결론으로 뛰지 않았다. continuous basis가 axis-only보다 조금 좋게 나왔지만, margin이 작다는 점을 숨기지 않았다. actor-critic이 강한 숫자를 냈지만, target-aware라는 한계를 명시했다. IBM QPU job이 실제로 DONE 상태가 되었지만, hardware advantage라고 말하지 않았다.

두 번째로 좋았던 점은 같은 metric을 계속 유지한 것이다. Problem 1부터 3까지 fidelity 기반 MMD와 Wasserstein-type distance를 계속 사용했다. 덕분에 random-unitary, Hamiltonian projected diffusion, measurement-induced denoising을 서로 다른 말장난이 아니라 같은 눈금 위에서 비교할 수 있었다.

세 번째는 자동화와 반복 실행이었다. Problem 3는 seed 하나에서 좋은 결과가 나왔다고 끝낼 수 있는 문제가 아니었다. seed sweep, validation, collapse-defense table, support worker의 독립 반복 실행이 있었기 때문에 3-b claim을 조금 더 책임질 수 있었다.

네 번째는 마지막에 스토리를 다시 쓴 것이다. 처음부터 3-b와 3-c가 깔끔했던 것은 아니다. 중간에는 후보가 너무 많았고, 어느 것이 main인지 흐려졌다. 그런데 “3-b 분석에서 3-c가 나와야 한다”는 구조로 다시 정리하면서 제출물의 설득력이 좋아졌다.

## 15. 힘들었던 점

첫 번째는 학습 곡선이었다.

양자정보 경진대회는 일반 개발 해커톤과 다르다. 모르는 개념이 나오면 공식 문서, 논문, Qiskit implementation, 수식, simulation 결과를 함께 봐야 한다. “일단 만들어서 보여준다”만으로는 부족하고, 왜 그 결과가 물리적으로 말이 되는지도 설명해야 한다.

두 번째는 기술 실행의 부담이 한쪽에 많이 몰린 것이다.

이 부분을 쓰는 것이 조심스럽다. 팀원을 비난하고 싶지는 않기 때문이다. 실제로 팀원들은 발표자료, 보고서 정리, 물리적 해석, 구현 검토, 보조 실험 실행 등 각자의 방식으로 기여했다. 특히 `dreamerghost77`이 물리적 해석을 도와준 부분은 Problem 3의 이야기를 세우는 데 중요했다. 다만 실험 설계, 핵심 구현, 자동화 스크립트, 결과 분석, 보고서 초안 작성이 내 쪽에 많이 몰렸던 것도 사실이다. 고마움과 별개로, 그 압박은 외로웠다.

세 번째는 패키징이었다.

USB package, source code, solution notebooks, presentation PDF, README, reproducibility commands, CSV validation, secret scan까지 확인하는 과정은 연구라기보다 배포 엔지니어링에 가까웠다. 특히 마지막에 USB에 어떤 폴더를 넣어야 하는지 명확히 공유하지 못한 일은 크게 아쉬웠다. 내 지시가 부족했고, 팀원도 제출 구조를 다르게 이해했다. 다음에는 제출 마감 전 최소 2시간 전에 package checklist를 freeze하고, 누가 보더라도 같은 구조를 복사할 수 있게 해야 한다.

네 번째는 결과였다.

상금도 필요했고, 나를 증명하고 싶었다. 그래서 수상하지 못했다는 결과는 더 크게 다가왔다. 특별상이라도 기대했기 때문에, 아무 상도 받지 못했을 때는 정말 3일이 물거품이 된 것처럼 느껴졌다. 그래도 기록으로 남겨 두지 않으면 이 3일은 그냥 “수상 실패”로만 남는다. 나는 그게 싫었다.

## 16. 내가 배운 것

이번 대회에서 가장 크게 배운 것은 “좋은 실험”과 “좋은 제출물”은 다르다는 점이다.

좋은 실험은 새로운 후보를 찾고, 숫자를 개선하고, 흥미로운 현상을 포착한다. 하지만 좋은 제출물은 그중 하나의 thesis를 고르고, 그 thesis가 왜 문제 요구와 맞는지, 어떤 evidence가 있고, 어떤 limitation이 있는지를 짧은 시간 안에 전달한다.

또 하나 배운 것은 발표의 비중이다.

나는 좋은 결과를 만들고, 숫자와 figure를 보여주면 어느 정도 전달될 것이라고 생각했다. 하지만 본선형 대회에서는 결과 그 자체보다, 그 결과를 제한된 시간 안에 어떤 thesis로 묶어 말하느냐가 훨씬 중요했다. Problem 3에서 우리가 무엇을 발견했고, 왜 그게 1/2번보다 중요한지, 특별상을 노릴 만한 포인트가 어디인지 더 선명하게 발표했어야 했다.

세 번째로 배운 것은 팀전 운영 방식이다.

팀원이 많다고 해서 자동으로 팀이 되는 것은 아니다. 각자 산출물이 있어야 한다. 그리고 팀원 간 경험 차이가 있을수록 요청은 더 구체적이어야 한다. 파일명, 폴더명, 마감 시간, 검토 기준까지 내려가야 한다. 이번 대회에서는 내가 너무 피곤해서 요청을 충분히 선명하게 내리지 못한 순간들이 있었고, 그 결과 마지막 USB 패키징 같은 일이 생겼다. 다음에 비슷한 대회를 나간다면, 시작 단계에서 역할을 훨씬 더 구체적으로 나눌 것이다.

예를 들면 이렇게다.

```text
1. 구현 담당: 오늘 밤까지 실행 가능한 baseline 1개
2. 실험 담당: seed sweep 결과 표 1개
3. 문서 담당: 문제 해석과 관련 문헌 요약 2페이지
4. 발표 담당: 5분 발표 흐름과 figure 배치
5. 통합 담당: 최종 repo/package 구조 관리
```

“도와줄게”가 아니라 “무엇을 언제까지 낼 수 있는가”가 팀전의 기준이 되어야 한다. 누군가의 선의에 기대는 구조가 아니라, 각자가 끝까지 소유할 수 있는 산출물을 먼저 정해야 한다.

이번에는 그 기준이 충분히 세워지지 않았고, 결과적으로 핵심 기술 실행이 나에게 많이 몰렸다. 그걸 나중에 감정으로만 받아들이지 않으려면, 다음에는 구조를 먼저 만들어야 한다.

## 17. 그래도 남은 결론

QuantumCylinder는 완벽한 프로젝트는 아니었다.

우리는 full trainable QuDDPM을 만든 것이 아니고, quantum advantage를 보인 것도 아니고, IBM QPU에서 어떤 성능 우위를 증명한 것도 아니다. continuous basis가 항상 axis-only보다 강하다는 것도 아니다. 오히려 최종 제출물은 이런 말을 하지 않기 위해 꽤 많은 에너지를 썼다.

하지만 바로 그 점 때문에 이 프로젝트가 마음에 남는다.

우리는 작은 실험에서 말할 수 있는 것과 말할 수 없는 것을 구분하려고 했다. distance score 하나만 보고 좋아 보이는 후보를 고르지 않고, diversity retention과 success probability를 함께 봤다. 3-b의 분석에서 3-c의 two-way post-selection이 나오도록 이야기를 다시 짰다. IBM QPU 실행도 본 benchmark가 아니라 작은 hardware-execution validation으로 위치를 낮췄다.

해커톤에서는 강한 말이 유리해 보일 때가 많다. 하지만 이번에는 강한 말보다 정확한 말이 더 중요했다.

그래서 이 프로젝트의 최종 문장은 아마 이렇게 남길 수 있을 것 같다.

> 좋은 denoising은 가장 낮은 distance 하나로 정해지는 것이 아니라, 복원성, 성공확률, 다양성 보존 사이의 trade-off를 얼마나 정직하게 설명하느냐로 정해진다.

그리고 내 개인적인 결론은 따로 있다.

> 팀전에서도, 대회에서도, 결국 내가 실제로 만든 것은 기록으로 남겨야 한다.

수상하지 못한 것은 아쉽다. 상금이 필요했기 때문에 더 아쉽다. 하지만 이 프로젝트를 그냥 실패로만 남기지는 않을 것이다. QuantumCylinder는 내가 낯선 문제를 3일 동안 붙잡고, 실험하고, 구현하고, 문서화하고, 제출 가능한 형태까지 밀어붙인 기록이다.

이 규모의 대회에서 내가 사실상 리더 role을 수행하게 된 것은 처음이었다. 서류상 팀장은 `chaejinlim235`였지만, 본선 현장에서 실험 방향, 구현 우선순위, 작업 배분, 결과 해석, 제출 패키지의 많은 부분을 내가 끌고 갔다. 잘한 부분도 있었고, 부족한 부분도 많았다. 특히 다음에는 더 명확한 역할 분담과 제출 checklist를 처음부터 만들 것이다.

내년에 다시 기회가 된다면, 각자가 자기 파트를 끝까지 소유할 수 있는 superteam을 꾸려서 올해 얻은 팁으로 우승을 노리고 싶다. 문제를 고르는 법, 초반 baseline을 잠그는 법, 자동화 실험을 돌리는 법, 발표 thesis를 세우는 법, 제출 package를 freeze하는 법을 올해 몸으로 배웠다.

그리고 아직 끝난 것도 아니다. 사실 2일차 저녁부터는 이 결과물을 더 발전시켜 논문화할 수 있지 않을까 생각하고 있었다. 심사가 끝난 직후부터 개인 fork를 만들고 repository를 다시 파고, 무엇을 고치면 더 연구다운 형태가 될 수 있을지 보고 있다. 여기서 좋은 결과가 나오면 좋겠다. 수상은 못 했지만, 연구 주제의 씨앗까지 사라진 것은 아니라고 믿고 싶다.

마지막으로 3일 동안 같이 고생해 준 `chaejinlim235`, `dreamerghost77`, `koi312500`에게 고맙다. 결과가 아쉬운 것과 별개로, 끝까지 같이 있었고, 각자의 방식으로 기여했고, 이 이상한 프로젝트를 같이 QuantumCylinder라는 이름으로 남겼다.

그 사실은 남는다.
