// "use client"

// import { useEffect, useState } from "react";

// // Define the shape of your data
// interface ApiData {
//   message: string;
//   timestamp: string;
//   name: string;
//   username: string;
//   gender: "male" | "female";
// }

// export default function Home() {
//   // Tell TypeScript what type data will be
//   const [data, setData] = useState<ApiData | null>(null);

//   useEffect(() => {
//     fetch('/api/hello')
//       .then(res => res.json())
//       .then(data => setData(data))
//       .catch(err => console.error('Error fetching data:', err));
//   }, []); // ⚠️ Add empty array here!

//   return (
//     <div style={{ padding: '50px' }}>
//       <h1>My Dashboard</h1>
//       {data ? (
//         <div>
//           <p>message: {data.message}</p>
//           <p>Time: {data.timestamp}</p>
//           <p>name: {data.name}</p>
//           <p>username: {data.username}</p>
//           <p>gender: {data.gender}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

"use client"

import { useEffect, useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos on load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTodo.trim()) return;

    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newTodo }),
    });

    const todo = await res.json();
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  return (
    <div style={{ padding: '50px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>My Todo List</h1>

      <form onSubmit={addTodo} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          style={{
            padding: '10px',
            width: '70%',
            fontSize: '16px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            fontSize: '16px'
          }}
        >
          Add
        </button>
      </form>

      <div>
        {todos.length === 0 ? (
          <p style={{ color: '#999' }}>No todos yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              style={{
                padding: '15px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
            >
              <p style={{ margin: 0, fontSize: '18px' }}>{todo.text}</p>
              <small style={{ color: '#999' }}>
                {new Date(todo.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}