public without sharing class TaskKanbanController {
	
    @AuraEnabled
    public static void createNewTask(String taskType,String taskName,String taskDescription,
                                     String taskDifficult,String taskSubject,Date taskDueDate, String contactId)
    {   
        Task t = new Task();
     
        t = new Task(); 
     
        t.OwnerId = UserInfo.getUserId();
        t.Status = 'New';
        t.Type = 'Other';
              
        t.Task_Type__c = taskType;
        t.Task_Name__c = taskName;
        t.Description__c = taskDescription;
        t.Difficulty__c = taskDifficult;
        t.Subject = taskSubject;
        t.ActivityDate = taskDueDate;
        t.WhoId = contactId; 
        
        insert t;
    }
    @AuraEnabled
    public static void deleteTask(String taskId)
    {
		Task task = [Select id FROM task where id = :taskId];
        delete task;
    }
    @AuraEnabled
    public static List<Contact> getContacts()
    {
        return [SELECT id,name,Points__c,
                	(Select Id,Subject,Task_Name__c,Description__c,ActivityDate,CreatedDate ,Task_Type__c,Points__c,Status,WhoId,IsClosed 
                     FROM Tasks)
                from contact];
    }
     @AuraEnabled
    public static List<Task> getTasksOfContact(string contactId)
    {
        List<Task> taskOfContacts = new List<Task>();
        for(Contact c : [SELECT id,name,Points__c,
                         (Select Id,Description,ActivityDate,CreatedDate ,Task_Type__c,Points__c,Description__c,Status,Subject,Task_Name__c,IsClosed FROM Tasks ORDER BY CreatedDate)
                         from contact where id = :contactId])
        {
          	if(c.tasks != null && c.tasks.size() >= 1)
            {
                taskOfContacts = c.tasks;
            }
        }
        return taskOfContacts;
    }
    @AuraEnabled
    public static void completeTask(string contactId,string taskId,string state)
    {
        List<string> tasksID = new List<string>{taskId};
        List<Task> tasksToUpdate = new List<Task>();
        List<Contact> contactsToUpdate = new List<Contact>();
      /*  for(Task t : [SELECT id,status from Task where id = :taskId])
        {
            t.Status = 'Completed';
            tasksToUpdate.add(t);
        }
        if(tasksToUpdate.size() >= 1)
        {
            update tasksToUpdate;
        }*/
        
        for(Contact c : [SELECT id,name,Points__c,
                	(Select Id,Subject,Task_Name__c,Description__c,ActivityDate,CreatedDate ,Task_Type__c,Points__c,Status,WhoId,IsClosed 
                     FROM Tasks where id in :tasksID)
                from contact where id = :contactId])
        {
            if(c.tasks != null && c.tasks.size() >= 1)
            {
               double contactPoints = c.Points__c == null ? 0 : c.Points__c;
                
                for(Task t : c.tasks)
                {
                    if(t.Status == 'Completed') continue;
                    	
                    t.Status = 'Completed';
                    if(state == 'w')
                    {
                        contactPoints += t.Points__c;
                    }else 
                    {
                        contactPoints -= t.Points__c;
                    }
                    tasksToUpdate.add(t);
                }
                c.Points__c = contactPoints;
                contactsToUpdate.add(c);
            }
        }
        if(tasksToUpdate.size() >= 1)
        {
            update tasksToUpdate;
        }
        if(contactsToUpdate.size() >= 1)
        {
            update contactsToUpdate;
        }
    }
}