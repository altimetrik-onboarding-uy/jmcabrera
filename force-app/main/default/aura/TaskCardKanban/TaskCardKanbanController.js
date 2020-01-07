({
	newTask : function(component, event, helper) {
		let openNewTaskModal = component.getEvent("openNewTaskCard");
        openNewTaskModal.setParam("typeOfTask",event.getSource().get("v.name"));
        openNewTaskModal.fire();
	},
    completeTask : function(component, event, helper)
    {
        console.log("Complete task : " + event.getSource().get("v.name"));
        let closeTask = component.getEvent("closeTask");
        closeTask.setParam("taskId",event.getSource().get("v.name"));
        closeTask.fire();
    }
})