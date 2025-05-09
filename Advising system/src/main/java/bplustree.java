import java.lang.*;
import java.util.*;
import java.io.*;

public class bplustree implements java.io.Serializable {
	int m;
	InternalNode root;
	LeafNode firstLeaf;

	/*~~~~~~~~~~~~~~~~ HELPER FUNCTIONS ~~~~~~~~~~~~~~~~*/

	/**
	 * This method performs a standard binary search on a sorted
	 * DictionaryPair[] and returns the index of the dictionary pair
	 * with target key t if found. Otherwise, this method returns a negative
	 * value.
	 * @param dps: list of dictionary pairs sorted by key within leaf node
	 * @param t: target key value of dictionary pair being searched for
	 * @return index of the target value if found, else a negative value
	 */
	
	public static void serializeIndex(bplustree index, String indexName) {
        try {
            FileOutputStream fileOut = new FileOutputStream(indexName + ".ser");
            ObjectOutputStream out = new ObjectOutputStream(fileOut);
            out.writeObject(index);
            out.close();
            fileOut.close();
            System.out.println("Serialized B+ tree to " + indexName + ".ser");
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception appropriately based on your application's requirements
        }
    }

    // Deserialize the B+ tree from a file
    public static bplustree deserializeIndex(String indexName) {
    	bplustree index = null;
        try {
            FileInputStream fileIn = new FileInputStream(indexName + ".ser");
            ObjectInputStream in = new ObjectInputStream(fileIn);
            index = (bplustree) in.readObject();
            in.close();
            fileIn.close();
            System.out.println("Deserialized B+ tree from " + indexName + ".ser");
        } catch (IOException | ClassNotFoundException e) {
           // e.printStackTrace();
        	System.out.println("Coudldn't deseralize" + indexName + ".ser");
            // Handle the exception appropriately based on your application's requirements
        }
        return index;
    }
	
	private int binarySearch(DictionaryPair[] dps, int numPairs, Object t) {
		
		Comparator<DictionaryPair> c = new Comparator<DictionaryPair>() {
			@Override
			public int compare(DictionaryPair o1, DictionaryPair o2) {
				if (o1.key == null && o2.key == null) {
			        return 0;
			    } else if (o1.key == null) {
			        return -1; // Treat null as less than any non-null value
			    } else if (o2.key == null) {
			        return 1; // Treat any non-null value as greater than null
			    }
			    // Compare based on the actual types
			    if (o1.key instanceof String && o2.key instanceof String) {
			        return ((String) o1.key).compareTo((String) o2.key);
			    } else if (o1.key instanceof Integer && o2.key instanceof Integer) {
			        return Integer.compare((Integer) o1.key, (Integer) o2.key);
			    } else if (o1.key instanceof Double && o2.key instanceof Double) {
			        return Double.compare((Double) o1.key, (Double) o2.key);
			    }
			    return 0;
			}
		};
		Vector<Double> v = new Vector<Double>();
		v.add(0.0);
		return Arrays.binarySearch(dps, 0, numPairs, new DictionaryPair(t,v ), c);
	}

	/**
	 * This method starts at the root of the B+ tree and traverses down the
	 * tree via key comparisons to the corresponding leaf node that holds 'key'
	 * within its dictionary.
	 * @param key: the unique key that lies within the dictionary of a LeafNode object
	 * @return the LeafNode object that contains the key within its dictionary
	 */
	private LeafNode findLeafNode(Object key) {

		// Initialize keys and index variable
		Object[] keys = this.root.keys;
		int i;

		// Find next node on path to appropriate leaf node
		for (i = 0; i < this.root.degree - 1; i++) {
			if(compare(key, keys[i])<0) {
				break;
			}
			
		}

		/* Return node if it is a LeafNode object,
		   otherwise repeat the search function a level down */
		Node child = this.root.childPointers[i];
		if (child instanceof LeafNode) {
			return (LeafNode)child;
		} else {
			return findLeafNode((InternalNode)child, key);
		}
	}
	
	public int[] getMyPageNumber(Object key) {
		LeafNode ln = (this.root == null) ? this.firstLeaf : findLeafNode(key);
		//LeafNode ln = findLeafNode(key);  // a[0]->min a[1]->max
		int [] a = new int [2];
		if (ln.leftSibling==null && compare(key, ln.dictionary[0].key)<0) { //lw el new key asghar men asghar rakam
			a[0]=1;
			a[1]=1;  
		}
		else if (ln.rightSibling==null && compare(key, ln.dictionary[ln.numPairs-1].key)>0) { //lw el new key akbar men akbar rakam
			
            int pagenum= (int)Math.ceil( ln.dictionary[ln.numPairs-1].value.get(ln.dictionary[ln.numPairs-1].value.size()-1)); 
            a[0]=pagenum;
			a[1]=pagenum; 
			
		}
		else if (compare(key, ln.dictionary[0].key)<0) { //lw el key asghar men awel value fel node
			
			a[0]= (int) Math.ceil(ln.leftSibling.dictionary[ln.leftSibling.numPairs-1].value.get(ln.leftSibling.dictionary[ln.leftSibling.numPairs-1].value.size()-1));
			a[1]= (int) Math.ceil(ln.dictionary[0].value.get(0)); //max
		}
		else if (compare(key, ln.dictionary[ln.numPairs-1].key)>0) { //lw el key akbar men akher value fel node
			a[0]= (int)Math.ceil( ln.dictionary[ln.numPairs-1].value.get(ln.dictionary[ln.numPairs-1].value.size()-1)); //min
			a[1]= (int) Math.ceil(ln.rightSibling.dictionary[0].value.get(0)); //max
		}
		else {
			a= rangeFromNode(ln.dictionary,key,ln.numPairs);
		}
		
		return a;
	}
	
    public static int [] rangeFromNode(DictionaryPair [] dp,Object key,int numpairs) {
		
    	int [] a = new int[2];
		for(int i=0;i<numpairs-1;i++) {
			if(compare(dp[i].key,key)<0 && compare(key,dp[i+1].key)<0) {
				a[0]= (int) Math.ceil(dp[i].value.get(dp[i].value.size()-1));
				a[1]= (int)Math.ceil( dp[i+1].value.get(0));						
			}
		}
		return a;
	}
	
	
	private LeafNode findLeafNode(InternalNode node, Object key) {

		// Initialize keys and index variable
		Object[] keys = node.keys;
		int i;

		// Find next node on path to appropriate leaf node
		for (i = 0; i < node.degree - 1; i++) {
			if(compare(key, keys[i])<0) {
				break;
			}
		}

		/* Return node if it is a LeafNode object,
		   otherwise repeat the search function a level down */
		Node childNode = node.childPointers[i];
		if (childNode instanceof LeafNode) {
			return (LeafNode)childNode;
		} else {
			return findLeafNode((InternalNode)node.childPointers[i], key);
		}
	}

