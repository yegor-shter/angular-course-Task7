import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ITodo } from '../interfaces/itodo';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Subject, } from 'rxjs/Subject';
import { BehaviorSubject, } from 'rxjs/BehaviorSubject';
import { retry } from 'rxjs/operators/retry';

@Injectable()
export class TodoItemsService {

  private static readonly initial: ITodo[] = [{
    id: 1,
    title: 'First todo',
    text: 'todo number 1',
    status: 'urgent',
    dateCreation: new Date()},
    {id: 2,
    title: 'Second todo',
    text: 'todo number 2',
    status: 'fast',
    dateCreation : new Date()}];

    private static readonly initialTodo: ITodo = {
      id: 0,
      title: 'new ToDo',
      text: 'description',
      status: 'urgent',
      dateCreation: new Date()
    };

  private todosSubject: BehaviorSubject<ITodo[]>;

    constructor(
    private messageService: MessageService) {
    this.todosSubject = new BehaviorSubject<ITodo[]>(this.getAll());
   }

  public getTodos(): Observable<ITodo[]> {
    return this.todosSubject.asObservable();
  }

  public updateTodo(todo: ITodo) {
    const todos = this.getAll();
    const foundIndex = todos.findIndex((t) => t.id === todo.id);
    todos[foundIndex] = todo;
    this.saveAndSendToObservable(todos);
  }

  public addTodo() {
    const todos = this.getAll();
    const todo = TodoItemsService.initialTodo;
    todo.id = this.getNextId();
    todos.push(todo);
    this.saveAndSendToObservable(todos);
  }

  public removeTodo(id: number) {
    const todos = this.getAll();
    const foundIndex = todos.findIndex((todo) => todo.id === id);
    const deletedTodo = todos.splice(foundIndex, 1 )[0];
    this.saveAndSendToObservable(todos);
  }

  private saveAndSendToObservable(todos: ITodo[]) {
    this.saveAll(todos);
    this.todosSubject.next(todos);
  }

  private getAll(): ITodo[] {
    let todos = window.localStorage.getItem('todos');
    if (!todos) {
      todos = JSON.stringify(TodoItemsService.initial);
    }
    return JSON.parse(todos);
  }

  private getNextId(): number {
    let lastId = window.localStorage.getItem('lastId');
    if (!lastId) {
      lastId = '2';
    }
    let id: number = +lastId;
    id++;
    window.localStorage.setItem('lastId', `${id}`);
    return id;
  }

  private saveAll(todos: ITodo[]) {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }

}
