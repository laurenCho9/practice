import { useRef, useState } from "react";

const TodoList = [
  { id: 1, text: "content1", done: true },
  { id: 2, text: "content2", done: false },
  { id: 3, text: "content3", done: false },
];

// let result = TodoList.map((todo) => <li>{todo.text}</li>);

function Todos() {
  const [todos, setTodos] = useState(TodoList);
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const nextId = useRef(4);
  // const inputRef = useRef(); //

  const handleSubmit = (e) => {
    // console.log(input);
    e.preventDefault();
    if (input === "") return alert("내용을 입력하세요.");
    setTodos([...todos, { id: nextId.current++, text: input, done: false }]);
    setInput("");
    // inputRef.current.focus(); //
  };

  const handleRemove = (del) => {
    // if (window.confirm("삭제하십니까?"))
    //노드에 접근하기 때문에 윈도우. 붙여줘야함.
    setTodos(todos.filter((todo) => todo.id !== del));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInput}
          value={input}
          // ref={inputRef} //
        />
        <button>등록</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleRemove(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
