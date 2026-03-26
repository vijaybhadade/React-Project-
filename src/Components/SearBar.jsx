import { useState } from "react";
import "./SearBar.css";

export default function SearBar({ onSearch }) {
    const [input, setInput] = useState("");

    const handleBtnClick = () => {
        if (input.trim() !== "") {
            onSearch(input); // This sends the name back to App.js
        }
    };

    return (
        <div className="Search-Container">
            <input 
                type="text" 
                placeholder="Filter Dummany..." 
                className="input-box"
                value={input}
                onChange={(e) => setInput(e.target.value)} 
            />
            <button type="button" className="Search-btn" onClick={handleBtnClick}>
                Search
            </button>
        </div>
    );
}