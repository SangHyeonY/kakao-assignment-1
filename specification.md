# 과제 3 요구사항

## 1. 과제 소개

안녕 나는 지금 Next.js로 Todo 앱 만들기를 수행하려고 해.

- 1차 과제: Vanilla JS 기반
- 2차 과제: React 기반
- 3차 과제: Next.js App Router 기반

먼저 1, 2차 과제의 요구사항과 결과물을 보여줄게.

그다음 3차 과제의 기본 세팅, 활용 스택, 예시 구조, 요구사항 여섯 가지 알려줄게.

1, 2차 과제의 기능은 거의 유지하되, 3차 과제의 요구사항을 반영해서 코드를 작성해줘.

그리고 이 파일과 함께 1, 2차 과제 결과물 디자인을 스크린샷으로 첨부할 건데, 디자인은 이것과 똑같이 만들어야 해.

### 최종 결과물

- 전체 코드가 담긴 zip 파일
- 프로젝트 구조 트리

그 후 각 파일이 어떻게 동작하는지 물어보고 수정 사항이 있으면 요청할게.

---

# 2. 과제 1, 2 요구사항

## 2-1. Todo CRUD 기능

### Create

- 텍스트 입력창과 추가 버튼으로 새로운 Todo를 생성할 수 있어야 해.
- 입력값이 비어있으면 Todo가 생성되지 않고 사용자에게 안내 메시지를 표시해줘.

### Read

- 생성된 Todo는 목록으로 표시되어야 해.

### Update

- 각 항목마다 수정 버튼이 있어야 해.
- 수정 시 저장/취소 탭이 생겨야 해.
- 과제 2에서는 `prompt()` 대신 인라인 입력창으로 수정 UI를 구현해야 해.
- 과제 2에서는 `isEditing` 상태 하나로 UI가 자동 전환돼야 해.

### Delete

- 각 항목마다 삭제 버튼이 있어야 해.
- 삭제 시 확인/취소 탭이 생겨야 해.

### Complete

- 완료 버튼이 있어야 해.
- 완료된 Todo는 취소선으로 표시되어야 해.

---

## 2-2. 상태별 필터링

### 필터 종류

- 전체
- 진행 중
- 완료

### 요구사항

- 탭 클릭 시 해당 상태의 Todo만 표시되어야 해.
- 현재 선택된 탭은 시각적으로 구분돼야 해.
- 탭 전환 후 새 Todo를 추가해도 필터가 유지돼야 해.
- 과제 2에서는 `useState`로 필터 상태를 관리해야 해.

---

## 2-3. Todo 일간 뷰

### 요구사항

- 화면 상단에 오늘 날짜를 표시해야 해.
- 이전 / 다음 버튼으로 날짜 이동이 가능해야 해.
- Todo 생성 시 현재 선택된 날짜를 저장해야 해.
- 선택된 날짜의 Todo만 목록에 표시돼야 해.
- 날짜 이동 시 해당 날짜 Todo만 보여야 해.
- 날짜별 Todo는 각각 독립적으로 관리돼야 해.
- 과제 2에서는 `useState`로 날짜 상태를 관리해야 해.

---

## 2-4. 로컬스토리지 연동

### 저장

- Todo 추가
- Todo 수정
- Todo 삭제
- Todo 완료 처리

위 작업 시 로컬스토리지에 저장돼야 해.

### 복원

- 새로고침 시 로컬스토리지 데이터 복원
- `JSON.stringify()`
- `JSON.parse()`

### 요구사항

- `useEffect`를 사용하여 todos 변경 시 자동 저장

---

# 3. 과제 1, 2 프로젝트 구조

```text
kakao-hw2/
├── src/
│   ├── components/
│   │   ├── DateHeader.jsx
│   │   ├── FilterTabs.jsx
│   │   ├── TodoInput.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoList.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

# 4. 과제 3 활용 스택

## Frontend

- Next.js (v15+)
- React (v18+)
- TypeScript (v5)
- Tailwind CSS (v4)
- Axios

## Backend

- FastAPI (v0.111+)
- Uvicorn
- SQLAlchemy
- SQLite
- Pydantic (v2)

---

# 5. 과제 3 기본 세팅

## 프론트엔드 생성

```bash
mkdir kakao-hw3 && cd kakao-hw3

npx create-next-app@latest frontend

