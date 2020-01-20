public class TaskCompletionBatch implements Database.Batchable<sObject>{
	
    public Database.QueryLocator start(Database.BatchableContext context)
    {
        String dailyType = 'Daily';
        String toDoType = 'TO-DO';
        String query = 'Select Id, Name, Points__c,FirstName,Email, ' + 
							'(Select Id,ActivityDate,CreatedDate ,Task_Type__c,Points__c,Status,IsClosed FROM Tasks ' +
							'WHERE Task_Type__c = :dailyType OR Task_Type__c = :toDoType ) '+
						'FROM Contact';
        return Database.getQueryLocator(query);
    }
    
    public void execute(Database.BatchableContext context, List<Contact> scope)
    {
        List<Contact> contactsToUpdate = new List<Contact>();
        List<Task> taskToUpdate = new List<Task>();

		List<Messaging.SingleEmailMessage> taskRemainingEmails = new List<Messaging.SingleEmailMessage>();        
        List<String> sendTo = new List<String>();
        
        for(Contact c : scope)
        {
        	if(c.tasks != null)
            {
                double contactPoints = c.Points__c == null ? 0 : c.Points__c;

				List<Id> incompleteDailyTask = new List<Id>();
                for(Task task : c.tasks)
                {      
                    if(task.Task_Type__c == 'Daily')
                    {
                        contactPoints -= task.Points__c; 
                    }
                    
                    incompleteDailyTask.add(task.Id);
                    
                    task.Status = 'New';
					taskToUpdate.add(task);                                   
                }   
                c.Points__c = contactPoints;
                contactsToUpdate.add(c);
                if(incompleteDailyTask.size() >= 1 && (c.Email != null && c.FirstName != null))
                {
                    String rex = '([a-zA-Z0-9_\\-\\.]+)@((\\[a-z]{1,3}\\.[a-z]{1,3}\\.[a-z]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})';
                    if(Pattern.matches(rex, c.Email))
                    {
                        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                  
                        email.setToAddresses(new List<String>{c.Email});
                        email.setReplyTo(EmailUtils.SysAdminEmail);
                        email.setSenderDisplayName(EmailUtils.SysAdminEmailName);
                        
                        email.setSubject(EmailUtils.INCOMPLETE_DAILY_TASK_SUBJECT);
                        String body = EmailUtils.getBodyForIncompleteTask(c.FirstName,incompleteDailyTask);
                        email.setHtmlBody(body);
        
                        taskRemainingEmails.add(email);
                    }
                }
            }
        }
      
        if(taskRemainingEmails.size() >= 1)
        {
            EmailUtils.sendEmail(taskRemainingEmails);
        }
        
        if(contactsToUpdate.size() >= 1)
        {
            update contactsToUpdate;
        }
        if(taskToUpdate.size() >= 1)
        {
            update taskToUpdate;
        }
    }
    public void finish(Database.BatchableContext context)
    {
        
    }
}