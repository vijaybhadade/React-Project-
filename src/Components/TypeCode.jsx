import { useEffect, useState } from "react";
import "./TypeCode.css";
export default function TypeCode() {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(5);

    useEffect(() => {

        async function FetchData() {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/posts");
                const result = await res.json();
                setData(result);
            } catch (error) {
                setError("Something went  wrong...");

            }
            finally {
                setloading(false);
            }
        };
        FetchData();
    }, []);

    if (loading) {
        return <h2>Page is Loading...</h2>
    }

    if (error) {
        return <h3>{error}</h3>
    }

    const togglePosts = () => {
        setVisible(visible === data.length ? 5 : data.length);
    };



    return (
        <div>
            {data.slice(0, visible).map(items => (
                <p key={items.id}> <b>{items.title}</b></p>
            ))}
            <button onClick={togglePosts} disabled={data.length === visible} className="Show-More"> <b> Show more posts </b></button>
            <button onClick={togglePosts} disabled={visible === 5} className="Show-Less"> <b> show less posts </b></button>
        </div>
    )
}