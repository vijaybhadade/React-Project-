import { useState, useEffect } from "react";

import "./Dummany.css";
export default function Dummany({ search }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(5);





    useEffect(() => {
        async function fetchDummany() {
            try {
                const res = await fetch("https://dummyjson.com/posts");
                const result = await res.json();
                setData(result.posts);
            }
            catch (error) {
                setError("Somethings went wrong");
            }
            finally {
                setLoading(false);
            }

        }
        fetchDummany();
    }, []);

    if (error) {
        return <p>{error}</p>
    }
    if (loading) {
        return <h2> Page Loading...</h2>
    }

    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes((search || "").toLowerCase()) ||
        item.body.toLowerCase().includes((search || "").toLowerCase())
    );

    const togglePosts = () => {
        setVisible(visible === filteredData.length ? 5 : filteredData.length);

    }

    if (filteredData.length === 0) {
        return <h3>No results found</h3>;
    }

    

    return (
        <div>
            {filteredData.slice(0, visible).map(item => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                </div>
            ))}

            <button
                onClick={togglePosts}
                disabled={visible === filteredData.length}
            >
                Show all Posts
            </button>

            <button
                onClick={() => setVisible(5)}
                disabled={visible === 5}
            >
                Show 5 Posts
            </button>
        </div>
    );
}