	/**
	 * Given a list of pointers to Node objects, this method returns the index of
	 * the pointer that points to the specified 'node' LeafNode object.
	 * @param pointers: a list of pointers to Node objects
	 * @param node: a specific pointer to a LeafNode
	 * @return (int) index of pointer in list of pointers
	 */
	private int findIndexOfPointer(Node[] pointers, LeafNode node) {
		int i;
		for (i = 0; i < pointers.length; i++) {
			if (pointers[i] == node) { break; }
		}
		return i;
	}

	/**
	 * This is a simple method that returns the midpoint (or lower bound
	 * depending on the context of the method invocation) of the max degree m of
	 * the B+ tree.
	 * @return (int) midpoint/lower bound
	 */
	private int getMidpoint() {
		return (int)Math.ceil((this.m + 1) / 2.0) - 1;
	}

	/**
	 * Given a deficient InternalNode in, this method remedies the deficiency
	 * through borrowing and merging.
	 * @param in: a deficient InternalNode
	 */
	private void handleDeficiency(InternalNode in) {

		InternalNode sibling;
		InternalNode parent = in.parent;

		// Remedy deficient root node
		if (this.root == in) {
			for (int i = 0; i < in.childPointers.length; i++) {
				if (in.childPointers[i] != null) {
					if (in.childPointers[i] instanceof InternalNode) {
						this.root = (InternalNode)in.childPointers[i];
						this.root.parent = null;
					} else if (in.childPointers[i] instanceof LeafNode) {
						this.root = null;
					}
				}
			}
		}

		// Borrow:
		else if (in.leftSibling != null && in.leftSibling.isLendable()) {
			sibling = in.leftSibling;
		} else if (in.rightSibling != null && in.rightSibling.isLendable()) {
			sibling = in.rightSibling;

			// Copy 1 key and pointer from sibling (atm just 1 key)
			Object borrowedKey = sibling.keys[0];
			Node pointer = sibling.childPointers[0];

			// Copy root key and pointer into parent
			in.keys[in.degree - 1] = parent.keys[0];
			in.childPointers[in.degree] = pointer;

			// Copy borrowedKey into root
			parent.keys[0] = borrowedKey;

			// Delete key and pointer from sibling
			sibling.removePointer(0);
			Arrays.sort(sibling.keys);
			sibling.removePointer(0);
			shiftDown(in.childPointers, 1);
		}

		// Merge:
		else if (in.leftSibling != null && in.leftSibling.isMergeable()) {

		} else if (in.rightSibling != null && in.rightSibling.isMergeable()) {
			sibling = in.rightSibling;

			// Copy rightmost key in parent to beginning of sibling's keys &
			// delete key from parent
			sibling.keys[sibling.degree - 1] = parent.keys[parent.degree - 2];
			Arrays.sort(sibling.keys, 0, sibling.degree);
			parent.keys[parent.degree - 2] = null;

			// Copy in's child pointer over to sibling's list of child pointers
			for (int i = 0; i < in.childPointers.length; i++) {
				if (in.childPointers[i] != null) {
					sibling.prependChildPointer(in.childPointers[i]);
					in.childPointers[i].parent = sibling;
					in.removePointer(i);
				}
			}

			// Delete child pointer from grandparent to deficient node
			parent.removePointer(in);

			// Remove left sibling
			sibling.leftSibling = in.leftSibling;
		}

		// Handle deficiency a level up if it exists
		if (parent != null && parent.isDeficient()) {
			handleDeficiency(parent);
		}
	}

	/**
	 * This is a simple method that determines if the B+ tree is empty or not.
	 * @return a boolean indicating if the B+ tree is empty or not
	 */
	private boolean isEmpty() {
		return firstLeaf == null;
	}

	/**
	 * This method performs a standard linear search on a sorted
	 * DictionaryPair[] and returns the index of the first null entry found.
	 * Otherwise, this method returns a -1. This method is primarily used in
	 * place of binarySearch() when the target t = null.
	 * @param dps: list of dictionary pairs sorted by key within leaf node
	 * @return index of the target value if found, else -1
	 */
	private int linearNullSearch(DictionaryPair[] dps) {
		for (int i = 0; i <  dps.length; i++) {
			if (dps[i] == null) { return i; }
		}
		return -1;
	}

	/**
	 * This method performs a standard linear search on a list of Node[] pointers
	 * and returns the index of the first null entry found. Otherwise, this
	 * method returns a -1. This method is primarily used in place of
	 * binarySearch() when the target t = null.
	 * @param pointers: list of Node[] pointers
	 * @return index of the target value if found, else -1
	 */
	private int linearNullSearch(Node[] pointers) {
		for (int i = 0; i <  pointers.length; i++) {
			if (pointers[i] == null) { return i; }
		}
		return -1;
	}

	/**
	 * This method is used to shift down a set of pointers that are prepended
	 * by null values.
	 * @param pointers: the list of pointers that are to be shifted
	 * @param amount: the amount by which the pointers are to be shifted
	 */
	private void shiftDown(Node[] pointers, int amount) {
		Node[] newPointers = new Node[this.m + 1];
		for (int i = amount; i < pointers.length; i++) {
			newPointers[i - amount] = pointers[i];
		}
		pointers = newPointers;
	}

	/**
	 * This is a specialized sorting method used upon lists of DictionaryPairs
	 * that may contain interspersed null values.
	 * @param dictionary: a list of DictionaryPair objects
	 */
	private void sortDictionary(DictionaryPair[] dictionary) {
		Arrays.sort(dictionary, new Comparator<DictionaryPair>() {
			@Override
			public int compare(DictionaryPair o1, DictionaryPair o2) {
				if (o1 == null && o2 == null) { return 0; }
				if (o1 == null) { return 1; }
				if (o2 == null) { return -1; }
				return o1.compareTo(o2);
			}
		});
	}

	/**
	 * This method modifies the InternalNode 'in' by removing all pointers within
	 * the childPointers after the specified split. The method returns the removed
	 * pointers in a list of their own to be used when constructing a new
	 * InternalNode sibling.
	 * @param in: an InternalNode whose childPointers will be split
	 * @param split: the index at which the split in the childPointers begins
	 * @return a Node[] of the removed pointers
	 */
	private Node[] splitChildPointers(InternalNode in, int split) {

		Node[] pointers = in.childPointers;
		Node[] halfPointers = new Node[this.m + 1];

		// Copy half of the values into halfPointers while updating original keys
		for (int i = split + 1; i < pointers.length; i++) {
			halfPointers[i - split - 1] = pointers[i];
			in.removePointer(i);
		}

		return halfPointers;
	}

