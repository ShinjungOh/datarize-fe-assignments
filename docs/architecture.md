# 프로젝트 아키텍처

## 기술 스택

### Core
- React 18
- TypeScript 5
- Vite

### UI & Styling
- Chakra UI
- Emotion

### Data Fetching
- Axios

### Testing
- Vitest

### Code Quality
- ESLint
- Prettier
- Husky (pre-commit)

### Date Picker
- react-day-picker

<br/>

## 프로젝트 구조

```
src
├── App.tsx
├── main.tsx
├── api
│   ├── customer.api.test.ts
│   ├── customer.api.ts
│   ├── httpClient.ts
│   ├── purchase.api.test.ts
│   └── purchase.api.ts
├── assets
│   └── react.svg
├── components
│   ├── common
│   │   ├── DateFilter.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── InfoBox.tsx
│   │   └── LoadingSpinner.tsx
│   ├── customer
│   │   ├── CustomerListTable.tsx
│   │   ├── CustomerPagination.tsx
│   │   ├── CustomerPurchasesSection.tsx
│   │   └── CustomerSearchSection.tsx
│   ├── layout
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   ├── Main.tsx
│   │   ├── Sidebar.tsx
│   │   └── SubHeader.tsx
│   └── purchase
│       ├── PurchaseFrequencyChartSection.tsx
│       └── PurchaseFrequencyTableSection.tsx
├── constants
│   ├── date.ts
│   └── messages.ts
├── hooks
│   ├── useCustomerPurchases.ts
│   ├── useCustomers.ts
│   ├── useDateRange.ts
│   └── usePurchaseFrequency.ts
├── pages
│   └── DashboardPage.tsx
├── theme
│   └── theme.ts
├── types
│   ├── customer.type.ts
│   └── purchase.type.ts
├── utils
│   ├── csvUtils.ts
│   ├── dateUtils.test.ts
│   ├── dateUtils.ts
│   ├── numberUtils.test.ts
│   ├── numberUtils.ts
│   ├── purchaseUtils.test.ts
│   └── purchaseUtils.ts
└── vite-env.d.ts
```

- `api` - API 호출 함수 및 axios 인스턴스
- `assets` - 정적 리소스 파일
- `components` 
  - `common` - 공통 UI 컴포넌트 (로딩, 에러, 날짜 필터 등)
  - `customer` - 고객 관련 컴포넌트
  - `layout` - 레이아웃 컴포넌트
  - `purchase` - 구매 관련 컴포넌트
- `constants` - 상수 정의
- `hooks` - 커스텀 훅
- `pages` - 페이지 컴포넌트
- `theme` - 테마 및 스타일 설정
- `types` - TypeScript 타입 정의
- `utils` - 유틸리티 함수