mkdir backend
```

### 생성 옵션

```text
TypeScript → Yes
ESLint → Yes
Tailwind CSS → Yes
src/ directory → No
App Router → Yes
Turbopack → No
import alias → No
```

## 백엔드 생성

```bash
cd backend

python -m venv .venv

.venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### requirements.txt

```txt
fastapi>=0.111.0
uvicorn[standard]>=0.29.0
sqlalchemy>=2.0.0
pydantic>=2.0.0
```

---

# 6. 과제 3 프로젝트 구조

```
kakao-hw3/
├── backend/
│   ├── .env.local
│   ├── .gitignore
│   ├── main.py                #  FastAPI 앱 + 모든 로직
│   └── requirements.txt
├── frontend/
│   ├── app/
│   │   ├── api/               # API Router (백엔드 Proxy)
│   │   │   └── todos/
│   │   │       ├── [id]/
│   │   │       │   └── route.ts  # 개별 Todo 수정/삭제 (PUT, DELETE)
│   │   │       └── route.ts      # 전체 Todo 조회 (GET, POST)
│   │   ├── components/           # UI 컴포넌트
│   │   │   ├── DateNavigator.tsx
│   │   │   ├── FilterTabs.tsx
│   │   │   ├── TodoInput.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   └── TodoList.tsx
│   │   ├── hooks/
│   │   │   └── useTodoManager.ts  # 훅
│   │   ├── lib/
│   │   │   ├── todoService.ts     # 서버 통신
│   │   │   └── utils.ts           # 날짜 변환
│   │   ├── todos/
│   │   │   ├── error.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── page.module.css
│   │   │   └── page.tsx           # Todo 메인 페이지
│   │   ├── actions.ts             # Server Actions
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── .env.local                 # 환경변수
│   ├── .gitignore
│   ├── next-env.d.ts
│   ├── next.config.mjs
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   └── tsconfig.node.json


```

---

# 7. 과제 3 요구사항

## 가. FastAPI로 Todo CRUD API 구현

### 구현 API

| Method | URL         | 기능           |
| ------ | ----------- | -------------- |
| GET    | /todos      | 전체 Todo 조회 |
| POST   | /todos      | Todo 생성      |
| PUT    | /todos/{id} | Todo 수정      |
| DELETE | /todos/{id} | Todo 삭제      |

---

## 나. Next.js Todo 페이지 구현

### 구현 페이지

- app/todos/page.tsx
- app/todos/new/page.tsx
- app/todos/[todoId]/page.tsx
- app/todos/error.tsx
- app/todos/loading.tsx

### 추가 요구사항

- Server Component와 Client Component 적절히 분리

---

## 다. API Route 및 프론트/백엔드 연동

### 데이터 조회

```text
actions.ts
↓
FastAPI 직접 호출
```

### 생성 / 수정 / 삭제

```text
Client
↓
route.ts
↓
FastAPI
```

### 요구사항

- 생성 후 목록 즉시 반영
- 수정 후 목록 갱신
- 삭제 후 목록 갱신

---

## 라. 환경변수 설정

### frontend/.env.local

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
BACKEND_URL=http://localhost:8000
```

### backend/.env.local

```env
DATABASE_URL=sqlite:///./todos.db
```

### 추가 요구사항

- `.env.local` 은 `.gitignore` 포함

---

## 마. 서버 기반 상태별 필터링

### 필터 종류

- 전체
- 진행 중
- 완료

### URL 형태

```text
?filter=active
?filter=completed
```

### 요구사항

- 상태별 Todo 개수 표시
- URL 공유 시 상태 유지
- 새로고침 시 상태 유지
- FastAPI 서버에서 필터링 수행

### 처리 흐름

```text
Client
↓
route.ts
↓
FastAPI (/todos?filter=active)
↓
DB 조회
↓
필터링 결과 반환
```

---

## 바. 서버 기반 Todo 검색

### URL 형태

```text
?search=키워드
```

### 필터 + 검색

```text
?filter=active&search=키워드
```

### 요구사항

- 검색창 위치

```text
Todo 입력창
↓
검색창
↓
필터 탭
```

- URL 파라미터로 검색어 관리
- URL 직접 입력 가능
- 새로고침 시 검색 상태 유지
- FastAPI 서버에서 검색 수행

### 처리 흐름

```text
Client
↓
route.ts
↓
FastAPI (/todos?search=키워드)
↓
DB 검색
↓
결과 반환
```