	/**
	 * This method splits a single dictionary into two dictionaries where all
	 * dictionaries are of equal length, but each of the resulting dictionaries
	 * holds half of the original dictionary's non-null values. This method is
	 * primarily used when splitting a node within the B+ tree. The dictionary of
	 * the specified LeafNode is modified in place. The method returns the
	 * remainder of the DictionaryPairs that are no longer within ln's dictionary.
	 * @param ln: list of DictionaryPairs to be split
	 * @param split: the index at which the split occurs
	 * @return DictionaryPair[] of the two split dictionaries
	 */
	private DictionaryPair[] splitDictionary(LeafNode ln, int split) {

		DictionaryPair[] dictionary = ln.dictionary;

		/* Initialize two dictionaries that each hold half of the original
		   dictionary values */
		DictionaryPair[] halfDict = new DictionaryPair[this.m];

		// Copy half of the values into halfDict
		for (int i = split; i < dictionary.length; i++) {
			halfDict[i - split] = dictionary[i];
			ln.delete(i);
		}

		return halfDict;
	}

	/**
	 * When an insertion into the B+ tree causes an overfull node, this method
	 * is called to remedy the issue, i.e. to split the overfull node. This method
	 * calls the sub-methods of splitKeys() and splitChildPointers() in order to
	 * split the overfull node.
	 * @param in: an overfull InternalNode that is to be split
	 */
	private void splitInternalNode(InternalNode in) {

		// Acquire parent
		InternalNode parent = in.parent;

		// Split keys and pointers in half
		int midpoint = getMidpoint();
		Object newParentKey = in.keys[midpoint];
		Object[] halfKeys = splitKeys(in.keys, midpoint);
		Node[] halfPointers = splitChildPointers(in, midpoint);

		// Change degree of original InternalNode in
		in.degree = linearNullSearch(in.childPointers);

		// Create new sibling internal node and add half of keys and pointers
		InternalNode sibling = new InternalNode(this.m, halfKeys, halfPointers);
		for (Node pointer : halfPointers) {
			if (pointer != null) { pointer.parent = sibling; }
		}

		// Make internal nodes siblings of one another
		sibling.rightSibling = in.rightSibling;
		if (sibling.rightSibling != null) {
			sibling.rightSibling.leftSibling = sibling;
		}
		in.rightSibling = sibling;
		sibling.leftSibling = in;

		if (parent == null) {

			// Create new root node and add midpoint key and pointers
			Object[] keys = new Object[this.m];
			keys[0] = newParentKey;
			InternalNode newRoot = new InternalNode(this.m, keys);
			newRoot.appendChildPointer(in);
			newRoot.appendChildPointer(sibling);
			this.root = newRoot;

			// Add pointers from children to parent
			in.parent = newRoot;
			sibling.parent = newRoot;

		} else {

			// Add key to parent
			parent.keys[parent.degree - 1] = newParentKey;
			Arrays.sort(parent.keys, 0, parent.degree);

			// Set up pointer to new sibling
			int pointerIndex = parent.findIndexOfPointer(in) + 1;
			parent.insertChildPointer(sibling, pointerIndex);
			sibling.parent = parent;
		}
	}

	/**
	 * This method modifies a list of Integer-typed objects that represent keys
	 * by removing half of the keys and returning them in a separate Integer[].
	 * This method is used when splitting an InternalNode object.
	 * @param keys: a list of Integer objects
	 * @param split: the index where the split is to occur
	 * @return Integer[] of removed keys
	 */
	private Object[] splitKeys(Object[] keys, int split) {

		Object[] halfKeys = new Object[this.m];

		// Remove split-indexed value from keys
		keys[split] = null;

		// Copy half of the values into halfKeys while updating original keys
		for (int i = split + 1; i < keys.length; i++) {
			halfKeys[i - split - 1] = keys[i];
			keys[i] = null;
		}

		return halfKeys;
	}

	/*~~~~~~~~~~~~~~~~ API: DELETE, INSERT, SEARCH ~~~~~~~~~~~~~~~~*/

	/**
	 * Given a key, this method will remove the dictionary pair with the
	 * corresponding key from the B+ tree.
	 * @param key: an integer key that corresponds with an existing dictionary
	 *             pair
	 */
	public void delete(Object key) {
		if (isEmpty()) {

			/* Flow of execution goes here when B+ tree has no dictionary pairs */

			System.err.println("Invalid Delete: The B+ tree is currently empty.");

		} else {

			// Get leaf node and attempt to find index of key to delete
			LeafNode ln = (this.root == null) ? this.firstLeaf : findLeafNode(key);
			int dpIndex = binarySearch(ln.dictionary, ln.numPairs, key);


			if (dpIndex < 0) {

				/* Flow of execution goes here when key is absent in B+ tree */

				System.err.println("Invalid Delete: Key unable to be found.");

			} else {

				// Successfully delete the dictionary pair
				ln.delete(dpIndex);

				// Check for deficiencies
				if (ln.isDeficient()) {

					LeafNode sibling;
					InternalNode parent = ln.parent;

					// Borrow: First, check the left sibling, then the right sibling
					if (ln.leftSibling != null &&
						ln.leftSibling.parent == ln.parent &&
						ln.leftSibling.isLendable()) {

						sibling = ln.leftSibling;
						DictionaryPair borrowedDP = sibling.dictionary[sibling.numPairs - 1];

						/* Insert borrowed dictionary pair, sort dictionary,
						   and delete dictionary pair from sibling */
						ln.insert(borrowedDP);
						sortDictionary(ln.dictionary);
						sibling.delete(sibling.numPairs - 1);

						// Update key in parent if necessary
						int pointerIndex = findIndexOfPointer(parent.childPointers, ln);
						if(! (compare(borrowedDP.key,parent.keys[pointerIndex - 1])>=0)) {
							parent.keys[pointerIndex - 1] = ln.dictionary[0].key;
						}

					} else if (ln.rightSibling != null &&
							   ln.rightSibling.parent == ln.parent &&
							   ln.rightSibling.isLendable()) {

						sibling = ln.rightSibling;
						DictionaryPair borrowedDP = sibling.dictionary[0];

						/* Insert borrowed dictionary pair, sort dictionary,
					       and delete dictionary pair from sibling */
						ln.insert(borrowedDP);
						sibling.delete(0);
						sortDictionary(sibling.dictionary);

						// Update key in parent if necessary
						int pointerIndex = findIndexOfPointer(parent.childPointers, ln);
						if(! (compare(borrowedDP.key,parent.keys[pointerIndex])<0)){
							parent.keys[pointerIndex] = sibling.dictionary[0].key;
						}

					}

					// Merge: First, check the left sibling, then the right sibling
					else if (ln.leftSibling != null &&
							 ln.leftSibling.parent == ln.parent &&
							 ln.leftSibling.isMergeable()) {

						sibling = ln.leftSibling;
						int pointerIndex = findIndexOfPointer(parent.childPointers, ln);

						// Remove key and child pointer from parent
						parent.removeKey(pointerIndex - 1);
						parent.removePointer(ln);

						// Update sibling pointer
						sibling.rightSibling = ln.rightSibling;

						// Check for deficiencies in parent
						if (parent.isDeficient()) {
							handleDeficiency(parent);
						}

					} else if (ln.rightSibling != null &&
							   ln.rightSibling.parent == ln.parent &&
							   ln.rightSibling.isMergeable()) {

						sibling = ln.rightSibling;
						int pointerIndex = findIndexOfPointer(parent.childPointers, ln);

						// Remove key and child pointer from parent
						parent.removeKey(pointerIndex);
						parent.removePointer(pointerIndex);

						// Update sibling pointer
						sibling.leftSibling = ln.leftSibling;
						if (sibling.leftSibling == null) {
							firstLeaf = sibling;
						}

						if (parent.isDeficient()) {
							handleDeficiency(parent);
						}
					}

				} else if (this.root == null && this.firstLeaf.numPairs == 0) {

					/* Flow of execution goes here when the deleted dictionary
					   pair was the only pair within the tree */

					// Set first leaf as null to indicate B+ tree is empty
					this.firstLeaf = null;

				} else {

					/* The dictionary of the LeafNode object may need to be
					   sorted after a successful delete */
					sortDictionary(ln.dictionary);

				}
			}
		}
	}
	public void deletefordup(Object key,int pageNum) {
		LeafNode ln = (this.root == null) ? this.firstLeaf : findLeafNode(key);
		DictionaryPair[] dps = ln.dictionary;
		int index = binarySearch(dps, ln.numPairs, key);
        Vector<Double> v= dps[index].value;
        
        int i=v.indexOf((double)pageNum);
        v.remove(i);
        if(v.isEmpty()) {
        	delete(key);
        }
       
	}
	
	
	

