public class EmailUtils {
	
    public static String SysAdminEmail = 'jcabreram24@gmail.com';
    public static String SysAdminEmailName = 'J C';
    
    public static String INCOMPLETE_DAILY_TASK_SUBJECT = 'You Have Incomplete Daily Tasks';
    
    public static void sendEmail(List<Messaging.SingleEmailMessage> scope)
    {
         Messaging.sendEmail(scope);
    }
    
    public static string getBodyForIncompleteTask(string firstName,List<String> taskNameList)
    {
        String body = 'Dear ' + firstName + ', ';
        body += 'we have noticed you have ' + taskNameList.size() + ' unfinished daily tasks. \n' ;
        
        body += 'Heres a list of all your remaining daily task : \n';
        for(string s : taskNameList)
        {
            body += s + '\n';
        }
        
        body += '\n Please consider finishing them';
        
        return body;
    }
}