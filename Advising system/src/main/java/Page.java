import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Hashtable;
import java.util.Properties;
import java.util.Vector;
//import com.kkjavatutorials.*;  ------CHANGED

public class Page implements java.io.Serializable {
	// Overriding toString() method of String class
	public Vector<Tuple> tuples = new Vector<Tuple>();
	
	public Page() {
		//this.tuples=null;
		// TODO Auto-generated constructor stub
	}
	public static int extractfromconfig() {
		Properties properties = new Properties();
        try (FileInputStream inputStream = new FileInputStream("DBApp.config")) {
            properties.load(inputStream);
            // Get the value of a specific property
            String maxRowsCount1 = properties.getProperty("MaximumRowsCountinPage");
            int maxRowsCount=Integer.parseInt(maxRowsCount1);
            return maxRowsCount;
        } catch (IOException e) {
            e.printStackTrace();
           
        }
		return 0; 
	}

	
	public boolean pageIsFull(String pageName) {
		Page page=Page.deserialzePage(pageName);
		if(page.tuples.size()<extractfromconfig()) {
			return false;
		}
		else {
			return true;
		}
	}
	
	
	public void insertSortedTuple(String strTableName,String pageName,Tuple newTuple) {
		
		System.out.print("in insertSortedTuple");
		
		Page page=Page.deserialzePage(pageName);
		System.out.print("pageName: "+pageName);
        // Binary search to find the correct index for insertion
        int low = 0;
        int high = page.tuples.size() - 1;
        int insertionIndex = 0;
        String clusteringName= Table.getClusteringKeyName(strTableName);
        
        while (low <= high) {
        	
            int mid = low + (high - low) / 2;
            Tuple midTuple = page.tuples.get(mid);

            // Compare the clustering key of the tuple at mid with the new tuple
            // You need to implement the compare method based on your clustering key's type
            if (DBApp.compare(midTuple.getClusteringKeyValue(clusteringName),newTuple.getClusteringKeyValue(clusteringName))<=0) { // lw equal 3yzeen nfselha w teb2a exc bec no dup clustering key
                insertionIndex = mid + 1;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        System.out.println("insertionIndex: "+insertionIndex+ "in page: "+ pageName);
        // Insert the new tuple at the correct index
        
        page.tuples.add(insertionIndex, newTuple);
        System.out.println("After insertion");
        System.out.println("page size after insertion: "+ page.tuples.size());
     //   System.out.println(page);
        
        Page.serializePage(page, pageName); 
        
       // return page;
    }
	
	public static Tuple getTuple(String strTableName,String pageName, Object clusteringKeyValue) { //used this for update
		
		Page page=Page.deserialzePage(pageName);
        // Binary search to find the correct index for insertion
        int low = 0;
        int high = page.tuples.size() - 1;
        String clusteringName= Table.getClusteringKeyName(strTableName);
        
        while (low <= high) {
        	
            int mid = low + (high - low) / 2;
            Tuple midTuple = page.tuples.get(mid);

            // Compare the clustering key of the tuple at mid with the new tuple
            // You need to implement the compare method based on your clustering key's type
            if (DBApp.compare(midTuple.getClusteringKeyValue(clusteringName),clusteringKeyValue)<0) {
              //  insertionIndex = mid + 1;
                low = mid + 1;
            } else if(DBApp.compare(midTuple.getClusteringKeyValue(clusteringName),clusteringKeyValue)==0) {
                return midTuple;
            }
            else {
            	high = mid - 1;
            }
        }
        return null;
        //System.out.println(insertionIndex);
        // Insert the new tuple at the correct index
     
        //Page.serializePage(page, pageName);
    }
	
    public Tuple getTupleFromPage(String strTableName,String pageName, Object tupleClusteringKey) { //used this for insert since we dont care if equal or will be handled as an exc later
		
		Page page=Page.deserialzePage(pageName);
		Tuple midTuple=null;
        // Binary search to find the correct index for insertion
        int low = 0;
        int high = page.tuples.size() - 1;
        int insertionIndex = 0;
        String clusteringName= Table.getClusteringKeyName(strTableName);
        
        while (low <= high) {
        	
            int mid = low + (high - low) / 2;
            midTuple = page.tuples.get(mid);

            // Compare the clustering key of the tuple at mid with the new tuple
            // You need to implement the compare method based on your clustering key's type
            if (DBApp.compare(midTuple.getClusteringKeyValue(clusteringName),tupleClusteringKey)==0) {
                  return midTuple;
            }
            else if (DBApp.compare(midTuple.getClusteringKeyValue(clusteringName),tupleClusteringKey)<=0) {
                insertionIndex = mid + 1;
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }
        return midTuple;
    }
	
	
    @Override
    public String toString() {
    	String s=""+tuples.get(0);
    	
    	for (int i = 1; i < tuples.size(); i++)
        {
    		s=s+ ","+"\n"+tuples.get(i);
           
        }
        return s;
    }
    
	public static Page  deserialzePage (String strPageName){
		File file = new File(strPageName + ".ser");
		if (!file.exists()) {
		    // Handle the case where the file doesn't exist
		    System.out.println("Page file does not exist.");
		    return null;
		}
		Page page = null;
		try {
		    FileInputStream fileIn = new FileInputStream(strPageName + ".ser");
		    ObjectInputStream in = new ObjectInputStream(fileIn);
		    page = (Page) in.readObject();
		    in.close();
		    fileIn.close();
		} catch (IOException | ClassNotFoundException e) {
		    e.printStackTrace();
		    // Handle exceptions appropriately based on your application's requirements
		}
		return page;
		}
	
	 public static void serializePage(Page page, String strPageName) {
	        try (FileOutputStream fileOut = new FileOutputStream(strPageName + ".ser");
	             ObjectOutputStream objectOut = new ObjectOutputStream(fileOut)) {

	            objectOut.writeObject(page);
	            objectOut.close();
	            fileOut.close();

	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }
    
    

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		/*int x=extractfromconfig();
		System.out.print(x);*/
		Hashtable <String,Object> htblColNameValue = new Hashtable( ); 
    	htblColNameValue.put("id", new Integer( 2343432 )); 
    	htblColNameValue.put("name", new String("Ahmed Noor" ) ); 
    	htblColNameValue.put("gpa", new Double( 0.95 ) ); 
    	
    	Hashtable <String,Object> htblColNameValue2 = new Hashtable( ); 
    	htblColNameValue2.put("id", new Integer( 2343432 )); 
    	htblColNameValue2.put("name", new String("Ahmed Noor" ) ); 
    	htblColNameValue2.put("gpa", new Double( 0.95 ) ); 
    	
    	Tuple t1= new Tuple(htblColNameValue);
    	Tuple t2= new Tuple(htblColNameValue2);
    	Page p= new Page();
    	p.tuples.add(t1);
    	p.tuples.add(t2);
    	System.out.print(p);
	}
	



}
