({
	newTask : function(component, event, helper) {
		let openNewTaskModal = component.getEvent("openNewTaskCard");
        openNewTaskModal.setParam("typeOfTask",event.getSource().get("v.name"));
        openNewTaskModal.fire();
	},
    completeTask : function(component, event, helper)
    {
        let closeTask = component.getEvent("closeTask");
        let eventSourceName = event.getSource().get("v.name");
        let parsedName = eventSourceName.split("-");
        closeTask.setParam("state",parsedName[0]);
        closeTask.setParam("taskId",parsedName[1]);
        closeTask.fire();
    },
    deleteTask : function(component,event,helper)
    {
        let deleteTask = component.getEvent("deleteTask");
        deleteTask.setParam("taskId",event.getSource().get("v.name"));
        deleteTask.fire();
    }
})