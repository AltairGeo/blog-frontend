import { useParams } from "react-router";
import './PostPage.css'
import MarkdownViewer from "../../mdViewer/view";
import { Link } from "react-router";
import Loading from "../../Loading/Loading"
import { useState, useEffect } from "react";
import ErrorText from "../../Error/Error";



export default function PostPage(){
    const [loader, setLoader] = useState(true)
    const [Error_MSG, setError] = useState(null)
    const [PostText, setPostText] = useState(null)
    const [PostTitle, setPostTitle] = useState(null)
    const [PostAuthorName, setPostAuthor] = useState(null)
    const [PostAuthorID, setAuthorID] = useState(null)
    const [PostDate, setPostDate] = useState(null)
    const [PostLikes, setPostLikes] = useState(null)
    const [PostDisLikes, setPostDisLikes] = useState(null)
    const params = useParams();
    
    
    useEffect( () => {
    async function fetchData(){
        try{
        const response = await fetch(`http://localhost:8000/posts/get_post?post_id=${params.postId}`)
        if(!response.ok){
            throw new Error(response.statusText)
        }
        const data = await response.json()
        setPostText(data.text)
        setPostTitle(data.title)
        setPostAuthor(data.author_name)
        const dateStr = data.created_at;
        const dateObj = new Date(dateStr);
        const formatter = new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        const formattedDate = formatter.format(dateObj);
        setPostDate(formattedDate)
        setAuthorID(data.author_id)

        const formatterLikes = new Intl.NumberFormat('en', { 
            notation: 'compact', 
            compactDisplay: 'short' 
        });

        setPostLikes(formatterLikes.format(data.likes))
        setPostDisLikes(formatterLikes.format(data.dislikes))
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
                        <div className="PostFooter">
                            <span className="cont-foot">
                                <div className="PostAuthor"><Link to={`/user/${PostAuthorID}`}>{PostAuthorName}</Link></div>
                                <span className="rating-span">
                                    <div className="PostLike">
                                        <button></button>
                                        <p>{PostLikes}</p>
                                    </div>
                                    <div className="PostDislike">
                                        <button></button>
                                        <p>{PostDisLikes}</p>
                                    </div>
                                </span>
                            </span>
                            <span className="PostDate">{PostDate}</span>
                        </div>
                    </div>
                </div>
            </div>
            : null}
        </>
    )
}