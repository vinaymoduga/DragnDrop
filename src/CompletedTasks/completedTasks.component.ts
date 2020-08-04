import { Component } from '@angular/core';

import { CommonService } from '.././Common/common.service';

@Component({
    selector: 'completed-tasks',
    templateUrl: './completedTasks.component.html'
})
export class CompletedTasksComponent {

    completedTaskList = [];
    constructor(public _commonService: CommonService) {
        this.getAllCompletedTasks();
    }

    getAllCompletedTasks(): void {
        this.completedTaskList = [];

        for (let i = 0; i < this._commonService.sectionList.length; i++) {
            if (!this._commonService.sectionList[i].isDeleted) {
                for (let j = 0; j < this._commonService.sectionList[i].tasks.length; j++) {
                    if (this._commonService.sectionList[i].tasks[j].isCompleted) {
                        this.completedTaskList.push(this._commonService.sectionList[i].tasks[j]);
                    }
                }
            }
        }
    }

    reasssignCompleted(sectionId: number, taskId: number) {

        for (let i = 0; i < this._commonService.sectionList.length; i++) {
            if (this._commonService.sectionList[i].sectionId === sectionId) {
                for (let j = 0; j < this._commonService.sectionList[i].tasks.length; j++) {
                    if (this._commonService.sectionList[i].tasks[j].taskId === taskId) {
                        this._commonService.sectionList[i].tasks[j].isCompleted = false;
                        break;
                    }
                }
            }
        }
        this.getAllCompletedTasks();
    }

}

