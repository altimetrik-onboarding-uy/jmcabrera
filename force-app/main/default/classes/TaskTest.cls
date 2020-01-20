@isTest
public class TaskTest {

    @testSetup static void setup()
    {
       TaskTestFactory.createTestUser(TaskTestFactory.USER_PROFILE_SYSTEM_ADMIN,'TestUser','test','t@test.com');
    }
    
    @isTest  static void testKanbanControllerPositive()
    {
        
        List<Contact> testContacts = TaskTestFactory.createNewContacts(1,'test','t@test.com');
        string contactId = testContacts.get(0).Id;
        
        User u = [Select id, ProfileId from user where lastName = 'TestUser'];
        System.runAs(u)
        {
            List<Task> testToDo = TaskTestFactory.createNewTasks(1, contactId, 'ToDo Test', TaskTestFactory.TASK_TYPE_TODO, TaskTestFactory.TASK_DIFFICULTY_EASY, Date.today() + 1);
            List<Task> testDaily = TaskTestFactory.createNewTasks(1, contactId, 'Daily Test', TaskTestFactory.TASK_TYPE_DAILY, TaskTestFactory.TASK_DIFFICULTY_EASY, Date.today() + 1);
            List<Task> testHabit = TaskTestFactory.createNewTasks(1, contactId, 'Habit Test', TaskTestFactory.TASK_TYPE_HABIT, TaskTestFactory.TASK_DIFFICULTY_EASY, Date.today() + 1);
            
            List<Contact> contacts = TaskKanbanController.getContacts();
            List<Task> taskOfContacts = TaskKanbanController.getTasksOfContact(contactId);
            
            TaskKanbanController.completeTask(contactId, testToDo.get(0).Id, TaskTestFactory.TASK_COMPLETION_STATE_WIN);
            TaskKanbanController.completeTask(contactId, testDaily.get(0).Id, TaskTestFactory.TASK_COMPLETION_STATE_WIN);
            TaskKanbanController.completeTask(contactId, testHabit.get(0).Id, TaskTestFactory.TASK_COMPLETION_STATE_WIN);
            
            System.assertEquals('Completed', [Select id,status from task where id = :testToDo.get(0).Id].get(0).status);
            System.assertEquals('Completed', [Select id,status from task where id = :testDaily.get(0).Id].get(0).status);
            System.assertEquals('Completed', [Select id,status from task where id = :testHabit.get(0).Id].get(0).status);
            
            TaskKanbanController.deleteTask(testHabit.get(0).Id);
            System.assertNotEquals(TaskKanbanController.getTasksOfContact(contactId).size(), taskOfContacts.size());
            
            TaskKanbanController.createNewTask(TaskTestFactory.TASK_TYPE_TODO, 'new test task', 'new test task', TaskTestFactory.TASK_DIFFICULTY_EASY, 'new test task', Date.today() + 1, contactId);
            System.assertEquals(taskOfContacts.size(), TaskKanbanController.getTasksOfContact(contactId).size());
        }
    }
     @isTest  static void testTaskCompleteBatchPositive()
     {
         List<Contact> testContacts = TaskTestFactory.createNewContacts(100,'test','t@test.com');
         List<Id> idListForAsserts = new List<Id>{testContacts[0].Id, testContacts[50].Id, testContacts[99].Id};
             
		 for(contact c: [Select id,name,points__c from contact where id in :idListForAsserts])
         {
             System.assertEquals( c.points__c, 0);
         }
         
         TaskTestFactory.createNewTasks(1, testContacts[0].Id, 'ToDo Test', TaskTestFactory.TASK_TYPE_TODO, TaskTestFactory.TASK_DIFFICULTY_TRIVIAL, Date.today() + 1);
         TaskTestFactory.createNewTasks(1, testContacts[0].Id, 'Daily Test', TaskTestFactory.TASK_TYPE_DAILY, TaskTestFactory.TASK_DIFFICULTY_EASY, Date.today() + 1);
         
         TaskTestFactory.createNewTasks(1, testContacts[50].Id, 'ToDo Test', TaskTestFactory.TASK_TYPE_TODO, TaskTestFactory.TASK_DIFFICULTY_TRIVIAL, Date.today() + 1);
         TaskTestFactory.createNewTasks(1, testContacts[50].Id, 'Daily Test', TaskTestFactory.TASK_TYPE_DAILY, TaskTestFactory.TASK_DIFFICULTY_EASY, Date.today() + 1);
         
         TaskTestFactory.createNewTasks(1, testContacts[99].Id, 'ToDo Test', TaskTestFactory.TASK_TYPE_TODO, TaskTestFactory.TASK_DIFFICULTY_TRIVIAL, Date.today() + 1);
         TaskTestFactory.createNewTasks(1, testContacts[99].Id, 'Daily Test', TaskTestFactory.TASK_TYPE_DAILY, TaskTestFactory.TASK_DIFFICULTY_EASY, Date.today() + 1); 
         
         Test.startTest();
         { 
             DataBase.executeBatch(new TaskCompletionBatch(),100);
         }
         Test.stopTest();
         for(contact c: [Select id,name,points__c from contact where id in :idListForAsserts])
         {
             System.assertEquals( c.points__c, -1);
         }
     }
    
    @isTest static void testScheduleBatch()
    {
        Test.startTest();
        {
        	TaskCompletionScheduler.scheduleMe();
        }
       	Test.stopTest();
    }
    @isTest static void testInstallScript()
    {    
        Test.startTest();
        {
           TaskCompletionScheduler taskScheduler = new TaskCompletionScheduler();
           Test.testInstall(taskScheduler, new Version(1,0));
           List<CronTrigger> cronTriggerList = [SELECT Id, CronJobDetail.Id, CronJobDetail.Name, CronJobDetail.JobType FROM CronTrigger];
           System.assertEquals(cronTriggerList.size(), 1, 'Contrigger found'); 
        }
       	Test.stopTest();
    }

}