({
    doInit : function(component,event,helper)
    {
        if(component.get("v.recordId")===undefined)
        {
            helper.loadContactWithTasks(component).then(result => {
                component.set("v.contactWithTasks",result);
            }).catch(error => {
            });
		}
    },
	onContactFromRDLoaded : function(component,event,helper)
	{
        let targetContact = event.getParam("targetContact");
        if(targetContact !== undefined
        &&targetContact !== null)
        {
            if(targetContact.Id !== "-1")
            {
                component.set("v.selectedContact",targetContact);
                helper.loadTaskOfContact(component,component.get("v.selectedContact")["Id"]).then(result => {
                    component.set("v.tasksOfContact",result);
                    helper.parseContactTaskIntoLists(component,result);
                    
                }).catch(error => {
                    helper.displayToast(component,"error","error!",error);
                });  
            }
        }
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
	openNewTaskCardHandler : function(component, event, helper){
        
        let cId = component.find("contactSelected");
        
        if(component.get("v.recordId") !== undefined || (cId !== undefined  && cId.get("v.value") !== "-1" ))
        {
            helper.handleNewTaskModalOpenClose(component,event);
        }else 
        {
             helper.displayToast(component,"error","Alert!","Please select a contact to continue");
        }
    },
	newTaskHandler : function(component,event,helper)
	{
		helper.saveNewTask(component,event,component.get("v.selectedContact")["Id"]).then(result => {
                helper.displayToast(component,"success","Success!","Task Created Successfully!");
                
            	helper.loadTaskOfContact(component,component.get("v.selectedContact")["Id"]).then(result => {
                component.set("v.tasksOfContact",result);
                helper.parseContactTaskIntoLists(component,result);
                
            }).catch(error => {
                helper.displayToast(component,"error","error!",error);
            }); 

        }).catch(error => {
            helper.displayToast(component,"error","error!",error);
		});   
	},
	closeTaskHandler : function(component,event,helper)
	{
        helper.closeTask(component,event).then(result => {
           		helper.displayToast(component,"success","Success!","Task Completed Successfully!");
                
            helper.loadTaskOfContact(component,component.get("v.selectedContact")["Id"]).then(result => {
                component.set("v.tasksOfContact",result);
                helper.parseContactTaskIntoLists(component,result);
                
            }).catch(error => {
                helper.displayToast(component,"error","error!",error);
            }); 

        }).catch(error => {
			
		});            
	},
	deleteTaskHandler  : function(component,event,helper)
	{
        helper.deleteTaskHandler(component,event).then(result => {
            helper.displayToast(component,"success","Success!","Task Deleted Successfully!");
            helper.loadTaskOfContact(component,component.get("v.selectedContact")["Id"]).then(result => {
                    component.set("v.tasksOfContact",result);
                    helper.parseContactTaskIntoLists(component,result);
                    
                }).catch(error => {
                    helper.displayToast(component,"error","error!",error);
                }); 

        }).catch(error => {
            helper.displayToast(component,"error","Error!","Task Coudl not be Deleted!");
        });
	}
})