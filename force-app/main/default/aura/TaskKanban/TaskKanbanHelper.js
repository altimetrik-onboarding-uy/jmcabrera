({
	loadContactWithTasks : function(component) {
        return new Promise(
            $A.getCallback(
            	(resolve,reject) => {
                	let action = component.get("c.getContacts");
                    action.setCallback(this,(response) => {
                    	let state = response.getState();
                    	if(state === 'SUCCESS')
                        {
                        	resolve(response.getReturnValue());
                    	}else
                        {
                        	let errors = response.getErrors();
            				if(errors)
                            {
                                return reject(new Error(response.getError()));   
                            }
                        }
                	});
 					$A.enqueueAction( action );
            	}
        	)
        );
	},
	loadTaskOfContact : function(component,contactId) {
        return new Promise(
            $A.getCallback(
            	(resolve,reject) => {
                	let action = component.get("c.getTasksOfContact");
                    action.setParams({"contactId":contactId});
                    action.setCallback(this,(response) => {
                    	let state = response.getState();
                    	if(state === 'SUCCESS')
                        {
                        	resolve(response.getReturnValue());
                    	}else
                        {
                        	let errors = response.getErrors();
            				if(errors)
                            {
                                reject(new Error(response.getError()));   
                            }
                        }
                	});
 					$A.enqueueAction( action );
            	}
        	)
        );
    },
	saveNewTask : function(component,event,contactId) {
        return new Promise(
            $A.getCallback(
            	(resolve,reject) => {
                    let taskType = event.getParam("taskType");
                    let taskName = event.getParam("taskName");
                    let taskDescription = event.getParam("taskDescription");
                    let taskDifficulty = event.getParam("taskDifficulty");
                    let taskSubject = event.getParam("taskSubject");
                    let taskDueDate = event.getParam("taskDueDate");
                    
                	let action = component.get("c.createNewTask");
                    action.setParams({
                        "taskType":taskType,
                        "taskName":taskName,
                        "taskDescription":taskDescription,
                        "taskDifficulty":taskDifficulty,
                        "taskSubject":taskSubject,
                        "taskDueDate":taskDueDate,
                    	"contactId":contactId
                         });
            
                    	action.setCallback(this,(response) => {
                            let state = response.getState();
                            if(state === 'SUCCESS')
                            {
                                resolve(response.getReturnValue());
                            }else
                            {
                                let errors = response.getError();
                                if(errors)
                                {
                                    reject(new Error(response.getError()[0].message));   
                                }
                            }
                        });
 					$A.enqueueAction( action );
            	}
        	)
        );
    },
    getContactSelectChanged : function(component,contactId)
	{
        let selectedContact = null;            
       
        let contactArray =  component.get("v.contactWithTasks");
        let flag = false;
        let i = 0;
       
        while(!flag && i < contactArray.length)
        {
            if(contactArray[i].Id === contactId)
            {
                flag = true;
                selectedContact = contactArray[i];
            }
            i++;
        }
        return selectedContact;
	},
	contactSelectChangeHandler : function(component)
	{
        component.set("v.tasksOfContact",null);
            
        let contactId = component.find("contactSelected").get("v.value");
        let contactArray =  component.get("v.contactWithTasks");
        let flag = false;
        let i = 0;
        
        while(!flag && i < contactArray.length)
        {
            if(contactArray[i].Id === contactId)
            {
                flag = true;
                component.set("v.tasksOfContact",contactArray[i]["Tasks"]);
                helper.parseContactTaskIntoLists(component,component.get("v.tasksOfContact"));
            }
            i++;
        }
	},
	parseContactTaskIntoLists : function(component, tasksOfContact)
    {
        component.set("v.toDoTask",[{WhoId:'-1',Task_Type__c:'TO-DO'}]);
        component.set("v.dailyTask",[{WhoId:'-1',Task_Type__c:'Daily'}]);	
        component.set("v.habitTask",[{WhoId:'-1',Task_Type__c:'Habit'}]);
    	if(tasksOfContact !== undefined && tasksOfContact.length >= 1)
        {
            let toDoTask = [];
            let dailyTask = [];
            let habitTask = [];
            for(let i = 0;i < tasksOfContact.length;i++)
            {
         		if(tasksOfContact[i].Task_Type__c == 'TO-DO')
				{
					toDoTask.push(tasksOfContact[i]);
				}else if(tasksOfContact[i].Task_Type__c == 'Daily')
				{
					dailyTask.push(tasksOfContact[i]);
				}else{
					habitTask.push(tasksOfContact[i]);                              
				}
            }
            if(toDoTask.length >= 1)
				component.set("v.toDoTask",toDoTask);
            if(dailyTask.length >= 1)
				component.set("v.dailyTask",dailyTask);
            if(habitTask.length >= 1)
				component.set("v.habitTask",habitTask);
        }
    },
	closeTask : function(component,event)
    {
    	return new Promise(
        	$A.getCallback(
                (resolve,reject) => {
                    let action = component.get("c.completeTask");
                    let taskId = event.getParam("taskId");
                    action.setParams({"taskId":taskId});
       
            		action.setCallback(this,(response) => {
                    	let state = response.getState();
                    	if(state === 'SUCCESS')
                        {
                        	resolve(response.getReturnValue());
                    	}else
                        {
                        	let errors = response.getErrors();
            				if(errors)
                            {
                                reject(new Error(response.getError()));   
                            }
                        }
                	});
 					$A.enqueueAction( action );
                }
            )
        );    
    },
	displayToast : function(component,type,title,message)
    {
    	let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : title,
            message: message,
            duration:' 4000',
            type: type,
            mode: 'dismissible'
        });
        toastEvent.fire(); 
    }
})