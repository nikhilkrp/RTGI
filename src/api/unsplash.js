import axios from "axios";

const unsplash = axios.create({
    baseURL: "https://api.unsplash.com",
    headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
    },
});


export const fetchImages = async ({ pageParam = 1 }) => {
    try {
        const res = await unsplash.get("/photos", {
            params: {
                page: pageParam,
                per_page: 12,
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
};