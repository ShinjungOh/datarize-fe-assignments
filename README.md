# Datarize Frontend 과제 전형 | 오신정

## 1. 개요

<img src="docs/images/ui-1.png" alt="전체 UI" width="600" />

> 🛍️ **쇼핑몰 구매 데이터 대시보드 애플리케이션**   
> 이 애플리케이션은 `2025년 10월~12월 (3개월)` 동안 발생한 구매 데이터를 기반으로 다음의 정보를 제공합니다.
> - 가격대별 구매 빈도 테이블 & CSV 추출 기능
> - 고객 목록 및 검색 기능
> - 고객 상세 구매 내역 조회

<br/>

## 2. 프로젝트 설정 및 실행 방법

### 설치 방법

#### 프로젝트 의존성 설치 및 실행
```bash
cd apps
yarn install
yarn start-server  # 백엔드 서버 실행 (터미널 1)
yarn start-client  # 프론트엔드 개발 서버 실행 (터미널 2)
```
- 백엔드 서버: `http://localhost:4000`
- 프론트엔드: `http://localhost:3000`

<br/>

## 3. 기능 소개

### 가격대별 구매 빈도 테이블

<img src="docs/images/purchaseFrequency-Chart.gif" alt="구매 빈도 차트" width="600" />

- 가격대는 2만원 이하부터 10만원 이상까지 만원 단위로 구분
- 시작일과 종료일을 선택해 특정 기간 조회
- 차트에 hover시 상세 수치 표시

### CSV 추출 기능

<img src="docs/images/CSV-download.gif" alt="CSV 다운로드" width="600" />

- 선택된 날짜 범위의 구매 데이터를 CSV 파일로 다운로드

### 고객 목록 및 검색 기능

<img src="docs/images/customers-filtering.gif" alt="고객 필터링" width="250" />

- 날짜 범위에 해당하는 고객 목록 출력
- 고객을 구매 금액 순으로 내림차순/오름차순 정렬, 기본 정렬은 ID 오름차순
- 이름 검색 기능
- 각 고객의 ID, 이름, 총 구매 횟수, 총 구매 금액 표시
- 페이지네이션 구현

### 고객 상세 구매 내역

<img src="docs/images/customersPurchases.gif" alt="고객 구매 내역" width="600" />

- 고객 Row 클릭 시 해당 고객의 상세 구매 내역 표시
- 구매 내역에는 구매 날짜, 제품명, 제품 가격, 구매 수량, 상품이 포함됨
- 고객의 주요 정보인 ID, 구매 횟수, 총 금액을 상단 UI에 표시
- '목록으로' 버튼 클릭시 목록 돌아가기 기능
- 제품 썸네일 클릭시 새 탭으로 이미지 보기 기능

<br/>


## 4. 개발하며 고려한 점 

### UI/UX

#### Chakra UI 선택 이유

대시보드를 구현하며 Table, Chart, Button, Input, Spinner, Pagination 등 다양한 UI가 필요했습니다.
Chakra UI는 `ChakraProvider`로 토큰 시스템을 이용할 수 있어 별다른 스타일 설정이 없어도 빠르게 UI를 구현할 수 있습니다.  
다양한 컴포넌트가 미리 구현되어 있고, 전반적으로 UI에 최소한의 스타일이 적용되어 있어서 커스텀이 간편하기 때문에 Chakra UI를 선택했습니다. 

#### 사용자 경험

마케터로 근무하며 어드민을 직접 사용했던 경험을 떠올리며, 실제로 사용할 때 필요한 부분을 고려했습니다.

- 여러 페이지 이동이 불편하기 때문에 라우터 이동 없이 **단일 페이지**에서 모든 기능을 구현했습니다.
- CSV 다운로드 버튼은 테이블에 기반해 다운받을 수 있도록 테이블 섹션에 배치했습니다.
- 정보가 많은 대시보드의 특성상, 사용자의 눈이 피로하지 않도록 모노톤의 색상을 사용했습니다.
- 고객 상세 구매 내역 섹션 상단에 '**목록으로**' 버튼을 배치해 사용자가 해당 섹션을 빠져나올 수 있도록 했습니다. 
- 고객 상세 구매 내역 섹션에 **고객의 주요 정보**를 표시해, 자주 쓰이는 정보를 참고할 수 있도록 강조했습니다.
- 검색시 데이터가 비어있는 경우를 고려해 **빈 상태**를 표시하는 UI를 구현했습니다.

<br/>

### 트러블슈팅 

#### API 명세와 실제 구현의 차이점

날짜 범위에 알맞는 고객 목록 출력 기능을 구현하는 중, API 명세서의 `/api/customers` 엔드포인트에 날짜 범위 파라미터(from, to)가 명시되어 있지 않았습니다.
백엔드 코드(backend/src/routes/customers.ts)를 살펴보니, 해당 엔드포인트가 from, to 쿼리 파라미터로 날짜 필터링을 지원하고 있었습니다.
API 호출 함수에 사용되는 타입에 날짜 범위 파라미터를 추가하고, API 호출 시 날짜 범위 파라미터를 함께 전달하도록 수정해 요구사항을 충족했습니다.

<br/>

### 추가하고 싶은 기능

- **쿼리스트링으로 검색 데이터 기록** : URL에 검색 상태를 저장해, 새로고침 시에도 유지되도록 구현
  - 특정 검색 상태를 공유할 수 있음
  - 실수로 새로고침해도 검색 상태가 유지됨
  - 어떤 값으로 검색했는지 URL로 확인 가능
- **Toast 알림** - 사용자 액션에 대한 피드백
  - 조회, 검색값 초기화, CSV 다운로드 등 주요 행동에 Toast 알람 띄우기
  - 요청이 제대로 처리되었는지 피드백을 줌
  
<br/>

## 5. 참고 문서

- [체크리스트](https://github.com/ShinjungOh/datarize-fe-assignments/blob/main/docs/checklist.md) - 과제 요구사항을 분석하고 개발 진행 단계별로 나눈 체크리스트
- [아키텍처](https://github.com/ShinjungOh/datarize-fe-assignments/blob/main/docs/architecture.md) - 프로젝트 구조 및 기술 스택
- [과제 요구사항](https://github.com/ShinjungOh/datarize-fe-assignments/blob/main/docs/requirement.md) - Datarize Frontend 과제 전형 README 백업본
