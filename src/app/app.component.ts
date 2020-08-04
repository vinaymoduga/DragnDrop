import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CommonService } from '.././Common/common.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taskScheduler';
  showAddSection: boolean = false;
  showAddButton: boolean = false;
  sectionName: string;

  constructor(private _router: Router, private _commonService: CommonService, private _httpClient: HttpClient) {
    this.checkSessionExisted();
    this.getTasksForUser();
  }

  checkSessionExisted(): void {
    this._commonService.userToken = sessionStorage.getItem('userSession');
    if (this._commonService.userToken === null) {
      this._commonService.userToken = uuid();
      sessionStorage.setItem('userSession', this._commonService.userToken);
    }
  }

  getTasksForUser(): void {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Authorization', this._commonService.userToken);

    this._httpClient.get('https://api.taskhero.io', { headers }).subscribe(response => {
      console.log(response);
    })
  }

  redirectTo(menuId: number): void {

    switch (menuId) {
      case 1: this._router.navigate([this._commonService.userToken, 'tasks',]);
        this.showAddButton = true;
        this.showAddSection = false;
        break;
      case 2: this._router.navigate([this._commonService.userToken, 'completedTasks']);
        this.showAddButton = false;
        this.showAddSection = false;
        break;
      case 3: this._router.navigate([this._commonService.userToken, 'deletedTasks']);
        this.showAddButton = false;
        this.showAddSection = false;
        break;
    }
  }

  addSection(): void {
    this.showAddSection = true;
  }

  addNewSectionItem(): void {
    if (this.sectionName && this.sectionName.length > 0) {
      let obj = {
        sectionName: this.sectionName, sectionId: this._commonService.sectionList.length + 1,
        tasks: [],
        isCollapsed: true,
        isDeleted: false
      };
      this._commonService.sectionList.push(obj);
      this.hideSectionItem();
    }
  }

  hideSectionItem(): void {
    this.sectionName = "";
    this.showAddSection = false;

  }
}
