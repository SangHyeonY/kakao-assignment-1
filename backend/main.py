from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./todos.db')
engine = create_engine(DATABASE_URL, connect_args={'check_same_thread': False} if 'sqlite' in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Todo(Base):
    __tablename__ = 'todos'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    completed = Column(Boolean, default=False)
    date = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class TodoCreate(BaseModel):
    title: str
    completed: bool = False
    date: str

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None

class TodoResponse(BaseModel):
    id: int
    title: str
    completed: bool
    date: str
    created_at: datetime
    class Config:
        from_attributes = True

Base.metadata.create_all(bind=engine)
app = FastAPI(title='Todo API')
app.add_middleware(CORSMiddleware, allow_origins=['http://localhost:3000', 'http://localhost:3001', '*'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get('/todos', response_model=list[TodoResponse])
def get_todos(date: Optional[str] = None, filter: Optional[str] = None, search: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Todo)
    if date:
        query = query.filter(Todo.date == date)
    if filter == 'active': query = query.filter(Todo.completed == False)
    elif filter == 'completed': query = query.filter(Todo.completed == True)
    if search: query = query.filter(Todo.title.contains(search))
    return query.order_by(Todo.created_at.desc()).all()

@app.post('/todos', response_model=TodoResponse)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    db_todo = Todo(**todo.dict())
    db.add(db_todo); db.commit(); db.refresh(db_todo)
    return db_todo

@app.put('/todos/{todo_id}', response_model=TodoResponse)
def update_todo(todo_id: int, todo_update: TodoUpdate, db: Session = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not db_todo: raise HTTPException(status_code=404, detail='Todo not found')
    if todo_update.title is not None: db_todo.title = todo_update.title
    if todo_update.completed is not None: db_todo.completed = todo_update.completed
    db.commit(); db.refresh(db_todo)
    return db_todo

@app.delete('/todos/{todo_id}')
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not db_todo: raise HTTPException(status_code=404, detail='Todo not found')
    db.delete(db_todo); db.commit()
    return {'message': 'Todo deleted successfully'}
