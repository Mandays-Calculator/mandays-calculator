import type { ReactElement } from "react";
import { useEffect, useState } from "react";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { ImageUploadContainer, StyledAvatar } from ".";

type ImageUploadProps = {
  name: string;
  initialValue: string;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
};

const ImageUpload = ({
  name,
  initialValue,
  setFieldValue,
}: ImageUploadProps): ReactElement => {
  const [base64Image, setBase64Image] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
        if (setFieldValue) {
          setFieldValue(name, reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (initialValue) {
      setBase64Image(initialValue);
    }

    return () => {
      setBase64Image("");
    };
  }, [initialValue]);

  return (
    <ImageUploadContainer>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="image-upload"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="image-upload">
        <StyledAvatar
          src={base64Image || "path_to_default_avatar_image"}
          alt={name}
        >
          {!base64Image && <CloudUploadIcon sx={{ fontSize: 24 }} />}
        </StyledAvatar>
      </label>
    </ImageUploadContainer>
  );
};

export default ImageUpload;
