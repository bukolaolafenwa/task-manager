export const uploadImageToCloudinary =
  async (file: File) => {

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    formData.append(
      "upload_preset",
      import.meta.env
        .VITE_CLOUDINARY_UPLOAD_PRESET
    );

    console.log(
      "Cloud Name:",
      import.meta.env
        .VITE_CLOUDINARY_CLOUD_NAME
    );

    console.log(
      "Preset:",
      import.meta.env
        .VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const response =
      await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env
            .VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

    const data =
      await response.json();

    console.log(
      "FULL CLOUDINARY RESPONSE:",
      data
    );

    console.log(
      "CLOUDINARY ERROR:",
      data.error
    );

    if (!response.ok) {

      throw new Error(
        data.error?.message ||
        "Cloudinary upload failed"
      );

    }

    return data.secure_url;
};