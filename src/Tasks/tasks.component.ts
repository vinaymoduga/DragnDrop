import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { CommonService } from '.././Common/common.service';

@Component({
    selector: 'tasks',
    templateUrl: './tasks.component.html'
})
export class TasksComponent {

    constructor(public _commonService: CommonService) {

        this.loadTasks();
    }

    loadTasks(): void {
        for (let i = 0; i < this._commonService.sectionList.length; i++) {
            this._commonService.sectionList[i].isCollapsed = true;
        }
    }


    taskCompleted(sectionId: number, taskId: number): void {

        for (let i = 0; i < this._commonService.sectionList.length; i++) {
            if (this._commonService.sectionList[i].sectionId === sectionId) {

                for (let j = 0; j < this._commonService.sectionList[i].tasks.length; j++) {
                    if (this._commonService.sectionList[i].tasks[j].taskId === taskId) {
                        this._commonService.sectionList[i].tasks[j].isCompleted = !this._commonService.sectionList[i].tasks[j].isCompleted;
                        break;
                    }

                }
            }
        }
    }

    taskDeleted(sectionId: number, taskId: number): void {

        for (let i = 0; i < this._commonService.sectionList.length; i++) {
            if (this._commonService.sectionList[i].sectionId === sectionId) {

                for (let j = 0; j < this._commonService.sectionList[i].tasks.length; j++) {
                    if (this._commonService.sectionList[i].tasks[j].taskId === taskId) {
                        this._commonService.sectionList[i].tasks[j].isDeleted = !this._commonService.sectionList[i].tasks[j].isDeleted;
                        break;
                    }

                }
            }
        }
    }


    deleteSection(sectionId: number): void {

        for (let i = 0; i < this._commonService.sectionList.length; i++) {
            if (this._commonService.sectionList[i].sectionId === sectionId) {
                this._commonService.sectionList[i].isDeleted = !this._commonService.sectionList[i].isDeleted;
                this._commonService.sectionList[i].isCollapsed = !this._commonService.sectionList[i].isCollapsed;
                break;
            }
        }


        for (let i = 0; i < this._commonService.sectionList.length; i++) {
            if (this._commonService.sectionList[i].sectionId === sectionId) {

                for (let j = 0; j < this._commonService.sectionList[i].tasks.length; j++) {
                    this._commonService.sectionList[i].tasks[j].isDeleted = true;
                }
            }
        }
    }

    expandSection(sectionId: number): void {

        for (let i = 0; i < this._commonService.sectionList.length; i++) {
            if (this._commonService.sectionList[i].sectionId === sectionId)
                this._commonService.sectionList[i].isCollapsed = !this._commonService.sectionList[i].isCollapsed;
            else {
                // this._commonService.sectionList[i].isCollapsed = true;
            }
        }
    }

    clearTaskItem(sectionId: any): void {

        for (let i = 0; i < this._commonService.sectionList.length; i++) {
            if (this._commonService.sectionList[i].sectionId === sectionId) {
                this._commonService.sectionList[i].newTaskName = "";
            }
        }
    }

    addNewTaskItem(sectionId: number, newTaskName: string): void {
        if (newTaskName.length > 0) {

            let obj = {
                taskName: newTaskName, taskId: this.getSectionTasksLength(sectionId) + 1,
                sectionId: sectionId, isCompleted: false, isDeleted: false
            };

            for (let i = 0; i < this._commonService.sectionList.length; i++) {
                if (this._commonService.sectionList[i].sectionId === sectionId) {
                    this._commonService.sectionList[i].tasks.push(obj);
                }
            }

            this.clearTaskItem(sectionId);
        }
    }

    getSectionTasksLength(sectionId: number): number {

        for (let i = 0; i < this._commonService.sectionList.length; i++) {
            if (this._commonService.sectionList[i].sectionId === sectionId) {
                return this._commonService.sectionList[i].tasks.length;
            }
        }

    }



    drop(event: CdkDragDrop<string[]>, sectionId: number) {
        if (event.previousContainer === event.container) {

            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

        } else {

            transferArrayItem(event.previousContainer.data, event.container.data,
                event.previousIndex, event.currentIndex)

            for (let i = 0; i < this._commonService.sectionList.length; i++) {

                if (this._commonService.sectionList[i].sectionId === sectionId) {

                    for (let j = 0; j < this._commonService.sectionList[i].tasks.length; j++) {

                        if (this._commonService.sectionList[i].tasks[j].sectionId != sectionId) {

                            this._commonService.sectionList[i].tasks[j].sectionId = sectionId;
                            this._commonService.sectionList[i].tasks[j].taskId = this._commonService.sectionList[i].tasks.length;
                            break;
                        }
                    }
                }
            }

        }
    }

}

