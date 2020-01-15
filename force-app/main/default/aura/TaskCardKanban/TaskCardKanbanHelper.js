({
	processNewTask : function(component,event) {
		let openNewTaskModal = component.getEvent("openNewTaskCard");
        openNewTaskModal.setParam("typeOfTask",event.getSource().get("v.name"));
        openNewTaskModal.fire();
	},
    processCompleteTask : function(component,event)
    {
        let closeTask = component.getEvent("closeTask");
        let eventSourceName = event.getSource().get("v.name");
        let parsedName = eventSourceName.split("-");
        closeTask.setParam("state",parsedName[0]);
        closeTask.setParam("taskId",parsedName[1]);
        closeTask.fire();
    },
    processDeleteTask : function(component,event)
    {
        let deleteTask = component.getEvent("deleteTask");
        deleteTask.setParam("taskId",event.getSource().get("v.name"));
        deleteTask.fire();
    }
})