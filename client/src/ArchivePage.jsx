import React, { useEffect, useState } from 'react';    
import { useParams } from 'react-router-dom';    
import axios from 'axios';    
    
function ArchivePage() {    
    const { id } = useParams();    
    const [archive, setArchive] = useState(null);    
    const [details, setDetails] = useState([]);    
    const [error, setError] = useState(null);    
    const [showForm, setShowForm] = useState(false);    
    const [heading, setHeading] = useState('');    
    const [content, setContent] = useState('');    
    const [currentIndex, setCurrentIndex] = useState(0);    
    
    useEffect(() => {    
        axios.get(`http://localhost:5000/api/archives/${id}`)    
            .then(res => {    
                setArchive(res.data.archive);    
                setDetails(res.data.details);    
            })    
            .catch(err => {    
                console.error("❌ Error fetching archive:", err);    
                setError("Failed to load archive");    
            });    
    }, [id]);    
    
    const nextImage = () => {    
        setCurrentIndex((prevIndex) =>    
            prevIndex === archive.images.length - 1 ? 0 : prevIndex + 1    
        );    
    };    
    
    const prevImage = () => {    
        setCurrentIndex((prevIndex) =>    
            prevIndex === 0 ? archive.images.length - 1 : prevIndex - 1    
        );    
    };    
    
    if (error) return <div className="p-4 text-red-500">{error}</div>;    
    
    return (    
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 overflow-hidden">    
            {archive ? (    
                <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md flex flex-col items-center">    
                    <h1 className="text-2xl font-bold text-center">{archive.name}</h1>    
                        
                    {/* Fixed Carousel Frame */}    
                    <div className="relative w-[600px] h-[400px] mt-4 flex items-center justify-center border border-gray-400 shadow-lg bg-gray-200 rounded-md overflow-hidden">    
                        <button    
                            onClick={prevImage}    
                            className="absolute left-2 bg-gray-800 text-white px-3 py-2 rounded-l z-10 hover:bg-gray-700"    
                        >    
                            ❮    
                        </button>    
    
                        {/* Image Wrapper with Fixed Size */}    
                        <div className="w-full h-full flex items-center justify-center">    
                            <img    
                                src={archive.images[currentIndex]}    
                                alt={`Angle ${currentIndex}`}    
                                className="w-full h-full object-contain"    
                            />    
                        </div>    
    
                        <button    
                            onClick={nextImage}    
                            className="absolute right-2 bg-gray-800 text-white px-3 py-2 rounded-r z-10 hover:bg-gray-700"    
                        >    
                            ❯    
                        </button>    
                    </div>    
                        
                    <h2 className="mt-6 font-semibold text-center">Details</h2>    
                    <button    
                        onClick={() => setShowForm(!showForm)}    
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"    
                    >    
                        {showForm ? "Cancel" : "Add Detail"}    
                    </button>    
    
                    {showForm && (    
                        <form    
                            onSubmit={async (e) => {    
                                e.preventDefault();    
                                if (!heading.trim() || !content.trim()) return;    
    
                                try {    
                                    const res = await axios.post('http://localhost:5000/api/details', {    
                                        archiveId: id,    
                                        heading,    
                                        content    
                                    });    
                                    setDetails([...details, res.data]);    
                                    setHeading('');    
                                    setContent('');    
                                    setShowForm(false);    
                                } catch (err) {    
                                    console.error("❌ Error adding detail:", err);    
                                    setError("Failed to add detail");    
                                }    
                            }}    
                            className="mt-4 p-4 border rounded shadow bg-gray-100 w-[90%] max-w-[600px]"    
                        >    
                            <label className="block font-semibold" style={{color:"black"}}>Title:</label>    
                            <input    
                                type="text"    
                                value={heading}    
                                onChange={(e) => setHeading(e.target.value)}    
                                className="w-full p-2 border rounded mt-1"    
                                required    
                            />    
    
                            <label className="block font-semibold mt-2" style={{color:"black"}}>Content:</label>    
                            <textarea    
                                value={content}    
                                onChange={(e) => setContent(e.target.value)}    
                                className="w-full p-2 border rounded mt-1"    
                                required    
                            ></textarea>    
    
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600">    
                                Save Detail    
                            </button>    
                        </form>    
                    )}    
    
                    <ul className="list-disc pl-4 mt-4 w-full max-w-lg">    
                        {details.map(detail => (    
                            <li key={detail._id} className="text-gray-700">    
                                <strong>{detail.heading}:</strong> {detail.content}    
                            </li>    
                        ))}    
                    </ul>    
                </div>    
            ) : (    
                <p className="text-gray-500">Loading...</p>    
            )}    
        </div>    
    );    
}    
    
export default ArchivePage;  
