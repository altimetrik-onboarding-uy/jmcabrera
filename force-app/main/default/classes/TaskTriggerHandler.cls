public without sharing class TaskTriggerHandler {
   
    public static void checkOnCompleteTask(List<Task> taskList){
        List<Contact> selectedContacts = [Select Id, Name, Points__c,
                                        (
                                            Select Id,ActivityDate,CreatedDate ,Task_Type__c,Points__c,IsClosed
                                            FROM Tasks
                                            WHERE Id IN :taskList
                                            AND IsClosed = true
                                        )	
                                      	FROM Contact];
        
		List<Contact> toUpdate = new List<Contact>();
        
        for(Contact c : selectedContacts)
        {
            if(c.tasks != null)
            {
                double contactPoints = c.Points__c == null ? 0 : c.Points__c;
                
                for(Task task : c.tasks)
                {
                    contactPoints += processTaskPoints(task);
                }
                c.Points__c = contactPoints;
                toUpdate.add(c);
            }
        }      
        if(toUpdate.size() >= 1)
        {
             update toUpdate;
        }
    }
    private static Double processTaskPoints(Task task)
    {
        Double result = 0;
        Date currentDate = Date.today();
        if(task.Task_Type__c == 'TO-DO' && task.ActivityDate != null)
        {
             result = task.ActivityDate < currentDate ?  task.Points__c :  -(task.Points__c / 2);                     
        }else  if(task.Task_Type__c == 'Daily')
        {
            result = task.CreatedDate < currentDate ? -task.Points__c : task.Points__c;                        
        }
        return result;
    }
}