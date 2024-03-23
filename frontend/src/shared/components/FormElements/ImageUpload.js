import React, { useEffect, useRef, useState } from "react";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewURL, setPreviewURL] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload(() => {
      setPreviewURL(fileReader.result);
    });
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid;
    fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.file[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          <img src="" alt="Preview" />
        </div>
        <button
          type="button"
          className=" bg-purple-600 p-2 rounded-lg"
          onClick={pickImageHandler}
        >
          PICK IMAGE
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
