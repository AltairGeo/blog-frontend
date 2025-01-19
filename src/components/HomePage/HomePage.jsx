import './HomePage.css'
import { useState, useEffect } from 'react';
import ErrorText from '../Error/Error'
import Loading from '../Loading/Loading'
import Post from './Post';

function HomePage() {
    const [posts, setPosts] = useState([]); // Хранилище для данных
    const [loading, setLoading] = useState(true); // Индикатор загрузки
    const [error, setError] = useState(null); // Хранилище для ошибок
    
    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch('http://127.0.0.1:8000/posts/get_last_posts');
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
        {loading ? <Loading /> : error != null ? "" : <ul className='posts'>{posts.map((post) => (
    <Post key={post.id} title={post.title} body={post.text} author={post.author_id} />
))}</ul>}
    </>
    )
}
export default HomePage