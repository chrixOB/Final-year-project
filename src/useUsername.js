import { useState } from "react";

const useUsername =()=>{
    const [username, setUsername] = useState('')

    return {username, setUsername};
};

export default useUsername;