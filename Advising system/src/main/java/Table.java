import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Hashtable;
import java.util.Vector;

public class Table implements java.io.Serializable  {
	public Vector<String> fileNames = new Vector<String>();
	public Vector<Object[]> tuplesRanges = new Vector<Object[]>();
	
	static int pageCount=1;

	
	
	public Table() {
		// TODO Auto-generated constructor stub
		
	}
	
	public String getFilename(String tblName) {
		Table tbl= Table.deserialzeTbl(tblName);
		int pgCount=tbl.fileNames.size()+1;
		String s= tblName+ pgCount;
	//	pageCount++;
		return s;
	}
	
	public static Table  deserialzeTbl (String strTableName){
		File file = new File(strTableName + ".ser");
		if (!file.exists()) {
		    // Handle the case where the file doesn't exist
		    System.out.println("Table file does not exist.");
		    return null;
		}
		Table Tbl = null;
		try {
		    FileInputStream fileIn = new FileInputStream(strTableName + ".ser");
		    ObjectInputStream in = new ObjectInputStream(fileIn);
		    Tbl = (Table) in.readObject();
		    in.close();
		    fileIn.close();
		} catch (IOException | ClassNotFoundException e) {
		    e.printStackTrace();
		    // Handle exceptions appropriately based on your application's requirements
		}
		return Tbl;
		}
	
	 public static void serializeTable(Table table, String strTableName) {
	        try (FileOutputStream fileOut = new FileOutputStream(strTableName + ".ser");
	             ObjectOutputStream objectOut = new ObjectOutputStream(fileOut)) {

	            objectOut.writeObject(table);
	            objectOut.close();
	            fileOut.close();

	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }
	 public static boolean metadataFileExists() {
	        File metadataFile = new File("metadata.csv");
	        return metadataFile.exists() && !metadataFile.isDirectory();
	    }
		public static void createmetadata() throws IOException {
			if (metadataFileExists()==false){
				System.out.print("not found");
				String metadataFileName = "metadata.csv";
			    BufferedWriter writer = new BufferedWriter(new FileWriter(metadataFileName, true));
			    writer.write(String.format("%s,%s,%s,%s,%s,%s%n", "Table Name", "Column Name", "Column Type", "ClusteringKey", "IndexName", "IndexType"));
			    writer.close(); // Close the writer after writing the header
			}
		}
	
	public static void createMetadataFile(String TableName,
	        String strClusteringKeyColumn,
	        Hashtable<String, String> htblColNameType) throws IOException {
			createmetadata();
			String metadataFileName = "metadata.csv";
			try (BufferedWriter writer = new BufferedWriter(new FileWriter(metadataFileName, true))) {
				for (String columnName : htblColNameType.keySet()) {
					String columnType = getFullDataType(htblColNameType.get(columnName));
					boolean ClusteringKey = columnName.equals(strClusteringKeyColumn);
					String indexName = null; 
					String indexType = null;

					// Write metadata information to the CSV file
					writer.write(String.format("%s,%s,%s,%s,%s,%s%n",
							TableName, columnName, columnType, ClusteringKey, indexName, indexType));
					}
				
				} catch (IOException e) {
					e.printStackTrace();
					
				}		
	}
	
    public static String getClusteringKeyType(String tableName) {
        String metadataFileName = "metadata.csv";

        try (BufferedReader reader = new BufferedReader(new FileReader(metadataFileName))) {
            String line;
            // Read each line in the metadata file
            while ((line = reader.readLine()) != null) {
                // Split the line into columns
                String[] columns = line.split(",");

                // Check if the line corresponds to the specified table and is a clustering key
                if (columns.length >= 5 && columns[0].equals(tableName) && Boolean.parseBoolean(columns[3])) {
                    return columns[2]; // Return the data type of the clustering key
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
           
        }

        return null; // Return null if no clustering key is found or metadata file is not accessible
    }
	
    private static String getFullDataType(String dataType) {
        switch (dataType) {
            case "int":
                return "java.lang.Integer";
            case "double":
                return "java.lang.Double";
            case "string":
                return "java.lang.String";
            // Add cases for other data types if necessary
            default:
                return dataType; // Return as is if not recognized
        }
    }
	
	 public static String getClusteringKeyName(String tableName) {
	        String metadataFileName = "metadata.csv";
	        try (BufferedReader reader = new BufferedReader(new FileReader(metadataFileName))) {
	            String line;
	            // Read each line in the metadata file
	            while ((line = reader.readLine()) != null) {
	                // Split the line into columns
	                String[] columns = line.split(",");

	                // Check if the line corresponds to the specified table and is a clustering key
	                if (columns[0].equals(tableName) && Boolean.parseBoolean(columns[3])) {
	                    return columns[1]; // Return the column name as the clustering key
	                }
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	            // Handle the exception appropriately based on your application's requirements
	        }
	        return null; // Return null if no clustering key is found
	    }

	public static void main(String[] args) throws IOException {
//		createmetadata();
		
		
		
	
		
		Vector <Double>v= new Vector <Double>();
		v.add(2.0);
		v.add(2.0);
		v.remove(2.0);
		System.out.println(v.size());
		//System.out.println(t1.tuplesRanges.get(0)[1]);
		
        System.out.println("abd".compareTo("abc")>"abe".compareTo("abc"));
        
       
		//Table t1= new Table();
		//serializeTable(t1,"Student");

		
		/*Table t2= deserialzeTbl("name1");
		String pageName1= t2.getFilename("name1");
		t2.fileNames.add(pageName1);
		String pageName2= t2.getFilename("name1");
		t2.fileNames.add(pageName2);
		System.out.print(t2.fileNames.get(0));
		System.out.print(t2.fileNames.get(1));
		serializeTable(t2,"name1");*/
		
		//System.out.print(t2.fileNames.get(0));
		//System.out.println(System.getProperty("user.dir"));

		//Table t3= deserialzeTbl("name1");
		
		//Table t2= deserialzeTbl("Student");
	//	System.out.print(t2.fileNames.size());
	//	System.out.print(t2.getFilename("Student"));
	//	t2.fileNames.add(t2.getFilename("Student"));
	//	serializeTable(t2,"Student");
//		System.out.print(t2.fileNames.size());
//		System.out.print(t2.fileNames.get(1));
		/*t2.fileNames.add(t2.getFilename("Student"));
		serializeTable(t2,"Student");*/
		
	/*	String pageName= Table.getFilename("Student");
		t2.fileNames.add(pageName);
		serializeTable(t2,"Student");
		System.out.print(t2.fileNames.size());*/
	//	System.out.print(t2.fileNames.get(3));
		/*Hashtable<String,String> htblColNameType = new Hashtable( ); 
		htblColNameType.put("id", "java.lang.Integer"); 
		htblColNameType.put("name", "java.lang.String"); 
		htblColNameType.put("gpa", "java.lang.double"); */
		

	}

}