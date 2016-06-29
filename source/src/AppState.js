import { observable, computed } from 'mobx';
var jQuery = require("jquery");
var moment = require("moment");

class AppState {

	constructor() {
		this.fetchData();
	}

	@observable tasks = [];
	@observable status = "";

	fetchData(){
		this.status = "LOADING";
		jQuery.get("https://sm-prod2.any.do/me/tasks?responseType=flat&includeDeleted=false&includeDone=false",(data) => {
			console.log(data);
			this.status = "";
			this.tasks = data;
		}).fail(() => {
			this.status = "UNAUTHORIZED";
			//this.tasks = [{"titleUpdateTime": 1466884541380, "status": "CHECKED", "alertUpdateTime": 1466797988157, "subTasks": [], "statusUpdateTime": 1466797988155, "categoryIdUpdateTime": 1466797988145, "participants": [], "layerConversationId": null, "title": "Make first version of MobX AnyDo New Tab", "categoryId": "INEAnBIFfLjF7fy485ZHBRci", "sharedMembers": null, "creationDate": 1466797988000, "globalTaskId": "n_yPH9DgE_v99qejbDJaLQ==", "longitude": null, "assignedToUpdateTime": null, "shared": false, "dueDate": 1466800200000, "id": "n_yPH9DgE_v99qejbDJaLQ==", "alert": {"repeatEndsAfterOccurrences": -1, "repeatDays": "0000000", "type": "NONE", "offset": 0, "repeatInterval": 1, "repeatEndType": "REPEAT_END_NEVER", "repeatMonthType": "ON_DATE", "repeatEndsOn": null, "customTime": 0, "repeatStartsOn": null, "repeatNextOccurrence": null}, "noteUpdateTime": null, "lastUpdateDate": 1466884541000, "note": null, "evernoteNotes": [], "dueDateUpdateTime": 1466797988154, "assignedTo": "sriramancse@gmail.com", "latitude": null, "priorityUpdateTime": 1466797988154, "repeatingMethod": "TASK_REPEAT_OFF", "priority": "Normal", "parentGlobalTaskId": null}, {"titleUpdateTime": 1466884534694, "status": "UNCHECKED", "alertUpdateTime": 1466884534696, "subTasks": [], "statusUpdateTime": 1466884534694, "categoryIdUpdateTime": 1466884534684, "participants": [], "layerConversationId": null, "title": "Release next version of RN Shared Preferences", "categoryId": "INEAnBIFfLjF7fy485ZHBRci", "sharedMembers": null, "creationDate": 1466884535000, "globalTaskId": "Rb3XOD_jnktExz_vWotomA==", "longitude": null, "assignedToUpdateTime": null, "shared": false, "dueDate": 1466886600000, "id": "Rb3XOD_jnktExz_vWotomA==", "alert": {"repeatEndsAfterOccurrences": -1, "repeatDays": "0000000", "type": "NONE", "offset": 0, "repeatInterval": 1, "repeatEndType": "REPEAT_END_NEVER", "repeatMonthType": "ON_DATE", "repeatEndsOn": null, "customTime": 0, "repeatStartsOn": null, "repeatNextOccurrence": null}, "noteUpdateTime": null, "lastUpdateDate": 1466911085000, "note": null, "evernoteNotes": [], "dueDateUpdateTime": 1466884534694, "assignedTo": "sriramancse@gmail.com", "latitude": null, "priorityUpdateTime": 1466884534694, "repeatingMethod": "TASK_REPEAT_OFF", "priority": "Normal", "parentGlobalTaskId": null}]
		});
	}


	@observable heading = "Todays Task"

	@computed get getTodaysTasks() {
		let startTime = moment().clone().startOf('day').format("x")
		let endTime = moment().clone().endOf('day').format("x")
		return this.tasks.filter((task, index)=>{
			if(task.dueDate < endTime){ // Filter tasks which are ending before tonight
				return task;
			}
		}).sort(function(a, b) {
			if (a.status > b.status) {
				return -1;
			}
			if (a.status < b.status) {
				return 1;
			}

			// names must be equal
			return 0;
		})
	}
}

export default AppState;
