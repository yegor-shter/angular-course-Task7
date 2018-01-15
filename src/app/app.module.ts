import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MessageService } from './containers/services/message.service';
import { TodoItemsService } from './containers/services/todo-items.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


import { AppComponent } from './app.component';
import { TaskviewComponent } from './containers/components/taskview/taskview.component';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { FormArray } from '@angular/forms/src/model';



@NgModule({
  declarations: [
    AppComponent,
    TaskviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TodoItemsService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
