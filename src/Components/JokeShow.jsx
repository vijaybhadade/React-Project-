import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import "./JokeShow.css";

export default function JokeShow() {

    const { data, loading, error, refetch } = useFetch(
        "https://official-joke-api.appspot.com/random_ten"
    );

    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("all");
    const [visible, setVisible] = useState(5);
    const [show, setShow] = useState(null);

    // set initial data
    useEffect(() => {
        setFiltered(data);
        setVisible(5);

    }, [data]);

    //search + filter data 
    useEffect(() => {
        const timer = setTimeout(() => {
            let filteredData = data;

            if (type !== "all") {
                filteredData = filteredData.filter(joke => joke.type === type);
            }

            if (search) {
                filteredData = filteredData.filter(joke =>
                    joke.setup.toLowerCase().includes(search.toLowerCase())
                );
            }

            setFiltered(filteredData);
            setVisible(5);

        }, 500);

        return () => clearTimeout(timer);
    }, [search, data, type]);


    //Scroll Screan 
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && visible < filtered.length) {
                setVisible((pre) => pre + 10);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [visible, filtered.length]);

    // filter function
    function filterJokes(selectedType) {
        setType(selectedType);
        setSearch("");
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    const handleMore = () => {
        setVisible(pre => pre + 5);
    }

    return (
        <div className="out-layer">

            <h2>😂 Joke App</h2>

            {/* Filter Buttons */}
            <div className="filter-btns">
                <button onClick={() => filterJokes("all")} className={type === "all" ? "btn-all active" : "btn-all"}>
                    All
                </button>
                <button onClick={() => filterJokes("general")} className="btn-general">General</button>
                <button onClick={() => filterJokes("programming")} className="btn-pro">Programming</button>
            </div>


            <input
                type="text"
                placeholder="Search jokes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
                <button onClick={() => setSearch("")} className="btn-clear">Clear</button>
            )}

            {loading && <p>Fetching new jokes...</p>}

            {/* Joke List */}
            {filtered.length === 0 ? (
                <p>No jokes found 😅</p>
            ) : (
                filtered.slice(0, visible).map((joke, index) => (
                    <div key={index} className="joke-card">
                        <h3>{joke.setup}</h3>
                        {show === index && <p>{joke.punchline}</p>}
                        <button onClick={() => setShow(show===index ? null: index)} className="btn-puch">
                            {show===index ? "hide punchline " : "show punchline"}
                        </button>
                    </div>
                ))
            )}

            <div>
                {/* Next Button */}
                <button
                    onClick={refetch}
                    className="next-btn"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Next Jokes"}
                </button>

                {/* More JOkes  */}
                {
                    visible < filtered.length && (<button onClick={handleMore} className="More-btn">Lead More </button>)
                }

            </div>




        </div>
    );
}