import { db } from "./firebaseApp";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

class DatabaseService {
  dbCollection;

  async uploadData({ collectionPath, data }) {
    this.dbCollection = collection(db, collectionPath);

    try {
      const docRef = await addDoc(this.dbCollection, data);
      console.log("docRef id : ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("uploadData error: ", e);
      throw error;
    }
  }

  async getAllData({ collectionPath }) {
    this.dbCollection = collection(db, collectionPath);

    try {
      const q = query(this.dbCollection, orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ data: doc.data(), id: doc.id });
      });

      return docs;
    } catch (error) {
      console.log("getAllData error: " + error);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
