"use client"
import React, {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

function VideoUpload() {
    const [file, setFile] = useState<File | null>(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isUploading, setIsUploading] = useState(false)

    const router = useRouter()
    //max file size of 70 mb

    const MAX_FILE_SIZE = 70 * 1024 * 1024

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            toast.error("File size too large. Max size is 70MB.");
            return;
        }

        setIsUploading(true)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("originalSize", file.size.toString());

        try {
            const response = await axios.post("/api/video-upload", formData)
            // check for 200 response
            if (response.status !== 200) {
                throw new Error("Upload failed")
            }
            toast.success("Video uploaded successfully!")
            router.push("/home")
        } catch (error) {
            console.log(error)  
            toast.error("Upload failed. Please try again.")
        } finally{
            setIsUploading(false)
        }

    }


    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold">Upload Video</h1>
                <p className="text-base-content/70 mt-1">Upload and process your videos with cloud optimization</p>
            </div>

            {/* Upload Form */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Video Details</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Video Title</span>
                                <span className="label-text-alt text-error">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Enter a title for your video"
                                required
                            />
                        </div>

                        {/* Description Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                                <span className="label-text-alt">Optional</span>
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="textarea textarea-bordered h-20"
                                placeholder="Add a description for your video"
                            />
                        </div>

                        {/* File Upload */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Video File</span>
                                <span className="label-text-alt">MAX. 70MB</span>
                            </label>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="file-input file-input-bordered file-input-primary w-full"
                                required
                            />
                            {file && (
                                <div className="mt-2">
                                    <div className="alert alert-success shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <h3 className="font-bold">File ready!</h3>
                                            <div className="text-xs">{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Upload Button */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className={`btn btn-primary ${isUploading ? 'loading' : ''}`}
                                disabled={isUploading || !file}
                            >
                                {isUploading ? 'Processing...' : 'Upload Video'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Info Card */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Processing Information
                    </h2>
                    <div className="prose prose-sm">
                        <ul>
                            <li>Your video will be securely uploaded to cloud storage</li>
                            <li>Advanced compression will reduce file size while maintaining quality</li>
                            <li>Processing time varies from 30-60 seconds based on file size</li>
                            <li>You'll receive the optimized video ready for download and sharing</li>
                        </ul>
                    </div>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Secure Upload</div>
                        <div className="badge badge-outline">AI Processing</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoUpload