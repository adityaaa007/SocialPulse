import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseApp";

class StorageService {
  storageRef;

  async uploadFile({ path, file }) {
    this.storageRef = ref(storage, path);
    return await uploadBytes(this.storageRef, file)
      .then((snapshot) => {
        return snapshot.metadata.fullPath;
      })
      .catch((error) => {
        console.log("uploadFile error: " + error);
        throw error;
      });
  }

  async downloadFile({ url }) {
    this.storageRef = ref(storage, url);
    return await getDownloadURL(this.storageRef)
      .then((imageUrl) => {
        return imageUrl;
      })
      .catch((error) => {
        console.log("downloadFile error: " + error);
        throw error;
      });
  }
}

const storageService = new StorageService();
export default storageService;
