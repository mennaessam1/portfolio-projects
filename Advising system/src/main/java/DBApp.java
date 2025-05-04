
/** * @author Wael Abouelsaadat */ 

import java.util.Iterator;
import java.util.List;
import java.util.Stack;
import java.util.Vector;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Enumeration;
import java.util.Hashtable;



public class DBApp {

	

	public DBApp( ){
		
	}

	// this does whatever initialization you would like 
	// or leave it empty if there is no code you want to 
	// execute at application startup 
	public void init( ) throws IOException{
	   
	}


	// following method creates one table only
	// strClusteringKeyColumn is the name of the column that will be the primary
	// key and the clustering column as well. The data type of that column will
	// be passed in htblColNameType
	// htblColNameValue will have the column name as key and the data 
	// type as value
	public  boolean specifictypes(Hashtable<String,String> htblColNameType) {
		 Enumeration<String> e = htblColNameType.keys(); // Initialize Enumeration locally
        while (e.hasMoreElements()) {
            String key = e.nextElement();
             // Use equals method for string comparison
            String type=htblColNameType.get(key);
                if(type.equals("java.lang.Integer") || type.equals("java.lang.String") || type.equals("java.lang.Double") )
                {}
                else
                {return false;}
            
        }
        return true;
		
	}
	public void createTable(String strTableName, 
							String strClusteringKeyColumn,  
							Hashtable<String,String> htblColNameType) throws DBAppException{
		try {
		if(Table.metadataFileExists() && tableExists(strTableName)) {
			throw new DBAppException("table already created");
		}
		if(!(specifictypes(htblColNameType))){
			throw new DBAppException("please enter the object in these specific types: int/ string/ double");
		}
		Table t=new Table();
		Table.serializeTable(t,strTableName);
		t.createMetadataFile(strTableName, strClusteringKeyColumn, htblColNameType);
		
		}catch(DBAppException d ) {
			System.out.println(d.getMessage());
		}catch (IOException i) {
			 i.printStackTrace();
		}
	}
	public boolean tableExists(String strTableName) {
	    String metadataFileName = "metadata.csv";
	    try (BufferedReader reader = new BufferedReader(new FileReader(metadataFileName))) {
	        String line;
	        while ((line = reader.readLine()) != null) {
	            String[] columns = line.split(",");

	           
	            if (columns[0].equals(strTableName)) {
	                return true;
	            }
	        }
	    } catch (IOException e) {
	       
	        System.err.println("Error reading metadata file: " + e.getMessage());
	    }
	    return false;
	}
	
	public static boolean checkColumnBelongsToTable(String tableName, String columnName) throws DBAppException {
	    String metadataFileName = "metadata.csv";
	    boolean columnBelongsToTable = false;
	    try (BufferedReader reader = new BufferedReader(new FileReader(metadataFileName))) {
	        String line;
	        // Read each line in the metadata file
	        while ((line = reader.readLine()) != null) {
	            // Split the line into columns
	            String[] columns = line.split(",");
	            // Check if the line corresponds to the specified table and column
	            if (columns[0].equals(tableName) && columns[1].equals(columnName)) {
	                columnBelongsToTable = true;
	                break;
	            }
	        }
	        if (!columnBelongsToTable) {
	            return false;
	        }
	        
	    } catch (IOException e) {
	        e.printStackTrace();
	        // Handle the exception appropriately based on your application's requirements
	    }
	    return true;
	}
	public static boolean checkIndexNameExistsForTable(String tableName, String indexName, String columnName) throws DBAppException {
	    String metadataFileName = "metadata.csv";
	    boolean indexNameExistsForTable = false;
	    try (BufferedReader reader = new BufferedReader(new FileReader(metadataFileName))) {
	        String line;
	        // Read each line in the metadata file
	        while ((line = reader.readLine()) != null) {
	            // Split the line into columns
	            String[] columns = line.split(",");
	            // Check if the line corresponds to the specified table and index name
	            if (columns[0].equals(tableName) && columns[4].equals(indexName)) {
	                // Check if the index name is associated with a different column name
	                if (!columns[1].equals(columnName)) {
	                    indexNameExistsForTable = true;
	                    break;
	                }
	            }
	        }
	        if (indexNameExistsForTable) {
	          return false;
	        }
	    } catch (IOException e) {
	        e.printStackTrace();
	        // Handle the exception appropriately based on your application's requirements
	    }
	    return true;
	}


	// following method creates a B+tree index 
	public void createIndex(String   strTableName,
							String   strColName,
							String   strIndexName) throws DBAppException{
		try {
			if(!Table.metadataFileExists() || !(tableExists(strTableName))&& Table.metadataFileExists() ) {
				throw new DBAppException("table entered doesn't exist");
			}if(!checkColumnBelongsToTable(strTableName, strColName)) {
				throw new DBAppException("Column entered doesn't exist");
			}if(!checkIndexNameExistsForTable(strTableName,strIndexName,strColName)) {
				throw new DBAppException("This index name is defined before");
			}
		bplustree bpt=new bplustree(30);
		Table t=Table.deserialzeTbl(strTableName);
		
		for(int i=0;i<=t.fileNames.size()-1;i++){
        	String pageNameneeded=t.fileNames.get(i);
        	
        	Page p=Page.deserialzePage(pageNameneeded);
        	for(int j=0;j<=p.tuples.size()-1;j++){
        		Tuple tuple=p.tuples.get(j);
        		Object o=tuple.getcolvalue(strColName);
        		int filenumber=getPageNumber(strTableName,pageNameneeded);
        		bpt.insert(o, filenumber);
        		}
        	Page.serializePage(p,pageNameneeded);
	         }
		updateMetadataIndexName(strTableName, strColName,strIndexName);
	//	serializeIndexName(strIndexName);
		bplustree.serializeIndex(bpt,strIndexName); //changed serialization -------
		Table.serializeTable(t,strTableName);
		}catch (DBAppException e) {
			System.out.println(e.getMessage());
		}
//		throw new DBAppException("not implemented yet");
	}
	public void updateMetadataIndexName(String tableName, String colName, String indexName) {
        try {
            String metadataFileName = "metadata.csv";
            
            BufferedReader reader = new BufferedReader(new FileReader(metadataFileName));
            StringBuilder sb = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length >= 2 && parts[0].equals(tableName) && parts[1].equals(colName)) {
                    // Found the line to update, modify the indexName
                    line = String.format("%s,%s,%s,%s,%s,%s%n",
                            tableName, colName, parts[2], parts[3], indexName, "B+ tree");
                    
                }
                sb.append(line).append("\n");
            }

            reader.close();

            BufferedWriter writer = new BufferedWriter(new FileWriter(metadataFileName));
            writer.write(sb.toString());
            writer.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
	public void serializeIndexName(String indexName) {
        try {
            FileOutputStream fileOut = new FileOutputStream(indexName + ".ser");
            ObjectOutputStream out = new ObjectOutputStream(fileOut);
            out.writeObject(indexName);
            out.close();
            fileOut.close();
            System.out.println("Serialized data is saved in " + indexName + ".ser");
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception appropriately based on your application's requirements
        }
    }
	
