import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;


public class blog {

    public static void main(String[] args) throws IOException
    {
        FileReader fr = new FileReader("Training_Data.csv"); 
        BufferedReader br = new BufferedReader(fr);

        String line,tempstring;
        String[] tempArray= new String[12];
        ArrayList myList = new ArrayList();
        int i=0;
        while((line = br.readLine())!=null)
        {
           
             tempstring = line; 
             
          
             tempArray = tempstring.split(",");
             
             
              for(i=0;i< tempArray.length;i++)
              {          
                  myList.add(tempArray[i]);
              }
        }
       
        int k = myList.size()/12;
        int count=0;
        String[][] trans_array = new String[k][12];
        
        for(int x=0;x<myList.size()/12;x++)
        {
            for(int y=0;y<12;y++)
            {
                trans_array[x][y]=(String) myList.get(count);
                count++; 
            }
        }
       
       System.out.println(trans_array[1][3]) ;
       
        
    }
}