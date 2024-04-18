import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebaseApp";
import imageCompression from "browser-image-compression";

class StorageService {
  storageRef;

  async uploadFile({ path, file }) {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: path.includes("post_images") ? 0.5 : 0.08, // Set the maximum file size in MB (adjust as needed)
      maxWidthOrHeight: 720, // Set the maximum width or height (adjust as needed)
    });
    this.storageRef = ref(storage, path);
    return await uploadBytes(this.storageRef, compressedFile)
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

  deleteImageFromStorage = async ({ imagePath }) => {
    try {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
      return true;
    } catch (error) {
      console.error("deleteImageFromStorage error:", error);
      throw error;
    }
  };
}

const storageService = new StorageService();
export default storageService;
