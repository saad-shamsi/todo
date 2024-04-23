"use client";
import Image from "next/image";
import { generateClient } from "aws-amplify/api";
import { withAuthenticator } from "@aws-amplify/ui-react";

import config from "../../src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import { createTodo, updateTodo, deleteTodo } from "@/graphql/mutations";
import { getTodo, listTodos } from "@/graphql/queries";
import { Metadata } from "next";
import { useState } from "react";
import TodoCard from "./components/TodoCard";
Amplify.configure(config);
const client = generateClient();

export function getDateAndTIme() {
  const renderedAt = new Date();
  const formattedBuildDate = renderedAt.toLocaleDateString("en-US", {
    dateStyle: "long",
  });
  const formattedBuildTime = renderedAt.toLocaleTimeString("en-US", {
    timeStyle: "long",
  });
  return {
    props: {
      renderedAt: ` ${formattedBuildDate} at ${formattedBuildTime} `,
    },
  };
}
function Home() {
  // const newTodo = await client.graphql({
  //   query: createTodo,
  //   variables: {
  //     input: {
  //       title: "my first todo",
  //       completed: true,
  //     },
  //   },
  // });
  // const getTodo = await client.graphql({
  //   query: listTodos,
  // });
  // const changeTodo = await client.graphql({
  //   query: updateTodo,
  //   variables: {
  //     input: {
  //       id: "8ff644b7-f881-4d6f-ae61-d51a3fa81813",
  //       title: "my first todo updated",
  //       completed: true,
  //     },
  //   },
  // });
  // const removeTodo = await client.graphql({
  //   query: deleteTodo,
  //   variables: {
  //     input: {
  //       id: "8ff644b7-f881-4d6f-ae61-d51a3fa81813",
  //     },
  //   },
  // });

  // console.log(newTodo.data.createTodo);
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-5">
        <TodoCard />
      </main>
    </>
  );
}

export default Home;
