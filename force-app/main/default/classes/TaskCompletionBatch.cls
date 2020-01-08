public class TaskCompletionBatch implements Database.Batchable<sObject>{
	
    public Database.QueryLocator start(Database.BatchableContext context)
    {
        String query = 'Select Id, Name, Points__c, ' + 
                                  '(Select Id,ActivityDate,CreatedDate ,Task_Type__c,Points__c,Status,IsClosed FROM Tasks) ' +
                                  'FROM Contact';
        return Database.getQueryLocator(query);
    }
    
    public void execute(Database.BatchableContext context, List<Contact> scope)
    {
        List<Contact> toUpdateContact = new List<Contact>();
        List<Task> toUpdateTask = new List<Task>();
        
        for(Contact c : scope)
        {
        	if(c.tasks != null)
            {
                double contactPoints = c.Points__c == null ? 0 : c.Points__c;
                
                for(Task task : c.tasks)
                {                    
                    switch on task.Task_Type__c
                    {
                     	when 'Daily'
                        {
                            contactPoints -= task.Points__c; 
                            task.Status = 'New';
                        	toUpdateTask.add(task);
                        }
                        when 'Habit'
                        {
                            contactPoints += task.Status == 'Completed' ? task.Points__c : -task.Points__c;                           
                        }
                        when 'TO-DO'
                        {
                            task.Status = 'New';
                        	toUpdateTask.add(task);
                        }
                    }                    
                }   
                c.Points__c = contactPoints;
                toUpdateContact.add(c);
            }
        }
        if(toUpdateContact.size() >= 1)
        {
            update toUpdatecontact;
        }
        if(toUpdateTask.size() >= 1)
        {
            update toUpdateTask;
        }
    }
    public void finish(Database.BatchableContext context)
    {
        
    }
}