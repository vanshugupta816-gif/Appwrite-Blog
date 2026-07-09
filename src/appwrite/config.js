import Conf from "../conf/conf";
import {Client, TablesDB, Storage, Query} from "Appwrite"

class DbService{
    client = new Client();
    tablesDB;
    bucket;

    constructor(){
        this.client
        .setEndpoint(Conf.appWriteUrl)
        .setProject(Conf.appWriteProjectId);

        this.tablesDB = new TablesDB(this.client); // creating DB
        this.bucket = new Storage(this.client); // creating storage 
    }

    async createPost({title, content, slug, featuredimage, status, userId}){
        try {
            return await this.tablesDB.createRow({
                databaseId: Conf.appWriteDbId,
                tableId: Conf.appWriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId,
                },
            });
        } catch (error) {
            console.log("Appwrite DbService :: createPost :: error: " , error);
            return false;
        }
    }

    async updatePost(rowId, {title, content, featuredimage, status}){
        try {
            return await this.tablesDB.updateRow({
            databaseId: Conf.appWriteDbId,
            tableId: Conf.appWriteTableId,
            rowId,
            data: {
                title,
                content,
                featuredimage,
                status
            },
            });
        } catch (error) {
            console.log("Appwrite DbService :: updatePost :: error: " , error);

        }
    }

    async deletePost(rowId){
        try {
            await this.tablesDB.deleteRow({
            databaseId: Conf.appWriteDbId,
            tableId: Conf.appWriteTableId,
            rowId,
            });
            return true;
        } catch (error) {
            console.log("Appwrite DbService :: deletePost :: error: " , error);
            return false;
        }
    }

    async getPost(rowId){
        try {
            return await this.tablesDB.getRow({
            databaseId: Conf.appWriteDbId,
            tableId: Conf.appWriteTableId,
            rowId,
        });
        } catch (error) {
            console.log("Appwrite DbService :: getPost :: error: " , error);
            return false;
        }
    }
    
    async getAllActivePosts(queries = [Query.equal("status","active")]){ 
        try {
            return await this.tablesDB.listRows({
            databaseId: Conf.appWriteDbId,
            tableId: Conf.appWriteTableId,
            queries   // we can only use queries if we have maded index in that column (like: 'status')
            })
        } catch (error) {
            console.log("Appwrite DbService :: getAllActivePosts :: error: " , error);
            return false;
        }

    }
}

const dbService = new DbService();

export default dbService;