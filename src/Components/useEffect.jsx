import {useEffect,useState} from "react";

export default function UseEffect() {
    const[count,setCount]=useState(0);
    useEffect(()=>{
        console.log("count updated",count);
    },[count]);
    const handleInc=()=>{
        setCount(count + 1);
    }
    return (
        <>
        <p>{count}</p>
         <button onClick={handleInc}>count</button>
        </>
    )
}