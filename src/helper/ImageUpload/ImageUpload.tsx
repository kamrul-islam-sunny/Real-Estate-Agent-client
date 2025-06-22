import toast from "react-hot-toast";

const uploadImageToImageBB = async (imageFile: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`, {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (data.success) {
            return data.data.url; 
        } else {
            throw new Error("Image upload failed");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("❌ Failed to upload image. Please try again.");
        return null;
    }
};

export default uploadImageToImageBB;