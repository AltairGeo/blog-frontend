import './HomePage.css'
import { useState, useEffect } from 'react';
import ErrorText from '../../Error/Error'
import Loading from '../../Loading/Loading'
import Post from './Post';
import Paper from '../../Paper/Paper';
import {BackendUrl} from '../../../../config'


function HomePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(`${BackendUrl}/posts/get_last_posts`);
                if(!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setPosts(data);
            } catch (err){
                setError({statusText: err.message});
            } finally {
                setLoading(false);
            }
        }
        fetchPosts()}, [])
    
    return (
    <>
        {error != null ? <ErrorText title="Error!" text={error.statusText}></ErrorText> : ""}
        {loading ?
            <Loading /> : 
            error != null ? "" 
        : 
        <Paper marg={true}>
            <ul className='posts'>
                {posts.map((post) => (
            <Post postID={post.id} key={post.id} title={post.title} body={post.text} author_name={post.author_name} likes={post.likes} dislikes={post.dislikes} author_id={post.author_id}/>
                    )
                )
            }
            </ul>
        </Paper>}
    </>
    )
}
export default HomePage