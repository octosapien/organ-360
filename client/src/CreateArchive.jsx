import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateArchive() {
    const [name, setName] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImages([...e.target.files]); // Store selected files
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || images.length === 0) {
            setError('Please enter a name and upload at least one image.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            await axios.post('http://localhost:5000/api/archives', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            navigate('/'); // Redirect to homepage
        } catch (err) {
            setError('Failed to create archive. Try again.');
            console.error(err);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold">Create Archive</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-4">
                <label className="block font-semibold">Archive Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full p-2 border rounded mt-1"
                    required 
                />

                <label className="block font-semibold mt-4">Upload Images:</label>
                <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="w-full p-2 border rounded mt-1"
                    required 
                />

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                    Create Archive
                </button>
            </form>
        </div>
    );
}

export default CreateArchive;
