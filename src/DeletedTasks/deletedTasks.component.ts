import { Component } from '@angular/core';

import { CommonService } from '.././Common/common.service';

@Component({
    selector: 'deleted-tasks',
    templateUrl: './deletedTasks.component.html'
})
export class DeletedTasksComponent {


    deletedTaskList = [];
    constructor(public _commonService: CommonService) {
        this.getAllDeletedTasks();
    }

    getAllDeletedTasks(): void {

        this.deletedTaskList = [];
        for (let i = 0; i < this._commonService.sectionList.length; i++) {
            if (!this._commonService.sectionList[i].isDeleted) {
                for (let j = 0; j < this._commonService.sectionList[i].tasks.length; j++) {
                    if (this._commonService.sectionList[i].tasks[j].isDeleted) {
                        this.deletedTaskList.push(this._commonService.sectionList[i].tasks[j]);
                    }
                }
            }
        }
    }


    reassignDeleted(sectionId: number, taskId: number) {

        for (let i = 0; i < this._commonService.sectionList.length; i++) {
            if (this._commonService.sectionList[i].sectionId === sectionId) {
                for (let j = 0; j < this._commonService.sectionList[i].tasks.length; j++) {
                    if (this._commonService.sectionList[i].tasks[j].taskId === taskId) {
                        this._commonService.sectionList[i].tasks[j].isDeleted = false;
                        break;
                    }
                }
            }
        }
        this.getAllDeletedTasks();
    }

}

