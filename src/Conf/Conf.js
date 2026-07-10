const conf = {
    appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL || ''),
    appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || ''),
    appWriteDbId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID || ''),
    appWriteTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID || ''),
    appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID || ''),
    tinyMceApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY || '')
};

if (!import.meta.env.VITE_APPWRITE_URL || !import.meta.env.VITE_APPWRITE_PROJECT_ID) {
    console.warn(
        "Warning: Appwrite environment variables (VITE_APPWRITE_URL / VITE_APPWRITE_PROJECT_ID) are missing. " +
        "Please check your .env file or configuration in Vercel settings."
    );
}

export default conf;