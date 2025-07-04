import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { useRef } from 'react';
import domtoimage from 'dom-to-image-more';


export default function Memeeditor() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const [uploadedImage, setUploadedImage] = useState(null);


  const pageSize = 6;

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch('https://api.imgflip.com/get_memes');
        const data = await res.json();
        setTemplates(data.data.memes);
      } catch (err) {
        console.error('Failed to fetch meme templates', err);
      }
    };
    fetchTemplates();
  }, []);



const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result); // base64 image string
      };
      reader.readAsDataURL(file);
    }
  };



const memeRef = useRef(null);  // For capturing the meme preview div

const handleDownload = () => {
  if (!memeRef.current) return;

  domtoimage.toPng(memeRef.current)
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'custom-meme.png';
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.error("Failed to save image", err);
    });
};






  const totalPages = Math.ceil(templates.length / pageSize);
  const currentTemplates = templates.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-end gap-2">
      <button onClick={handleDownload} className="mt-4 text-white p-3 rounded bg-green-600 hover:bg-green-700">Download</button>
  <input
    id="fileUpload"
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
  />

  {/* Label styled like a button */}
  <label
    htmlFor="fileUpload"
    className="mt-4 bg-blue-600 text-white  p-3 rounded cursor-pointer hover:bg-blue-700 transition duration-300 "
  >
    Upload
  </label>
</div>


    







      <h2 className="text-2xl font-bold text-center mb-4 text-fuchsia-600 ">Create Your Meme</h2>
      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Template Grid */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {currentTemplates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className="cursor-pointer border rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={template.url}
                  alt={template.name}
                  className="w-full h-32 object-cover"
                />
                <p className="text-center p-2 text-sm font-medium">{template.name}</p>
              </div>
            ))}
          </div>

          {/* Prev/Next Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-fuchsia-600 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 bg-fuchsia-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

    
        <div className="bg-white p-4 shadow rounded min-h-[500px]">
          {selectedTemplate ? (
            <>
              <h3 className="text-lg font-semibold mb-2 text-center">Edit Meme</h3>

              <input
                type="text"
                placeholder="Top Text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Bottom Text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                className="border p-2 w-full mb-4"
              />

              <div  ref={memeRef} className="relative w-full h-[400px] border">
                <img
                  src={selectedTemplate.url}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                {topText && (
                  <Draggable bounds="parent">
                    <div className="absolute top-0 left-0 text-black text-xl font-extrabold drop-shadow cursor-move">
                      {topText}
                    </div>
                  </Draggable>
                )}
                {bottomText && (
                  <Draggable bounds="parent">
                    <div className="absolute bottom-0 left-0 text-black text-xl font-extrabold drop-shadow cursor-move">
                      {bottomText}
                    </div>
                  </Draggable>
                )}
              </div>
            </>
          ) : (
            <p className="text-emerald-800 text-2xl text-center mt-10">
              Select a template to start editing
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
