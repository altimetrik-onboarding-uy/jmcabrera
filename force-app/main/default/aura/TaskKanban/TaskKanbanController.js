({
	doInit : function(component, event, helper) {
        helper.loadContactWithTasks(component).then(result => {
            	component.set("v.contactWithTasks",result);
        }).catch(error => {
        });
	},
	onContactListChangeHandler : function(component,event,helper)
	{
        let cId = component.find("contactSelected").get("v.value");
		helper.loadTaskOfContact(component,cId).then(result => {
            component.set("v.selectedContact",helper.getContactSelectChanged(component,cId));
            helper.parseContactTaskIntoLists(component,result);
        }).catch(error => {
           
        });         
	},
	loadDtaFromContactRecord : function(component, event, helper){      
        helper.loadTaskOfContact(component,component.get("v.targetRecord")["Id"]).then(result => {
            component.set("v.tasksOfContact",result);
            helper.parseContactTaskIntoLists(component,result);
       
        }).catch(error => {
           
        });   
	},
	openNewTaskCardHandler : function(component, event, helper){
        let newTaskCardCmp = component.find("newTaskCardCmp");
        if($A.util.hasClass(newTaskCardCmp,"slds-fade-in-open"))
		{
           	$A.util.removeClass(newTaskCardCmp, 'slds-fade-in-open');
            $A.util.removeClass(newTaskCardCmp.find("backDropDiv"),'slds-backdrop_open');
            component.set("v.typeOfTask","");           
		}else 
        {
            $A.util.addClass(newTaskCardCmp,"slds-fade-in-open");
            $A.util.addClass(newTaskCardCmp.find("backDropDiv"),'slds-backdrop_open');
            component.set("v.typeOfTask",event.getParam("typeOfTask"));          
        }
    },
	newTaskHandler : function(component,event,helper)
	{
		helper.saveNewTask(component,event,component.get("v.targetRecord")["Id"]).then(result => {
				helper.displayToast(component,"success","Success!","Task Created Successfully!");
			}).catch(error => {
				
		});   
	},
	closeTaskHandler : function(component,event,helper)
	{
        helper.closeTask(component,event).then(result => {
            helper.displayToast(component,"success","Success!","Task Completed Successfully!");
        }).catch(error => {
			
		});            
	}
})