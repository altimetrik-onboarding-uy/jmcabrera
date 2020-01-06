public class TaskCompletionScheduler implements Schedulable{
    
    public static String scheduleMe()
    {
        String sDate ='0 59 23 * * ? *'; //'0 59 23 * * ? *';
        String jobName = 'Task Completion Scheduler';
        TaskCompletionScheduler ts = new TaskCompletionScheduler();
        
        return system.schedule(jobName,sDate,ts);
    }
	public void execute(System.SchedulableContext context)
    {
        Database.executeBatch(new TaskCompletionBatch(), 200);
    }
}