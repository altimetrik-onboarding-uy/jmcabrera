({
	closeMe : function(component, event, helper) {
        helper.closeMe(component);
	},
    openNewTaskCardHandler : function(component, event,helper)
    {
    	let eTypOfTask = event.getParam("typeOfTask");
        if(eTypeOfTask)
        {
            component.set("v.type",eTypeOfTask);
        }
	},
    saveNewTaskHandler : function(component, event,helper)
    {
        if(helper.validateform(component))
        {
             helper.newTaskHandler(component);
       		 helper.closeMe(component);
        }
       
    }
})