import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './components/todo/todo.component';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [
    AppComponent, 
    TodoComponent,
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
