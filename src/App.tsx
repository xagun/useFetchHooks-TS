import React, { useState } from "react";
import "./App.css";
import useFetch from "./useFetch";
import { ITodo } from "./types/todo";

const App = () => {
  const [page, setPage] = useState<number>(1);

  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/todos",
    page
  );

  return (
    <div className="App">
      <h1>Todo List</h1>
      {loading ? (
        "Loading"
      ) : error ? (
        <div>{error}</div>
      ) : (
        data?.map((todo: ITodo) => (
          <div key={todo.id} className="todo-list">
            <h2>{todo.title}</h2>
            <div className={`status ${todo.completed ? "completed" : "todo"}`}>
              <p>{todo.completed ? "Complete" : "To do"}</p>
            </div>
          </div>
        ))
      )}

      <div className="button-area">
        <button
          onClick={() => {
            page > 1 && setPage(page - 1);
          }}
        >
          Prev
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default App;