	public static int getPageNumber(String strTableName, String fileName) {
		StringBuilder extraCharacters = new StringBuilder();
        for (int i = 0; i < fileName.length(); i++) {
            char currentChar = fileName.charAt(i);
            if (strTableName.indexOf(currentChar) == -1) {
                extraCharacters.append(currentChar);
            }
        }
        int x=Integer.parseInt(extraCharacters.toString());
        return x;
    }
	public static boolean IndexonColumn(String tableName, String columnName) {
        String metadataFileName = "metadata.csv";
        try (BufferedReader reader = new BufferedReader(new FileReader(metadataFileName))) {
            String line;
            // Read each line in the metadata file
            while ((line = reader.readLine()) != null) {
                // Split the line into columns
                String[] columns = line.split(",");

                // Check if the line corresponds to the specified table and column
                if (columns[0].equals(tableName) && columns[1].equals(columnName)) {
                    // Check if the index is not null
                    return columns[4] != null && !columns[4].equals("null") && columns[5]!=null && !columns[5].equals("null");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception appropriately based on your application's requirements
        }
        return false;
    }
	
    public static boolean tableHasIndex(String tableName) {
        String metadataFileName = "metadata.csv";

        try (BufferedReader reader = new BufferedReader(new FileReader(metadataFileName))) {
            String line;
            // Read each line in the metadata file
            while ((line = reader.readLine()) != null) {
                // Split the line into columns
                String[] columns = line.split(",");

                // Check if the line corresponds to the specified table and if IndexName is not null
                if (columns.length >= 5 && columns[0].equals(tableName) && columns[4] != null) {
                    return true; // Table has an index on at least one column
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception appropriately based on your application's requirements
        }

        return false; // No column has an index on it
    }
    
    public static boolean tableHasIndexOnClusteringKey(String tableName, String clusteringKeyName) { //edit and add to insert method
        String metadataFileName = "metadata.csv";

        try (BufferedReader reader = new BufferedReader(new FileReader(metadataFileName))) {
            String line;
            // Read each line in the metadata file
            while ((line = reader.readLine()) != null) {
                // Split the line into columns
                String[] columns = line.split(",");

                // Check if the line corresponds to the specified table, is a clustering key, and has an index
                if (columns.length >= 5 && columns[0].equals(tableName) && columns[1].equals(clusteringKeyName) && columns[4] != null) {
                    return true; // Clustering key has an index
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception appropriately based on your application's requirements
        }

        return false; // Clustering key does not have an index
    }


    public static String getIndexNameFromMetadata(String tableName, String columnName) { //test brdo
        String indexName = null;
        try {
            String metadataFileName = "metadata.csv";
            BufferedReader reader = new BufferedReader(new FileReader(metadataFileName));
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length >= 2 && parts[0].equals(tableName) && parts[1].equals(columnName)) {
                    // Found the metadata entry for the specified table and column
                    // Extract the index name
                    indexName = parts[4];
                    break;
                }
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception appropriately based on your application's requirements
        }
        return indexName;
    }
    public static String getColumnTypeFromTable(String tableName, String columnName)  {
	    String metadataFileName = "metadata.csv";
	    try (BufferedReader reader = new BufferedReader(new FileReader(metadataFileName))) {
	        String line;
	        // Read each line in the metadata file
	        while ((line = reader.readLine()) != null) {
	            // Split the line into columns
	            String[] columns = line.split(",");
	            // Check if the line corresponds to the specified table and column name
	            if (columns[0].equals(tableName) && columns[1].equals(columnName)) {
	                return columns[2]; // Return the column type
	            }
	        }
	        // If the column name is not found in the table metadata, throw an exception
	        
	    } catch (IOException e) {
	        e.printStackTrace();
	        // Handle the exception appropriately based on your application's requirements
	    }
	    return null; // Return null if the column name is not found
	}
    public boolean checktype(Hashtable<String, Object> htblColNameValue, String tableName) {
        Enumeration<String> e = htblColNameValue.keys(); 
        while (e.hasMoreElements()) {
            String key = e.nextElement();
            Object obj = htblColNameValue.get(key);
            String columnType = getColumnTypeFromTable(tableName, key);
            System.out.println("testing hena el type "+columnType);
            System.out.println("testing hena el key "+key);
            System.out.println("testing hena el obj "+obj);
         
            if (columnType.equals("java.lang.Integer")) {
                if (!(obj instanceof Integer)) {
                    return false;
                }
            } else if (columnType.equals("java.lang.String")) {
                if (!(obj instanceof String)) {
                    return false;
                }
            } else if (columnType.equals("java.lang.Double")) {
                if (!(obj instanceof Double  || obj instanceof Integer) ) {
                	System.out.println("hareturn false");
                    return false;
                }
            } 
        }
        return true;
    }
    public boolean validateColumnCount(String tableName, Hashtable<String, Object> htblColNameValue) {
        try (BufferedReader reader = new BufferedReader(new FileReader("metadata.csv"))) {
            // Read the metadata file to find the table and its columns
            String line;
            while ((line = reader.readLine()) != null) {
                String[] columns = line.split(",");
                if (columns[0].equals(tableName)) {
                    // Get the number of columns defined in the metadata
                    int numMetadataColumns = 0;
                    for (int i = 1; i < columns.length; i++) { // Starting from 1 to skip the table name
                        if (!columns[i].isEmpty() && !columns[i].equals("null")) {
                            numMetadataColumns++;
                        }
                    }
                    // Get the number of columns given in the hashtable
                    int numGivenColumns = htblColNameValue.size();
                    // Compare the counts
                    return numMetadataColumns == numGivenColumns;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception appropriately based on your application's requirements
        }
        return false; // Return false if the table is not found or if there's an error
    }
   
//////////////////////////////////////////////////////////////////////////////////////////

//	 following method inserts one row only. 
//	 htblColNameValue must include a value for the primary key
    
    
   
	public void insertIntoTable(String strTableName, //dont forget to handle case lw fi ay column 3aleh index
								Hashtable<String,Object>  htblColNameValue) throws DBAppException{
		try {
		String clusteringName= Table.getClusteringKeyName(strTableName);
		 Enumeration<String> etest = htblColNameValue.keys(); 
	        while (etest.hasMoreElements()) {
	            String key1 = etest.nextElement();
	            if(!checkColumnBelongsToTable(strTableName, key1)) {
					throw new DBAppException("Column entered doesn't exist");
	            }
	            
	        }
		 Tuple tuple= new Tuple(htblColNameValue);
		
			if(!Table.metadataFileExists() || !(tableExists(strTableName))&& Table.metadataFileExists() ) {
				throw new DBAppException("table entered doesn't exist");
			}
			if(!(checktype(htblColNameValue,strTableName))) {
				throw new DBAppException("invalid types");
			}if(isavailable(strTableName, tuple.getClusteringKeyValue(clusteringName))) {
				throw new DBAppException("Clustering key can't contain duplicates");
			}if(!validateColumnCount(strTableName,htblColNameValue)) {
				throw new DBAppException("please enter the right number of columns");
			}
			
			
			Enumeration<String> e = htblColNameValue.keys(); // Initialize Enumeration locally
	        while (e.hasMoreElements()) {
	            String key = e.nextElement();
	            String s=getColumnTypeFromTable(strTableName, key );
	            

	            if (s.equals("java.lang.Double")) {
	            	if((htblColNameValue.get(key)) instanceof Integer) {
	            	htblColNameValue.put(key,(double)((int)htblColNameValue.get(key)));
	            	}else if((htblColNameValue.get(key)) instanceof Double) {
	            		htblColNameValue.put(key,(htblColNameValue.get(key)));
	            	}
	            }
	           
	        }
		
			
			
		int value=0;
		//boolean flag=true;
		Table tbl;
	    tbl= Table.deserialzeTbl(strTableName);
	    
	   
	    if(tbl.fileNames.size()==0) { //Case Table is empty
			Page p= new Page();
			String pageName=tbl.getFilename(strTableName);
			tbl.fileNames.add(pageName);
	
			p.tuples.add(tuple);
			Object b[]= {tuple.getClusteringKeyValue(clusteringName),tuple.getClusteringKeyValue(clusteringName)};		
			tbl.tuplesRanges.add(b);
			value=1;
			Page.serializePage(p, pageName);
			if(IndexonColumn(strTableName,clusteringName)) {
				String indexname= getIndexNameFromMetadata(strTableName,clusteringName);
			
		    	bplustree bpt = bplustree.deserializeIndex(indexname);		    	
				bpt.insert(tuple.getClusteringKeyValue(clusteringName), 1);
				bplustree.serializeIndex(bpt, indexname);
			}
			}
	    ////////////////////////////////////////////////////
	    
			
		//////////////////////////////
		else
		{
			
			String targetPageName= getPageNameToInsert(strTableName,tuple);
			Page targetPage= Page.deserialzePage(targetPageName);
			
			
			value=getPageNumber(strTableName, targetPageName);
		
			
			if(targetPage.pageIsFull(targetPageName) && compare(targetPage.tuples.get(targetPage.tuples.size()-1).getClusteringKeyValue(clusteringName),tuple.getClusteringKeyValue(clusteringName))<=0) {
				Page p= new Page();
				String pageName=tbl.getFilename(strTableName);
				tbl.fileNames.add(pageName);
			//	Table.serializeTable(tbl,strTableName);
		
				p.tuples.add(tuple);
				Page.serializePage(p, pageName);
				value=value+1;
				
				Object b[]= {tuple.getClusteringKeyValue(clusteringName),tuple.getClusteringKeyValue(clusteringName)};		
				tbl.tuplesRanges.add(b);
				
			}
			
			else if(!targetPage.pageIsFull(targetPageName)) {
				
				targetPage.insertSortedTuple(strTableName,targetPageName,tuple);
				
				int indexInTuplesRangeVector= tbl.fileNames.indexOf(targetPageName);
	    		Object clusteringMin=tbl.tuplesRanges.get(indexInTuplesRangeVector)[0];
	    		Object clusteringMax=tbl.tuplesRanges.get(indexInTuplesRangeVector)[1];
	    		if (compare(tuple.getClusteringKeyValue(clusteringName),clusteringMin)<0) {
	    			tbl.tuplesRanges.get(indexInTuplesRangeVector)[0]=tuple.getClusteringKeyValue(clusteringName);
	    		}
	    		else if(compare(tuple.getClusteringKeyValue(clusteringName),clusteringMax)>0) {
	    			tbl.tuplesRanges.get(indexInTuplesRangeVector)[1]=tuple.getClusteringKeyValue(clusteringName);
	    		}
			}
			else {
				
				shiftFromPage(tbl,strTableName,targetPageName,targetPage);
				targetPage.insertSortedTuple(strTableName,targetPageName,tuple);
				int indexInTuplesRangeVector= tbl.fileNames.indexOf(targetPageName);
				
	    		Object clusteringMin=tbl.tuplesRanges.get(indexInTuplesRangeVector)[0];
	    		Object clusteringMax=tbl.tuplesRanges.get(indexInTuplesRangeVector)[1];
	    		if (compare(tuple.getClusteringKeyValue(clusteringName),clusteringMin)<0) {
	    			tbl.tuplesRanges.get(indexInTuplesRangeVector)[0]=tuple.getClusteringKeyValue(clusteringName);
	    		}
	    		else if(compare(tuple.getClusteringKeyValue(clusteringName),clusteringMax)>0) {
	    			tbl.tuplesRanges.get(indexInTuplesRangeVector)[1]=tuple.getClusteringKeyValue(clusteringName);
	    		}
				
			}
			
			if(IndexonColumn(strTableName,clusteringName)) {
				String indexname= getIndexNameFromMetadata(strTableName,clusteringName);
		    	bplustree bpt = bplustree.deserializeIndex(indexname);
	            bpt.insert(tuple.getClusteringKeyValue(clusteringName), value);
	    	    bplustree.serializeIndex(bpt, indexname);
			}
			
		} 
	    
	//    System.out.println("value before enum "+ value);
	    Enumeration<String> columnNames = htblColNameValue.keys();
	    
       while (columnNames.hasMoreElements()) {
           String colName = columnNames.nextElement();
           if (!colName.equals(clusteringName) && IndexonColumn(strTableName, colName)) {
               String indexName = getIndexNameFromMetadata(strTableName, colName);
               bplustree index = bplustree.deserializeIndex(indexName);
             
//               if(tbl.fileNames.size()==1)
//            	   index.insert(tuple.getcolvalue(colName),1); 
//               else
               index.insert(tuple.getcolvalue(colName),value); /* Your logic to get the page number */
               bplustree.serializeIndex(index, indexName);
           }
       }
	    
	    Table.serializeTable(tbl,strTableName);
		}catch(DBAppException d ) {
			System.out.println(d.getMessage());
		}
	}
		
	
//		throw new DBAppException("not implemented yet");
	
	//////////////////////////////////////////////////////////////////////////////////////
	/*public void serializeIndex(bplustree index, String indexName) {
	    try {
	        FileOutputStream fileOut = new FileOutputStream(indexName + ".ser");
	        ObjectOutputStream out = new ObjectOutputStream(fileOut);
	        out.writeObject(index);
	        out.close();
	        fileOut.close();
	        System.out.println("Serialized data is saved in " + indexName + ".ser");
	    } catch (IOException e) {
	        e.printStackTrace();
	        // Handle the exception appropriately based on your application's requirements
	    }
	}*/

	
	public String createPage(Table tbl,String strTableName) {
		Page p= new Page();
		String pageName=tbl.getFilename(strTableName);
		tbl.fileNames.add(pageName);
		Page.serializePage(p, pageName);
		Table.serializeTable(tbl,strTableName);

		
		
		return pageName;
	}
	
	public void shiftFromPage(Table tbl,String strTableName,String targetPageName,Page targetPage) {
		
		String nextPageName="";
		Page nextPage=null;
	    int TpageNum=getPageNumber(strTableName,targetPageName);
		int nextPageNum= (tbl.fileNames.indexOf(targetPageName))+1;
		String clusteringName= Table.getClusteringKeyName(strTableName);
		Tuple lastTuple= targetPage.tuples.get(targetPage.tuples.size()-1);
		
		
		targetPage.tuples.remove(targetPage.tuples.size()-1);
		
		int indexInTuplesRangeVector= tbl.fileNames.indexOf(targetPageName);
		tbl.tuplesRanges.get(indexInTuplesRangeVector)[1]=targetPage.tuples.get(targetPage.tuples.size()-1).getClusteringKeyValue(clusteringName);
		
		
		//lw fi index 3ala el col 3yzeen n delete from index w n re insert with el next page number
	//if (IndexonColumn(strTableName,clusteringName))
		
	
		Enumeration<String> columnNames = lastTuple.ht.keys(); 
        while (columnNames.hasMoreElements()) {
            String colName = columnNames.nextElement();
            if (IndexonColumn(strTableName, colName)) {
                String indexName = getIndexNameFromMetadata(strTableName, colName);
                bplustree index = bplustree.deserializeIndex(indexName);
                System.out.println("shift method: col name changed: "+ colName + "key of col: "+ lastTuple.getcolvalue(colName)+"\n"+"\n");
                
            
                index.changePageValue(lastTuple.getcolvalue(colName),(double)(nextPageNum+1),indexName,TpageNum);
               
                //delete el awel                
                //index.insert(lastTuple.getcolvalue(colName),nextPageNum); /* Your logic to get the page number */
                
                bplustree.serializeIndex(index, indexName);
            }
        }
		
		Page.serializePage(targetPage,targetPageName);
		if(nextPageNum== tbl.fileNames.size()) {
			nextPageName=createPage(tbl,strTableName);
			Page p= Page.deserialzePage(nextPageName);
			p.tuples.add(lastTuple);
			Page.serializePage(p, nextPageName);
			
			Object b[]= {lastTuple.getClusteringKeyValue(clusteringName),lastTuple.getClusteringKeyValue(clusteringName)};		
			tbl.tuplesRanges.add(b);
		}
		else {
			nextPageName= tbl.fileNames.get(nextPageNum);
			nextPage=Page.deserialzePage(nextPageName);
			if (!nextPage.pageIsFull(nextPageName))
		
		{
			nextPage.tuples.add(0, lastTuple);
			 indexInTuplesRangeVector= tbl.fileNames.indexOf(nextPageName);
			 tbl.tuplesRanges.get(indexInTuplesRangeVector)[0]=lastTuple.getClusteringKeyValue(clusteringName);
			Page.serializePage(nextPage, nextPageName);
		}
		else 
		{
			shiftFromPage(tbl,strTableName,nextPageName,nextPage);
			nextPage.tuples.add(0, lastTuple);
			indexInTuplesRangeVector= tbl.fileNames.indexOf(nextPageName);
			 tbl.tuplesRanges.get(indexInTuplesRangeVector)[0]=lastTuple.getClusteringKeyValue(clusteringName);
			Page.serializePage(nextPage, nextPageName);
		}
		}
			
	}
	
	public String getPageNameToUpdate(String strTableName, Object ClusteringKeyValue)
	{
		Table tbl=Table.deserialzeTbl(strTableName);
		//Vector<String> TBLfileNames =tbl.fileNames;
		int size= tbl.fileNames.size();
		int low = 0;
	    int high = size - 1;
	    int mid;
	    String clusteringName= Table.getClusteringKeyName(strTableName);
	    Object firstClusteringValue= tbl.tuplesRanges.get(0)[0];
	   // Page p1=  Page.deserialzePage(tbl.fileNames.get(0));
//	    Tuple firstTuple= p1.tuples.get(0);
	   
	    int indexLast= size - 1;
	   // Page p2=  Page.deserialzePage(tbl.fileNames.get(indexLast));
	    //System.out.println(p2.tuples.size());
	   // int indexOfLastTupleInP2= p2.tuples.size()-1;
	    //Tuple LastTuple= p2.tuples.get(indexOfLastTupleInP2);
	    Object lastClusteringValue = tbl.tuplesRanges.get(indexLast)[1];
	    
	   /* if(compare(ClusteringKeyValue,firstTuple.getClusteringKeyValue(clusteringName))<0) {
	    	return tbl.fileNames.get(0);
	    }
	    else if(compare(ClusteringKeyValue,LastTuple.getClusteringKeyValue(clusteringName))>0)
	    {
	    	return tbl.fileNames.get(indexLast);
	    }*/
	  //  else {
	    
	    while(low<=high) {
	    	mid = low + (high - low) / 2;
	    	String pageName=tbl.fileNames.get(mid);
	    	if (inPage(ClusteringKeyValue,pageName,strTableName)==0) { 
	    		return pageName;
	    	}
	    	else if(inPage(ClusteringKeyValue,pageName,strTableName)==-1) {
	    		high=mid-1;
	    	}
	    	else if(inPage(ClusteringKeyValue,pageName,strTableName)==1) {
	    		low=mid+1;
	    	}
	    	
	    }
	 //   }
	    return null;
	}
	
	public String getPageNameToInsert(String strTableName, Tuple newTuple )
	{
		Table tbl=Table.deserialzeTbl(strTableName);
		//Vector<String> TBLfileNames =tbl.fileNames;
		int size= tbl.fileNames.size();
		int low = 0;
	    int high = size - 1;
	    int mid;
	    String clusteringName= Table.getClusteringKeyName(strTableName);
	    Object ClusteringKeyValue= newTuple.getClusteringKeyValue(clusteringName);
	    Object firstClusteringValue= tbl.tuplesRanges.get(0)[0];
	    //Page p1=  Page.deserialzePage(tbl.fileNames.get(0)); //tuplesrange.get0
	    //Tuple firstTuple= p1.tuples.get(0); //a[0]
	    int indexLast= size - 1;
	    Object lastClusteringValue = tbl.tuplesRanges.get(indexLast)[1];
//	    Page p2=  Page.deserialzePage(tbl.fileNames.get(indexLast)); //tuplesrange.getindexLast
//	    int indexOfLastTupleInP2= p2.tuples.size()-1;
//	    Tuple LastTuple= p2.tuples.get(indexOfLastTupleInP2);
	    if(compare(newTuple.getClusteringKeyValue(clusteringName),firstClusteringValue)<0) {
	    	return tbl.fileNames.get(0);
	    }
	    else if(compare(newTuple.getClusteringKeyValue(clusteringName),lastClusteringValue)>0)
	    {
	    	return tbl.fileNames.get(indexLast);
	    }
	    else {
	    while(low<=high) {
	    	mid = low + (high - low) / 2;
	    	String pageName=tbl.fileNames.get(mid);
	    	if (inPage(ClusteringKeyValue,pageName,strTableName)==0) { 
	    		int indexInTuplesRangeVector= tbl.fileNames.indexOf(pageName);
	    		Object clusteringMax=tbl.tuplesRanges.get(indexInTuplesRangeVector)[1];
	    		if(compare(newTuple.getClusteringKeyValue(clusteringName),clusteringMax)>0) {
	    			return tbl.fileNames.get(indexInTuplesRangeVector+1);
	    		}
	    		else {
	    		return pageName;
	    		}
	    	}
	    	else if(inPage(ClusteringKeyValue,pageName,strTableName)==-1) {
	    		high=mid-1;
	    	}
	    	else if(inPage(ClusteringKeyValue,pageName,strTableName)==1) {
	    		low=mid+1;
	    	}
	    	
	    }
	    }
	    return null;
		
	}
	//-1: go left
	//0 in page
	//1 go right
	
	public int inPage(Object clusteringKeyValue, String pageName, String strTableName) {
		
		Table tbl= Table.deserialzeTbl(strTableName);
		int indexInTuplesRangeVector= tbl.fileNames.indexOf(pageName);
		Object clusteringMin=tbl.tuplesRanges.get(indexInTuplesRangeVector)[0];
		Object clusteringMax=tbl.tuplesRanges.get(indexInTuplesRangeVector)[1];
//		String clusteringName= Table.getClusteringKeyName(strTableName);
//		Page page= Page.deserialzePage(pageName);
//		Tuple minTuple= page.tuples.get(0);
//		Tuple maxTuple= page.tuples.get((page.tuples.size()-1));
		if (compare(clusteringKeyValue,clusteringMin)<0) {		
			return -1;
		}
		else if (compare(clusteringKeyValue,clusteringMax)>0) {
			Object nextMin=tbl.tuplesRanges.get(indexInTuplesRangeVector+1)[0];
			if(compare(clusteringKeyValue,nextMin)<0)
				return 0;
			else
			   return 1;
		}
		else {
			return 0;
		}
	}
	
	public static int compare(Object key1, Object key2) {
	    // Handle the case where either key1 or key2 is null
	    if (key1 == null && key2 == null) {
	        return 0;
	    } else if (key1 == null) {
	        return -1; // Treat null as less than any non-null value
	    } else if (key2 == null) {
	        return 1; // Treat any non-null value as greater than null
	    }

	    // Compare based on the actual types
	    if (key1 instanceof String && key2 instanceof String) {
	        return ((String) key1).compareTo((String) key2);
	    } else if (key1 instanceof Integer && key2 instanceof Integer) {
	        return Integer.compare((Integer) key1, (Integer) key2);
	    } else if (key1 instanceof Double && key2 instanceof Double) {
	        return Double.compare((Double) key1, (Double) key2);
	    } else {
	        // Handle other types or throw an exception if the types are not supported
	        throw new UnsupportedOperationException("Unsupported clustering key types");
	    }
	}


	// following method updates one row only
	// htblColNameValue holds the key and new value 
	// htblColNameValue will not include clustering key as column name
	// strClusteringKeyValue is the value to look for to find the row to update.
	public void updateTable(String strTableName,    // dont forget to handle conditions of indices lw fi col 3aleh ay index
							String strClusteringKeyValue,
							Hashtable<String,Object> htblColNameValue   )  throws DBAppException{
		try {
		Enumeration<String> e = htblColNameValue.keys(); 
	        while (e.hasMoreElements()) {
	            String key = e.nextElement();
	            Object obj = htblColNameValue.get(key);
	            String columnType = getColumnTypeFromTable(strTableName, key);
	            if(Table.getClusteringKeyName(strTableName).equals(key)) {
	            	throw new DBAppException("Clustering key can't be updated");
				} 
		            if(!checkColumnBelongsToTable(strTableName, key)) {
						throw new DBAppException("Column entered doesn't exist");
		            }
	        }
		
			if(!Table.metadataFileExists() || !(tableExists(strTableName))&& Table.metadataFileExists() ) {
				throw new DBAppException("table entered doesn't exist");
			}
			if(!(checktype(htblColNameValue,strTableName))) {
				throw new DBAppException("invalid types");
			}
			
		// Convert strClusteringKeyValue to the appropriate type based on the clustering key's type
	    Object clusteringKeyValue=null;
	    String clusteringKeyType = Table.getClusteringKeyType(strTableName); // You need to implement this method
	    String clusteringName= Table.getClusteringKeyName(strTableName);
	    String pageNameToUpdate="";
	    bplustree bpt=null;

	    switch (clusteringKeyType) {
	        case "java.lang.Integer":
	            clusteringKeyValue = Integer.parseInt(strClusteringKeyValue);
	            break;
	        case "java.lang.Double":
	            clusteringKeyValue = Double.parseDouble(strClusteringKeyValue);
	            break;
	        // Add cases for other supported types if necessary
	       /* default:
	            // Handle unsupported types or throw an exception
	            throw new IllegalArgumentException("Unsupported clustering key type: " + clusteringKeyType);*/
	    }
		
	    if(!isavailable(strTableName,clusteringKeyValue )) {
			throw new DBAppException("what you are looking for is not available");
		}
	    
	    //ehna 3amalna method esmaha getpagenametoupdate btgib el page el fiha el tuple bn pass liha Object clusteringKeyValue;
	    //mehtgin ndawar gowa el page 3ala el tuple b method gowa page class esmaha getTupleFromPage
	    //once en ehna ma3ana el tuple nghyar fi w n serialize-o w brdo n serialize el page
	    
	    if (IndexonColumn(strTableName,clusteringName)){ //if tbl has index on clustering col
	    	//System.out.println("if (IndexonColumn(strTableName,clusteringName) etnered");
	    	String indexname= getIndexNameFromMetadata(strTableName,clusteringName);
	    	bpt = bplustree.deserializeIndex(indexname);
	    	Vector<Double> valuesVector= bpt.search(clusteringKeyValue);    //2	
	    	pageNameToUpdate= strTableName + ""+ (int) Math.ceil(valuesVector.get(0));///////////  	student2
	    	
	    //	bpt.update(clusteringKeyValue, value, value);
	    }
	    else {
	   	    
	    pageNameToUpdate=getPageNameToUpdate(strTableName,clusteringKeyValue);
	   
	    }
//	    Enumeration<String> columnNames = htblColNameValue.keys();
//	    while (columnNames.hasMoreElements()) {
//            String colName = columnNames.nextElement();
//            if (!colName.equals(clusteringName) && IndexonColumn(strTableName, colName)) {
//                String indexName = getIndexNameFromMetadata(strTableName, colName);
//                bplustree index = bplustree.deserializeIndex(indexName);
//                Object newKey =htblColNameValue.get(colName);
//                int num=getPageNumber(strTableName,pageNameToUpdate);
//                index.update(tuple.getcolvalue(colName),newKey , num); 
//                bplustree.serializeIndex(index, indexName);
//            }
//        } maria & marina
	    Page p=Page.deserialzePage(pageNameToUpdate);
	    Tuple tuple=Page.getTuple(strTableName,pageNameToUpdate,clusteringKeyValue);
	    tuple.UpdateTuple(htblColNameValue,p,pageNameToUpdate,strTableName);
	    Page.serializePage(p,pageNameToUpdate);
		//throw new DBAppException("not implemented yet");
	}catch(DBAppException e1) {
		System.out.println(e1.getMessage());
	}
	}
	public static int gettupleindex(String STRTable, Page p,Tuple t1) {
		int x=0;
		int counter=0;
		String clusteringName= Table.getClusteringKeyName(STRTable);
		while (counter < p.tuples.size()) {
			Tuple t2=p.tuples.get(counter);
			if(compare(t1.getClusteringKeyValue(clusteringName),t2.getClusteringKeyValue(clusteringName))==0) {
				x=counter;
				break;
			}
			counter++;
		}
		return x;
	}


	// following method could be used to delete one or more rows.
	// htblColNameValue holds the key and value. This will be used in search 
	// to identify which rows/tuples to delete. 	
	// htblColNameValue enteries are ANDED together
	public void deleteFromTable(String strTableName, 
            Hashtable<String,Object> htblColNameValue) throws DBAppException{
		 	try {
		 		if(!Table.metadataFileExists() || !(tableExists(strTableName))&& Table.metadataFileExists() ) {
					throw new DBAppException("table entered doesn't exist");
				}
		 		 Enumeration<String> etest = htblColNameValue.keys(); 
			        while (etest.hasMoreElements()) {
			            String key1 = etest.nextElement();
			            if(!checkColumnBelongsToTable(strTableName, key1)) {
							throw new DBAppException("Column entered doesn't exist");
			            }
			            
			        }
			        if(!(checktype(htblColNameValue,strTableName))) {
						throw new DBAppException("invalid types");
					}
			        
			        
		 		
		    Table t=Table.deserialzeTbl(strTableName);
		    if(htblColNameValue.isEmpty()) {
		    	 for(int i=0;i<t.fileNames.size();i++){
		    	
		    		 
			        	String pageNameneeded=t.fileNames.get(i);
			        	
						File file = new File(pageNameneeded + ".ser");
						file.delete();
						
							
			       }
		    	 
		    	 t.fileNames.clear();
		    	 Table.serializeTable(t,strTableName);
		    	 resetAllIndices(strTableName);
				 
				 
			 }
		    else {
			String s= hashtostring(htblColNameValue);
		    Object k="";
		    int countIndex=0;
		    Vector<double[]> indices = new Vector<double[]>();
		    Vector<bplustree> indexObj=new Vector<bplustree>();
		    
			Enumeration<String> e = htblColNameValue.keys(); // Initialize Enumeration locally
			String clusteringName= Table.getClusteringKeyName(strTableName);
			while (e.hasMoreElements()) {
				String key = e.nextElement();
				if (key.equals(clusteringName)) { // Use equals method for string comparison
					k=key;
					break;
				}
				if (!key.equals(clusteringName) && IndexonColumn(strTableName, key)) 
					countIndex++;
					
			}
				
			if(!k.equals("")) { //law 3ndena clustering key fel table (lessa ww need to check law clutering is the index
				Object clusteringKeyValue=htblColNameValue.get(k);
				String pageNameneeded="";
				
				if(IndexonColumn(strTableName, clusteringName)) { //lw fi index hangib page name of the tuple el 3ndo el clustering key value da keda
					String ClusteringIndexName = getIndexNameFromMetadata(strTableName, clusteringName);
                    bplustree bptOfClustering = bplustree.deserializeIndex(ClusteringIndexName);                 
                    double pageNum=bptOfClustering.search(clusteringKeyValue).get(0);
                    pageNameneeded= strTableName+ (int)pageNum;
				}
				else { //lw mafish index hangib page name of the tuple el 3ndo el clustering key value da keda
				   pageNameneeded=getPageNameToUpdate(strTableName,clusteringKeyValue);
				}
				
				double pgnum= getPageNumber(strTableName,pageNameneeded);
				Page p=null;
				//Page p=Page.deserialzePage(pageNameneeded);
				
				Tuple tuple=Page.getTuple(strTableName,pageNameneeded,clusteringKeyValue);
				if(containsSubstring(tuple.toString(),s)) { //checking lw f3lan han3mel delete lel tuple da
					p=Page.deserialzePage(pageNameneeded);
        			int index=gettupleindex(strTableName, p, tuple);
    				
    				//deleting from all columns that have index on them
    				Enumeration<String> columnNames = tuple.ht.keys();
                    while (columnNames.hasMoreElements()) {
                    	System.out.println("ana fel while");
                        String colName = columnNames.nextElement();
                        if (IndexonColumn(strTableName, colName)) {
                        	System.out.println(colName+"in the enumeration");//check mwdoo3 el clustering key
                            String indexName = getIndexNameFromMetadata(strTableName, colName);
                            bplustree bpt = bplustree.deserializeIndex(indexName);
                            Object key=tuple.ht.get(colName);
                            bpt.deletefordup(key,(int)(pgnum) );
                            bplustree.serializeIndex(bpt, indexName);
                        }
                    }
                    
                    //fixing ranges
                    int indexInTuplesRangeVector= t.fileNames.indexOf(pageNameneeded);
            		Object clusteringMin=t.tuplesRanges.get(indexInTuplesRangeVector)[0];
            		Object clusteringMax=t.tuplesRanges.get(indexInTuplesRangeVector)[1];
            		
                    if (compare(clusteringMin,clusteringKeyValue)==0) {
            			Object newMin=p.tuples.get(1).getClusteringKeyValue(clusteringName);
            			t.tuplesRanges.get(indexInTuplesRangeVector)[0]=newMin;
            		}
            		if (compare(clusteringMax,clusteringKeyValue)==0) {
            			Object newMax=p.tuples.get(p.tuples.size()-2).getClusteringKeyValue(clusteringName);
            			t.tuplesRanges.get(indexInTuplesRangeVector)[1]=newMax;
            		}
                    
                    //deleting from table and removing from  page lw fedyet
                    p.tuples.remove(index);
                    if(p.tuples.size()==0) {
    					File file = new File(pageNameneeded + ".ser");
    					file.delete();
    					t.fileNames.remove(pageNameneeded);
    				}else {
    					Page.serializePage(p,pageNameneeded);
    				}
        			
        		}
				
				//int index=gettupleindex(strTableName, p, tuple);
				//p.tuples.remove(index);
//				if(p.tuples.size()==0) {
//					File file = new File(pageNameneeded + ".ser");
//					file.delete();
//					t.fileNames.remove(pageNameneeded);
//				}else {
//					Page.serializePage(p,pageNameneeded);
//				}

				}
			else if(countIndex>0) {// if at least 1 index 8er clustering index
				
				   System.out.println("countIndex>0");
				    Enumeration<String> columnNames = htblColNameValue.keys();
			        while (columnNames.hasMoreElements()) {
			            String colName = columnNames.nextElement();
			            if (!colName.equals(clusteringName) && IndexonColumn(strTableName, colName)) {
			                String indexName = getIndexNameFromMetadata(strTableName, colName);
			                bplustree index = bplustree.deserializeIndex(indexName);
			                indexObj.add(index);
			                Vector <Double> pagesIndices =index.search(htblColNameValue.get(colName));
			                Collections.sort(pagesIndices);// vector is now sorted
			                System.out.println("pages indices: "+pagesIndices);
			                double valueSoFar=-1;
			                Page p=null;
			                String pageNameneeded="";
			                for(int i=0;i<pagesIndices.size();i++) {
			                	if(valueSoFar!=pagesIndices.get(i)) {
			                		valueSoFar=pagesIndices.get(i);
			                		pageNameneeded=strTableName+(int) Math.ceil(pagesIndices.get(i));
			                		p=Page.deserialzePage(strTableName+(int) Math.ceil(pagesIndices.get(i)));
			                		 for(int j=0;j<p.tuples.size();j++) {
			                			 Tuple tuple=p.tuples.get(j);
			     		        		System.out.println("cl key: "+tuple.getClusteringKeyValue(clusteringName));
			     		        		if(containsSubstring(tuple.toString(),s)) {
			     		        			int index1=gettupleindex(strTableName, p, tuple);
			     		        			if(IndexonColumn(strTableName, clusteringName)) {
			     		        				System.out.println("index on cl key");
			     		    		        	String indexName1 = getIndexNameFromMetadata(strTableName, clusteringName);
			     		                        bplustree bpt = bplustree.deserializeIndex(indexName1);
			     		                       Object ClusteringValue=tuple.getClusteringKeyValue(clusteringName);		                       
			     		                        bpt.deletefordup(ClusteringValue, getPageNumber(strTableName,strTableName+(int) Math.ceil(pagesIndices.get(i))));
			     		                        bplustree.serializeIndex(bpt, indexName1);
			     		                        System.out.println("deleted from bplustree");
			     		    		        }
			     		        			int indexInTuplesRangeVector= t.fileNames.indexOf(pageNameneeded);
			    		            		Object clusteringMin=t.tuplesRanges.get(indexInTuplesRangeVector)[0];
			    		            		Object clusteringMax=t.tuplesRanges.get(indexInTuplesRangeVector)[1];
			    		            		
			    		                    if (compare(clusteringMin,tuple.getClusteringKeyValue(clusteringName))==0) {
			    		            			Object newMin=p.tuples.get(1).getClusteringKeyValue(clusteringName);
			    		            			t.tuplesRanges.get(indexInTuplesRangeVector)[0]=newMin;
			    		            		}
			    		            		if (compare(clusteringMax,tuple.getClusteringKeyValue(clusteringName))==0) {
			    		            			Object newMax=p.tuples.get(p.tuples.size()-2).getClusteringKeyValue(clusteringName);
			    		            			t.tuplesRanges.get(indexInTuplesRangeVector)[1]=newMax;
			    		            		}
			     		    				p.tuples.remove(index1);
			     		    				j--;
			     		    				System.out.println("removed tuple");
			     		    				System.out.println(j);
			     		    				//Page.serializePage(p,pageNameneeded);
			     		        			
			     		        		}
			                		 }
			                       
			                		
			                	}	
			                	if(p.tuples.size()==0) {
									File file = new File(pageNameneeded + ".ser");
									file.delete();
									t.fileNames.remove(pageNameneeded);
								}else {
									Page.serializePage(p,pageNameneeded);
								}
			            }

			        }
				    	
				}
			        System.out.println("vector of indices");
			      //  printVector(indices);
			        System.out.println("end of vector");
			       // deletion(indices,countIndex,t,strTableName,s);
			        
				}
			        
			else if(countIndex==0) { //law 3ndy index 3ala l id  aw wala index 5ales
				
		        // else {
		      // String s= hashtostring(htblColNameValue);
		        for(int i=0;i<=t.fileNames.size()-1;i++){
		        	String pageNameneeded=t.fileNames.get(i);
		        	Page p=Page.deserialzePage(pageNameneeded);
		        	System.out.println("p.tuples.size() "+p.tuples.size());
		        	int l=0;
		        	for(int j=0;j<p.tuples.size();j++){
		        		Tuple tuple=p.tuples.get(j);
		        		System.out.println("cl key: "+tuple.getClusteringKeyValue(clusteringName));
		        		if(containsSubstring(tuple.toString(),s)) {
		        			int index=gettupleindex(strTableName, p, tuple);
		        			if(IndexonColumn(strTableName, clusteringName)) {
		        				System.out.println("index on cl key");
		    		        	String indexName = getIndexNameFromMetadata(strTableName, clusteringName);
		                        bplustree bpt = bplustree.deserializeIndex(indexName);
		                       Object ClusteringValue=tuple.getClusteringKeyValue(clusteringName);		                       
		                        bpt.deletefordup(ClusteringValue, getPageNumber(strTableName,pageNameneeded));
		                        bplustree.serializeIndex(bpt, indexName);
		                        System.out.println("deleted from bplustree");
		    		        }
		        			int indexInTuplesRangeVector= t.fileNames.indexOf(pageNameneeded);
		            		Object clusteringMin=t.tuplesRanges.get(indexInTuplesRangeVector)[0];
		            		Object clusteringMax=t.tuplesRanges.get(indexInTuplesRangeVector)[1];
		            		
		                    if (compare(clusteringMin,tuple.getClusteringKeyValue(clusteringName))==0) {
		            			Object newMin=p.tuples.get(1).getClusteringKeyValue(clusteringName);
		            			t.tuplesRanges.get(indexInTuplesRangeVector)[0]=newMin;
		            		}
		            		if (compare(clusteringMax,tuple.getClusteringKeyValue(clusteringName))==0) {
		            			Object newMax=p.tuples.get(p.tuples.size()-2).getClusteringKeyValue(clusteringName);
		            			t.tuplesRanges.get(indexInTuplesRangeVector)[1]=newMax;
		            		}
		    				p.tuples.remove(index);
		    				j--;
		    				System.out.println("removed tuple");
		    				System.out.println(j);
		    				//Page.serializePage(p,pageNameneeded);
		        			
		        		}
		        	
		        		
			         }
		        
		             if(p.tuples.size()==0) {
						File file = new File(pageNameneeded + ".ser");
						file.delete();
						t.fileNames.remove(pageNameneeded);
					}else {
						Page.serializePage(p,pageNameneeded);
					}
		       //  }		
		       }
		        
				
		}
			
			Table.serializeTable(t,strTableName);
		    }
		 	}catch(DBAppException db) {
				System.out.println(db.getMessage());
			}

			// }      
			//      throw new DBAppException("not implemented yet");
			}
	
	public static void AddToIndexVector(double numPage,String strTableName, Object key,String colName,Vector<double[]> indexVec) {
		double[] arr= new double[2];
		int n=(int)numPage;
		String pageName=strTableName+""+n;
		Page p=Page.deserialzePage(pageName);
		for(int j=0;j<=p.tuples.size()-1;j++){
    		Tuple tuple=p.tuples.get(j);
    		if(compare(tuple.getcolvalue(colName),key)==0) { //if key is present in tuple
    			arr[0]=	numPage-1;
    			arr[1]=j;
    			indexVec.add(arr);
    		}
    		
		}
	
		
	}
//	public static void AddToIndexVector(double pageNum,Vector<Double> tuplesIndex,Vector<Vector<Vector<Double>>> indexVec) {
//		//int[] arr= new int[2];
//		
//		Vector <Double>pageNumber= new Vector<Double>();
//		pageNumber.add(pageNum);
//		Vector <Vector<Double>> v = new Vector<Vector<Double>>();
//		v.add(pageNumber);
//		v.add(tuplesIndex);
//		indexVec.add(v);
//		
//		
//	}
	//public static void deletion(Vector<double[]> indexVec, int indexCount,bplustree bpt,Table tbl,String tblName,Object key,String iName,String hash,boolean flag)
	public static void deletion(Vector<double[]> indexVec, int indexCount,Table tbl,String tblName,String hash) {
		int count=0;
		Page p=null;
		String pageName="";
		double vsofar=-1;
		for(int i=0;i<indexVec.size();i++) {
			
			double[] arr=indexVec.get(i);
			
			count=0;
			for(int j=i+1;j<indexVec.size();j++) {
				if(Arrays.equals(arr, indexVec.get(i))) {
					count++;	
				}
				
			}
            if(count+1==indexCount) {
            	double pIndex=arr[0];
            	double tIndex=arr[1];
            	if(vsofar!=arr[0]) {
            		vsofar=arr[0];
            		 pageName=tblName+""+(int)(pIndex+1);
               	     p=Page.deserialzePage(pageName);
            	}
            	
            	
            	int indexInTuplesRangeVector= tbl.fileNames.indexOf(pageName);
        		Object clusteringMin=tbl.tuplesRanges.get(indexInTuplesRangeVector)[0];
        		Object clusteringMax=tbl.tuplesRanges.get(indexInTuplesRangeVector)[1];
        		String clusteringName= Table.getClusteringKeyName(tblName);
        		
        		if(containsSubstring((p.tuples.get((int)tIndex)).toString(),hash)){
      			
        		if (compare(clusteringMin,p.tuples.get((int)tIndex).getClusteringKeyValue(clusteringName))==0) {
        			Object newMin=p.tuples.get(1).getClusteringKeyValue(clusteringName);
        			tbl.tuplesRanges.get((int)pIndex)[0]=newMin;
        		}
        		if (compare(clusteringMax,p.tuples.get((int)tIndex).getClusteringKeyValue(clusteringName))==0) {
        			Object newMax=p.tuples.get(p.tuples.size()-2).getClusteringKeyValue(clusteringName);
        			tbl.tuplesRanges.get((int)pIndex)[1]=newMax;
        		}
        		
        		Tuple t= p.tuples.get((int)tIndex);
        		Enumeration<String> columnNames = t.ht.keys();
                while (columnNames.hasMoreElements()) {
                    String colName = columnNames.nextElement();
                    if (!colName.equals(clusteringName) && IndexonColumn(tblName, colName)) {//check mwdoo3 el clustering key
                        String indexName = getIndexNameFromMetadata(tblName, colName);
                        bplustree index = bplustree.deserializeIndex(indexName);
                        Object key=t.ht.get(colName);
                        index.deletefordup(key,(int)(pIndex+1) );
                        bplustree.serializeIndex(index, indexName);
                    }
                }
        		
        		
            	p.tuples.remove((int)tIndex);
            	if(p.tuples.size()==0) {
					File file = new File(pageName + ".ser");
					file.delete();
					tbl.fileNames.remove(pageName);
				}else {
					Page.serializePage(p,pageName);
				}
        			
            //	bpt.deletefordup(key,(int)(pIndex+1) );
            	
       
			
            }
		}
		//bplustree.serializeIndex(bpt, iName);
		
			
		}
	}
	

	public static String hashtostring(Hashtable<String, Object> htbl) {
        Collection<Object> values = htbl.values();
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
	public static boolean containsSubstring(String mainString, String subString) {
        Vector<String> main = new Vector<>(); // Initialize main Vector
        Vector<String> sub = new Vector<>();  // Initialize sub Vector
        
        // Split mainString by comma and add tokens to main Vector
        String[] mainpart = mainString.split(",");
        for (int i = 0; i < mainpart.length; i++) {
            main.add(mainpart[i]);
        }

        // Split subString by comma and add tokens to sub Vector
        String[] subpart = subString.split(",");
        for (int i = 0; i < subpart.length; i++) {
            sub.add(subpart[i]);
        }

        // Sort both vectors
        main.sort(null);
        sub.sort(null);

        // Check if all tokens from subString are present in mainString
        for (int i = 0; i < sub.size(); i++) {
            String res = sub.get(i);
            if (main.indexOf(res) == -1) {
                return false; // Token not found in mainString
            }
        }
        return true; // All tokens from subString found in mainString
    }
//////////////////////////////////////////////////////////////////////////////////////////


	public Vector<Tuple> changefromobjtotuple(Vector<Object> v1) {
        Vector<Tuple> temp = new Vector<>();
        
        for (int i = 0; i < v1.size(); i++) {
           
            if (v1.get(i) instanceof Tuple) {
                temp.add((Tuple) v1.get(i));
            } else if (v1.get(i) instanceof Vector<?>) {
                for (int j = 0; j < ((Vector<Tuple>) v1.get(i)).size(); j++) {
                    temp.add(((Vector<Tuple>) v1.get(i)).get(j));
                }
            }
        }
        return temp;
    }

	

	public Iterator selectFromTable(SQLTerm[] arrSQLTerms,
	        String[]  strarrOperators) throws DBAppException{
			Vector<Tuple> temp=new Vector<>();
			try {	
				for(int i=0;i<strarrOperators.length;i++) {
					if(!(strarrOperators[i]=="OR" ||strarrOperators[i]=="AND" ||strarrOperators[i]=="XOR")){
						throw new DBAppException("please enter OR or AND or XOR");
					}
				}
				if(arrSQLTerms.length ==0) {
					throw new DBAppException("please enter your SQL terms");
				}
				if(!(strarrOperators.length==arrSQLTerms.length-1)){
					throw new DBAppException("strarrOperators.length must be equal (arrSQLTerms.length-1)");
				}for(int i=0;i<arrSQLTerms.length;i++) {
				if(!Table.metadataFileExists() || !(tableExists(arrSQLTerms[i]._strTableName))&& Table.metadataFileExists() ) {
					throw new DBAppException("table entered doesn't exist");
				} if(!checkColumnBelongsToTable(arrSQLTerms[i]._strTableName,arrSQLTerms[i]._strColumnName )) {
					throw new DBAppException("Column entered doesn't exist");
	            }if(!(arrSQLTerms[i]._strOperator=="=" || arrSQLTerms[i]._strOperator=="!=" || arrSQLTerms[i]._strOperator=="<=" || arrSQLTerms[i]._strOperator=="<"|| arrSQLTerms[i]._strOperator==">=" || arrSQLTerms[i]._strOperator==">")){
	            	throw new DBAppException("please enter one of the following >, >=, <, <=, != or =");
	            }
				
				}
	                if(strarrOperators.length>0) {
	                        Vector<Object> newvec=bnzabatelorder(arrSQLTerms,strarrOperators);
	                        newvec=infixToPostfix(newvec);
	                        newvec=postfixEvaluate(newvec);
	                        temp=changefromobjtotuple(newvec);
	                }
	                else {
	                        String ClusName=Table.getClusteringKeyName(arrSQLTerms[0]._strTableName);
	                        boolean hasIndex =IndexonColumn((arrSQLTerms[0]._strTableName), (arrSQLTerms[0]._strColumnName));
	                        if(hasIndex==true ) {
	                        	temp=indexoperator((arrSQLTerms[0]._strTableName), arrSQLTerms[0]);
	                        }else {
	                                if(ClusName.equals(arrSQLTerms[0]._strColumnName)) {
	                                   if(isavailable(arrSQLTerms[0]._strTableName,arrSQLTerms[0]._objValue)) {
	                                	   String pageNameneeded = getPageNameToUpdate(((SQLTerm) arrSQLTerms[0])._strTableName, ((SQLTerm) arrSQLTerms[0])._objValue);
	                                       Page p = Page.deserialzePage(pageNameneeded);
	                                       Tuple tuple1 = Page.getTuple(((SQLTerm) arrSQLTerms[0])._strTableName, pageNameneeded, ((SQLTerm) arrSQLTerms[0])._objValue);
	                                       temp = ClusKeyop(tuple1, ((SQLTerm) arrSQLTerms[0])._strOperator, p, ((SQLTerm) arrSQLTerms[0])._strTableName, pageNameneeded);
	                                       Page.serializePage(p, pageNameneeded);
	                                   }
	                                   else {
	                                	   Object o = nearestValue(((SQLTerm)arrSQLTerms[0])._strTableName, ((SQLTerm) arrSQLTerms[0])._objValue);
	                                       String pageNameneeded = getPageNameToUpdate(((SQLTerm) arrSQLTerms[0])._strTableName, o);
	                                       Page p = Page.deserialzePage(pageNameneeded);
	                                       Tuple tuple1 = Page.getTuple(((SQLTerm) arrSQLTerms[0])._strTableName, pageNameneeded, o);
	                                       if (compare(o, ((SQLTerm) arrSQLTerms[0])._objValue) < 0) {
	                                           temp = ClusKeyopforunava(tuple1, ((SQLTerm) arrSQLTerms[0])._strOperator, p, ((SQLTerm) arrSQLTerms[0])._strTableName, pageNameneeded, false, ((SQLTerm) arrSQLTerms[0])._objValue);
	                                       } else {
	                                           temp = ClusKeyopforunava(tuple1, ((SQLTerm) arrSQLTerms[0])._strOperator, p, ((SQLTerm) arrSQLTerms[0])._strTableName, pageNameneeded, true, ((SQLTerm) arrSQLTerms[0])._objValue);
	                                       }
	                                       Page.serializePage(p, pageNameneeded);
	                                   }
	                                }else {
	                                        Vector<Tuple> v1=linearoperator(arrSQLTerms[0]);
	                                        temp=v1;
	                                }
	                        }
	                        
	                }
			

	       
			}catch(DBAppException db) {
				System.out.println(db.getMessage());
			}
			return temp.iterator();


	}
	        public static Vector<Tuple> ClusKeyop(Tuple t, String myop,Page mypage, String _strTableName, String pageNameneeded){
	                Vector<Tuple> result = new Vector<>();
	                Table tbl=Table.deserialzeTbl(_strTableName);
	                if(myop.equals("=")) {
	                        result.add(t);
	                        Page.serializePage(mypage, pageNameneeded);
	                }
	                else if(myop.equals("!=")) {
	                        for(int x=0;x<tbl.fileNames.size();x++) {
	                                Page p=Page.deserialzePage(tbl.fileNames.get(x));
	                                for(int y=0;y<p.tuples.size();y++) {
	                                        String MyClusteringKey=Table.getClusteringKeyName(_strTableName);
	                                        if(!(p.tuples.get(y).getClusteringKeyValue(MyClusteringKey)).equals(t.getClusteringKeyValue(MyClusteringKey)) ) {
	                                                result.add(p.tuples.get(y));
	                                        }
	                                        Page.serializePage(p, tbl.fileNames.get(x));

	                                }
	                        }
	                        Table.serializeTable(tbl, _strTableName);

	                }

	                else if(myop.equals(">")) {
	                        int x=getPageNumber(_strTableName,pageNameneeded);
	                        int m=gettupleindex(_strTableName,mypage,t);
	                        for(int y=x-1; y<tbl.fileNames.size();y++) {
	                                if(y==x-1) {
	                                        for(int z= m+1; z<mypage.tuples.size();z++) {
	                                                result.add(mypage.tuples.get(z));

	                                        }

	                                        Page.serializePage(mypage, pageNameneeded);

	                                }else {

	                                        Page p=Page.deserialzePage(tbl.fileNames.get(y));

	                                        for(int s=0;s<p.tuples.size();s++) {

	                                                result.add(p.tuples.get(s));

	                                                Page.serializePage(p, tbl.fileNames.get(s));

	                                        }

	                                }

	                        }

	                        Table.serializeTable(tbl, _strTableName);

	                }

	                else if(myop.equals(">=")) {

	                        int x=getPageNumber(_strTableName,pageNameneeded);

	                        int m=gettupleindex(_strTableName,mypage,t);

	                        for(int y=x-1; y<tbl.fileNames.size();y++) {

	                                if(y==x-1) {

	                                        for(int z= m; z<mypage.tuples.size();z++) {

	                                                result.add(mypage.tuples.get(z));

	                                        }

	                                        Page.serializePage(mypage, pageNameneeded);

	                                }else {



	                                        Page p=Page.deserialzePage(tbl.fileNames.get(y));



	                                        for(int s=0;s<p.tuples.size();s++) {



	                                                result.add(p.tuples.get(s));



	                                                Page.serializePage(p, tbl.fileNames.get(s));



	                                        }



	                                }

	                        }

	                        Table.serializeTable(tbl, _strTableName);
	                }



	                else if(myop.equals("<")) {
	                        int x=getPageNumber(_strTableName,pageNameneeded);
	                        int m=gettupleindex(_strTableName,mypage,t);

	                        for(int y=0; y<=x-1;y++) {



	                                if(y==x-1) {



	                                        for(int z= 0; z<m;z++) {



	                                                result.add(mypage.tuples.get(z));



	                                        }



	                                        Page.serializePage(mypage, pageNameneeded);



	                                }else {



	                                        Page p=Page.deserialzePage(tbl.fileNames.get(y));



	                                        for(int s=0;s<p.tuples.size();s++) {



	                                                result.add(p.tuples.get(s));



	                                                Page.serializePage(p, tbl.fileNames.get(s));



	                                        }



	                                }



	                        }



	                        Table.serializeTable(tbl, _strTableName);



	                       



	                }else {



	                        int x=getPageNumber(_strTableName,pageNameneeded);



	                        int m=gettupleindex(_strTableName,mypage,t);



	                       



	                        for(int y=0; y<=x-1;y++) {



	                                if(y==x-1) {



	                                        for(int z= 0; z<=m;z++) {



	                                                result.add(mypage.tuples.get(z));



	                                        }



	                                        Page.serializePage(mypage, pageNameneeded);



	                                }else {



	                                        Page p=Page.deserialzePage(tbl.fileNames.get(y));



	                                        for(int s=0;s<p.tuples.size();s++) {



	                                                result.add(p.tuples.get(s));



	                                                Page.serializePage(p, tbl.fileNames.get(s));



	                                        }



	                                }



	                        }



	                        Table.serializeTable(tbl, _strTableName);      



	                }



	                return result;
	                

	        }
	



	        public static Vector<Tuple> ClusKeyopforunava(Tuple t, String myop,Page mypage, String _strTableName, String pageNameneeded,boolean flag, Object myvalue){



	                Vector<Tuple> result = new Vector<>();



	                Table tbl=Table.deserialzeTbl(_strTableName);



	                if(myop.equals("=")) {

	                }



	                else if(myop.equals("!=")) {

	                        for(int x=0;x<tbl.fileNames.size();x++) {



	                                Page p=Page.deserialzePage(tbl.fileNames.get(x));



	                                for(int y=0;y<p.tuples.size();y++) {



	                                                result.add(p.tuples.get(y));



	                                        }



	                                        Page.serializePage(p, tbl.fileNames.get(x));



	                                }



	                        Table.serializeTable(tbl, _strTableName);



	                }



	                else if(myop.equals(">")) {



	                        if(flag) { //yb2a my nearestvalue akbar mny



	                        int x=getPageNumber(_strTableName,pageNameneeded);



	                        int m=gettupleindex(_strTableName,mypage,t);



	                        for(int y=x-1; y<tbl.fileNames.size();y++) {



	                                if(y==x-1) {



	                                        for(int z= m; z<mypage.tuples.size();z++) {



	                                                result.add(mypage.tuples.get(z));



	                                        }



	                                        Page.serializePage(mypage, pageNameneeded);



	                                }else {



	                                        Page p=Page.deserialzePage(tbl.fileNames.get(y));



	                                        for(int s=0;s<p.tuples.size();s++) {



	                                                result.add(p.tuples.get(s));



	                                                Page.serializePage(p, tbl.fileNames.get(s));



	                                        }



	                                }



	                        }



	                        Table.serializeTable(tbl, _strTableName);



	                }else { //nearestvalue asghar meny



	                        int x=getPageNumber(_strTableName,pageNameneeded);



	                        int m=gettupleindex(_strTableName,mypage,t);



	                        for(int y=x-1; y<tbl.fileNames.size();y++) {



	                                if(y==x-1) {



	                                        for(int z= m+1; z<mypage.tuples.size();z++) {

	                                                String MyClusteringKey=Table.getClusteringKeyName(_strTableName);



	                                                Object o=mypage.tuples.get(z).getClusteringKeyValue(MyClusteringKey);



	                                                if((compare(o,myvalue)>0)) {



	                                                        result.add(mypage.tuples.get(z));



	                                                }



	                                        }
	                                        Page.serializePage(mypage, pageNameneeded);
	                                }else {
	                                        Page p=Page.deserialzePage(tbl.fileNames.get(y));

	                                        for(int s=0;s<p.tuples.size();s++) {



	                                                String MyClusteringKey=Table.getClusteringKeyName(_strTableName);



	                                                Object o=p.tuples.get(s).getClusteringKeyValue(MyClusteringKey);



	                                                if((compare(o,myvalue)>0)) {



	                                                        result.add(p.tuples.get(s));



	                                                }



	                                                Page.serializePage(p, tbl.fileNames.get(s));



	                                        }



	                                }



	                        }



	                }



	                        Table.serializeTable(tbl, _strTableName);



	                }



	                else if(myop.equals(">=")) {



	                        if(flag) {



	                        int x=getPageNumber(_strTableName,pageNameneeded);



	                        int m=gettupleindex(_strTableName,mypage,t);



	                        for(int y=x-1; y<tbl.fileNames.size();y++) {



	                                if(y==x-1) {



	                                        for(int z= m; z<mypage.tuples.size();z++) {



	                                                result.add(mypage.tuples.get(z));



	                                        }



	                                        Page.serializePage(mypage, pageNameneeded);



	                                }else {



	                                        Page p=Page.deserialzePage(tbl.fileNames.get(y));



	                                        for(int s=0;s<p.tuples.size();s++) {



	                                                result.add(p.tuples.get(s));



	                                                Page.serializePage(p, tbl.fileNames.get(s));



	                                        }



	                                }



	                        }



	                        Table.serializeTable(tbl, _strTableName);



	                        }



	                        else {



	                                int x=getPageNumber(_strTableName,pageNameneeded);



	                                int m=gettupleindex(_strTableName,mypage,t);



	                                for(int y=x-1; y<tbl.fileNames.size();y++) {



	                                        if(y==x-1) {



	                                                for(int z= m+1; z<mypage.tuples.size();z++) {



	                       



	                                                        String MyClusteringKey=Table.getClusteringKeyName(_strTableName);



	                                                        Object o=mypage.tuples.get(z).getClusteringKeyValue(MyClusteringKey);



	                                                        if((compare(o,myvalue)>0)) {



	                                                                result.add(mypage.tuples.get(z));



	                                                        }



	                                                }



	                                                Page.serializePage(mypage, pageNameneeded);



	                                        }else {



	                                                Page p=Page.deserialzePage(tbl.fileNames.get(y));



	                                                for(int s=0;s<p.tuples.size();s++) {



	                                                        String MyClusteringKey=Table.getClusteringKeyName(_strTableName);



	                                                        Object o=p.tuples.get(s).getClusteringKeyValue(MyClusteringKey);



	                                                        if((compare(o,myvalue)>0)) {



	                                                                result.add(p.tuples.get(s));



	                                                        }



	                                                        Page.serializePage(p, tbl.fileNames.get(s));



	                                                }



	                                        }



	                                }



	                        }



	                                Table.serializeTable(tbl, _strTableName);      



	                        }



	                else if(myop.equals("<")) {



	                    String page1=tbl.fileNames.get(tbl.fileNames.size()-1);



	                       Page p1= Page.deserialzePage(page1);



	                       Object h=p1.tuples.get(p1.tuples.size()-1).getClusteringKeyValue(Table.getClusteringKeyName(_strTableName));



	                       int insertionIndex = 0;







	                       if(compare(myvalue,h)>0) {



	                            for(int i=0;i< tbl.fileNames.size();i++) {



	                               Page p=Page.deserialzePage(tbl.fileNames.get(i));



	                               for(int j=0;j<p.tuples.size();j++) {

	                                               result.add(p.tuples.get(j));

	                               }



	                               Page.serializePage(p, tbl.fileNames.get(i));



	                       }



	                       }



	                       else {



	                        if(flag) { //nearest value akbar meny 
	                        int x=getPageNumber(_strTableName,pageNameneeded);



	                        int m=gettupleindex(_strTableName,mypage,t);                       



	                        for(int y=0; y<=x-1;y++) {



	                                if(y==x-1) {



	                                 Page p=Page.deserialzePage(tbl.fileNames.get(y));



	                                        for(int z= 0; z<=m;z++) {



	                                                String MyClusteringKey=Table.getClusteringKeyName(_strTableName);



	                                                Object o=mypage.tuples.get(z).getClusteringKeyValue(MyClusteringKey);



	                                                if((compare(o,myvalue)<0)) {



	                                                        result.add(mypage.tuples.get(z));



	                                                }



	                                        }



	                                        Page.serializePage(mypage, pageNameneeded);



	                                }else {



	                                 



	                                        Page p=Page.deserialzePage(tbl.fileNames.get(y));



	                                        for(int s=0;s<p.tuples.size();s++) {



	                                                String MyClusteringKey=Table.getClusteringKeyName(_strTableName);



	                                                Object o=p.tuples.get(s).getClusteringKeyValue(MyClusteringKey);



	                                                if((compare(o,myvalue)<0)) {



	                                                        result.add(p.tuples.get(s));



	                                                }



	                                                Page.serializePage(p, tbl.fileNames.get(s));



	                                        }



	                                }



	                        }



	                        Table.serializeTable(tbl, _strTableName);



	                        }else { // el nearest asghar meny

	                            int x=getPageNumber(_strTableName,pageNameneeded);

	                            int m=gettupleindex(_strTableName,mypage,t);

	                            for(int y=0; y<=x-1;y++) {



	                                    if(y==x-1) {



	                                         Page p=Page.deserialzePage(tbl.fileNames.get(y));



	                                            for(int z= 0; z<=m;z++) {



	                                                    String MyClusteringKey=Table.getClusteringKeyName(_strTableName);



	                                                    Object o=mypage.tuples.get(z).getClusteringKeyValue(MyClusteringKey);



	                                                            result.add(mypage.tuples.get(z));



	                                                   



	                                            }



	                                            



	                                            Page.serializePage(mypage, pageNameneeded);



	                                    }else {



	                                            Page p=Page.deserialzePage(tbl.fileNames.get(y));



	                                            for(int s=0;s<p.tuples.size();s++) {



	                                                    String MyClusteringKey=Table.getClusteringKeyName(_strTableName);



	                                                    Object o=(p.tuples.get(s)).getClusteringKeyValue(MyClusteringKey);



	                                                   



	                                                    result.add(p.tuples.get(s));



	                                                    



	                                     



	                                            }



	                                            



	                                            Page.serializePage(p, tbl.fileNames.get(y));



	                                    }



	                            }



	                            Table.serializeTable(tbl, _strTableName);      



	                    }



	                       } }else {  // <=



	                    String page1=tbl.fileNames.get(tbl.fileNames.size()-1);



	                   Page p1= Page.deserialzePage(page1);



	                   Object h=p1.tuples.get(p1.tuples.size()-1).getClusteringKeyValue(Table.getClusteringKeyName(_strTableName));



	                   int insertionIndex = 0;







	                   if(compare(myvalue,h)>0) {



	                    for(int i=0;i< tbl.fileNames.size();i++) {



	                           Page p=Page.deserialzePage(tbl.fileNames.get(i));



	                           for(int j=0;j<p.tuples.size();j++) {



	                                  



	                                           result.add(p.tuples.get(j));



	                        



	                           }



	                           Page.serializePage(p, tbl.fileNames.get(i));



	                   }



	                   }else {



	                        if(flag) {



	                         



	                                int x=getPageNumber(_strTableName,pageNameneeded);



	                                int m=gettupleindex(_strTableName,mypage,t);



	                               



	                                for(int y=0; y<=x-1;y++) {



	                                        if(y==x-1) {



	                                                for(int z= 0; z<=m;z++) {



	                                                        String MyClusteringKey=Table.getClusteringKeyName(_strTableName);



	                                                        Object o=mypage.tuples.get(z).getClusteringKeyValue(MyClusteringKey);



	                                                        if((compare(o,myvalue)<0)) {



	                                                                result.add(mypage.tuples.get(z));



	                                                        }



	                                                }



	                                                Page.serializePage(mypage, pageNameneeded);



	                                        }else {



	                                                Page p=Page.deserialzePage(tbl.fileNames.get(y));



	                                                for(int s=0;s<p.tuples.size();s++) {



	                                                        String MyClusteringKey=Table.getClusteringKeyName(_strTableName);



	                                                        Object o=p.tuples.get(s).getClusteringKeyValue(MyClusteringKey);



	                                                        if((compare(o,myvalue)<0)) {



	                                                                result.add(p.tuples.get(s));



	                                                        }



	                                                        Page.serializePage(p, tbl.fileNames.get(s));



	                                                }



	                                        }



	                                }



	                                Table.serializeTable(tbl, _strTableName);



	                }else { // law el nearest asghar meny



	                        int x=getPageNumber(_strTableName,pageNameneeded);



	                        int m=gettupleindex(_strTableName,mypage,t);



	                       



	                        for(int y=0; y<=x-1;y++) {



	                                if(y==x-1) {



	                                        for(int z= 0; z<=m;z++) {



	                                                String MyClusteringKey=Table.getClusteringKeyName(_strTableName);



	                                                Object o=mypage.tuples.get(z).getClusteringKeyValue(MyClusteringKey);



	                                               



	                                                        result.add(mypage.tuples.get(z));



	                                               



	                                        }



	                                        Page.serializePage(mypage, pageNameneeded);



	                                }else {



	                                        Page p=Page.deserialzePage(tbl.fileNames.get(y));



	                                        for(int s=0;s<p.tuples.size();s++) {



	                                                String MyClusteringKey=Table.getClusteringKeyName(_strTableName);



	                                                Object o=p.tuples.get(s).getClusteringKeyValue(MyClusteringKey);



	                                                result.add(p.tuples.get(s));



	                                                Page.serializePage(p, tbl.fileNames.get(s));



	                                        }



	                                }



	                        }



	                        Table.serializeTable(tbl, _strTableName);



	                }



	                   }



	                }



	                return result;



	        }



	        public static Vector<Tuple> linearoperator(SQLTerm s1){



	                Vector<Tuple> result = new Vector<>();



	                String myop=s1._strOperator;



	                Table tbl=Table.deserialzeTbl(s1._strTableName);



//	              switch (myop) {



	                if(myop.equals("=")) {



	                        for(int i=0;i< tbl.fileNames.size();i++) {



	                              



	                                Page p=Page.deserialzePage(tbl.fileNames.get(i));



	                                for(int j=0;j<p.tuples.size();j++) {



	                                        Object o=p.tuples.get(j).getcolvalue(s1._strColumnName);



	                             



	                                        if(compare(o, s1._objValue)==0) {






	                                                result.add(p.tuples.get(j));



	                                        }



	                                }



	                                Page.serializePage(p, tbl.fileNames.get(i));



	                        }



	                }else if(myop.equals("!=")) {



	                        for(int i=0;i< tbl.fileNames.size();i++) {



	                                Page p=Page.deserialzePage(tbl.fileNames.get(i));



	                                for(int j=0;j<p.tuples.size();j++) {



	                                        Object o=p.tuples.get(j).getcolvalue(s1._strColumnName);



	                                        if(!(compare(o, s1._objValue)==0)) {



	                                                result.add(p.tuples.get(j));



	                                        }



	                                }



	                                Page.serializePage(p, tbl.fileNames.get(i));



	                        }



	                }



	                else if(myop.equals(">")) {



	                        for(int i=0;i< tbl.fileNames.size();i++) {



	                                Page p=Page.deserialzePage(tbl.fileNames.get(i));



	                                for(int j=0;j<p.tuples.size();j++) {



	                                        Object o=p.tuples.get(j).getcolvalue(s1._strColumnName);



	                                        if(compare(o, s1._objValue)>0) {



	                                                result.add(p.tuples.get(j));



	                                        }



	                                }



	                                Page.serializePage(p, tbl.fileNames.get(i));



	                        }



	                }



	                else if(myop.equals(">=")) {



	               



	                        for(int i=0;i< tbl.fileNames.size();i++) {



	                                Page p=Page.deserialzePage(tbl.fileNames.get(i));



	                                for(int j=0;j<p.tuples.size();j++) {



	                                        Object o=p.tuples.get(j).getcolvalue(s1._strColumnName);



	                                        if(compare(o, s1._objValue)>=0) {



	                                                result.add(p.tuples.get(j));



	                                        }



	                                }



	                                Page.serializePage(p, tbl.fileNames.get(i));



	                        }



	               



	                }



	                else if(myop.equals("<")) {



	               



	                        for(int i=0;i< tbl.fileNames.size();i++) {



	                                Page p=Page.deserialzePage(tbl.fileNames.get(i));



	                                for(int j=0;j<p.tuples.size();j++) {



	                                        Object o=p.tuples.get(j).getcolvalue(s1._strColumnName);



	                                        if(compare(o, s1._objValue)<0) {



	                                                result.add(p.tuples.get(j));



	                                        }



	                                }



	                                Page.serializePage(p, tbl.fileNames.get(i));



	                        }



	                }else {



	                        for(int i=0;i< tbl.fileNames.size();i++) {



	                                Page p=Page.deserialzePage(tbl.fileNames.get(i));



	                                for(int j=0;j<p.tuples.size();j++) {



	                                        Object o=p.tuples.get(j).getcolvalue(s1._strColumnName);



	                                        if(compare(o, s1._objValue)<=0) {



	                                                result.add(p.tuples.get(j));



	                                        }



	                                }



	                                Page.serializePage(p, tbl.fileNames.get(i));



	                        }



	                }



	                return result;



	        }

	        public static Vector<Tuple> bigoperatorsXOR(Vector<Tuple> v1, Vector<Tuple> v2, String myoperator) {



	                //lel XOR BASSSS



	                Vector<Tuple> result = new Vector<>();



	                if (myoperator.equals("XOR")){



//	                      if (myoperator.equals("XOR")) {



	                            for (int i = 0; i < v1.size(); i++) {



	                                String s1 = v1.get(i).toString();



	                                boolean foundInV2 = false;



	                                for (int j = 0; j < v2.size(); j++) {



	                                    String s2 = v2.get(j).toString();



	                                    if (s1.equals(s2)) {



	                                        foundInV2 = true;



	                                        break;



	                                    }



	                                }



	                                if (!foundInV2) {



	                                    result.add(v1.get(i));



	                                }



	                            }



	                            for (int i = 0; i < v2.size(); i++) {



	                                String s2 = v2.get(i).toString();



	                                boolean foundInV1 = false;



	                                for (int j = 0; j < v1.size(); j++) {



	                                    String s1 = v1.get(j).toString();



	                                    if (s2.equals(s1)) {



	                                        foundInV1 = true;



	                                        break;



	                                    }



	                                }



	                                if (!foundInV1) {



	                                    result.add(v2.get(i));



	                                }



	                            }



	                }



	                return result;



	                       



	        }



	       



	       



	        public static Vector<Tuple> bigoperators(Vector<Tuple> v1, Vector<Tuple> v2, String myoperator) {



	                Vector<Tuple> result = new Vector<>();



//	              switch(myoperator) {



	                if(myoperator.equals("AND")) {



	                        for(int i=0;i<v1.size();i++) {



	                                String s1=v1.get(i).toString();



	                                for(int j=0;j<v2.size();j++) {



	                                        boolean flag1=false;



	                                        boolean flag2=false;



	                                        String s2=v2.get(j).toString();



	                                        if(s1.equals(s2)) {



	                                                for(int m=0;m<result.size();m++) {



	                                                        if(((result.get(m).toString()).equals(s1))) {



	                                                       



	                                                                        flag1=true;



	                                                        }



	                                                }



	                                                        if(!flag1) {



	                                                                result.add(v1.get(i));



	                                                               



	                                        }



	                                        }



	                                }



	                        }



	                }



	                if(myoperator.equals("OR")) {



	                       



	                        for(int i=0;i<v1.size();i++) {



	                       



	                                String s1=v1.get(i).toString();



	                                for(int j=0;j<v2.size();j++) {



	                               



	                                        boolean flag1=false;



	                                        boolean flag2=false;



	                                        String s2=v2.get(j).toString();



	                                        if(s1.equals(s2)) {



	                                               



	                                                for(int m=0;m<result.size();m++) {



	                                                        if(((result.get(m).toString()).equals(s1))) {



	                                                       



	                                                                        flag1=true;



	                                                        }



	                                                }



	                                                        if(!flag1) {



	                                                                result.add(v1.get(i));



	                                                               



	                                        }



	                                        }else {



	                                                for(int m=0;m<result.size();m++) { //3shan mayb2ash feh dup fe result



	                                                        if(((result.get(m).toString()).equals(s1))) {



	                                                               



	                                                                flag1=true;



	                                                        }



	                                                        if(((result.get(m).toString()).equals(s2))) {



	                                                               



	                                                                flag2=true;



	                                                        }



	                                                }



	                                                if(flag1==false && flag2==false) {



	                                                       


	                                                        result.add(v1.get(i));



	                                                        result.add(v2.get(j));



	                                                }else {



	                                                        if(flag1 && (!flag2)) {



	                                                              



	                                                                result.add(v2.get(j));



	                                                        }else {



	                                                        if(flag2 && (!flag1)) {



	                                                                result.add(v1.get(i));



	                                                        }



	                                                        }



	                                                }



	                                        }



	                                }



	                        }



	                }



	                Iterator<Tuple> iterator = result.iterator();



	                return result;



	        }



	        public String getPageNameToSelect(String strTableName, Tuple newTuple )



	        {



	                Table tbl=Table.deserialzeTbl(strTableName);



	                //Vector<String> TBLfileNames =tbl.fileNames;



	                int size= tbl.fileNames.size();



	                int low = 0;



	            int high = size - 1;



	            int mid;

	            String clusteringName= Table.getClusteringKeyName(strTableName);



	           



	            Object ClusteringKeyValue= newTuple.getClusteringKeyValue(clusteringName);


	            

	    	    

	    	    Object firstClusteringValue= tbl.tuplesRanges.get(0)[0];

	    	    //Page p1=  Page.deserialzePage(tbl.fileNames.get(0)); //tuplesrange.get0

	    	    //Tuple firstTuple= p1.tuples.get(0); //a[0]

	    	    int indexLast= size - 1;

	    	    Object lastClusteringValue = tbl.tuplesRanges.get(indexLast)[1];



//	            Page p1=  Page.deserialzePage(tbl.fileNames.get(0));

//

//	            Tuple firstTuple= t



	            if(compare(newTuple.getClusteringKeyValue(clusteringName),firstClusteringValue)<0) {

	            	



	                  return tbl.fileNames.get(0);



	            }



	            else if(compare(newTuple.getClusteringKeyValue(clusteringName),lastClusteringValue)>0)



	            {



	                  return tbl.fileNames.get(indexLast);



	            }



	            else { 



	            while(low<=high) {

	            	



	                  mid = low + (high - low) / 2;



	                  String pageName=tbl.fileNames.get(mid);




	                  if (inPage(ClusteringKeyValue,pageName,strTableName)==0) {



	                          return pageName;



	                  }



	                  else if(inPage(ClusteringKeyValue,pageName,strTableName)==-1) {



	                          high=mid-1;



	                  }



	                  else if(inPage(ClusteringKeyValue,pageName,strTableName)==1) {



	                          low=mid+1;



	                  }



	                 



	            }



	            }

	     

	            return  isavaselect(strTableName,ClusteringKeyValue);



	               



	        }



	        //-1: go left



	        //0 in page



	        //1 go right



	        public String isavaselect(String strTableName, Object myvalue) {



	            Table tbl = Table.deserialzeTbl(strTableName);



	            String clusteringName = Table.getClusteringKeyName(strTableName);

	            // Binary search initialization

	            int low = 0;

	            int high = tbl.fileNames.size() - 1;

	            // Binary search for the page where the value might exist



	            while (low <= high) {



	                int mid = low + (high - low) / 2;



	                String pageName = tbl.fileNames.get(mid);



//	                Page page = Page.deserialzePage(pageName);





	                int indexInTuplesRangeVector= tbl.fileNames.indexOf(pageName);

	                // Binary search within the current page for the value

	                //inpage 

	                if (binarySearchp(myvalue, pageName, strTableName)) {



	                    return pageName;



	                }

	                else if(tbl.fileNames.indexOf(pageName)==tbl.fileNames.size()) {

	                	return pageName;

	                }else if(compare(myvalue, tbl.tuplesRanges.get((indexInTuplesRangeVector)+1)[0])<0) {

	                	

	                	 if(myvalue instanceof Double){

	                	double x=Math.abs((double)(tbl.tuplesRanges.get((indexInTuplesRangeVector)+1)[0])-(double)myvalue);

	                	double y=Math.abs((double)(tbl.tuplesRanges.get((indexInTuplesRangeVector))[1])-(double)myvalue);

	                	if(y>x) {

	                	return tbl.fileNames.get(indexInTuplesRangeVector+1);

	                	 }else {

	                	 return  tbl.fileNames.get(indexInTuplesRangeVector);

	                	 }

	                	 }else if(myvalue instanceof Integer) {

	                	int x=Math.abs((Integer)(tbl.tuplesRanges.get((indexInTuplesRangeVector)+1)[0])-(Integer)myvalue);

	                        int y=Math.abs((Integer)(tbl.tuplesRanges.get((indexInTuplesRangeVector))[1])-(Integer)myvalue);

	                        if(y>x) {

	                        	return tbl.fileNames.get(indexInTuplesRangeVector+1);

	                	 }

	                        else {

	                        	return tbl.fileNames.get(indexInTuplesRangeVector);

	                        }

	                	 }else if(myvalue instanceof String) {

	                	 int x=Math.abs(((String)(tbl.tuplesRanges.get((indexInTuplesRangeVector)+1)[0])).compareTo((String)myvalue));

	                	 int y=Math.abs(((String)(tbl.tuplesRanges.get((indexInTuplesRangeVector))[1])).compareTo((String)myvalue));

	                	 if(y>x) {

	                	 return tbl.fileNames.get(indexInTuplesRangeVector+1);

	                	 }

	                	 else {

	                	 return  tbl.fileNames.get(indexInTuplesRangeVector);

	                	 }

	                	 }

	                }

	                else{

	                    // Adjust search range based on clustering key

//	                	int indexInTuplesRangeVector= tbl.fileNames.indexOf(pageName);

	            	Object clusteringMin=tbl.tuplesRanges.get(indexInTuplesRangeVector)[0];



	                    int compareResult = compare(myvalue,clusteringMin );



	                    if (compareResult < 0) {



	                        high = mid - 1;



	                    } else {



	                        low = mid + 1;



	                    }



	                }



	            }

	            





	            // Value not found in any page

//	            System.out.print("my value fe ava select"+ myvalue);

	            return null;



	        }







	        // Binary search within a page for the value



	        private boolean binarySearchp(Object clusteringKeyValue, String pageName, String strTableName) {



	        	Table tbl= Table.deserialzeTbl(strTableName);

	    	int indexInTuplesRangeVector= tbl.fileNames.indexOf(pageName);

	    	Object clusteringMin=tbl.tuplesRanges.get(indexInTuplesRangeVector)[0];

	    	Object clusteringMax=tbl.tuplesRanges.get(indexInTuplesRangeVector)[1];



	    	if (compare(clusteringKeyValue,clusteringMin)<0) {

	    	return false;

	    	}

	    	else if (compare(clusteringKeyValue,clusteringMax)>0) {

	    	return false;

	    	}

	    	else {

	    	return true;

	    	}



	        }

	        public Object nearestValue(String strTableName, Object myvalue) {



	        	Object o=null;



	                        Hashtable ht = new Hashtable( );



	                        ht.put("id", myvalue);



	                        Tuple t=new Tuple (ht);



	                        Table tbl=Table.deserialzeTbl(strTableName);



	                        String targetPageName= getPageNameToSelect(strTableName,t);



	                       


	                        String clusteringName= Table.getClusteringKeyName(strTableName);



	                        Page page= Page.deserialzePage(targetPageName);



	                        int low = 0;



	                        int high = page.tuples.size() - 1;



	                        String p1=tbl.fileNames.get(tbl.fileNames.size()-1);



//	                        Page p= Page.deserialzePage(p1);

	                        

	                        int size= tbl.fileNames.size();

	                        int indexLast= size - 1; 

	                	    Object h = tbl.tuplesRanges.get(indexLast)[1];



	                      



	                        int insertionIndex = 0;         



	                        if(compare(myvalue,h)>0) {



	                         o=h;



	                        }



	                        else {



	                        while (low <= high) {



	                         



	                            int mid = low + (high - low) / 2;



	                            Tuple midTuple = page.tuples.get(mid);



	                           



	                            // Compare the clustering key of the tuple at mid with the new tuple



	                            // You need to implement the compare method based on your clustering key's type



	                            if (DBApp.compare(midTuple.getClusteringKeyValue(clusteringName),t.getClusteringKeyValue(clusteringName))<=0) { // lw equal 3yzeen nfselha w teb2a exc bec no dup clustering key



	                                if(midTuple.getClusteringKeyValue(clusteringName) instanceof Double){



	                                  Tuple midtuple1=page.tuples.get(mid+1);



	                                  double x=Math.abs((double)midTuple.getClusteringKeyValue(clusteringName)-(double)myvalue);



	                                  double y=Math.abs((double)midtuple1.getClusteringKeyValue(clusteringName)-(double)myvalue);



	                                  if(x<y) {



	                                          insertionIndex = mid;



	                                                low = mid + 1;



	                                  }else {



	                                          insertionIndex = mid+1;



	                                          low = mid + 1;



	                                  }



	                                }



	                                if(midTuple.getClusteringKeyValue(clusteringName) instanceof Integer) {



	                                          Tuple midtuple1=page.tuples.get(mid+1);



	                                  int x=Math.abs((int)midTuple.getClusteringKeyValue(clusteringName)-(int)myvalue);



	                                  int y=Math.abs((int)midtuple1.getClusteringKeyValue(clusteringName)-(int)myvalue);



	                                  if(x<y) {



	                                          insertionIndex = mid;



	                                                low = mid + 1;



	                                  }else {



	                                          insertionIndex = mid+1;



	                                          low = mid + 1;



	                                  }



	                                }

	                                if(midTuple.getClusteringKeyValue(clusteringName) instanceof String) {

	                                Tuple midtuple1=page.tuples.get(mid+1);

	       	                	int x=Math.abs(((String)midTuple.getClusteringKeyValue(clusteringName)).compareTo((String)myvalue));

	       	                	int y=Math.abs(((String)midtuple1.getClusteringKeyValue(clusteringName)).compareTo((String)myvalue));

	       	                	 if(y>x) {

	       	                	 insertionIndex = mid;

                                         low = mid + 1;

	       	                	 }

	       	                	 else {

	       	                	

                                         insertionIndex = mid+1;

                                         low = mid + 1;

	       	                	 }

	       	                	 }



	                            }



	                                else {



	                                high = mid - 1;



	                            }



	                       



	                        }



	                       o=page.tuples.get(insertionIndex).getClusteringKeyValue(clusteringName);



	                        }



	                       Table.serializeTable(tbl, strTableName);



	                       Page.serializePage(page, targetPageName);



	                       



	                       return o;



	        }







	        public boolean isavailable(String strTableName, Object myvalue) {



	            Table tbl = Table.deserialzeTbl(strTableName);



	            String clusteringName = Table.getClusteringKeyName(strTableName);







	            // Binary search initialization



	            int low = 0;



	            int high = tbl.fileNames.size() - 1;







	            // Binary search for the page where the value might exist



	            while (low <= high) {



	                int mid = low + (high - low) / 2;



	                String pageName = tbl.fileNames.get(mid);



//	                Page page = Page.deserialzePage(pageName);







	                // Binary search within the current page for the value



	                if (binarySearchp(myvalue, pageName, strTableName)) {



	                    return true;



	                } else {



	                    // Adjust search range based on clustering key

	                	int indexInTuplesRangeVector= tbl.fileNames.indexOf(pageName);

	                	Object clusteringMin=tbl.tuplesRanges.get(indexInTuplesRangeVector)[0];

	                    int compareResult = compare(myvalue,clusteringMin );

	                    if (compareResult < 0) {



	                        high = mid - 1;



	                    } else {



	                        low = mid + 1;



	                    }



	                }



	            }







	            // Value not found in any page



	            return false;



	        }







	        // Binary search within a page for the value



	        private boolean binarySearchInPage(Page page, Object myvalue, String clusteringName) {



	            int low = 0;



	            int high = page.tuples.size() - 1;







	            while (low <= high) {



	                int mid = low + (high - low) / 2;



	                Object midValue = page.tuples.get(mid).getClusteringKeyValue(clusteringName);



	                int compareResult = compare(myvalue, midValue);







	                if (compareResult == 0) {



	                    return true; // Value found in this page



	                } else if (compareResult < 0) {



	                    high = mid - 1; // Value might be in the previous tuples



	                } else {



	                    low = mid + 1; // Value might be in the subsequent tuples



	                }



	            }







	            return false; // Value not found in this page



	        }
	        static int prec(Object object) {



	        if (object.equals("AND"))



	            return 3;



	        else if (object.equals("OR"))



	            return 2;



	        else if (object.equals("XOR"))



	            return 1;



	        else



	            return -1;



	    }







	    // Function to return associativity of operators



	    static char associativity(Object object) {



	        if (object.equals("AND"))



	            return 'R';



	        return 'L'; // Default to left-associative



	    }







	    // The main function to convert infix expression to postfix expression



	    static Vector<Object> infixToPostfix(Vector<Object> s) {



	        Stack<Object> stack = new Stack<>(); // Change to hold Object instead of Character



	        Vector<Object> postfix = new Vector<>(); // Change to Vector<Object>







	        for (int i = 0; i < s.size(); i++) {



	            Object c = s.get(i);







	            // If the scanned object is an operand, add it to the output vector.



	            if (!(c.equals("AND")) && !(c.equals("OR")) && !(c.equals("XOR"))) {



	                postfix.add(c);



	            } else {



	                while (!stack.isEmpty() && (prec(s.get(i)) < prec(stack.peek()) ||



	                        prec(s.get(i)) == prec(stack.peek()) &&



	                                associativity(s.get(i)) == 'L')) {



	                    postfix.add(stack.pop());



	                }



	                stack.push(c); // Push the object directly



	            }



	        }







	        // Pop all the remaining elements from the stack and add to the output vector



	        while (!stack.isEmpty()) {



	            postfix.add(stack.pop());



	        }







	        return postfix;



	    }







	    // Evaluates the given postfix expression vector and returns the result vector.



	    // Precondition: expression consists only of objects representing operands ("A", "B", etc.)



	    //                and operators ("AND", "OR", "XOR") or SQL terms

	    public static void AddToresult(double numPage,String strTableName, Object key,String colName,Vector<Tuple> result) {

	

	int n=(int)numPage;

	String pageName=strTableName+""+n;

	Page p=Page.deserialzePage(pageName);

	for(int j=0;j<=p.tuples.size()-1;j++){

	    	Tuple tuple=p.tuples.get(j);

	    	if(compare(tuple.getcolvalue(colName),key)==0) { //if key is present in tuple

	    	result.add(tuple);

	    	}

//	    	arr[0]=	numPage-1;

//	    	arr[1]=j;

//	    	indexVec.add(arr);

//	    	}

	    	

	}

	}
	    public Vector<Tuple> indexlin( Vector<Tuple> vectors,SQLTerm s1) {
	    	Vector<Tuple> result=new Vector <Tuple>();
            String myop=s1._strOperator;


            if(myop.equals("=")) {



                    for(int i=0;i< vectors.size();i++) {
                    	            Tuple t=vectors.get(i);
                                    Object o=t.getcolvalue(s1._strColumnName);

                                    if(compare(o, s1._objValue)==0) {

                                            result.add(t);

                                    }

                    }



            }else if(myop.equals("!=")) {

                for(int i=0;i< vectors.size();i++) {
    	            Tuple t=vectors.get(i);
                    Object o=t.getcolvalue(s1._strColumnName);

                    if(!(compare(o, s1._objValue)==0)) {

                            result.add(t);

                    }

                   }

            }



            else if(myop.equals(">")) {
            
                for(int i=0;i< vectors.size();i++) {
    	            Tuple t=vectors.get(i);
                    Object o=t.getcolvalue(s1._strColumnName);

                    if(compare(o, s1._objValue)>0) {

                            result.add(t);

                    }

    }

            }



            else if(myop.equals(">=")) {

                for(int i=0;i< vectors.size();i++) {
    	            Tuple t=vectors.get(i);
                    Object o=t.getcolvalue(s1._strColumnName);

                    if(compare(o, s1._objValue)>=0) {

                            result.add(t);

                    }

    }


            }



            else if(myop.equals("<")) {
                for(int i=0;i< vectors.size();i++) {
    	            Tuple t=vectors.get(i);
                    Object o=t.getcolvalue(s1._strColumnName);

                    if(compare(o, s1._objValue)<0) {

                            result.add(t);

                    }
    }

            }else {
                for(int i=0;i< vectors.size();i++) {
    	            Tuple t=vectors.get(i);
                    Object o=t.getcolvalue(s1._strColumnName);

                    if(compare(o, s1._objValue)<=0) {

                            result.add(t);

                    }

    }




            }



            return result;



    }

	    public Vector<Tuple> indexoperator(String Strtable, SQLTerm s){

	    	Vector<Tuple> result=new Vector <Tuple>();

	    	Vector<Double> temp=new Vector<Double>();

	    	Vector<Object[]> temp2= new Vector<Object[]>();

	    	String indexName = getIndexNameFromMetadata(Strtable, s._strColumnName);
	    	
	    	bplustree b=bplustree.deserializeIndex(indexName);
	    	

	    	if(s._strOperator.equals("=")) {

	    	temp=b.search(s._objValue);

	    	if(temp != null) {

	    	Collections.sort(temp);

	    	double valueSoFar=-1;

	                for(int i=0;i<temp.size();i++) {

	                	if(valueSoFar!=temp.get(i)) {

	                	valueSoFar=temp.get(i);

	                	AddToresult(valueSoFar,Strtable,s._objValue,s._strColumnName,result);

	                	}

	

	                }

	    	}

	    	}

	    	else if(s._strOperator.equals("!=")) {

	    		result=linearoperator(s);

	        }

	        else if(s._strOperator.equals(">")) {
	        	if(compare(b.firstLeaf.dictionary[0].key,s._objValue)>0) {
	        		s._objValue=b.firstLeaf.dictionary[0].key;
	        		temp2=b.lowerboundinclusive(s._objValue);
	        	}
	        	else {

	        	temp2=b.lowerboundmshinclusive(s._objValue);
	        	}

	        }

	        else if(s._strOperator.equals(">=")) {
	        	if(compare(b.firstLeaf.dictionary[0].key,s._objValue)>0) {
	        		s._objValue=b.firstLeaf.dictionary[0].key;
	        	}

	        	temp2=b.lowerboundinclusive(s._objValue);

	        }

	        else if(s._strOperator.equals("<")) {
	        	Object o=b.getMaxValue();
	        	if(compare(o,s._objValue)<0) {
	        		
	        		s._objValue=o;
	        		temp2=b.upperboundinclusive(s._objValue);
	        		
	        	}else {

	        	temp2=b.upperboundmshinclusive(s._objValue);
	        	}

	        }else { //<=
	        	Object o=b.getMaxValue();
	        	if(compare(o,s._objValue)<0) {
	        		s._objValue=o;
	        		temp2=b.upperboundinclusive(s._objValue);
	        		
	        	}else {

	        	temp2=b.upperboundinclusive(s._objValue);
	        	}
	        }
	        	
	        boolean flag=false;
	        int bigc=0;
	    	double previous=-1;  //page i am currently at
	    	for(int i=0;i<temp2.size();i++) {
	    		bigc++;
	    	
	    		for(int h=0;h<temp2.size();h++) {
	    			System.out.print(temp2.get(h)[0]+" ");
	    			System.out.print("num"+temp2.get(h)[1]);
	    			System.out.println();
	    		}
	    		
	    		
	    		if((double)(temp2.get(i))[0]!=previous) {
	    			previous=(double)(temp2.get(i))[0];
	    			System.out.println("my prev: "+previous);
	    			Page p=Page.deserialzePage(s._strTableName+(int)previous);
	    			for(int j=0; j<p.tuples.size();j++) {	
	    				Tuple t=p.tuples.get(j);
	    				System.out.println("temp2: "+ temp2.size());
	    				int c=0;
	    				for(int m=i;(m<temp2.size()); m++) {
	    					c++;
	    					
	    					if(compare(((temp2.get(m))[1]),t.getcolvalue(s._strColumnName))==0 ){
	    						
	    						
	    						result.add(t);
	    						temp2.remove(m);
	    						
	    						i--;
	    						flag=true;
	    						m--;
	    						j++;
	    						System.out.println("i "+i);
	    						System.out.println("m "+m);
	    						if(j<p.tuples.size())
	    							t=p.tuples.get(j);
	    						else
	    							break;
	    						
	    						for(int h=0;h<temp2.size();h++) {
	    							System.out.print(temp2.get(h)[0]+" ");
	    			    			System.out.print("num"+temp2.get(h)[1]);
	    			    			System.out.println();
	    			    		}
	    						System.out.println();
	    						
		    
	    					}
	    					else
	    						flag=false;
//	    					if((double)(temp2.get(m+1))[0] != previous) {
//	    						break;
//	    					}
	    					if(flag)
	    					i++; 
//   i++;
	    				}
	    				
	    			}
	    			Page.serializePage(p, s._strTableName+(int)previous);
	    		}
	    	
//	    		if(i<0) {
//	    			System.out.println("i less than 0");
//	    			i=0;
//	    		}
	    	}

	    	return result;

	    }
	    

	    public Vector<Object> postfixEvaluate(Vector<Object> exp) {
	        Stack<Object> s = new Stack<Object>();
	        Vector<Object> result = new Vector<Object>();

	        Vector<Tuple> v1 = new Vector<>();

	        Vector<Tuple> v2 = new Vector<>();


	        for (Object token : exp) {

	            if (token instanceof SQLTerm && isOperand(((SQLTerm) token)._strOperator)) {

	                s.push(token);

	            } else {
	                Object operand2 = s.pop();

	                Object operand1 = s.pop();

	                if (token.equals("AND")) {
	                	 boolean hasIndexi = IndexonColumn(((SQLTerm) operand1)._strTableName, ((SQLTerm) operand1)._strColumnName);
	                	 boolean hasIndexii = IndexonColumn(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._strColumnName);

	                	if(operand1 instanceof SQLTerm && operand2 instanceof SQLTerm && (hasIndexi || hasIndexii) ){
	                		if(hasIndexi) {

	                			v1=indexoperator(((SQLTerm) operand1)._strTableName,  ((SQLTerm) operand1));
	                			
	                			   s.push(indexlin(v1,((SQLTerm) operand2)));
	                		}
	                		else if(hasIndexii) {
	                			v2=indexoperator(((SQLTerm) operand2)._strTableName,  ((SQLTerm) operand2));
	                			   s.push(indexlin(v2,((SQLTerm) operand1)));
	                		}
	                		else if(hasIndexi && operand2 instanceof Vector<?> ) {
	                			v1=indexoperator(((SQLTerm) operand1)._strTableName,  ((SQLTerm) operand1));
	                			s.push(bigoperators(v1, (Vector<Tuple>) operand2, "AND"));
	                		}
	                		else if (hasIndexii && operand1 instanceof Vector<?>) {
	                			v2=indexoperator(((SQLTerm) operand2)._strTableName,  ((SQLTerm) operand2));
	                			s.push(bigoperators(v2, (Vector<Tuple>) operand1, "AND"));
	                		}
	                	}
	                	else {
	                    if (operand1 instanceof SQLTerm) {

	                         Table tbl=Table.deserialzeTbl(((SQLTerm) operand1)._strTableName);

	                        String ClusNamei = Table.getClusteringKeyName(((SQLTerm) operand1)._strTableName);                     
	                         if (ClusNamei.equals(((SQLTerm) operand1)._strColumnName)) {
	                        	 // Handle clustering
	                            if (isavailable(((SQLTerm) operand1)._strTableName, ((SQLTerm) operand1)._objValue)) {
	                                String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand1)._strTableName, ((SQLTerm) operand1)._objValue);
	                                Page p = Page.deserialzePage(pageNameneeded);

	                                Tuple tuple1 = Page.getTuple(((SQLTerm) operand1)._strTableName, pageNameneeded, ((SQLTerm) operand1)._objValue);

	                                v1 = ClusKeyop(tuple1, ((SQLTerm) operand1)._strOperator, p, ((SQLTerm) operand1)._strTableName, pageNameneeded);

	                                Page.serializePage(p, pageNameneeded);
	                            } else {
	                            	Object o = nearestValue(((SQLTerm) operand1)._strTableName, ((SQLTerm) operand1)._objValue);

	                                String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand1)._strTableName, o);

	                                Page p = Page.deserialzePage(pageNameneeded);

	                                Tuple tuple1 = Page.getTuple(((SQLTerm) operand1)._strTableName, pageNameneeded, o);

//	                               

	                                if (compare(o, ((SQLTerm) operand1)._objValue) < 0) {

	                                    v1 = ClusKeyopforunava(tuple1, ((SQLTerm) operand1)._strOperator, p, ((SQLTerm) operand1)._strTableName, pageNameneeded, false, ((SQLTerm) operand1)._objValue);

	                                } else {

	                                    v1 = ClusKeyopforunava(tuple1, ((SQLTerm) operand1)._strOperator, p, ((SQLTerm) operand1)._strTableName, pageNameneeded, true, ((SQLTerm) operand1)._objValue);

	                                }

	                                Page.serializePage(p, pageNameneeded);

//	                                

	                            }

	                        } else {

	                            v1 = linearoperator((SQLTerm) operand1);

	                        }


	                        if (operand2 instanceof SQLTerm) {

	                        

	                            String ClusNameii = Table.getClusteringKeyName(((SQLTerm) operand2)._strTableName);

	                           

	                             if (ClusNameii.equals(((SQLTerm) operand2)._strColumnName)) {

	                                  if (isavailable(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue)) {

//	                                 

	                                     String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue);

	                                     Page p = Page.deserialzePage(pageNameneeded);

	                                     Tuple tuple1 = Page.getTuple(((SQLTerm) operand2)._strTableName, pageNameneeded, ((SQLTerm) operand2)._objValue);

	                                     v2 = ClusKeyop(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded);

	                                     Page.serializePage(p, pageNameneeded);


	                                 } else {

	                                     Object o = nearestValue(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue);

	                                     String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand2)._strTableName, o);

	                                     Page p = Page.deserialzePage(pageNameneeded);


	                                     Tuple tuple1 = Page.getTuple(((SQLTerm) operand2)._strTableName, pageNameneeded, o);



	                                     if (compare(o, ((SQLTerm) operand2)._objValue) < 0) {



	                                         v2 = ClusKeyopforunava(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded, false, ((SQLTerm) operand2)._objValue);






	                                     } else {



	                                         v2 = ClusKeyopforunava(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded, true, ((SQLTerm) operand2)._objValue);



	                                        



	                                     }



	                                     Page.serializePage(p, pageNameneeded);



	                                    



	                                 }



	                            } else {



	       



	                                v2 = linearoperator((SQLTerm) operand2);



	                            }



	                            s.push(bigoperators(v1, v2, "AND"));

	                        } else { //operand2 msh sql term bas operand 1 ah



	                            s.push(bigoperators(v1, (Vector<Tuple>) operand2, "AND"));



	                        }

	                        Table.serializeTable(tbl, ((SQLTerm) operand1)._strTableName);



	                    } else if (operand2 instanceof SQLTerm) { // operand2 is w operand1 la



	                         Table tbl=Table.deserialzeTbl(((SQLTerm) operand2)._strTableName);



	                           String ClusNameii = Table.getClusteringKeyName(((SQLTerm) operand2)._strTableName);



	                        


	                           if (ClusNameii.equals(((SQLTerm) operand2)._strColumnName)) {



	                                  if (isavailable(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue)) {



	                                   String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue);



	                                   Page p = Page.deserialzePage(pageNameneeded);



	                                   Tuple tuple1 = Page.getTuple(((SQLTerm) operand2)._strTableName, pageNameneeded, ((SQLTerm) operand2)._objValue);



	                                   v2 = ClusKeyop(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded);



	                                   Page.serializePage(p, pageNameneeded);



	                               } else {



	                                   Object o = nearestValue(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue);



	                                   String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand2)._strTableName, o);



	                                   Page p = Page.deserialzePage(pageNameneeded);



	                                   Tuple tuple1 = Page.getTuple(((SQLTerm) operand2)._strTableName, pageNameneeded, o);



	                                   if (compare(o, ((SQLTerm) operand2)._objValue) < 0) {



	                                       v2 = ClusKeyopforunava(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded, false, ((SQLTerm) operand2)._objValue);



	                                   } else {



	                                       v2 = ClusKeyopforunava(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded, true, ((SQLTerm) operand2)._objValue);



	                                   }



	                                   Page.serializePage(p, pageNameneeded);



	                               }



	                          } else {



	                              v2 = linearoperator((SQLTerm) operand2);



	                          }



	                        s.push(bigoperators((Vector<Tuple>) operand1, v2, "AND"));



	                        Table.serializeTable(tbl, ((SQLTerm) operand2)._strTableName);



	                    } else { // law homa el 2 msh SQLTerm



	                        s.push(bigoperators((Vector<Tuple>) operand1, (Vector<Tuple>) operand2, "AND"));



	                    }


	                }
	                } else if (token.equals("OR")) {



	                 if (operand1 instanceof SQLTerm) {



	                  Table tbl=Table.deserialzeTbl(((SQLTerm) operand1)._strTableName);



	                        String ClusNamei = Table.getClusteringKeyName(((SQLTerm) operand1)._strTableName);



	                        boolean hasIndexi = IndexonColumn(((SQLTerm) operand1)._strTableName, ((SQLTerm) operand1)._strColumnName);



	                       



	                        if (hasIndexi) {
	                        	

	                        	v1=indexoperator(((SQLTerm) operand1)._strTableName,  ((SQLTerm) operand1));
	

	                        } else if (ClusNamei.equals(((SQLTerm) operand1)._strColumnName)) {

	                            // Handle clustering

	                            if (isavailable(((SQLTerm) operand1)._strTableName, ((SQLTerm) operand1)._objValue)) {


	                                String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand1)._strTableName, ((SQLTerm) operand1)._objValue);


	                                Page p = Page.deserialzePage(pageNameneeded);



	                                Tuple tuple1 = Page.getTuple(((SQLTerm) operand1)._strTableName, pageNameneeded, ((SQLTerm) operand1)._objValue);



	                                v1 = ClusKeyop(tuple1, ((SQLTerm) operand1)._strOperator, p, ((SQLTerm) operand1)._strTableName, pageNameneeded);


	                                Page.serializePage(p, pageNameneeded);

	                            } else {


	                                Object o = nearestValue(((SQLTerm) operand1)._strTableName, ((SQLTerm) operand1)._objValue);



	                                String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand1)._strTableName, o);



	                                Page p = Page.deserialzePage(pageNameneeded);



	                                Tuple tuple1 = Page.getTuple(((SQLTerm) operand1)._strTableName, pageNameneeded, o);



	                                if (compare(o, ((SQLTerm) operand1)._objValue) < 0) {



	                                    v1 = ClusKeyopforunava(tuple1, ((SQLTerm) operand1)._strOperator, p, ((SQLTerm) operand1)._strTableName, pageNameneeded, false, ((SQLTerm) operand1)._objValue);



	                                } else {



	                                    v1 = ClusKeyopforunava(tuple1, ((SQLTerm) operand1)._strOperator, p, ((SQLTerm) operand1)._strTableName, pageNameneeded, true, ((SQLTerm) operand1)._objValue);



	                                }



	                                Page.serializePage(p, pageNameneeded);


	                            }


	                        } else {


	                            v1 = linearoperator((SQLTerm) operand1);


	                        }



	                        if (operand2 instanceof SQLTerm) {


	                            String ClusNameii = Table.getClusteringKeyName(((SQLTerm) operand2)._strTableName);


	                            boolean hasIndexii = IndexonColumn(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._strColumnName);

	                            if (hasIndexii) {

	                            	v2=indexoperator(((SQLTerm) operand2)._strTableName,  ((SQLTerm) operand2));
		  

	                            } else if (ClusNameii.equals(((SQLTerm) operand2)._strColumnName)) {

	                                  if (isavailable(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue)) {


	                                     String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue);


	                                     Page p = Page.deserialzePage(pageNameneeded);

	                                     Tuple tuple1 = Page.getTuple(((SQLTerm) operand2)._strTableName, pageNameneeded, ((SQLTerm) operand2)._objValue);

	                                     v2 = ClusKeyop(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded);

	                                     Page.serializePage(p, pageNameneeded);

	                                 } else {

	                                     Object o = nearestValue(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue);

	                                     String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand2)._strTableName, o);

	                                     Page p = Page.deserialzePage(pageNameneeded);


	                                     Tuple tuple1 = Page.getTuple(((SQLTerm) operand2)._strTableName, pageNameneeded, o);

	                                     if (compare(o, ((SQLTerm) operand2)._objValue) < 0) {

	                                         v2 = ClusKeyopforunava(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded, false, ((SQLTerm) operand2)._objValue);

	                                     } else {

	                                         v2 = ClusKeyopforunava(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded, true, ((SQLTerm) operand2)._objValue);

	                                     }

	                                     Page.serializePage(p, pageNameneeded);

	                                 }

	                            } else {



	                                v2 = linearoperator((SQLTerm) operand2);

//	                                System.out.println("GOWA EL ORRR WEL OPERAND2 MSH INDEX AW CLUSTERING KEYYYY w v2: "+v2);


	                            }


	                            s.push(bigoperators(v1, v2, "OR"));

	                            System.out.print(s);


	                        } else { //operand2 msh sql term bas operand 1 ah

	                            s.push(bigoperators(v1, (Vector<Tuple>) operand2, "OR"));

	                        }

	                        Table.serializeTable(tbl, ((SQLTerm) operand1)._strTableName);

	                    } else if (operand2 instanceof SQLTerm) { // operand2 is w operand1 la



	                          Table tbl=Table.deserialzeTbl(((SQLTerm) operand2)._strTableName);



	                           String ClusNameii = Table.getClusteringKeyName(((SQLTerm) operand2)._strTableName);



	                          boolean hasIndexii = IndexonColumn(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._strColumnName);



	                          if (hasIndexii) {



	                        		v2=indexoperator(((SQLTerm) operand2)._strTableName,  ((SQLTerm) operand2));
		                			


	                          } else if (ClusNameii.equals(((SQLTerm) operand2)._strColumnName)) {



	                                  if (isavailable(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue)) {



	                                   String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue);



	                                   Page p = Page.deserialzePage(pageNameneeded);



	                                   Tuple tuple1 = Page.getTuple(((SQLTerm) operand2)._strTableName, pageNameneeded, ((SQLTerm) operand2)._objValue);



	                                   v2 = ClusKeyop(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded);



	                                   Page.serializePage(p, pageNameneeded);



	                               } else {



	                                   Object o = nearestValue(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue);



	                                   String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand2)._strTableName, o);



	                                   Page p = Page.deserialzePage(pageNameneeded);



	                                   Tuple tuple1 = Page.getTuple(((SQLTerm) operand2)._strTableName, pageNameneeded, o);



	                                   if (compare(o, ((SQLTerm) operand2)._objValue) < 0) {



	                                       v2 = ClusKeyopforunava(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded, false, ((SQLTerm) operand2)._objValue);



	                                   } else {



	                                       v2 = ClusKeyopforunava(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded, true, ((SQLTerm) operand2)._objValue);



	                                   }



	                                   Page.serializePage(p, pageNameneeded);



	                               }



	                          } else {



	                              v2 = linearoperator((SQLTerm) operand2);



	                          }



	                        s.push(bigoperators((Vector<Tuple>) operand1, v2, "OR"));



	                        Table.serializeTable(tbl, ((SQLTerm) operand2)._strTableName);



	                    } else { // law homa el 2 msh SQLTerm



	                        s.push(bigoperators((Vector<Tuple>) operand1, (Vector<Tuple>) operand2, "OR"));



	                    }



	                } else {



	                 if (operand1 instanceof SQLTerm) {



	                  Table tbl=Table.deserialzeTbl(((SQLTerm) operand1)._strTableName);



	                        String ClusNamei = Table.getClusteringKeyName(((SQLTerm) operand1)._strTableName);



	                        boolean hasIndexi = IndexonColumn(((SQLTerm) operand1)._strTableName, ((SQLTerm) operand1)._strColumnName);







	                        if (hasIndexi) {

	                        	v1=indexoperator(((SQLTerm) operand1)._strTableName,  ((SQLTerm) operand1));
	                	


	                        } else if (ClusNamei.equals(((SQLTerm) operand1)._strColumnName)) {


	                            // Handle clustering


	                            if (isavailable(((SQLTerm) operand1)._strTableName, ((SQLTerm) operand1)._objValue)) {



	                                String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand1)._strTableName, ((SQLTerm) operand1)._objValue);



	                                Page p = Page.deserialzePage(pageNameneeded);



	                                Tuple tuple1 = Page.getTuple(((SQLTerm) operand1)._strTableName, pageNameneeded, ((SQLTerm) operand1)._objValue);



	                                v1 = ClusKeyop(tuple1, ((SQLTerm) operand1)._strOperator, p, ((SQLTerm) operand1)._strTableName, pageNameneeded);



	                                Page.serializePage(p, pageNameneeded);



	                            } else {



	                                Object o = nearestValue(((SQLTerm) operand1)._strTableName, ((SQLTerm) operand1)._objValue);



	                                String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand1)._strTableName, o);



	                                Page p = Page.deserialzePage(pageNameneeded);



	                                Tuple tuple1 = Page.getTuple(((SQLTerm) operand1)._strTableName, pageNameneeded, o);



	                                if (compare(o, ((SQLTerm) operand1)._objValue) < 0) {



	                                    v1 = ClusKeyopforunava(tuple1, ((SQLTerm) operand1)._strOperator, p, ((SQLTerm) operand1)._strTableName, pageNameneeded, false, ((SQLTerm) operand1)._objValue);



	                                } else {



	                                    v1 = ClusKeyopforunava(tuple1, ((SQLTerm) operand1)._strOperator, p, ((SQLTerm) operand1)._strTableName, pageNameneeded, true, ((SQLTerm) operand1)._objValue);



	                                }



	                                Page.serializePage(p, pageNameneeded);



	                            }



	                        } else {



	                            v1 = linearoperator((SQLTerm) operand1);



	                        }







	                        if (operand2 instanceof SQLTerm) {



	                            String ClusNameii = Table.getClusteringKeyName(((SQLTerm) operand2)._strTableName);



	                            boolean hasIndexii = IndexonColumn(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._strColumnName);



	                            if (hasIndexii) {
	                            	v2=indexoperator(((SQLTerm) operand2)._strTableName,  ((SQLTerm) operand2));
		                		


	                            } else if (ClusNameii.equals(((SQLTerm) operand2)._strColumnName)) {



	                                  if (isavailable(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue)) {



	                                     String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue);



	                                     Page p = Page.deserialzePage(pageNameneeded);



	                                     Tuple tuple1 = Page.getTuple(((SQLTerm) operand2)._strTableName, pageNameneeded, ((SQLTerm) operand2)._objValue);



	                                     v2 = ClusKeyop(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded);



	                                     Page.serializePage(p, pageNameneeded);



	                                 } else {



	                                     Object o = nearestValue(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue);



	                                     String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand2)._strTableName, o);



	                                     Page p = Page.deserialzePage(pageNameneeded);



	                                     Tuple tuple1 = Page.getTuple(((SQLTerm) operand2)._strTableName, pageNameneeded, o);



	                                     if (compare(o, ((SQLTerm) operand2)._objValue) < 0) {



	                                         v2 = ClusKeyopforunava(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded, false, ((SQLTerm) operand2)._objValue);



	                                     } else {



	                                         v2 = ClusKeyopforunava(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded, true, ((SQLTerm) operand2)._objValue);



	                                     }



	                                     Page.serializePage(p, pageNameneeded);



	                                 }



	                            } else {



	                                v2 = linearoperator((SQLTerm) operand2);



	                            }



	                            s.push(bigoperatorsXOR(v1, v2, "XOR"));







	                        } else { //operand2 msh sql term bas operand 1 ah



	                            s.push(bigoperatorsXOR(v1, (Vector<Tuple>) operand2, "XOR"));



	                        }



	                        Table.serializeTable(tbl, ((SQLTerm) operand1)._strTableName);



	                    } else if (operand2 instanceof SQLTerm) { // operand2 is w operand1 la



	                         Table tbl=Table.deserialzeTbl(((SQLTerm) operand2)._strTableName);



	                           String ClusNameii = Table.getClusteringKeyName(((SQLTerm) operand2)._strTableName);



	                          boolean hasIndexii = IndexonColumn(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._strColumnName);



	                          if (hasIndexii) {
	                        		v2=indexoperator(((SQLTerm) operand2)._strTableName,  ((SQLTerm) operand2));
		                		
	                          } else if (ClusNameii.equals(((SQLTerm) operand2)._strColumnName)) {



	                                  if (isavailable(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue)) {



	                                   String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue);



	                                   Page p = Page.deserialzePage(pageNameneeded);



	                                   Tuple tuple1 = Page.getTuple(((SQLTerm) operand2)._strTableName, pageNameneeded, ((SQLTerm) operand2)._objValue);



	                                   v2 = ClusKeyop(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded);



	                                   Page.serializePage(p, pageNameneeded);



	                               } else {



	                                   Object o = nearestValue(((SQLTerm) operand2)._strTableName, ((SQLTerm) operand2)._objValue);



	                                   String pageNameneeded = getPageNameToUpdate(((SQLTerm) operand2)._strTableName, o);



	                                   Page p = Page.deserialzePage(pageNameneeded);



	                                   Tuple tuple1 = Page.getTuple(((SQLTerm) operand2)._strTableName, pageNameneeded, o);



	                                   if (compare(o, ((SQLTerm) operand2)._objValue) < 0) {



	                                       v2 = ClusKeyopforunava(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded, false, ((SQLTerm) operand2)._objValue);



	                                   } else {



	                                       v2 = ClusKeyopforunava(tuple1, ((SQLTerm) operand2)._strOperator, p, ((SQLTerm) operand2)._strTableName, pageNameneeded, true, ((SQLTerm) operand2)._objValue);



	                                   }



	                                   Page.serializePage(p, pageNameneeded);



	                               }



	                          } else {



	                              v2 = linearoperator((SQLTerm) operand2);



	                          }



	                        s.push(bigoperatorsXOR((Vector<Tuple>) operand1, v2, "XOR"));



	                        Table.serializeTable(tbl, ((SQLTerm) operand2)._strTableName);



	                    } else { // law homa el 2 msh SQLTerm



	                        s.push(bigoperatorsXOR((Vector<Tuple>) operand1, (Vector<Tuple>) operand2, "XOR"));


	                    }

	                }

	            }

	        }


	        result.add(s.pop());


	        return result;



	    }



	    // Helper method to check if a string represents an operand



	    private static boolean isOperand(String str) {




	        return !str.equals("AND") && !str.equals("OR") && !str.equals("XOR");



	    }







	    public static Vector<Object> bnzabatelorder(SQLTerm[] arrSQLTerms, String[]  strarrOperators){



	         Vector<Object> v1=new Vector<>();



	         for(int i=0;i<strarrOperators.length;i++) {



	                 if(i==0) {



	                 v1.add(arrSQLTerms[i]);



	                 v1.add(strarrOperators[i]);



	                 v1.add(arrSQLTerms[i+1]);



	                



	                 }else {

	                         v1.add(strarrOperators[i]);
	                         v1.add(arrSQLTerms[i+1]);

	                 }

	         }
	         return v1;
	    }
	
