({
	newTaskHandler : function(component) {
		let taskType = component.get("v.type");
        let taskName = component.find("taskNameInput").get("v.value");
        let taskDescription = component.find("descriptionInput").get("v.value");
        let taskDifficulty = component.find("difficultyInput").get("v.value");
        let taskSubject = component.find("subjectInput").get("v.value");
        let taskDueDate = null;
        if(taskType === "TO-DO")
        {
            taskDueDate = component.find("dateInput").get("v.value")
        }
        
        let nEvent = component.getEvent("newTaskData");
        nEvent.setParams({
            "taskType":taskType,
            "taskName":taskName,
          	"taskDescription":taskDescription,
            "taskDifficulty":taskDifficulty,
            "taskSubject":taskSubject,
            "taskDueDate":taskDueDate
                         });
        nEvent.fire();
	},
    closeMe : function(component)
    {
        let openNewTaskCard = component.getEvent("openNewTaskCard");
        openNewTaskCard.fire();
    }
})