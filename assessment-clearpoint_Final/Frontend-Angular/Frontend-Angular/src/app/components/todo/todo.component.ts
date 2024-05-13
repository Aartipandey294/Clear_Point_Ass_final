import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
 
  todolist: any[] = [];
  displayMsg: string = '';
  todoDescription: string;

  constructor(private authService : AuthService){ }

  ngOnInit(): void {
    this.loadTodoList();
  }


  loadTodoList() {
    this.authService.getTodoList().subscribe(
      (data: any) => {
        this.todolist = data;
      },
      (error: any) => {
        console.error('Error loading todo list:', error);
      }
    );
  }

  
  todoform = new FormGroup({
    formAddTodoItem : new FormControl("" ,[Validators.required]),
  });


  handleAdd(todoDescription: string) {
    if (!todoDescription) {
      this.displayMsg = 'Description is required.';
      return;
    }
    
    const todo = { description: todoDescription, completed: false }; // Assuming your todo object structure
    this.authService.addTodo(todo).subscribe(
      () => {
        this.displayMsg = 'Todo item added successfully.';
        this.todoDescription = ''; // Clear the input field
        this.loadTodoList(); // Reload the todo list after adding a new item
      },
      (error: any) => {
        console.error('Error adding todo item:', error);
        this.displayMsg = 'Failed to add todo item.';
      }
    );
  }

  markAsCompleted(todoId: number) {
    const todo = this.todolist.find(todo => todo.id === todoId);
    if (todo) {
      todo.completed = true;
      this.authService.updateTodoItem(todo).subscribe(
        () => {
          this.displayMsg = 'Todo item marked as completed.';
        },
        (error: any) => {
          console.error('Error marking todo item as completed:', error);
          this.displayMsg = 'Failed to mark todo item as completed.';
        }
      );
    }
  }



  deleteTodoItem(todoId: number) {
    const index = this.todolist.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
      this.authService.deleteTodoItem(todoId).subscribe(
        () => {
          this.todolist.splice(index, 1);
          this.displayMsg = 'Todo item deleted successfully.';
        },
        (error: any) => {
          console.error('Error deleting todo item:', error);
          // Check if the error is a parsing error
          if (error instanceof SyntaxError) {
            this.displayMsg = 'Error: Invalid response from the server.';
          } else {
            this.displayMsg = 'Failed to delete todo item.';
          }
        }
      );
    }
  }
  

}

  


  

