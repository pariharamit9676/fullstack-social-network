import API from "../axios";

export async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("http://localhost:3000/api/posts/upload", formData);
      return res.data;
    } catch (error) {
      console.error("Error uploading file", error);
    }
  }