---
title: "서울대 SCPC 2025 Div.2 참가 후기 (복원)"
description: "3년 만에 PS 실력을 복구한 뒤 SCPC 2025 Div.2에 참가해 문제별로 남긴 풀이와 오답 기록"
date: 2025-05-18T00:00:00+09:00
lastmod: 2026-07-29T00:00:00+09:00
event_date: 2025-05-17
slug: "20250518-scpc-2025-div2-review"
image:
math: true
license:
comments: true
build:
  list: always
categories:
  - "hackathon-ai-coding-contest-reviews"
tags:
  - "SCPC"
  - "알고리즘"
  - "PS"
  - "BOJ"
  - "Codeforces"
---

> 2025년 5월 18일 Notion에 썼던 글을 복원했다. 당시의 말투와 제출 코드는 그대로 두고 수식만 LaTeX로 바꿨다.

대회 정보는 [2025 SCSC 프로그래밍 경시대회 안내 페이지](https://scsc.dev/w/scpc2025)에서 확인할 수 있다.

## 시작 전

PS를 시작한 건 고등학교 1학년 여름방학이 끝난 직후인 2021년 8월 말이다. 마지막으로 진심으로 했던 때는 2022년 4월, 벌써 **3년 전**이었다. 그래도 대회 직전 두 번의 Codeforces Round Div.2에서 각각 4솔로 블루 퍼포먼스를 냈다. 실력은 어느 정도 돌아왔다고 생각했다.

현재 SCSC 임원진으로 강제 납치돼 일하고 있다. 인력이 모자라면 언제든 참가를 취소하고 스태프로 뛸 생각이었다. ***초천재미소녀해커***라는 닉네임도 이 상황이 아니었으면 탄생하지 않았을 것이다.

기숙사에서 1시에 일어났다. 샤워를 하고 트리플바카 쟈코 티셔츠를 입은 뒤 방을 나갔다. 메가커피에서 아메리카노 2잔과 블루베리 요거트 스무디 1잔을 사 들고 1시 40분쯤 대회장에 들어갔다.

작년 SCPC 2024도 Div.2로 신청했지만 대회 당일 몸살로 취소했다. 스스로 Div.3급 실력이라고 생각하지만, [solved.ac](https://solved.ac/) Rating 제한에 당한 이상 이번 목표는 40등 안에 들어 수상하기.

---

### A - AC (15m)

예전에 코포에서 테케만 보고 찍맞을 성공해 1분 컷을 한 적이 있었다. 하지만 오프라인 대회에 참가해 보니 WA 페널티가 더욱 두려워져 이번에는 그러지 않았다.

다시 문제를 보자마자 바로

\[
7 \times (\text{number of faces})
\]

가 답이라는 걸 바로 캐치하고 면 수를 구하기 시작했다. 최대를 구한 뒤 반전하면 최소가 나오기 때문이다. 처음에는 전체에서 가려진 면을 빼는 식을 세웠다. 계산 결과는

\[
\frac{2n^3+15n^2+13n}{12}
\]

였다. 그런데 \(n=2\)를 넣으니 \(105\)가 안 나왔다. 당황하다가 보이는 면을 그냥 세면

\[
5 \times \sum_{k=1}^{n} k
\]

라는 걸 깨닫고 바로 냈다.

접근만 잘 했어도 퍼솔각이 보였기에 아쉽게 느껴졌다. (15m)

**Code — \(\mathcal{O}(1)\)**

```cpp
#include<bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef pair<ll,ll> pii;

#define fastio ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);

ll v[200001];

void init()
{
    for(int i=1;i<=2025;i++) v[i]=v[i-1]+i;
}


int main()
{
    ll n;
    cin>>n;

    init();

    cout<<5*v[n]*7;
}
```

---

### B - AC+2 (96m)

15m이나 걸려 A를 풀었다. B를 보자마자 [BOJ 16120 PPAP](https://www.acmicpc.net/problem/16120)가 생각나 예전에 짠 \(\mathcal{O}(n)\) 코드를 고쳐 냈다. 하지만 앞에서부터 greedy하게 `HOH`를 지우는 방식은 틀린 풀이였다.

DFS로 탐색하면 당연하게도 시간이 초과됐다. \(\mathcal{O}(n)\)에 해결할 수 있는 괄호 느낌이 났지만 아이디어가 생각나지 않아 스코어보드를 보고 I번으로 넘어갔다. (18m)

F를 붙들다 68m째에 다시 돌아왔다. 괄호 문제라고 생각하고 `O`의 위치와 `X`의 개수만 봤다. \(n=3k\)라면 \(2k\)개의 `X`와 \(k\)개의 `O`가 있다. 정가운데 `O`를 기준으로 좌우 괄호 수는 \(k\)개로 같다.

`O`와 `X`를 세면서 앞에서부터 민다. 정가운데 `O`를 지난 뒤에는 `X`를 만날 때마다 `O` 개수를 하나씩 빼서 음수가 되지 않게 괄호처럼 처리하면 된다. (92m)

다 푼 줄 알았는데 틀렸다. `O`가 `X`보다 많아지는 경우에도 바로 끝내야 했다. 이 조건만 넣어 다시 내니 AC. (96m)

**Code — \(\mathcal{O}(n)\)**

```cpp
#include<bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef pair<ll,ll> pii;

#define fastio ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);


int main()
{
    ll n;
    cin>>n;

    string c;
    cin>>c;

    if(n%3){cout<<"mix"; return 0;}

    ll x=n/3;
    ll hcnt=0;
    ll ocnt=0;

    bool flag=0;
    ll diff=0;

    for(int i=0;i<n;i++)
    {
        if(c[i]=='O')
        {
            diff++;
            ocnt++;
        }

        if(c[i]=='H')
        {
            hcnt++;

            if(hcnt>x)
            {
                if(diff) diff--;
                else {cout<<"mix"; return 0;}
            }
        }

        if(ocnt>hcnt){cout<<"mix"; return 0;}
    }

    if(diff==0 && ocnt*2==hcnt) cout<<"pure";
    else cout<<"mix";
}
```

---

### C - XX

대회 종료 20분 전까지 구현을 밀어붙였지만, 마지막에 조가 2개 이상일 수도 있다는 조건을 놓쳤다는 것을 알아차렸다. 남은 시간 안에 풀이를 고치기는 어렵다고 판단해 더 손대지 않았다.

---

### E - XX

아이디어 자체는 어렵지 않았다. 다만 평범한 DP 배열로 풀면 메모리 초과였고, 여기서 쓰는 테크닉을 몰랐다. 빠르게 GG를 치고 F, G로 갔다. (100m)

---

### F - WA+13

이 대회의 최대 복병. 보자마자 아이디어가 떠올랐고 그 아이디어가 맞았다. 그런데 구현을 틀렸고 디버깅에도 실패했다. 4시간 중 2시간 이상을 여기에 쓴 것 같다.

대회가 끝나고 에디토리얼을 보니 내 풀이가 정해(Sol2)였고 구현도 거의 맞아서 허탈했다.

- 구현 (86m)
- 구현 (239m)

---

### G - WA+3

5분 정도 보고 아이디어를 떠올렸다. 두 차의 위치를 \(pos_1\), \(pos_2\)로 두고 오른쪽으로 갈 때마다 \(+1\), 위로 갈 때마다 \(-1\)로 계산하면

\[
\lvert pos_1-pos_2\rvert+1
\]

이라고 생각했다. 4개 테스트케이스를 맞추려고 \(pos_1=pos_2\)일 때 예외 처리를 넣어 찍맞을 시도했지만 틀렸다. (106m)

이후 Prefix Sum을 사용하는 아이디어로 \(\mathcal{O}(n)\) 구현을 시도했지만 실패했다. 대회가 끝나고 출제자 및 에디토리얼 편집자 `ohwphil`님이 내 아이디어가 맞다는 걸 다시 확인시켜 주면서 현타가 더 왔다.

---

### I - AC (22m)

19m에 문제를 보자마자 아이디어가 떠올랐다. 수학적으로 증명을 끝내고 구현해 내니 바로 맞았다. (22m)

풀이)

\[
xy=n
\]

을 만족하는 \(x,y\) 중 \(x+y\)를 최소로 만들어야 한다. \(\sqrt{n}\)에서 1씩 빼 가다 \(n\)의 약수가 될 때의 값이 \(x\), \(\frac{n}{x}=y\)가 된다. 이후 \(y+1\)개의 노드를 왼쪽으로 쭉 연결한 뒤, 위에서부터 순서대로 \(x-1\)개의 리프 노드를 오른쪽 방향으로 붙여 주면 된다.

**Code — \(\mathcal{O}(n)\)**

```cpp
#include<bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef pair<ll,ll> pii;

#define fastio ios::sync_with_stdio(0);cin.tie(0);cout.tie(0);


int main()
{
    ll n;
    cin>>n;

    ll x=1;

    for(int i=sqrt(n);i>=1;i--)
    {
        if(n%i==0)
        {
            x=i;
            break;
        }
    }

    ll y=n/x;

    cout<<(x+y)<<"\n";

    if(x>y) swap(x,y);

    for(int i=1;i<=y;i++) cout<<i<<" "<<i+1<<"\n";
    for(int i=1;i<=x-1;i++) cout<<i<<" "<<i+y+1<<"\n";
}
```

---

### J - XX

DP 냄새가 아주 강한 문제. 통과할 시간복잡도를 못 찾아 포기했다. (156m)

---

## 여담

- F 풀었으면 수상이다.
- 대회장에 들어가 심리적으로 편한 맨 뒷자리가 비어 있는 것을 보고 자리를 잡았는데, 마침 오른쪽에 `Lulusphere`가 앉아 있어 인사를 나누었다. 루루 넘 인싸임 ㄹㅇ
- 왼쪽에는 사운드 볼텍스 장패드를 들고 와 눈길을 끌게 된 참가자가 있었는데, 그 정체는 바로 `toycartoon`이었다! 대회가 끝난 이후에는 바로 앞자리에 있던 `your0501`, 토카를 찾아온 `cywohoy`도 만나게 되었다.
- 작년 서울대학교에 입학해 만나 밥을 사 주셨던 `ohwphil`님의 후광이 오늘따라 대단해 보였다. SCSC 25학번으로 들어와 만나게 된 `lumitt(니은)`, `Lulusphere` 또한 만나게 되었다. 그와중에 나만 수상 실패한 거 뭐지
- 뒤풀이를 가서 같은 임원진인 `Stork`와 밥을 먹었다. 그 뒤 인터넷에서 만난 친구들과 어울리다 순위도 좌석도 내 바로 옆이었던 `aerae`님의 권유로 술배를 뜨게 되었다. 같은 대회를 다른 자리에서 본 이야기는 [aerae님의 SCSC 2025 후기](https://aerae.zip/posts/scsc-2025/)에서 볼 수 있다.
- 대회 참여를 위해 과외까지 뺀 이상 뒤풀이가 끝난 뒤에도 코포는 치고 싶었다. 기숙사로 가는 막차를 잡으려고 취한 상태로 길을 뛰다가 무단횡단까지 했다. 그렇게 돌아가서 친 코포는 다행히 늦은 4솔로 끝나 레이팅을 지킬 수 있었다.
- 많은 분들이 대회 이름을 SCSC로 알고 계시는데, SCSC는 동아리 이름이고 SCSC에서 주최하는 대회의 이름은 SCPC이다. 명명자에게 물어본 결과 동명의 대회 SCPC가 있지만 알빠노라고 한다.
