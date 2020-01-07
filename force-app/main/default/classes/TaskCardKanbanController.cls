public class TaskCardKanbanController {
	@AuraEnabled
    public static List<Task> getTasksOfContact(string contactId)
    {
        List<Task> taskOfContact = new List<Task>();
        for(Contact c : [SELECT id,name,Points__c,(select id from tasks ) from contact where id = :contactId])
        {
          	if(c.tasks != null && c.tasks.size() >= 1)
            {
                taskOfContact = c.tasks;
            }
        }
        return taskOfContact;
    }
}