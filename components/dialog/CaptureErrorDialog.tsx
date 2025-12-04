import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { CloseIcon } from "@/public/icon/close";

interface CaptureErrorDialogProps {
    open: boolean;
    message: string;
    onClose: () => void;
}

export const CaptureErrorDialog: React.FC<CaptureErrorDialogProps> = ({
                                                                          open,
                                                                          message,
                                                                          onClose,
                                                                      }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <DialogTitle sx={{
                position: "relative",
                paddingRight: "48px",
                fontWeight: "bold",
                fontSize: "1.25rem",
            }}>

                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "gray",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "normal",
                    fontSize: "1.3rem",
                    minWidth: "400px",
                    minHeight: "200px",
                    color:'var(--color-text-red)'
                }}
            >
                <p>{message}</p>
            </DialogContent>
        </Dialog>
    );
};
