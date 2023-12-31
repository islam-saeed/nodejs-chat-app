import React, { useRef, useState } from 'react'

const ImageUploadForm = ({className}) => {
    const sendData = async (fileObj) => {

        let formData = new FormData();
    
        formData.append('image',fileObj)
    
        const requestOptions = {
            method: 'POST',
            body: formData
        };
        const response = await fetch('http://localhost:4000/api/images/', requestOptions)
        const data = await response.json()
      }
      const inputRef = useRef(null);
    
        // browse for the file on click
        const handleClick = () => {
        // open file input box on click of the button
        inputRef.current.click();
        };
    
    
        // get the file that was browsed and send it to the database
        const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
    
        // reset file input
        event.target.value = null;
    
        sendData(fileObj);
        
        };
        
        // state to change the image-container style on drag
        const [dragActive, setDragActive] = useState(false);
    
        // tracks the file to see if it enters the image-container div
        const handleDrag = function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.type === "dragenter" || e.type === "dragover") {
              setDragActive(true);
            } else if (e.type === "dragleave") {
              setDragActive(false);
            }
          };
    
    
          // sends the image to the database on drop
          const handleDrop = function(e) {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                sendData(e.dataTransfer.files[0])
            }
          };
  return (
    <div className={`${className}`} onDragEnter={handleDrag}>
        <div className='flex justify-center items-center flex-col w-[100%] text-2xl'>
            <h2 className='text-4xl mb-8'>Upload Your Image</h2>
            <h4 className='text-gray-400 mb-3'>File should be jpeg,png....</h4>
            <div 
                className="w-[50%] h-[50vh] flex flex-col justify-center items-center rounded-xl"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                style={ dragActive ? {background:'gray', border: '1px dashed rgb(55 65 81)'} : {} }
                >
                {!dragActive ? <img src='./image.svg' alt="image placeholder" className="w-[100%]" /> : <p className='text-6xl text-gray-700'>+</p>}
            </div>
            <p className='text-gray-400 mt-3'>Drag & Drop your image here</p>
            <p className='text-gray-400 mt-3'>or</p>
            <input
                style={{display: 'none'}}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />
            <button className='rounded-full bg-[#C40234] py-3 px-5 m-3 mt-8' onClick={handleClick}>Choose a file</button>
        </div>
    </div>
  )
}

export default ImageUploadForm