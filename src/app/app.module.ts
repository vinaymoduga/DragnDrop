import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { CompletedTasksComponent } from '../CompletedTasks/completedTasks.component';
import { DeletedTasksComponent } from '.././DeletedTasks/deletedTasks.component';
import { TasksComponent } from '.././Tasks/tasks.component';
import { PageNotFoundComponent } from '.././PageNotFound/pageNotFound.component';

import { CommonService } from '.././Common/common.service';
@NgModule({
  declarations: [
    AppComponent, CompletedTasksComponent, DeletedTasksComponent, TasksComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule, DragDropModule, HttpClientModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
