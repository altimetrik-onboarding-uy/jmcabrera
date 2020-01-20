public class TaskTestFactory {
    
    public static string TASK_TYPE_DAILY = 'Daily';
    public static string TASK_TYPE_HABIT = 'Habit';
    public static string TASK_TYPE_TODO = 'TO-DO';
    
    public static string TASK_DIFFICULTY_TRIVIAL = 'Trivial';
    public static string TASK_DIFFICULTY_EASY = 'Easy';
    public static string TASK_DIFFICULTY_MEDIUM = 'Medium';
    public static string TASK_DIFFICULTY_HARD = 'Hard';
    
    public static string USER_PROFILE_STANDARD = 'Standard User';
    public static string USER_PROFILE_SYSTEM_ADMIN = 'System Administrator';
    
    public static string TASK_COMPLETION_STATE_WIN = 'w';
    public static string TASK_COMPLETION_STATE_FAIL = 'f';
    
    public static User createTestUser(string profileName,string lastName,string alias,string email)
    {
        Profile p = [SELECT Id FROM Profile WHERE Name= :profileName]; 
        User u = new User(
            ProfileId = p.Id,
            LastName  = lastName,
            CompanyName = 'TEST',
     		Title = 'title',
            Alias = alias,
            Email = email,
            Username = email + System.currentTimeMillis(),
            TimeZoneSidKey = 'America/Los_Angeles',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US'            
        );
        insert u;
        
        return u;
    }
	public static List<Contact> createNewContacts(integer amt,string name,string email)
    {
        List<Contact> result = new List<Contact>();
        
        for(integer i = 0;i < amt;i++)
        {
            result.add(new Contact(FirstName = name,LastName = name,Email = email,Points__c = 0));
        }
        
        if(result.size() >= 1)
        {
            insert result;
        }
        return result;
    }
    public static List<Task> createNewTasks(integer amt,string contactId,string taskName,string taskType,string taskDifficulty,Date dueDate)
    {
        List<Task> result = new List<Task>();
        
        for(integer i = 0;i < amt;i++)
        {
            Task t = new Task();
            
            t.OwnerId = UserInfo.getUserId();
            t.Status = 'New';
            t.Type = 'Other';
                  
            t.Task_Type__c = taskType;
            t.Task_Name__c = taskName + String.valueOf(i);
            t.Description__c = '';
            t.Difficulty__c = taskDifficulty;
            t.Subject = 'New Task' + i;
            t.ActivityDate = dueDate;
            t.WhoId = contactId; 
            
            result.add(t);
        }
        if(result.size() >= 1)
        {
            insert result;
        }
        return result;
    }
}