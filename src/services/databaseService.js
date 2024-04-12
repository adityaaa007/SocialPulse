import { db } from "./firebaseApp";
import { collection, addDoc, getDocs } from "firebase/firestore";

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
      const querySnapshot = await getDocs(this.dbCollection);
      const data = [];
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        data.push(doc.data);
      });

      return data;
    } catch (error) {
      console.log("getAllData error: " + error);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
