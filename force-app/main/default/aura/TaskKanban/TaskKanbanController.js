({
    doInit : function(component,event,helper)
    {
        helper.processInit(component);
    },
	onContactFromRDLoaded : function(component,event,helper)
	{
        helper.processOnContactFromRDLoaded(component,event);
	},
	onContactListChangeHandler : function(component,event,helper)
	{
        helper.processContactListChangeHandler(component);              
	},
	openNewTaskCardHandler : function(component, event, helper){
        
        helper.processOpenNewTaskCardHandler(component, event);
    },
	newTaskHandler : function(component,event,helper)
	{
        helper.processNewTaskHandler(component,event);
	},
	closeTaskHandler : function(component,event,helper)
	{
        helper.processCloseTaskHandler(component,event);
	},
	deleteTaskHandler  : function(component,event,helper)
	{
        helper.processDeleteTaskHandler(component,event);
	}
})