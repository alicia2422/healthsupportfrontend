const handleFileUpload = (file, path, onUpload) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "healthsupport users"); // Replace with your upload preset
  formData.append("cloud_name", "dhvl53iga"); // Replace with your cloud name

  fetch("https://api.cloudinary.com/v1_1/dhvl53iga/image/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      onUpload(data.secure_url); // The uploaded image URL
    })
    .catch((err) => console.error("Error uploading image:", err));
};

export default handleFileUpload;
