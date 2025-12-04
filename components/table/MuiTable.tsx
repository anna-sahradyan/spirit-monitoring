"use client";
import {useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Button,
    Tooltip,
} from "@mui/material";
import {Yokai, YokaiStatus} from "@/types/yokai.schema";
import style from "./table.module.scss";
import CheckIcon from "@mui/icons-material/Check";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import MuiPaginationContainer from "@/components/table/MuiPaginationContainer";

interface MuiTableProps {
    items: Yokai[];
    onCapture: (id: string) => void;
    isMutatingId: string | null;
}

const statusClassMap: Record<YokaiStatus, string> = {
    active: style.statusActive,
    captured: style.statusCaptured,
    caught: style.statusCaught,
    escaped: style.statusEscaped,
    in_progress: style.statusInProgress,
    detected: style.statusDetected,
    confirmed: style.statusConfirmed,
};

// 2. Принимаем items в компоненте
export default function MuiTable({items, onCapture, isMutatingId}: MuiTableProps) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const start = (page - 1) * itemsPerPage;
    const paginatedItems = items.slice(start, start + itemsPerPage);
    const pageCount = Math.ceil(items.length / itemsPerPage);


    return (
        <div className={style.containerMapEndTable}>
            <h1 className={style.title}>Monitoring</h1>
            <Paper
                sx={{
                    margin: "20px auto",
                    padding: 2,
                    backgroundColor: "var(--sblack-03)",
                    minHeight: 500,
                }}
            >
                <TableContainer className={style.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow className={style.headRow}>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Threat</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedItems.length > 0 ? (
                                paginatedItems.map((yokai) => {
                                    const isToggleable =
                                        yokai.status === "active" || yokai.status === "captured";

                                    const isLoading = isMutatingId === yokai.id;

                                    return (
                                        <TableRow key={yokai.id} className={style.bodyRow}>
                                            <TableCell>{yokai.name}</TableCell>
                                            <TableCell>{yokai.type}</TableCell>
                                            <TableCell className={style.textColor}>
    <span>
        {yokai.threat.toLowerCase()}
    </span>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title={yokai.status.replace("_", " ").toUpperCase()}>
                                                    <div
                                                        className={`${style.statusCircle} ${statusClassMap[yokai.status] || style.statusActive}`}></div>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    className={style.actionBtn}
                                                    variant="contained"
                                                    color={yokai.status === "active" ? "error" : "success"}
                                                    startIcon={!isLoading && (yokai.status === "active" ?
                                                        <WarningAmberIcon/> : <CheckIcon/>)}
                                                    onClick={() => onCapture(yokai.id)}
                                                    disabled={!isToggleable || isLoading}
                                                >
                                                    {isLoading ? "Processing..." : (yokai.status === "active" ? "Capture" : "Release")}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">No yokai found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Box display="flex" justifyContent="center" mt={2}>
                <MuiPaginationContainer
                    page={page}
                    pageCount={pageCount}
                    onPageChange={setPage}
                />
            </Box>
        </div>
    );
}