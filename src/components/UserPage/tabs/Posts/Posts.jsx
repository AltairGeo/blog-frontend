import { useEffect, useState } from "react"
import { BackendUrl } from "../../../../../config"
import MainPost from "../../../Post/post"
import Loading from "../../../Loading/Loading"


export default function UserPosts(props) {
    const [PostsData, setPostsData] = useState([])

    useEffect(() => {
        const getUserPosts = async () => {
            const resp = await fetch(`${BackendUrl}/users/posts/${props.usr_id}`)
            const respData = await resp.json()
            setPostsData(respData)
        }
        getUserPosts()
    }, [props.usr_id])

    return (
        <>
        {!PostsData ? <Loading></Loading> :
        <>
        <ul className='post-list'>
            {
            PostsData.map((post) => (
                            <MainPost
                                key={post.id}
                                date={post.created_at} 
                                title={post.title} 
                                nickname={null} 
                                id={post.id} 
                                text={post.text.slice(0, 150)} 
                                likes={post.likes} 
                                dislikes={post.dislikes} 
                                author_id={post.author_id}
                            /> ))}
        </ul>
        </>
        }
        </>
    )
}