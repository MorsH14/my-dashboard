import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to our data file
const dataFilePath = path.join(process.cwd(), "data", "todos.json");

// Make sure the data directory exists
function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Read todos from file
function readTodos() {
  ensureDataDir();

  if (!fs.existsSync(dataFilePath)) {
    return [];
  }

  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data);
}

// Write todos to file
function writeTodos(todos: any[]) {
  ensureDataDir();
  fs.writeFileSync(dataFilePath, JSON.stringify(todos, null, 2));
}

// GET - Fetch all todos
export async function GET() {
  const todos = readTodos();
  return NextResponse.json(todos);
}

// POST - Create a new todo
export async function POST(request: NextRequest) {
  const body = await request.json();
  const todos = readTodos();

  const newTodo = {
    id: Date.now(), // Simple ID generation
    text: body.text,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  writeTodos(todos);

  return NextResponse.json(newTodo, { status: 201 });
}
