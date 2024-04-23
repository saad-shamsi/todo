"use client";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import React, { useState, useEffect } from "react";
import {
  onCreateTodo,
  onDeleteTodo,
  onUpdateTodo,
} from "@/graphql/subscriptions";
import * as subscriptions from "@/graphql/subscriptions";
import { createTodo, deleteTodo, updateTodo } from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { listTodos } from "@/graphql/queries";
import { useRouter } from "next/navigation";
const client = generateClient();

interface IAddTodo {
  title: string;
  completed: boolean;
}
const TodoCard = () => {
  const [todos, setTodos] = useState<any>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<any>([]);
  const [todoCompleted, setTodoCompeted] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    fetchTodos();
    const createSub = client
      .graphql({ query: subscriptions.onCreateTodo })
      .subscribe({
        next: ({ data }) => console.log(data),
        error: (error) => console.error(error),
      });
    const updateSub = client
      .graphql({ query: subscriptions.onUpdateTodo })
      .subscribe({
        next: ({ data }) => console.log(data),
        error: (error) => console.error(error),
      });
    const deleteSub = client
      .graphql({
        query: subscriptions.onDeleteTodo,
      })
      .subscribe({
        next: ({ data }) => console.log(data),
        error: (error) => console.error(error),
      });
    router.refresh();
  }, [router]);
  async function fetchTodos() {
    try {
      const todoData = await client.graphql({
        query: listTodos,
      });
      setTodos(todoData.data.listTodos.items);
    } catch (error) {
      console.error("Error fetching todos, error: ", error);
    }
  }
  async function handleAddTodo() {
    const todoDetails: IAddTodo = {
      title: newTodoTitle,
      completed: todoCompleted,
    };
    try {
      await client.graphql({
        query: createTodo,
        variables: { input: todoDetails },
      });

      setNewTodoTitle("");
      setTodoCompeted(false);
      router.refresh();
      alert("Your Todo has been added successfully");
    } catch (error) {
      console.error("Error adding todo", error);
    }
  }
  async function handleDeleteTodo(todoid: string) {
    try {
      await client.graphql({
        query: deleteTodo,
        variables: { input: { id: todoid } },
      });
      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== todoid)
      );
    } catch (error) {
      console.error("Error deleting todo", error);
    } finally {
      fetchTodos();
    }
  }

  console.log("todos: ", todos);
  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Todos</h1>
          <div className="flex flex-col items-center  justify-center">
            <div className="flex  gap-x-10 p-5">
              <input
                type="text"
                placeholder="Enter your todo"
                className="border border-gray-400 p-2 rounded w-full"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
              />
              <input
                type="checkbox"
                className="border border-gray-400 p-2 rounded w-6"
                value={todoCompleted}
                onChange={(e) => setTodoCompeted(e.target.checked)}
              />

              <button
                className="bg-blue-500 text-white px-1 py-2 w-48 rounded"
                onClick={handleAddTodo}
              >
                Add Todo
              </button>
            </div>
            <div className="flex flex-col items-center justify-center">
              {todos.map((todo: any) => (
                <div
                  key={todo.id}
                  className="flex flex-row items-center justify-between w-full rounded-2xl gap-7  p-4 my-2 bg-gray-200"
                >
                  <p className="">{todo.title}</p>
                  <button
                    className="bg-red-500  text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TodoCard;
