/**
 * Uploads a file to ImageKit using client-side credentials.
 * Falls back to base64 DataURL if credentials or upload fail.
 */
export async function uploadToImageKit(file: File): Promise<string> {
  try {
    const authRes = await fetch("/api/imagekit/auth");
    if (!authRes.ok) throw new Error("Failed to authenticate ImageKit upload");
    const { token, expire, signature } = await authRes.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("publicKey", "public_mock_key");
    formData.append("signature", signature);
    formData.append("expire", String(expire));
    formData.append("token", token);
    formData.append("folder", "/clinic");

    const ikResponse = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      body: formData,
    });

    if (ikResponse.ok) {
      const ikData = await ikResponse.json();
      return ikData.url;
    }
  } catch (error) {
    console.warn("ImageKit upload error, falling back to base64 encoding:", error);
  }

  // Fallback: Read file as Base64 Data URL so it saves & displays correctly
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
