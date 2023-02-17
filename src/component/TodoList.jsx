// src/component/TodoList.jsx
import { useRef, useState } from "react";

const todoList = [
  { id: 1, text: "컴포넌트 만들기", done: true },
  { id: 2, text: "상태 관리하기", done: false },
  { id: 3, text: "배열 렌더링하기", done: false },
];

function TodoList() {
  const [todos, setTodos] = useState(todoList);
  const [input, setInput] = useState("");

  const nextId = useRef(4); // 렌더링과 별개로 기억되는 변수.
  const inputRef = useRef();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  // input 상태값 + 업데이트 함수 만들기
  const handleSubmit = (e) => {
    e.preventDefault(); // 태그의 기본 기능 막는다.

    if (input === "") return; // input이 빈 문자일 때 함수 종료.

    // 기존의 todos 배열을 새로운 배열에 복사하고, 마지막에 새로운 요소 추가.
    //      => 기존 배열과 다른 새로운 배열을 만들어서 불변성 유지.

    // setTodos([...todos, { id: 4, text: input, done: false }]);
    setTodos(todos.concat({ id: nextId.current++, text: input, done: false }));

    setInput("");
    inputRef.current.focus();
  };

  const handleRemove = (id) => {
    if (window.confirm("삭제하시겠습니까?"))
      // 선택한 id가 아닌 요소들만 모으기(filter) => filter도 새로운 배열 반환.
      setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInput}
          value={input}
          ref={inputRef}
        />
        <button>등록</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.done && "line-through",
              userSelect: "none",
            }}
            onClick={() => handleToggle(todo.id)}
          >
            <span>{todo.text}</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 전파를 더 이상하지 않는다.
                handleRemove(todo.id);
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
