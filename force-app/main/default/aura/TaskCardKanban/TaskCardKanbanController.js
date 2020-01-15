({
	newTask : function(component, event, helper) {
        helper.processNewTask(component,event);
	},
    completeTask : function(component, event, helper)
    {
        helper.processCompleteTask(component,event);
    },
    deleteTask : function(component,event,helper)
    {
        helper.processDeleteTask(component,event);       
    }
})