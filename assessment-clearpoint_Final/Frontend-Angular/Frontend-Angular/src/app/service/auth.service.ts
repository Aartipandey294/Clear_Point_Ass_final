import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseServerUrl = "https://localhost:5001/api/";

  // Method to add a todo item
  // addTodo(todo: any) {
  //   return this.http.post(this.baseServerUrl + "Todo/CreateTodo", todo,
  //     {
  //       headers: new HttpHeaders({
  //         "Content-Type": "application/json"
  //       })
  //     });
  // }

  addTodo(todo: any): Observable<any> {
    return this.http.post<any>(this.baseServerUrl + "Todo/CreateTodo", todo,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        responseType: 'text' as 'json' // Set responseType explicitly to 'text' as 'json'
      }).pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  
  updateTodoItem(todo: any): Observable<any> {
    return this.http.put(this.baseServerUrl + `Todo/MarkTodoItemAsCompleted/${todo.id}`, todo, this.getHttpOptions())
      .pipe(
        catchError(error => {
          console.error('Error marking todo item as completed:', error);
          return throwError('Failed to mark todo item as completed.');
        })
      );
  }
 
  deleteTodoItem(todoId: number): Observable<any> {
    return this.http.delete(this.baseServerUrl + `Todo/DeleteTodoItem/${todoId}`, this.getHttpOptions())
      .pipe(
        catchError(error => {
          let errorMessage = 'An error occurred while deleting the todo item.';
          if (error.error && error.error.error) {
            errorMessage = error.error.error;
          }
          return throwError(errorMessage);
        })
      );
  }
  

  // Method to retrieve the todo list
  getTodoList() {
    return this.http.get(this.baseServerUrl + "Todo/ListTodo",
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
  }

}
