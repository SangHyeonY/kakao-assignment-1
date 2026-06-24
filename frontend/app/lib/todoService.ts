export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  date: string;
}

export const todoService = {
  getTodos: async (params: {
    date: string;
    filter?: string;
    search?: string;
  }): Promise<Todo[]> => {
    const { date, filter, search } = params;

    const query = new URLSearchParams();
    query.append("date", date);
    if (filter) query.append("filter", filter);
    if (search) query.append("search", search);

    const response = await fetch(`/api/todos?${query.toString()}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  create: async (title: string, date: string): Promise<Todo> => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, completed: false }),
    });

    if (!response.ok) {
      throw new Error("Failed to create todo");
    }

    return response.json();
  },

  update: async (todo: Todo): Promise<Todo> => {
    const response = await fetch(`/api/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error("Failed to update todo");
    }

    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
  },
};
