import React, { useEffect, useState } from 'react';  
import { Link } from 'react-router-dom';  
import axios from 'axios';  
  
function App() {  
    const [archives, setArchives] = useState([]);   
    const [loading, setLoading] = useState(true);  
  
    useEffect(() => {  
        axios.get('http://localhost:5000/api/archives')   
            .then(res => {  
                if (Array.isArray(res.data)) {  
                    setArchives(res.data);  
                } else {  
                    setArchives([]);   
                }  
                setLoading(false);  
            })  
            .catch(err => {  
                console.error("Error fetching archives:", err);  
                setLoading(false);  
            });  
    }, []);  
  
    if (loading) return <p className="text-center text-gray-600">Loading...</p>;  
  
    return (  
        <div className="flex items-center justify-center min-h-screen bg-gray-100">   
            <div className="p-6 w-full max-w-lg text-center bg-white shadow-md rounded-lg">   
                <h1 className="text-2xl font-bold text-gray-800">Organ 360 Archives</h1>   
                <Link to="/create-archive" className="block my-4 text-blue-500 text-lg font-semibold">Create Archive</Link>   
                 
                {archives.length > 0 ? (   
                    <ul className="space-y-3">   
                        {archives.map(archive => (   
                            <li key={archive._id} className="text-lg">   
                                <Link to={`/archive/${archive._id}`} className="text-blue-700 underline">{archive.name}</Link>   
                            </li>   
                        ))}   
                    </ul>   
                ) : (   
                    <p className="text-gray-500 mt-4">No archives found.</p>   
                )}   
            </div>   
        </div>   
    );   
}  
  
export default App;  
