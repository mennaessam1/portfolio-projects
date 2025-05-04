import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Collection;
import java.util.Enumeration;
import java.util.Hashtable;

public class Tuple implements java.io.Serializable  {
    
	private static final long serialVersionUID = 270370920618651581L;
	public Hashtable<String, Object> ht;
	
	


    public Tuple(Hashtable<String,Object> x) {
        ht = x;
   
    }
    public 	Object getcolvalue(String colName) {
    	 Enumeration<String> e = ht.keys(); // Initialize Enumeration locally
         while (e.hasMoreElements()) {
             String key = e.nextElement();
             if (key.equals(colName)) { // Use equals method for string comparison
                 return ht.get(key);
             }
         }
         return null;
    }

    public Object getClusteringKeyValue(String clusteringName) {
        Enumeration<String> e = ht.keys(); // Initialize Enumeration locally
        while (e.hasMoreElements()) {
            String key = e.nextElement();
            if (key.equals(clusteringName)) { // Use equals method for string comparison
                return ht.get(key);
            }
        }
        return null; // Return null if key is not found
    }
    
   /* entry.getKey().equals("banana")) {
        entry.setValue(25);*/
    
    
    public void UpdateTuple(Hashtable<String, Object> htblColNameValue, Page page, String Pagename, String tablename) {
    	Table tbl=Table.deserialzeTbl(tablename);
        Page.deserialzePage(Pagename);

        
       int tupleindex= DBApp.gettupleindex(tablename, page,this);
//        System.out.println("UpdateTuple Start");
        
        // Update the tuple's values
        Enumeration<String> e = htblColNameValue.keys();
        while (e.hasMoreElements()) {
            String key = e.nextElement();
            if(DBApp.IndexonColumn(tablename,key))
            {
            	 String indexName = DBApp.getIndexNameFromMetadata(tablename, key);
                 bplustree index = bplustree.deserializeIndex(indexName);
                 int num=DBApp.getPageNumber(tablename,Pagename);
                 index.update(getcolvalue(key), htblColNameValue.get(key),num);
                 bplustree.serializeIndex(index, indexName);
            }
//            System.out.println("Before update: " + ht.get(key));
            ht.put(key, htblColNameValue.get(key));
//            System.out.println("After update: " + ht.get(key));
        }
        
        page.tuples.set(tupleindex, this);
        // Serialize the updated tuple
//        System.out.print("batest eh el ht da "+ ht);
//        System.out.print("tab w eh this da "+ this);
        
//        System.out.println("batest el page "+page);

//        System.out.println("Updated tuple serialized");
        
        // Serialize the updated page
        Page.serializePage(page, Pagename);
//        System.out.println("Updated page serialized");
//        
//        System.out.println("UpdateTuple End");
    }

    
//    public static void serializeTuple(Tuple tuple, String tupleName) {
//        try (FileOutputStream fileOut = new FileOutputStream(tupleName + ".ser");
//             ObjectOutputStream objectOut = new ObjectOutputStream(fileOut)) {
//
//            objectOut.writeObject(tuple);
//            objectOut.close();
//            fileOut.close();
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

    @Override
    public String toString() {
        Collection<Object> values = ht.values();
        StringBuilder s = new StringBuilder();
        int i = 0;
        for (Object value : values) {
            if (i > 0) {
                s.insert(0, ",");
            }
            s.insert(0, value);
            i++;
        }
        return s.toString();
    }
//    public Tuple deserializeTuple(String tupleName) {
//        Tuple tuple = null;
//        try (FileInputStream fileIn = new FileInputStream(tupleName + ".ser");
//             ObjectInputStream objectIn = new ObjectInputStream(fileIn)) {
//
//            tuple = (Tuple) objectIn.readObject();
//
//        } catch (IOException | ClassNotFoundException e) {
//            e.printStackTrace();
//        }
//        return tuple;
//    }

    public static void main(String[] args) {
        Hashtable<String,Object> htblColNameValue = new Hashtable<>();
        htblColNameValue.put("id", new Integer(2343432));
        htblColNameValue.put("name", new String("Ahmed Noor"));
        htblColNameValue.put("gpa", new Double(0.95));

        Tuple t = new Tuple(htblColNameValue);
        System.out.println(t.getClusteringKeyValue("id"));
    }
}