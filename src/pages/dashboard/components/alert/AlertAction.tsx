import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

interface AlertProps {
  message: string;
  type: "error";
}

const AlertAction: React.FC<AlertProps> = ({ message, type }) => {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <>
      {visible && (
        <div className={`alert alert-${type}`}>
          <Alert
            icon={false}
            sx={{
              bgcolor: "whitesmoke",
            }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setVisible(false);
                }}
              >
                <CloseIcon
                  fontSize="inherit"
                  sx={{
                    alignItems: "center",
                  }}
                />
              </IconButton>
            }
          >
            {message}
          </Alert>
        </div>
      )}
    </>
  );
};

export default AlertAction;
