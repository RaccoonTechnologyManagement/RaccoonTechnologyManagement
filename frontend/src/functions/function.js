
import axios from "axios";

export async function uploadImageProfile(file) {
  const formData = new FormData();
  formData.append("profilePicture", file);

  try {
    const response = await axios.post("/api/upload-profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.imageUrl; // Retorna a URL da imagem salva no servidor
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    throw error;
  }
}