	/**
	 * Given an integer key and floating point value, this method inserts a
	 * dictionary pair accordingly into the B+ tree.
	 * @param key: an integer key to be used in the dictionary pair
	 * @param value: a floating point number to be used in the dictionary pair
	 */
	public void insert(Object key, double value){
		Vector<Double> v = new Vector<Double>();
		v.add(value);
		if (isEmpty()) {

			/* Flow of execution goes here only when first insert takes place */

			// Create leaf node as first node in B plus tree (root is null)
			LeafNode ln = new LeafNode(this.m, new DictionaryPair(key, v));

			// Set as first leaf node (can be used later for in-order leaf traversal)
			this.firstLeaf = ln;

		} else {
			

			// Find leaf node to insert into
			LeafNode ln = (this.root == null) ? this.firstLeaf :
												findLeafNode(key);
			int index=searchfordup(key);
			if(index>=0) {
				ln.dictionary[index].value.add(value);
				
			}
			else {

			// Insert into leaf node fails if node becomes overfull
			if (!ln.insert(new DictionaryPair(key, v))) {

				// Sort all the dictionary pairs with the included pair to be inserted
				ln.dictionary[ln.numPairs] = new DictionaryPair(key, v);
				ln.numPairs++;
				sortDictionary(ln.dictionary);

				// Split the sorted pairs into two halves
				int midpoint = getMidpoint();
				DictionaryPair[] halfDict = splitDictionary(ln, midpoint);

				if (ln.parent == null) {

					/* Flow of execution goes here when there is 1 node in tree */

					// Create internal node to serve as parent, use dictionary midpoint key
					Object[] parent_keys = new Object[this.m];
					parent_keys[0] = halfDict[0].key;
					InternalNode parent = new InternalNode(this.m, parent_keys);
					ln.parent = parent;
					parent.appendChildPointer(ln);

				} else {

					/* Flow of execution goes here when parent exists */

					// Add new key to parent for proper indexing
					Object newParentKey = halfDict[0].key;
					ln.parent.keys[ln.parent.degree - 1] = newParentKey;
					Arrays.sort(ln.parent.keys, 0, ln.parent.degree);
				}

				// Create new LeafNode that holds the other half
				LeafNode newLeafNode = new LeafNode(this.m, halfDict, ln.parent);

				// Update child pointers of parent node
				int pointerIndex = ln.parent.findIndexOfPointer(ln) + 1;
				ln.parent.insertChildPointer(newLeafNode, pointerIndex);

				// Make leaf nodes siblings of one another
				newLeafNode.rightSibling = ln.rightSibling;
				if (newLeafNode.rightSibling != null) {
					newLeafNode.rightSibling.leftSibling = newLeafNode;
				}
				ln.rightSibling = newLeafNode;
				newLeafNode.leftSibling = ln;

				if (this.root == null) {

					// Set the root of B+ tree to be the parent
					this.root = ln.parent;

				} else {

					/* If parent is overfull, repeat the process up the tree,
			   		   until no deficiencies are found */
					InternalNode in = ln.parent;
					while (in != null) {
						if (in.isOverfull()) {
							splitInternalNode(in);
						} else {
							break;
						}
						in = in.parent;
					}
				}
			}
			}
		}
	}
	public void update(Object key , Object newKey,int num) {
		
		LeafNode ln = (this.root == null) ? this.firstLeaf : findLeafNode(key);
		DictionaryPair[] dps = ln.dictionary;
		int index = binarySearch(dps, ln.numPairs, key);
        Vector<Double> v= dps[index].value;
        
        int i=v.indexOf((double)num);
        v.remove(i);
        if(v.isEmpty()) {
        	delete(key);
        }
        insert(newKey,num);
        //nkhliha delete insert
    }

	/**
	 * Given a key, this method returns the value associated with the key
	 * within a dictionary pair that exists inside the B+ tree.
	 * @param key: the key to be searched within the B+ tree
	 * @return the floating point value associated with the key within the B+ tree
	 */
	public Vector<Double> search(Object key) {

		// If B+ tree is completely empty, simply return null
		if (isEmpty()) { return null; }

		// Find leaf node that holds the dictionary key
		LeafNode ln = (this.root == null) ? this.firstLeaf : findLeafNode(key);

		// Perform binary search to find index of key within dictionary
		DictionaryPair[] dps = ln.dictionary;
		int index = binarySearch(dps, ln.numPairs, key);

		// If index negative, the key doesn't exist in B+ tree
		if (index < 0) {
			return null;
		} else {
			return dps[index].value;
		}
	}
	
	public int searchfordup(Object key) {

		// If B+ tree is completely empty, simply return null
		if (isEmpty()) {  }

		// Find leaf node that holds the dictionary key
		LeafNode ln = (this.root == null) ? this.firstLeaf : findLeafNode(key);

		// Perform binary search to find index of key within dictionary
		DictionaryPair[] dps = ln.dictionary;
		int index = binarySearch(dps, ln.numPairs, key);

		// If index negative, the key doesn't exist in B+ tree
		if (index < 0) {
			return index;
		} else {
			return index;
		}
	}
	//lw el returned index kan less than 0 insert new dictionary pair 3adi else dps[index].values.add(pagevalue)
	
	
	
