import { Box, Pagination } from "@mui/material";

interface MuiPaginationContainerProps {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
}

export default function MuiPaginationContainer({
                                                   page,
                                                   pageCount,
                                                   onPageChange,
                                               }: MuiPaginationContainerProps) {
    return (
        <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
                count={pageCount}
                page={page}
                onChange={(_e, value) => onPageChange(value)}
                sx={{
                    "& .MuiPaginationItem-root": {
                        color: "var(--color)",       // цвет цифр
                        borderColor: "var(--color)", // если нужно обводка
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "var(--color)", // фон выбранного
                        color: "#fff",                    // цвет цифр выбранного
                    },
                    "& .MuiPaginationItem-previousNext": {
                        color: "var(--color)", // стрелки
                    },
                }}
            />
        </Box>
    );
}
