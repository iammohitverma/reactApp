import { getPostData } from "./getPostData";
import { useEffect } from "react";
export const ApiCheckPage = () => {
    const getData = async () => {
        const data = await getPostData();
        console.log(data);
    }
    useEffect(() => {
        getData();
    }, [])


    return (
        <h1>ApiCheckPage</h1>
    )
}