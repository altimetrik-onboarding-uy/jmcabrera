({
    validateform : function(component)
    {        
        var myInputs = component.find("taskForm").find({instancesOf : "lightning:input"});
       	
        let i = 0;
        let formIsValid = true;
        
        while(formIsValid && i < myInputs.length)
        {
            if(myInputs[i].get("v.required") && myInputs[i].get("v.value").trim() === "")
            {
                myInputs[i].setCustomValidity("Complete this field now");
                myInputs[i].reportValidity();
                myInputs[i].checkValidity();
                formIsValid = false;
				
            }else {myInputs[i].setCustomValidity("")};
            i++;
        }
        return formIsValid;
    },
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
        var myInputs = component.find("taskForm").find({instancesOf : "lightning:input"});
        for(let i = 0;i < myInputs.length;i++)
        {
            myInputs[i].set("v.value","");
            myInputs[i].setCustomValidity("");
            myInputs[i].reportValidity();
            myInputs[i].checkValidity();
        }
        component.find("difficultyInput").set("v.value","Trivial");
        component.find("descriptionInput").set("v.value","");
        let openNewTaskCard = component.getEvent("openNewTaskCard");
        openNewTaskCard.fire();
    }
})