import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { todoService, Todo } from "@/app/lib/todoService";

export function useTodoManager(initialDate: string) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedFilter = searchParams.get("filter") || "all";
  const searchQueryFromUrl = searchParams.get("search") || "";
  const [localSearchTerm, setLocalSearchTerm] = useState(searchQueryFromUrl);

  const changeDate = (days: number) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + days);
    const newDate = date.toISOString().split("T")[0];
    setCurrentDate(newDate);
  };

  const loadTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await todoService.getTodos({
        date: currentDate,
        search: searchQueryFromUrl,
      });
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error("로딩 에러:", err);
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [currentDate, searchQueryFromUrl]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  /* 디바운스 로직*/
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (localSearchTerm) {
        params.set("search", localSearchTerm);
      } else {
        params.delete("search");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, pathname, router, searchParams]);

  const filteredTodos = todos.filter((todo) => {
    if (selectedFilter === "active") return !todo.completed;
    if (selectedFilter === "completed") return todo.completed;
    return true;
  });

  const counts = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  const updateFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", filter);
    router.push(`${pathname}?${params.toString()}`);
  };

  const updateSearch = (query: string) => {
    setLocalSearchTerm(query);
  };

  const addTodo = async (title: string) => {
    await todoService.create(title, currentDate);
    loadTodos();
  };

  const toggleTodo = async (todo: Todo) => {
    await todoService.update({ ...todo, completed: !todo.completed });
    loadTodos();
  };

  const saveEdit = async (todo: Todo, newTitle: string) => {
    await todoService.update({ ...todo, title: newTitle });
    loadTodos();
  };

  const deleteTodo = async (id: number) => {
    await todoService.delete(id);
    loadTodos();
  };

  return {
    currentDate,
    changeDate,
    todos: filteredTodos,
    counts,
    isLoading,
    error,
    selectedFilter,
    searchQuery: localSearchTerm,
    addTodo,
    toggleTodo,
    saveEdit,
    deleteTodo,
    updateFilter,
    updateSearch,
  };
}
