import { Cloudinary } from "@cloudinary/url-gen";

class ImageUploader {
  async upload(file) {
    console.dir("upload");
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "fysbrwej");
    const result = await fetch(
      "https://api.cloudinary.com/v1_1/ds5k8iz93/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    return await result.json();
  }
}

export default ImageUploader;
