import { Component, OnInit } from '@angular/core';
import { ITodo } from '../../interfaces/itodo';
import { TodoItemsService } from '../../services/todo-items.service';

@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.css']
})
export class TaskviewComponent implements OnInit {

  public todos: ITodo[];

  constructor(
    private todoItemsService: TodoItemsService
  ) { }

  ngOnInit() {
    this.todoItemsService.getTodos()
    .subscribe(todos => this.todos = todos);

  }
  delete(id: number) {
    this.todoItemsService.removeTodo(id);
  }
  update(todo: ITodo) {
    this.todoItemsService.updateTodo(todo);
  }
  add() {
    this.todoItemsService.addTodo();
  }

}
