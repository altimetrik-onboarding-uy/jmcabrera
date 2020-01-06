trigger TaskTrigger on Task (before insert,before update,after insert,after update) {
	
    if(Trigger.isBefore){
        if(Trigger.isInsert){
        	System.debug('isBefore isInsert');
   		}
        if(Trigger.isUpdate){
        	System.debug('isBefore isUpdate');
   		}
    }
    if(Trigger.isAfter){
        if(Trigger.isInsert){
        	System.debug('AFT INSERT');
   		}
        if(Trigger.isUpdate){
            System.debug('aft UPD');
        	TaskTriggerHandler.checkOnCompleteTask(Trigger.new);
   		}
    }
}