	public void changePageValue(Object key, Double newValue,String indexname,double pageNum) {

		// If B+ tree is completely empty, simply return null
		
		System.out.println("value passed to B+tree method when just entered: "+ newValue);
		
		if (isEmpty()) { return; }

		// Find leaf node that holds the dictionary key
		LeafNode ln = (this.root == null) ? this.firstLeaf : findLeafNode(key);

		// Perform binary search to find index of key within dictionary
		DictionaryPair[] dps = ln.dictionary;
		int index = binarySearch(dps, ln.numPairs, key);

		// If index negative, the key doesn't exist in B+ tree
		if (index < 0) {
			return;
		} else {
			int i=dps[index].value.indexOf(pageNum);
			System.out.println("value just before update to B+tree method: "+ newValue);
			dps[index].value.remove(i);
			dps[index].value.add(i, newValue);
			System.out.println("value of dps[index].value : "+ dps[index].value);
			bplustree.serializeIndex(this, indexname);
			//return dps[index].value;
		}
	}

	/**
	 * This method traverses the doubly linked list of the B+ tree and records
	 * all values whose associated keys are within the range specified by
	 * lowerBound and upperBound.
	 * @param lowerBound: (int) the lower bound of the range
	 * @param upperBound: (int) the upper bound of the range
	 * @return an ArrayList<Double> that holds all values of dictionary pairs
	 * whose keys are within the specified range
	 */
	public ArrayList<Vector<Double>> search(Object lowerBound, Object upperBound) {

		// Instantiate Double array to hold values
		ArrayList<Vector<Double>> values = new ArrayList<Vector<Double>>();

		// Iterate through the doubly linked list of leaves
		LeafNode currNode = this.firstLeaf;
		while (currNode != null) {

			// Iterate through the dictionary of each node
			DictionaryPair dps[] = currNode.dictionary;
			for (DictionaryPair dp : dps) {

				/* Stop searching the dictionary once a null value is encountered
				   as this the indicates the end of non-null values */
				if (dp == null) { break; }

				// Include value if its key fits within the provided range
				if(compare(lowerBound,dp.key)<=0 && compare(dp.key,upperBound)<=0) {
					values.add(dp.value);
				}
				
			}

			/* Update the current node to be the right sibling,
			   leaf traversal is from left to right */
			currNode = currNode.rightSibling;

		}

		return values;
	}
	
	public Vector<Object[]> lowerboundinclusive(Object lowerBound) {

		// Instantiate Double array to hold values
		Vector<Vector<Double>> values = new Vector<Vector<Double>>();
		Vector<Object> keys = new Vector<Object>();
		Vector<Object[]>myRes=new Vector<Object[]>();
		// Iterate through the doubly linked list of leaves
		LeafNode currNode = this.firstLeaf;
		while (currNode != null) {

			// Iterate through the dictionary of each node
			DictionaryPair dps[] = currNode.dictionary;
			for (DictionaryPair dp : dps) {

				/* Stop searching the dictionary once a null value is encountered
				   as this the indicates the end of non-null values */
				if (dp == null) { break; }

				// Include value if its key fits within the provided range
				if(compare(lowerBound,dp.key)<=0) {
					
					values.add(dp.value);
					keys.add(dp.key);
				}
				
			}


			/* Update the current node to be the right sibling,
			   leaf traversal is from left to right */
			currNode = currNode.rightSibling;

		}
		
		for(int i=0;i<values.size();i++) {
			Vector<Double> currvalsvector=values.get(i); //gebna el fih 0,1,1
			Collections.sort(currvalsvector);
			
			for(int j=0;j<currvalsvector.size();j++) { //0,1,1
				Double pageNo=currvalsvector.get(j);
				Object []a= new Object[2];
				a[0]=pageNo;
				a[1]=keys.get(i); //[0,5]
				myRes.add(a)  ;
				values.get(i).remove(pageNo);
				for(int k=i+1;k<values.size();k++) { //0
					Vector<Double> vector=values.get(k);
					for(int l=0;l<vector.size();l++) {
						if(vector.get(l)==pageNo) {
							a[1]=keys.get(k);
							myRes.add(a);  //[0,6]
							values.get(k).remove(pageNo);
						}
					}
				}
			}
			
		}

		return myRes;
	}
	
