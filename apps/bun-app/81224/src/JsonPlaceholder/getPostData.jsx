import axios from "axios"
const API = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
});
export const getPostData = () => {
    try {
        const response = API.get(
            "posts"
        );
        return response; // Return the fetched data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Throw the error so the router can handle it
    };
}