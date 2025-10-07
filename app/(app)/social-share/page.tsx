"use client"

import React, {useState, useEffect, useRef} from 'react'
import { CldImage } from 'next-cloudinary';

const socialFormats = {
    "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
    "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
    "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
    "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
    "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
  };

  type SocialFormat = keyof typeof socialFormats;

  export default function SocialShare() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
    const [isUploading, setIsUploading] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);


    useEffect(() => {
        if(uploadedImage){
            setIsTransforming(true);
        }
    }, [selectedFormat, uploadedImage])

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/image-upload", {
                method: "POST",
                body: formData
            })

            if(!response.ok) throw new Error("Failed to upload image");

            const data = await response.json();
            setUploadedImage(data.publicId);


        } catch (error) {
            console.log(error)
            alert("Failed to upload image");
        } finally{
            setIsUploading(false);
        }
    };

    const handleDownload = () => {
        if(!imageRef.current) return;

        fetch(imageRef.current.src)
        .then((response) => response.blob())  //blob is binary large object, represents data as a file-like object of immutable, raw data
        .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a");
            link.href = url;
            link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        })
    }


    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold">Social Media Creator</h1>
                <p className="text-base-content/70 mt-1">Transform your images into perfect social media formats</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Upload Section */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Upload Image</h2>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Choose an image file</span>
                                <span className="label-text-alt">MAX. 10MB</span>
                            </label>
                            <input
                                type="file"
                                onChange={handleFileUpload}
                                accept="image/*"
                                className="file-input file-input-bordered file-input-primary w-full"
                            />
                        </div>

                        {isUploading && (
                            <div className="mt-4">
                                <progress className="progress progress-primary w-full"></progress>
                                <p className="text-sm text-base-content/70 mt-1">Uploading your image...</p>
                            </div>
                        )}

                        {/* Format Selection */}
                        {uploadedImage && (
                            <div className="mt-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Social Media Format</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={selectedFormat}
                                        onChange={(e) => setSelectedFormat(e.target.value as SocialFormat)}
                                    >
                                        {Object.keys(socialFormats).map((format) => (
                                            <option key={format} value={format}>
                                                {format}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                {/* Format Info */}
                                <div className="mt-4">
                                    <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
                                        <div className="stat">
                                            <div className="stat-title">Dimensions</div>
                                            <div className="stat-value text-lg">{socialFormats[selectedFormat].width} × {socialFormats[selectedFormat].height}</div>
                                        </div>
                                        <div className="stat">
                                            <div className="stat-title">Aspect Ratio</div>
                                            <div className="stat-value text-lg">{socialFormats[selectedFormat].aspectRatio}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Preview Section */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Preview</h2>

                        {!uploadedImage ? (
                            <div className="flex flex-col items-center justify-center h-64 bg-base-200 rounded-lg">
                                <svg className="w-16 h-16 text-base-content/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-base-content/50">Upload an image to see preview</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="relative flex justify-center bg-base-200 rounded-lg p-4">
                                    {isTransforming && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-75 rounded-lg z-10">
                                            <div className="text-center">
                                                <span className="loading loading-spinner loading-lg"></span>
                                                <p className="mt-2 text-sm">Transforming image...</p>
                                            </div>
                                        </div>
                                    )}
                                    <CldImage
                                        width={Math.min(socialFormats[selectedFormat].width, 400)}
                                        height={Math.min(socialFormats[selectedFormat].height, 400)}
                                        src={uploadedImage}
                                        sizes="100vw"
                                        alt="transformed image"
                                        crop="fill"
                                        aspectRatio={socialFormats[selectedFormat].aspectRatio}
                                        gravity='auto'
                                        ref={imageRef}
                                        onLoad={() => setIsTransforming(false)}
                                        className="rounded-lg shadow-lg"
                                    />
                                </div>

                                <button 
                                    onClick={handleDownload}
                                    className="btn btn-primary w-full"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                    </svg>
                                    Download for {selectedFormat}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Available Formats */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Available Formats</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {Object.entries(socialFormats).map(([format, specs]) => (
                            <div key={format} className="card bg-base-200 shadow-sm">
                                <div className="card-body compact">
                                    <h3 className="card-title text-sm">{format}</h3>
                                    <div className="text-xs opacity-70">
                                        {specs.width} × {specs.height}
                                    </div>
                                    <div className="text-xs opacity-70">
                                        Ratio: {specs.aspectRatio}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}