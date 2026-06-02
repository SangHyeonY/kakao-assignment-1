/* Dom */
const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-button");
const todoList = document.getElementById("todo-list");
const messageElement = document.getElementById("message");
const filterButtons = document.querySelectorAll(".filter-button");

const allFilterButton = document.getElementById("all-filter-button");
const activeFilterButton = document.getElementById("active-filter-button");
const completedFilterButton = document.getElementById("completed-filter-button");

const currentDateElement = document.getElementById("current-date");
const previousDateButton = document.getElementById("previous-date-button");
const nextDateButton = document.getElementById("next-date-button");

/* 필터&날짜 상태, Todo 배열 */
let currentFilter = "all";
let selectedDate = new Date();
let todoDataList = [];

/* =========================
   1. Todo CRUD 구현
========================= */
function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText === "") {
        showMessage("할 일을 입력해주세요.");
        return;
    }

    clearMessage();

    const todoData = {
        id: Date.now(),
        text: todoText,
        completed: false,
        date: formatDate(selectedDate)
    };

    todoDataList.push(todoData);

    createTodoElement(todoData);

    saveTodosToLocalStorage();

    //상태별 개수 업데이트
    updateTodoCounts();
    //현재 필터 상태 유지
    applyFilter();

    // 입력창 초기화
    todoInput.value = "";
    todoInput.focus();
}

/* DOM 생성 로직 분리 */
function createTodoElement(todoData) {
    const todoItem = document.createElement("li");

    todoItem.classList.add("todo-item");
    if (todoData.completed) {todoItem.classList.add("completed");}

    todoItem.dataset.id = todoData.id;
    todoItem.dataset.date = todoData.date;

    todoItem.innerHTML = `
        <span class="todo-text">
            ${todoData.text}
        </span>

        <div class="todo-actions">
            <button class="action-button complete-button">
                완료
            </button>

            <button class="action-button edit-button">
                수정
            </button>

            <button class="action-button delete-button">
                삭제
            </button>
        </div>
    `;

    const completeButton = todoItem.querySelector(".complete-button");
    const editButton = todoItem.querySelector(".edit-button");
    const deleteButton = todoItem.querySelector(".delete-button");

    // 완료 처리
    completeButton.addEventListener("click",() => {
            todoItem.classList.toggle("completed");

            const targetTodo = todoDataList.find((todo) =>
                        todo.id ===todoData.id
                );

            targetTodo.completed =todoItem.classList.contains("completed");

            saveTodosToLocalStorage();

            updateTodoCounts();
            applyFilter();
        }
    );

    // 수정 처리
    editButton.addEventListener("click",() => {
            const updatedText =prompt("수정할 내용을 입력하세요.",todoData.text);

            if (updatedText === null) {return;}

            const trimmedText =updatedText.trim();

            if (trimmedText === "") {
                showMessage("수정 내용은 비워둘 수 없습니다.");
                return;
            }

            todoData.text = trimmedText;

            todoItem.querySelector(".todo-text" ).textContent = trimmedText;

            saveTodosToLocalStorage();
        }
    );

    // 삭제 처리
    deleteButton.addEventListener("click", () => {
            const isConfirmed =confirm("Todo를 삭제하시겠습니까?");

            if (!isConfirmed) {return;}

            todoDataList = todoDataList.filter((todo) =>
                        todo.id !==todoData.id
                );

            todoItem.remove();

            saveTodosToLocalStorage();

            updateTodoCounts();
        }
    );

    todoList.appendChild(todoItem);
}

/*안내 메시지 */ 
function showMessage(message) {
    messageElement.textContent = message;
}

function clearMessage() {
    messageElement.textContent = "";
}

addTodoButton.addEventListener("click", addTodo);

/* Enter 키로 추가 */
todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});

/* =========================
   2. 상태별 필터링 구현
========================= */
function applyFilter() {
    const todoItems = document.querySelectorAll(".todo-item");
    const selectedDateString = formatDate(selectedDate);        

    todoItems.forEach((todoItem) => {
        const isCompleted = todoItem.classList.contains("completed");
        const todoDate = todoItem.dataset.date;

        // 날짜가 다르면 무조건 숨김
        if (todoDate !== selectedDateString) {
            todoItem.style.display = "none";
            return;
        }

        if (currentFilter === "all") {
            todoItem.style.display = "flex";

        } else if (currentFilter === "active") {
            todoItem.style.display = !isCompleted ? "flex" : "none";
            
        } else if (currentFilter === "completed") {
            todoItem.style.display = isCompleted ? "flex" : "none";
        }
    });
}

/* 필터 버튼 이벤트 */
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) =>
            btn.classList.remove("active")
        );
        button.classList.add("active");

        currentFilter = button.dataset.filter;

        updateTodoCounts();
        applyFilter();
    });
});

/* 날짜별, 상태별 Todo 개수 표시 : 전체(N) / 진행 중(N-M) / 완료(M) */
function updateTodoCounts() {
    const selectedDateString = formatDate(selectedDate);
    const todoItems =
        Array.from(
            document.querySelectorAll(".todo-item")
        ).filter((todoItem) =>
            todoItem.dataset.date === selectedDateString);

    const totalCount = todoItems.length;
    const completedCount = todoItems.filter((todoItem) =>
            todoItem.classList.contains("completed")).length;
    const activeCount = totalCount - completedCount;

    allFilterButton.textContent = `전체 (${totalCount})`;
    activeFilterButton.textContent = `진행 중 (${activeCount})`;
    completedFilterButton.textContent = `완료 (${completedCount})`;
}

/* 페이지 시작 시 날짜별, 상태별 Todo 개수 초기화&동기화 */
renderCurrentDate();
loadTodosFromLocalStorage();
updateTodoCounts();
applyFilter();

/* =========================
   3. Todo 일간 뷰 구현
========================= */
function formatDate(date) {
    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function renderCurrentDate() {
    currentDateElement.textContent =
        formatDate(selectedDate);
}

function moveDate(dayOffset) {
    selectedDate.setDate(selectedDate.getDate() + dayOffset );

    renderCurrentDate();
    updateTodoCounts();
    applyFilter();
}

previousDateButton.addEventListener("click", () => {moveDate(-1);});
nextDateButton.addEventListener("click", () => {moveDate(1);});

/* =========================
   4. 로컬스토리지 연동하기
========================= */
function saveTodosToLocalStorage() { //배열을 JSON 문자열로 변환해서 저장
    localStorage.setItem("todoDataList",JSON.stringify(todoDataList));
}

function loadTodosFromLocalStorage() { //JSON 문자열을 배열로 변환해서 복원
    const savedTodos = localStorage.getItem("todoDataList");

    if (!savedTodos) {return;}

    todoDataList = JSON.parse(savedTodos);

    todoDataList.forEach((todoData) => {createTodoElement(todoData);});
}