////////////////////////////////////////////////////////////////////////////////////////
	
	    public static void resetAllIndices(String tableName) {
	    	DBApp dbApp=new DBApp();
	        String metadataFileName = "metadata.csv";
	        try (BufferedReader reader = new BufferedReader(new FileReader(metadataFileName))) {
	            List<String> lines = new ArrayList<>();
	            String line;
	            boolean tableFound = false;
	            // Read each line in the metadata file
	            while ((line = reader.readLine()) != null) {
	                // Split the line into columns
	                String[] columns = line.split(",");
	                // Check if the line corresponds to the specified table
	                if (columns[0].equals(tableName)) {
	                    tableFound = true;
	                    // Check if it is an indexed column
	                    if (!columns[4].isEmpty() && !columns[4].equals("null")) {
	                        String indexName = columns[4];
	                        String columnName = columns[1];
	                        // Delete the existing index entry
	                        System.out.println("Deleting index: " + indexName + " for column: " + columnName);
	                       
	                        try {
	                        	File file = new File(indexName + ".ser");
	    						System.out.print("file: "+file);
	    						file.delete();
	    						System.out.println("Creating index: " + indexName + " for column: " + columnName);
								dbApp.createIndex(tableName, columnName, indexName);
							} catch (DBAppException e) {
								// TODO Auto-generated catch block
								System.out.println("couldnt create");
							}
	                        // Update the line to remove the indexName
	                        line = columns[0] + "," + columns[1] + "," + columns[2] + "," + columns[3] + ","+columns[4]+ ","+ columns[5];
	                    }
	                }
	                lines.add(line); 
	            }
	            if (!tableFound) {
	                System.out.println("Table not found: " + tableName);
	            } /*else {
	                // Rewrite the metadata file without the deleted index entries
	                try (BufferedWriter writer = new BufferedWriter(new FileWriter(metadataFileName))) {
	                    for (String l : lines) {
	                        writer.write(l);
	                        writer.newLine();
	                    }
	                }
	            }
	            */
	        } catch (IOException e) {
	            e.printStackTrace();
	         
	        }
	    }
	    /////////////////////////


	public static void main( String[] args ) throws DBAppException, IOException{
		
		String strTableName ="final";
		DBApp	dbApp = new DBApp( );

//		Hashtable htblColNameType = new Hashtable();
//		htblColNameType.put("id", "java.lang.Integer");
//		htblColNameType.put("name", "java.lang.String");
//		htblColNameType.put("gpa", "java.lang.Double");
//		dbApp.createTable(strTableName, "id", htblColNameType);
//		
//		Hashtable htblColNameValue = new Hashtable( );
//		htblColNameValue.put("id", new Integer(10));
//		htblColNameValue.put("name", new String("Malak" ) );
//		htblColNameValue.put("gpa", new Double( 0.15 ) );
//		dbApp.insertIntoTable( strTableName , htblColNameValue );
//		
//	    Hashtable htblColNameValue2 = new Hashtable( );
//		htblColNameValue2.put("id", new Integer(25));
//		htblColNameValue2.put("name", new String("Menna" ) );
//		htblColNameValue2.put("gpa", new Double( 0.6 ) );
//		dbApp.insertIntoTable( strTableName , htblColNameValue2 );	
		
//		Hashtable htblColNameValue3 = new Hashtable( );
//		htblColNameValue3.put("id", new Integer(27 ));
//		htblColNameValue3.put("name", new String("Marina" ) );
//		htblColNameValue3.put("gpa", new Double( 0.8) );
//		dbApp.insertIntoTable( strTableName , htblColNameValue3 );
//		
//		Hashtable htblColNameValue3 = new Hashtable( );
//		htblColNameValue3.put("id", new Integer(36 ));
//		htblColNameValue3.put("name", new String("Daisy" ) );
//		htblColNameValue3.put("gpa", new Double( 1.2) );
//		dbApp.insertIntoTable( strTableName , htblColNameValue3 );
		
//		Hashtable htblColNameValue3 = new Hashtable( );
//		htblColNameValue3.put("id", new Integer(55));
//		htblColNameValue3.put("name", new String("za3bola" ) );
//		htblColNameValue3.put("gpa",new Integer(33) );
//		dbApp.insertIntoTable( strTableName , htblColNameValue3 );
//////	
	
//		dbApp.insertIntoTable( strTableName , htblColNameValue3 );
		
//////		
//		Hashtable<String,Object> htblColNameValue4 = new Hashtable<String,Object>();
//		htblColNameValue4.put("id", new Integer(21));
//		htblColNameValue4.put("gpa", new Double(0.15));
////		
//		dbApp.deleteFromTable(strTableName,htblColNameValue4);
//////		
////		
//		dbApp.updateTable("testin","21",htblColNameValue4);
//		
//		dbApp.createIndex(strTableName, "name", "NAMEindex");

//	
//		dbApp.createIndex(strTableName, "name", "NAMEindex");
//	    dbApp.createIndex(strTableName, "id", "IDindex"); //////////
//		Table t2= Table.deserialzeTbl(strTableName);
//		System.out.println(t2.fileNames.size());
//		System.out.println(t2.fileNames.get(0));
		
//		resetAllIndices(strTableName);
		
	    ///////////////////////////////////////////
		//dbApp.createIndex("Sa", "gpa", "GPAindex");
		Page p=Page.deserialzePage("final1");
		Page p2=Page.deserialzePage("final2");
		Table t=Table.deserialzeTbl(strTableName+"m");
		System.out.println(t);
		
//	
		System.out.println(p);
		System.out.println();
		System.out.println();
		System.out.println(p2);
		System.out.println();
		
//		bplustree mybpt= bplustree.deserializeIndex("IDindex");
//		System.out.println("mybpt.getMaxValue()"+ mybpt.getMaxValue());
		//////////////////////////////////////////////
//		

		
//		System.out.println("My p2: "+p2);
//		Page p2=Page.deserialzePage("pers2");
//		Page p3=Page.deserialzePage("Malak3");
//		Page p4=Page.deserialzePage("Marie4");
//		Page p5=Page.deserialzePage("Marie5");
		

//		Page p2=Page.deserialzePage("MMMS2");
		
//		Table t2= Table.deserialzeTbl(strTableName);
//		System.out.println(t2.fileNames.size());
//		System.out.println(t2.fileNames.get(0));
//		System.out.println(t2.fileNames.get(1));
		
//		bplustree mybptID= bplustree.deserializeIndex("IDindex");
//		bplustree mybpt= bplustree.deserializeIndex("NAMEindex");
//		
//		System.out.println(mybptID.firstLeaf.numPairs);
//		System.out.println(mybpt.firstLeaf.numPairs);
//		System.out.println("null?: "+ (mybptID.firstLeaf==null));
//		System.out.println("null?: "+(mybpt.firstLeaf==null));

		
//////		
//		System.out.println(p3);
		
//		
//		SQLTerm s=new SQLTerm();
//		s._strTableName=strTableName;
//		s._strColumnName="gpa";
//		s._strOperator="<";
//		s._objValue=0.9;
////		
//		Vector<Tuple> v1= dbApp.indexoperator(strTableName, s);
//		System.out.println("MY V1:"+ v1);
//		System.out.println("MY V1 size:"+ v1.size());
		

		
		
////		System.out.println("tuples size in p: "+p.tuples.size());
//		System.out.println();
//		System.out.println(p4);
//		System.out.println();
//		System.out.println(p5);
//		System.out.println(mybptID.firstLeaf.numPairs);
//		System.out.println("key of 1st: "+mybptID.firstLeaf.dictionary[0].key + ""); 
//		System.out.println("value size: "+mybptID.firstLeaf.dictionary[0].value+" " + "\n"); 
//		System.out.println("value size: "+mybptID.firstLeaf.dictionary[1].key+" " + "\n"); 
//		System.out.println("value size: "+mybptID.firstLeaf.dictionary[1].value+" " + "\n"); 
//		System.out.println("value size: "+mybptID.firstLeaf.dictionary[2].key+" " + "\n"); 
//		System.out.println("value size: "+mybptID.firstLeaf.dictionary[2].value+" " + "\n"); 
		
//		System.out.println("hena bta3 maria");
//		System.out.println("key of 1nd: "+mybpt.firstLeaf.dictionary[0].key + ""); 
//		System.out.println("value of 1nd: "+mybpt.firstLeaf.dictionary[0].value.get(0) + "\n"); 
//		System.out.println("key of 2nd: "+mybpt.firstLeaf.dictionary[1].key + ""); 
//		System.out.println("value of 2nd: "+mybpt.firstLeaf.dictionary[1].value.get(0) + "\n"); 
//		System.out.println("key of 3nd: "+mybpt.firstLeaf.dictionary[2].key + ""); 
//		System.out.println("value of 3nd: "+mybpt.firstLeaf.dictionary[2].value.get(0) + "\n"); 
////		
//		System.out.println("key of 3rd: "+mybpt.firstLeaf.dictionary[2].key + ""); 
//		System.out.println("value of 3rd: "+mybpt.firstLeaf.dictionary[2].value.size() + "\n");
//		
//		System.out.println("key of 4th: "+mybpt.firstLeaf.dictionary[3].key + ""); 
//		System.out.println("value of 4th: "+mybpt.firstLeaf.dictionary[3].value + "\n");
//		
//		System.out.println("key of 5th: "+mybpt.firstLeaf.dictionary[4].key + ""); 
//		System.out.println("value of 5th: "+mybpt.firstLeaf.dictionary[4].value + "\n");
		
//		bplustree.serializeIndex(mybpt,"IDindex");
		
//		System.out.println();
//		System.out.println();
//		System.out.println("next is for ID");
//		System.out.println(mybptID.firstLeaf.numPairs);
//		System.out.println("key of 1st: "+mybptID.firstLeaf.dictionary[0].key + ""); 
//		System.out.println("value of 1st: "+mybptID.firstLeaf.dictionary[0].value + "\n"); 
//		
//		System.out.println("key of 2nd: "+mybptID.firstLeaf.dictionary[1].key + ""); 
//		System.out.println("value of 2nd: "+mybptID.firstLeaf.dictionary[1].value + "\n"); 
//		
//		System.out.println("key of 3rd: "+mybptID.firstLeaf.dictionary[2].key + ""); 
//		System.out.println("value of 3rd: "+mybptID.firstLeaf.dictionary[2].value + "\n");
////		
//		System.out.println("key of 4th: "+mybptID.firstLeaf.dictionary[3].key + ""); 
//		System.out.println("value of 4th: "+mybptID.firstLeaf.dictionary[3].value + "\n");
//		
//		System.out.println("key of 5th: "+mybptID.firstLeaf.dictionary[4].key + ""); 
//		System.out.println("value of 5th: "+mybptID.firstLeaf.dictionary[4].value + "\n");
//		
//		System.out.println("key of 6th: "+mybptID.firstLeaf.dictionary[5].key + ""); 
//		System.out.println("value of 6th: "+mybptID.firstLeaf.dictionary[5].value + "\n");
//		
//		System.out.println("key of 7th: "+mybptID.firstLeaf.dictionary[6].key + ""); 
//		System.out.println("value of 7th: "+mybptID.firstLeaf.dictionary[6].value + "\n");
		
		
//	 	Table tbl=Table.deserialzeTbl(strTableName);
//		 Page p=Page.deserialzePage("laaa2");
//		 System.out.print(tbl.fileNames.get(0));
//		System.out.println(p);
//		System.out.println(p2);
//		Hashtable<String,Object> htblColNameValue1=new Hashtable();
//		htblColNameValue1.put("name", new String("Sylvia" ) );
//		htblColNameValue1.put("gpa", new Double( 0.95 ) );
//    	dbApp.updateTable(strTableName,"24",htblColNameValue1);
//
//		Tuple t=p.getTuple(strTableName, "Muluk1", 2343432);

	 	
//		Page p2=Page.deserialzePage("laaa2");
//		System.out.println("test "+p2);
//		
////		System.out.print(p.tuples.size());
//		
//		Hashtable<String,Object> htblColNameValue11=new Hashtable();
//		htblColNameValue11.put("name", new String("Marina"));
//		
//         dbApp.deleteFromTable(strTableName,htblColNameValue11);
//         
       
//	 	 Page p2=Page.deserialzePage("laaa2");
//	 	 
//	 	 System.out.println(p2);
	 	 
// 	
// 		System.out.println(" BA3DDD:    "+ p);
// 		System.out.println("test "+p2);
//		
//		System.out.println(p.tuples.size());
//		System.out.println(p);
//		
//		p.tuples.remove(p.tuples.get(0));
//		System.out.println(p.tuples.size());
//		System.out.println(p);
		

//		System.out.println(p.tuples.size());
//		System.out.println("p starts here: "+ p);
//		
//		p.tuples.remove(0);
//		
//		System.out.println(p.tuples.size());
//		System.out.println("p ba3d here: "+ p);
//		System.out.print("SIZE: "+t2.fileNames.size());
//		System.out.print(t2.fileNames.get(0));
//		t2.fileNames.size();
//		int nextPageNum= t2.fileNames.indexOf((t2.fileNames.get(0)))+1;
//		System.out.print(nextPageNum);
		
//		SQLTerm[] arrSQLTerms;
//		arrSQLTerms = new SQLTerm[2];
//		arrSQLTerms[0]=new SQLTerm();
//		arrSQLTerms[1]=new SQLTerm();
//		arrSQLTerms[0]._strTableName =  strTableName;
//		arrSQLTerms[0]._strColumnName=  "name";
//		arrSQLTerms[0]._strOperator  =  "/";
//		arrSQLTerms[0]._objValue     =  "Maria";
//		arrSQLTerms[1]._strTableName =  strTableName;
//		arrSQLTerms[1]._strColumnName=  "name";
//		arrSQLTerms[1]._strOperator  =  "=";
//		arrSQLTerms[1]._objValue     =  "Menna";
//		
//	
//		
////
////		
////
//		String[]strarrOperators = new String[1];
//		strarrOperators[0] = "AND";
//
////		
////		
//		Iterator resultSet = dbApp.selectFromTable(arrSQLTerms , strarrOperators);
////		
//		while (resultSet.hasNext()) {
//		    Tuple tuple = (Tuple) resultSet.next();
//		    System.out.println("Testing tuple: "+tuple);
//		}
		
//		System.out.println("my os:" +dbApp.isavaselect(strTableName,new Integer(25)));
		//System.out.print(dbApp.isavailable(strTableName,50));
	}

}