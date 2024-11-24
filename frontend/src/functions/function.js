import axios from 'axios';

export async function uploadImageProfile(file)
{
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await axios.post("../img/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
}