import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebase";

const useFileUpload = () => {
  const uploadFile = async (file) => {
    if (!file) return null;

    const fileRef = ref(storage, `images/${uuidv4()}`);
    try {
      await uploadBytes(fileRef, file);
      return await getDownloadURL(fileRef);
    } catch {
      throw new Error("Failed to upload file. Please try again.");
    }
  };

  return { uploadFile };
};

export default useFileUpload;
