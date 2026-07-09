import Conf from "../conf/conf";
import {Client, ID, Storage} from "Appwrite"

class FileService{
    client = new Client();
    bucket;

    constructor(){
        this.client
        .setEndpoint(Conf.appWriteUrl)
        .setProject(Conf.appWriteProjectId);

        this.bucket = new Storage(this.client); // creating storage 
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile({
            bucketId: Conf.appWriteBucketId,
            fileId: ID.unique(),
            file
            });
        } catch (error) {
            console.log("Appwrite FileService :: uploadFile :: error: " , error);
            return false;
        }
    }
    
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile({
                bucketId: Conf.appWriteBucketId,
                fileId
            })
            return true;
        } catch (error) {
            console.log("Appwrite FileService :: deleteFile :: error: " , error);
            return false;
        }
    }

    filePreview(fileId){
        try {
            return this.bucket.getFileView({
                bucketId: Conf.appWriteBucketId,
                fileId
            })
            
        } catch (error) {
            console.log("Appwrite FileService :: filePreview :: error: " , error);
            return false;
        }
    }

}

const fileService = new FileService();
export default fileService;