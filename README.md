# 과제 3. Next.js로 Todo 앱 만들기

과제 2에서 React로 만든 Todo 앱을 Next.js App Router와 FastAPI를 활용해 재구현하는 과제예요.

---

## 🚀 실행 방법

1. 저장소를 클론해요

```bash
git clone 저장소 주소
cd kakao-hw3
```

2. 프론트엔드에서 의존성 설치 후 실행해요

```bash
cd frontend
npm install

npm run dev
```

3. 백엔드에서 가상환경 생성 후 실행해요

```bash
cd backend

python -m venv .venv
.venv\Scripts\activate

uvicorn main:app --reload
```

4. 브라우저 `http://localhost:3000/`에 접속해요

---

## 프로젝트 구조

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

## ✅ 구현 기능

### 기본 미션

- FastAPI로 Todo CRUD API 구현하기
- Next.js에서 Todo 페이지 구현하기
- API Route 작성하고 프론트-백엔드 연동하기
- 환경변수 설정하기

### 도전 미션

- 서버 기반 상태별 필터링 구현하기
- 서버 기반 Todo 검색 기능 구현하기

---

## 🛠️ 활용 스택

- Frontend: `Next.js (v15+)` / `React (v18+)` / `TypeScript (v5)` / `Tailwind CSS (v4)` / `Axios`
- Backend: `FastAPI (v0.111+)` / `Uvicorn` / `SQLAlchemy` / `SQLite` / `Pydantic (v2)`

---

## 📌 참고사항

- 본 과제는 AI 도구(ChatGPT, Claude)를 활용해 구현했어요
- 과제 1(Vanilla JS)과 과제 2(React)의 기능을 Next.js 기반으로 재구현한 버전이에요
