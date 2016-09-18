import java.util.*;
import java.io.*;

public class FileRead {
    public static void main(String[] args) throws IOException {
        
        int i;   
              
        FileReader fr = new FileReader("Training_Data.csv");  
        BufferedReader bf = new BufferedReader(fr);

        String read_line ;           
        String container[] ; //store split
        ArrayList kind = new ArrayList() ; // list kinds of data 
        List<Set> li = new ArrayList<>() ; 
         
        read_line = bf.readLine();
        container = read_line.split(",");

        for (i = 0; i < container.length; i++)
           kind.add(container[i]);
                
        for (i = 0; i < container.length; i++)
           li.add(new HashSet()); 
        
        
        while ((read_line = bf.readLine()) != null) { 
            container = read_line.split(",");      
            for (i = 0; i < container.length; i++)
                li.get(i).add(container[i]);
        }
        
       
        System.out.println("How many kinds of value in data :") ;       
        for (i = 0; i < container.length; i++)
            System.out.println(kind.get(i) + " = " + li.get(i).size() );
                
       fr.close(); // file close
    }
    
}