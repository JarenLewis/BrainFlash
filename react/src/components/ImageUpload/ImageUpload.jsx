import { useEffect, useState } from "react";

export default function ImageUpload({setter, defaultUrl}) {
    const [myWidget, setMyWidget] = useState();
    const [imageUrl, setImageUrl] = useState(defaultUrl ?? "");
    useEffect(
        () => {
            initWidget();
        }, []
    )
    function initWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'do7vnljsr',
                uploadPreset: 'fhdqhxr3'
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    const image = result.info.url;
                    setImageUrl(image);
                    setter(image);
                }
            }
        );

        setMyWidget(widget);
    }

    function upload() {
        myWidget.open();
    }

    return (
        <>
            <div className="image-upload">
                <button type="button"
                    className="upload-image-button"
                    onClick={upload}>
                    Upload Image for the Front of Your Card
                </button>
            </div>
            {imageUrl && (
                <div className="image-preview-wrapper">
                    <img src={imageUrl} alt="image-preview" className='image-preview' />
                </div>
            )}
        </>
    )
}