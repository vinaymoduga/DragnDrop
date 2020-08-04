import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedTasksComponent } from '../CompletedTasks/completedTasks.component';
import { DeletedTasksComponent } from '.././DeletedTasks/deletedTasks.component';
import { TasksComponent } from '.././Tasks/tasks.component';
import { PageNotFoundComponent } from '.././PageNotFound/pageNotFound.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: ':userToken/tasks', component: TasksComponent },
  { path: ':userToken/completedTasks', component: CompletedTasksComponent },
  { path: ':userToken/deletedTasks', component: DeletedTasksComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
