public without sharing class TaskTriggerHandler {
   
    public static void checkOnCompleteTask(List<Task> taskList){
        List<Contact> toUpdate = [Select Id, Name, Points__c,
                                  	(
                                    	Select Id,ActivityDate,CreatedDate ,Task_Type__c,Points__c,IsClosed
                                        FROM Tasks
                                        WHERE Id IN :taskList
                                        AND IsClosed = true
                                    )	
                                  FROM Contact];
        
        for(Contact c : toUpdate)
        {
            if(c.tasks != null)
            {
                double contactPoints = c.Points__c == null ? 0 : c.Points__c;
                
                for(Task task : c.tasks)
                {
                    if(task.IsClosed)
                    {
                        if(task.Task_Type__c == 'TO-DO')
                        {
                            if(task.ActivityDate != null)
                                {
                                   if(task.ActivityDate < Date.today())
                                   {
                                       contactPoints += task.Points__c;
                                   }else if(task.ActivityDate >= Date.today())
                                   {
                                       contactPoints -= task.Points__c / 2;
                                   }
                                }else {
                                    contactPoints += task.Points__c;
                                }                      
                        }else  if(task.Task_Type__c == 'Daily')
                        {
                            if(task.CreatedDate < Date.today())
                            {
                                contactPoints -= task.Points__c;
                            }else{
                                contactPoints += task.Points__c;
                            }
                        }
                    }
                }
                c.Points__c = contactPoints;
            }
        }      
        update toUpdate;
    }
}