	public Vector<Object[]> upperboundinclusive(Object upperBound) {

		// Instantiate Double array to hold values
		Vector<Vector<Double>> values = new Vector<Vector<Double>>();
		Vector<Object> keys = new Vector<Object>();
		Vector<Object[]>myRes=new Vector<Object[]>();


		// Iterate through the doubly linked list of leaves
		LeafNode currNode = this.firstLeaf;
		while (currNode != null) {

			// Iterate through the dictionary of each node
			DictionaryPair dps[] = currNode.dictionary;
			for (DictionaryPair dp : dps) {

				/* Stop searching the dictionary once a null value is encountered
				   as this the indicates the end of non-null values */
				if (dp == null) { break; }

				// Include value if its key fits within the provided range
				if(compare(dp.key,upperBound)<=0) {
					values.add(dp.value);
					keys.add(dp.key);

				}
				
			}

			/* Update the current node to be the right sibling,
			   leaf traversal is from left to right */
			currNode = currNode.rightSibling;

		}
		
		for(int i=0;i<values.size();i++) {
			Vector<Double> currvalsvector=values.get(i); //gebna el fih 0,1,1
			Collections.sort(currvalsvector);
			
			for(int j=0;j<currvalsvector.size();j++) { //0,1,1
				Double pageNo=currvalsvector.get(j);
				Object []a= new Object[2];
				a[0]=pageNo;
				a[1]=keys.get(i); //[0,5]
				myRes.add(a)  ;
				values.get(i).remove(pageNo);
				for(int k=i+1;k<values.size();k++) { //0
					Vector<Double> vector=values.get(k);
					for(int l=0;l<vector.size();l++) {
						if(vector.get(l)==pageNo) {
							a[1]=keys.get(k);
							myRes.add(a);  //[0,6]
							values.get(k).remove(pageNo);
						}
					}
				}
			}
			
		}

		return myRes;
	}
	public Vector<Object[]> lowerboundmshinclusive(Object lowerBound) {

		// Instantiate Double array to hold values
		Vector<Vector<Double>> values = new Vector<Vector<Double>>();
		Vector<Object> keys = new Vector<Object>();
		Vector<Object[]>myRes=new Vector<Object[]>();


		// Iterate through the doubly linked list of leaves
		LeafNode currNode = this.firstLeaf;
		while (currNode != null) {

			// Iterate through the dictionary of each node
			DictionaryPair dps[] = currNode.dictionary;
			for (DictionaryPair dp : dps) {

				/* Stop searching the dictionary once a null value is encountered
				   as this the indicates the end of non-null values */
				if (dp == null) { break; }

				// Include value if its key fits within the provided range
				if(compare(lowerBound,dp.key)<0) {
					values.add(dp.value);
					keys.add(dp.key);

				}
				
			}

			/* Update the current node to be the right sibling,
			   leaf traversal is from left to right */
			currNode = currNode.rightSibling;

		}
		
		for(int i=0;i<values.size();i++) {
			Vector<Double> currvalsvector=values.get(i); //gebna el fih 0,1,1
			Collections.sort(currvalsvector);
			
			for(int j=0;j<currvalsvector.size();j++) { //0,1,1
				Double pageNo=currvalsvector.get(j);
				Object []a= new Object[2];
				a[0]=pageNo;
				a[1]=keys.get(i); //[0,5]
				myRes.add(a)  ;
				values.get(i).remove(pageNo);
				for(int k=i+1;k<values.size();k++) { //0
					Vector<Double> vector=values.get(k);
					for(int l=0;l<vector.size();l++) {
						if(vector.get(l)==pageNo) {
							a[1]=keys.get(k);
							myRes.add(a);  //[0,6]
							values.get(k).remove(pageNo);
						}
					}
				}
			}
			
		}



		return myRes;
	}
	public Vector<Object[]> upperboundmshinclusive(Object upperBound) {

		// Instantiate Double array to hold values
		Vector<Vector<Double>> values = new Vector<Vector<Double>>();
		Vector<Object> keys = new Vector<Object>();
		Vector<Object[]>myRes=new Vector<Object[]>();


		// Iterate through the doubly linked list of leaves
		LeafNode currNode = this.firstLeaf;
		while (currNode != null) {

			// Iterate through the dictionary of each node
			DictionaryPair dps[] = currNode.dictionary;
			for (DictionaryPair dp : dps) {

				/* Stop searching the dictionary once a null value is encountered
				   as this the indicates the end of non-null values */
				if (dp == null) { break; }

				// Include value if its key fits within the provided range
				if(compare(dp.key,upperBound)<0) {
					values.add(dp.value);
					keys.add(dp.key);

				}
				
			}

			/* Update the current node to be the right sibling,
			   leaf traversal is from left to right */
			currNode = currNode.rightSibling;

		}
		
		for(int i=0;i<values.size();i++) {
			Vector<Double> currvalsvector=values.get(i); //gebna el fih 0,1,1
			Collections.sort(currvalsvector);
			
			for(int j=0;j<currvalsvector.size();j++) { //0,1,1
				Double pageNo=currvalsvector.get(j);
				Object []a= new Object[2];
				a[0]=pageNo;
				a[1]=keys.get(i); //[0,5]
				myRes.add(a)  ;
				values.get(i).remove(pageNo);
				for(int k=i+1;k<values.size();k++) { //0
					Vector<Double> vector=values.get(k);
					for(int l=0;l<vector.size();l++) {
						if(vector.get(l)==pageNo) {
							a[1]=keys.get(k);
							myRes.add(a);  //[0,6]
							values.get(k).remove(pageNo);
						}
					}
				}
			}
			
		}

		return myRes;
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
	    }
	    else if (key1 instanceof Double && key2 instanceof Double) {
	        return Double.compare((Double) key1, (Double) key2);
	    } else {
	        // Handle other types or throw an exception if the types are not supported
	        throw new UnsupportedOperationException("Unsupported clustering key types");
	    }
	}
	

	/**
	 * Constructor
	 * @param m: the order (fanout) of the B+ tree
	 */
	public bplustree(int m) {
		this.m = m;
		this.root = null;
	}

	/**
	 * This class represents a general node within the B+ tree and serves as a
	 * superclass of InternalNode and LeafNode.
	 */
	public class Node implements java.io.Serializable{
		InternalNode parent;
	}

	/**
	 * This class represents the internal nodes within the B+ tree that traffic
	 * all search/insert/delete operations. An internal node only holds keys; it
	 * does not hold dictionary pairs.
	 */
	private class InternalNode extends Node implements java.io.Serializable{
		int maxDegree;
		int minDegree;
		int degree;
		InternalNode leftSibling;
		InternalNode rightSibling;
		Object[] keys;
		Node[] childPointers;

		/**
		 * This method appends 'pointer' to the end of the childPointers
		 * instance variable of the InternalNode object. The pointer can point to
		 * an InternalNode object or a LeafNode object since the formal
		 * parameter specifies a Node object.
		 * @param pointer: Node pointer that is to be appended to the
		 *                    childPointers list
		 */
		private void appendChildPointer(Node pointer) {
			this.childPointers[degree] = pointer;
			this.degree++;
		}

		/**
		 * Given a Node pointer, this method will return the index of where the
		 * pointer lies within the childPointers instance variable. If the pointer
		 * can't be found, the method returns -1.
		 * @param pointer: a Node pointer that may lie within the childPointers
		 *                     instance variable
		 * @return the index of 'pointer' within childPointers, or -1 if
		 * 'pointer' can't be found
		 */
		private int findIndexOfPointer(Node pointer) {
			for (int i = 0; i < childPointers.length; i++) {
				if (childPointers[i] == pointer) { return i; }
			}
			return -1;
		}

		/**
		 * Given a pointer to a Node object and an integer index, this method
		 * inserts the pointer at the specified index within the childPointers
		 * instance variable. As a result of the insert, some pointers may be
		 * shifted to the right of the index.
		 * @param pointer: the Node pointer to be inserted
		 * @param index: the index at which the insert is to take place
		 */
		private void insertChildPointer(Node pointer, int index) {
			for (int i = degree - 1; i >= index ;i--) {
				childPointers[i + 1] = childPointers[i];
			}
			this.childPointers[index] = pointer;
			this.degree++;
		}

		/**
		 * This simple method determines if the InternalNode is deficient or not.
		 * An InternalNode is deficient when its current degree of children falls
		 * below the allowed minimum.
		 * @return a boolean indicating whether the InternalNode is deficient
		 * or not
		 */
		private boolean isDeficient() {
			return this.degree < this.minDegree;
		}

		/**
		 * This simple method determines if the InternalNode is capable of
		 * lending one of its dictionary pairs to a deficient node. An InternalNode
		 * can give away a dictionary pair if its current degree is above the
		 * specified minimum.
		 * @return a boolean indicating whether or not the InternalNode has
		 * enough dictionary pairs in order to give one away.
		 */
		private boolean isLendable() { return this.degree > this.minDegree; }

		/**
		 * This simple method determines if the InternalNode is capable of being
		 * merged with. An InternalNode can be merged with if it has the minimum
		 * degree of children.
		 * @return a boolean indicating whether or not the InternalNode can be
		 * merged with
		 */
		private boolean isMergeable() { return this.degree == this.minDegree; }

		/**
		 * This simple method determines if the InternalNode is considered overfull,
		 * i.e. the InternalNode object's current degree is one more than the
		 * specified maximum.
		 * @return a boolean indicating if the InternalNode is overfull
		 */
		private boolean isOverfull() {
			return this.degree == maxDegree + 1;
		}

		/**
		 * Given a pointer to a Node object, this method inserts the pointer to
		 * the beginning of the childPointers instance variable.
		 * @param pointer: the Node object to be prepended within childPointers
		 */
		private void prependChildPointer(Node pointer) {
			for (int i = degree - 1; i >= 0 ;i--) {
				childPointers[i + 1] = childPointers[i];
			}
			this.childPointers[0] = pointer;
			this.degree++;
		}

		/**
		 * This method sets keys[index] to null. This method is used within the
		 * parent of a merging, deficient LeafNode.
		 * @param index: the location within keys to be set to null
		 */
		private void removeKey(int index) { this.keys[index] = null; }

		/**
		 * This method sets childPointers[index] to null and additionally
		 * decrements the current degree of the InternalNode.
		 * @param index: the location within childPointers to be set to null
		 */
		private void removePointer(int index) {
			this.childPointers[index] = null;
			this.degree--;
		}

		/**
		 * This method removes 'pointer' from the childPointers instance
		 * variable and decrements the current degree of the InternalNode. The
		 * index where the pointer node was assigned is set to null.
		 * @param pointer: the Node pointer to be removed from childPointers
		 */
		private void removePointer(Node pointer) {
			for (int i = 0; i < childPointers.length; i++) {
				if (childPointers[i] == pointer) { this.childPointers[i] = null; }
			}
			this.degree--;
		}

		/**
		 * Constructor
		 * @param m: the max degree of the InternalNode
		 * @param keys: the list of keys that InternalNode is initialized with
		 */
		private InternalNode(int m, Object[] keys) {
			this.maxDegree = m;
			this.minDegree = (int)Math.ceil(m/2.0);
			this.degree = 0;
			this.keys = keys;
			this.childPointers = new Node[this.maxDegree+1];
		}

		/**
		 * Constructor
		 * @param m: the max degree of the InternalNode
		 * @param keys: the list of keys that InternalNode is initialized with
		 * @param pointers: the list of pointers that InternalNode is initialized with
		 */
		private InternalNode(int m, Object[] keys, Node[] pointers) {
			this.maxDegree = m;
			this.minDegree = (int)Math.ceil(m/2.0);
			this.degree = linearNullSearch(pointers);
			this.keys = keys;
			this.childPointers = pointers;
		}
	}

	/**
	 * This class represents the leaf nodes within the B+ tree that hold
	 * dictionary pairs. The leaf node has no children. The leaf node has a
	 * minimum and maximum number of dictionary pairs it can hold, as specified
	 * by m, the max degree of the B+ tree. The leaf nodes form a doubly linked
	 * list that, i.e. each leaf node has a left and right sibling*/
	public class LeafNode extends Node implements java.io.Serializable{
		int maxNumPairs;
		int minNumPairs;
		int numPairs; 
		LeafNode leftSibling;
		LeafNode rightSibling;
		DictionaryPair[] dictionary;

		/**
		 * Given an index, this method sets the dictionary pair at that index
		 * within the dictionary to null.
		 * @param index: the location within the dictionary to be set to null
		 */
		public void delete(int index) {

			// Delete dictionary pair from leaf
			this.dictionary[index] = null;

			// Decrement numPairs
			numPairs--;
		}

		/**
		 * This method attempts to insert a dictionary pair within the dictionary
		 * of the LeafNode object. If it succeeds, numPairs increments, the
		 * dictionary is sorted, and the boolean true is returned. If the method
		 * fails, the boolean false is returned.
		 * @param dp: the dictionary pair to be inserted
		 * @return a boolean indicating whether or not the insert was successful
		 */
		public boolean insert(DictionaryPair dp) {
			if (this.isFull()) {

				/* Flow of execution goes here when numPairs == maxNumPairs */

				return false;
			} else {

				// Insert dictionary pair, increment numPairs, sort dictionary
				this.dictionary[numPairs] = dp;
				numPairs++;
				Arrays.sort(this.dictionary, 0, numPairs);

				return true;
			}
		}

		/**
		 * This simple method determines if the LeafNode is deficient, i.e.
		 * the numPairs within the LeafNode object is below minNumPairs.
		 * @return a boolean indicating whether or not the LeafNode is deficient
		 */
		public boolean isDeficient() { return numPairs < minNumPairs; }

		/**
		 * This simple method determines if the LeafNode is full, i.e. the
		 * numPairs within the LeafNode is equal to the maximum number of pairs.
		 * @return a boolean indicating whether or not the LeafNode is full
		 */
		public boolean isFull() { return numPairs == maxNumPairs; }

		/**
		 * This simple method determines if the LeafNode object is capable of
		 * lending a dictionary pair to a deficient leaf node. The LeafNode
		 * object can lend a dictionary pair if its numPairs is greater than
		 * the minimum number of pairs it can hold.
		 * @return a boolean indicating whether or not the LeafNode object can
		 * give a dictionary pair to a deficient leaf node
		 */
		public boolean isLendable() { return numPairs > minNumPairs; }

		/**
		 * This simple method determines if the LeafNode object is capable of
		 * being merged with, which occurs when the number of pairs within the
		 * LeafNode object is equal to the minimum number of pairs it can hold.
		 * @return a boolean indicating whether or not the LeafNode object can
		 * be merged with
		 */
		public boolean isMergeable() {
			return numPairs == minNumPairs;
		}

		/**
		 * Constructor
		 * @param m: order of B+ tree that is used to calculate maxNumPairs and
		 *           minNumPairs
		 * @param dp: first dictionary pair insert into new node
		 */
		public LeafNode(int m, DictionaryPair dp) {
			this.maxNumPairs = m - 1;
			this.minNumPairs = (int)(Math.ceil(m/2) - 1);
			this.dictionary = new DictionaryPair[m];
			this.numPairs = 0;
			this.insert(dp);
		}

		/**
		 * Constructor
		 * @param dps: list of DictionaryPair objects to be immediately inserted
		 *             into new LeafNode object
		 * @param m: order of B+ tree that is used to calculate maxNumPairs and
		 * 		     minNumPairs
		 * @param parent: parent of newly created child LeafNode
		 */
		public LeafNode(int m, DictionaryPair[] dps, InternalNode parent) {
			this.maxNumPairs = m - 1;
			this.minNumPairs = (int)(Math.ceil(m/2) - 1);
			this.dictionary = dps;
			this.numPairs = linearNullSearch(dps);
			this.parent = parent;
		}
	}

	/**
	 * This class represents a dictionary pair that is to be contained within the
	 * leaf nodes of the B+ tree. The class implements the Comparable interface
	 * so that the DictionaryPair objects can be sorted later on.
	 */
	public class DictionaryPair implements Comparable<DictionaryPair>, java.io.Serializable {
		Object key;
		Vector<Double> value = new Vector<Double>();//vector of double values

		/**
		 * Constructor
		 * @param key: the key of the key-value pair
		 * @param value: the value of the key-value pair
		 */
		public DictionaryPair(Object key, Vector<Double> value) {
			this.key = key;
			this.value = value;
		}

		/**
		 * This is a method that allows comparisons to take place between
		 * DictionaryPair objects in order to sort them later on
		 * @param o
		 * @return
		 */
		@Override
		public int compareTo(DictionaryPair o) {
			 if (key == null && o.key == null) {
			        return 0;
			    } else if (key == null) {
			        return -1; // Treat null as less than any non-null value
			    } else if (o.key == null) {
			        return 1; // Treat any non-null value as greater than null
			    }

			    // Compare based on the actual types
			    if (key instanceof String && o.key instanceof String) {
			        return ((String) key).compareTo((String) o.key);
			    } else if (key instanceof Integer && o.key instanceof Integer) {
			        return Integer.compare((Integer) key, (Integer) o.key);
			    } else if (key instanceof Double && o.key instanceof Double) {
			        return Double.compare((Double) key, (Double) o.key);
			    } else {
			        // Handle other types or throw an exception if the types are not supported
			        throw new UnsupportedOperationException("Unsupported clustering key types");
			    }

		}
		//only used for delete
		public boolean equals(DictionaryPair o) {
			if(((double)o.key!=(double) key)) 
				return false;
			
			if(!(value.equals(o.value)))
				return false;
			return true;
			
		}
		 
		


	}
	public Object getMaxValue() {

		// Instantiate Double array to hold values

		// Iterate through the doubly linked list of leaves
		LeafNode currNode = this.firstLeaf;
		LeafNode prev = this.firstLeaf;
		while (currNode != null) {

			/* Update the current node to be the right sibling,
			   leaf traversal is from left to right */
			prev=currNode;
			currNode = currNode.rightSibling;

		}

		return prev.dictionary[prev.numPairs-1].key;
	}

	public static void main(String[] args) {
		bplustree bt= new bplustree(4);
		bt.insert(3, 2);
		bt.insert(3, 1);
		bt.insert(2, 2);
		bt.insert(4, 2);
		bt.delete(3);
		System.out.println(bt.firstLeaf.dictionary[0].key);
		System.out.println(bt.firstLeaf.dictionary[1].key);
		System.out.println(bt.firstLeaf.dictionary[2].key);
		//System.out.println(bt.firstLeaf.numPairs);
//		
		//DictionaryPair dp= new DictionaryPair(4,v2);
		
		
//		arr[0]=3;
//		arr[1]=v;
//		Object []arr2=new Object[2];
//		arr[0]=3;
//		arr[1]=v;
//		
//		if(arr.length!=arr2.length) {
//			System.out.println("false");
//		}
//		else {
//			if ((double)arr[0]==(double)arr2[0]) {
//				System.out.println("false");
//			}
//			else if(((Vector<Double>)arr[1]).equals(((Vector<Double>)arr2[1]))) {
//				System.out.println(false);
//				
//			}
//		else 
//			System.out.println(true);
//		
//		
//		}
//		
//		bt.insert(4, 0);
//		bt.insert(7, 0);
//		bt.insert(3, 0);
//		bt.insert(9, 0);
//		bt.insert(2, 0);
//		bt.insert(8, 0);
//		bt.insert(1, 0);
//		bt.print();
		//bplustree bt= new bplustree(4);
//		// Ensure correct number of arguments
//		if (args.length != 1) {
//			System.err.println("usage: java bplustree <file_name>");
//			System.exit(-1);
//		}
//
//		// Read from file
//		String fileName = args[0];
//		try {
//
//			// Prepare to read input file
//			File file = new File(System.getProperty("user.dir") + "/" + fileName);
//			Scanner sc = new Scanner(file);
//
//			// Create output file in which search results will be stored
//			FileWriter logger = new FileWriter("output_file.txt", false);
//			boolean firstLine = true;
//
//			// Create initial B+ tree
//			bplustree bpt = null;
//
//			// Perform an operation for each line in the input file
//			while (sc.hasNextLine()) {
//				String line = sc.nextLine().replace(" ", "");
//				String[] tokens = line.split("[(,)]");
//
//				switch (tokens[0]) {
//
//					// Initializes an m-order B+ tree
//					case "Initialize":
//						bpt = new bplustree(Integer.parseInt(tokens[1]));
//						break;
//
//					// Insert a dictionary pair into the B+ tree
//					case "Insert":
//						bpt.insert(Integer.parseInt(tokens[1]), Double.parseDouble(tokens[2]));
//						break;
//
//					// Delete a dictionary pair from the B+ tree
//					case "Delete":
//						bpt.delete(Integer.parseInt(tokens[1]));
//						break;
//
//					// Perform a search or search operation on the B+ tree
//					case "Search":
//						String result = "";
//
//						// Perform search (across a range) operation
//						if (tokens.length == 3) {
//							ArrayList<Double> values = bpt.search(
//											Integer.parseInt(tokens[1]),
//											Integer.parseInt(tokens[2]));
//
//							// Record search result as a String
//							if (values.size() != 0) {
//								for (double v : values) { result += v + ", "; }
//								result = result.substring(0, result.length() - 2);
//							} else {
//								result = "Null";
//							}
//
//						}
//
//						// Perform search operation
//						else {
//
//							/* Perform search for key, if resulting value is
//							   null, then the key could not be found */
//							Double value = bpt.search(Integer.parseInt(tokens[1]));
//							result = (value == null) ? "Null" :
//														Double.toString(value);
//						}
//
//						// Output search result in .txt file
//						if (firstLine) {
//							logger.write(result);
//							firstLine = false;
//						} else {
//							logger.write("\n" + result);
//						}
//						logger.flush();
//
//						break;
//					default:
//						throw new IllegalArgumentException("\"" + tokens[0] +
//								"\"" + " is an unacceptable input.");
//				}
//			}
//
//			// Close output file
//			logger.close();
//
//		} catch (FileNotFoundException e) {
//			System.err.println(e);
//		} catch (IllegalArgumentException e) {
//			System.err.println(e);
//		} catch (IOException e) {
//			System.err.println(e);
//		}
	}

	public void print() {
	    if (root == null) {
	        System.out.println("The tree is empty.");
	        return;
	    }
	    Queue<Node> queue = new LinkedList<>();
	    queue.add(root);
	    while (!queue.isEmpty()) {
	        int levelSize = queue.size();
	        for (int i = 0; i < levelSize; i++) {
	            Node node = queue.poll();
	            if (node instanceof InternalNode) {
	                InternalNode internalNode = (InternalNode) node;
	                System.out.print("[ ");
	                for (int j = 0; j < internalNode.degree; j++) {
	                    System.out.print(internalNode.keys[j] + " ");
	                }
	                System.out.print("] ");
	                for (int j = 0; j < internalNode.degree; j++) {
	                    if (internalNode.childPointers[j] != null) {
	                        queue.add(internalNode.childPointers[j]);
	                    }
	                }
	            } else if (node instanceof LeafNode) {
	                LeafNode leafNode = (LeafNode) node;
	                System.out.print("[ ");
	                for (int j = 0; j < leafNode.numPairs; j++) {
	                    System.out.print("(" + leafNode.dictionary[j].key + ", " + leafNode.dictionary[j].value + ") ");
	                }
	                System.out.print("] ");
	            }
	        }
	        System.out.println();
	    }
	}
}