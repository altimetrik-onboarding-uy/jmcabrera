trigger TaskTrigger on Task (before insert,before update,after insert,after update) {
	
    if(Trigger.isBefore){
        if(Trigger.isInsert)
        {
        
   		}
        if(Trigger.isUpdate)
        {
        	
   		}
    }
    if(Trigger.isAfter){
        if(Trigger.isInsert)
        {
        
   		}
        if(Trigger.isUpdate)
        {
        	TaskTriggerHandler.checkOnCompleteTask(Trigger.new);
   		}
    }
}