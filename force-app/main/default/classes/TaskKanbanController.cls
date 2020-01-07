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
    public static List<Contact> getContacts()
    {
        List<Contact> contactWithTasks = new List<Contact>();
        for(Contact c : [SELECT id,name,Points__c,(Select Id,Subject,Task_Name__c,Description__c,ActivityDate,CreatedDate ,Task_Type__c,Points__c,Status,WhoId,IsClosed FROM Tasks) from contact])
        {
          	if(c.tasks != null && c.tasks.size() >= 1)
            {
                contactWithTasks.add(c);
            }
        }
        return contactWithTasks;
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
    public static void completeTask(string taskId)
    {
        List<Task> tasks = new List<Task>();
        for(Task t : [SELECT id,status from Task where id = :taskId])
        {
            t.Status = 'Completed';
            tasks.add(t);
        }
        if(tasks.size() >= 1)
        {
            update tasks;
        }
    }
}