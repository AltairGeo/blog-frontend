import { useParams } from "react-router";
import './PostPage.css'
import MarkdownViewer from "../mdViewer/view";
import { Link } from "react-router";
import Loading from "../Loading/Loading"
import { useState, useEffect } from "react";
import ErrorText from "../Error/Error";


export default function PostPage(){
    const [loader, setLoader] = useState(true)
    const [Error_MSG, setError] = useState(null)
    const [PostText, setPostText] = useState(null)
    const [PostTitle, setPostTitle] = useState(null)
    const params = useParams();
    useEffect( () => {
    async function fetchData(){
        try{
        const response = await fetch(`http://localhost:8000/posts/get_post_by_id?ids=${params.postId}`)
        if(!response.ok){
            throw new Error(response.statusText)
        }
        const data = await response.json()
        setPostText(data.text)
        setPostTitle(data.title)
    } catch (error){
        setError(error.message)
    } finally {
        setLoader(false)
    }
    }
    fetchData()}, [])

    return (
        <>
            <Link to="/"><button className="btn-home"></button></Link>
            {loader ? <Loading></Loading> : null}
            {Error_MSG != null ? <ErrorText title="Error!" text={Error_MSG}></ErrorText> : null}

            {Error_MSG === null && loader === false ?
            <div className="scrn">
                <div className="PostBase">
                    <div className="PostContainer">
                        <div className="PostTitle">
                            <p className="text-title">{PostTitle}</p>
                        </div>
                        <div className="PostText">
                            <MarkdownViewer value={PostText}/>
                        </div>
                    </div>
                </div>
            </div>
            : null}
        </>
    )
}