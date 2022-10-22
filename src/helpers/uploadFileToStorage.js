import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

export function uploadFileToStorage(file, recipeOwnerId, timeStamp) {
  return new Promise(resolve => {
    const storageName = timeStamp + recipeOwnerId
    const storageRef = ref(storage, `${recipeOwnerId}/${storageName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break
        }
      }, 
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break
          case 'storage/unknown':
            break
          default:
            break
        }
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          resolve(downloadURL)
        });
      }
    );
  })
}