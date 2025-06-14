import axiosInstance from "./axiosInstance";

const localFilesURL = "/local-files";

class LocalFilesApi {
  async uploadFile(formData: FormData) {
    try {
      const res = await axiosInstance.post(localFilesURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.data;
    } catch (error) {
      console.error("Error uploading file: ", error);
      throw error;
    }
  }
}

const localFilesApi = new LocalFilesApi();

export default localFilesApi;
