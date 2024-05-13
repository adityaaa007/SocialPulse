import { db } from "./firebaseApp";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  getDoc,
  deleteDoc,
  where
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

  async getAllData({ collectionPath, queryName, queryOrder }) {
    this.dbCollection = collection(db, collectionPath);

    try {
      const q = queryName
        ? query(this.dbCollection, orderBy(queryName, queryOrder))
        : query(this.dbCollection);
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

  async getUserPosts({ userId }) {
    this.dbCollection = collection(db, "posts");

    try {
      const q = query(this.dbCollection, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ data: doc.data(), id: doc.id });
      });

      return docs;
    } catch (error) {
      console.log("getUserPosts error: " + error);
      throw error;
    }
  }

  listenToDocument = ({ documentId, collectionId, callback }) => {
    const docRef = doc(db, collectionId, documentId);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      console.log("Document data: ", doc.data());
      callback(doc.data());
    });

    return unsubscribe;
  };

  updateDocumentField = async ({ collectionId, documentId, field, value }) => {
    const documentRef = doc(db, collectionId, documentId);

    try {
      await updateDoc(documentRef, {
        [field]: value,
      });

      return true;
    } catch (error) {
      console.error("updateDocumentField error:", error);
      throw error;
    }
  };

  setDocument = async ({ collectionId, documentId, data }) => {
    const docRef = doc(db, collectionId, documentId);

    try {
      await setDoc(docRef, data);
      return true;
    } catch (error) {
      console.error("setDocument error:", error);
      throw error;
    }
  };

  getDocument = async ({ collectionId, documentId }) => {
    const docRef = doc(db, collectionId, documentId);

    try {
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (error) {
      console.error("getDocument error:", error);
      throw error;
    }
  };

  deleteDocument = async ({ collectionName, documentId }) => {
    try {
      const documentRef = doc(db, collectionName, documentId);
      await deleteDoc(documentRef);
      return true;
    } catch (error) {
      console.error("deleteDocument error:", error);
      throw error;
    }
  };
}

const databaseService = new DatabaseService();
export default databaseService;
