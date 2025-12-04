"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Skeleton,
    Box,
} from "@mui/material";

import style from './table.module.scss'
interface MuiTableSkeletonProps {
    rows?: number;
    itemsPerPage?: number;
}

export default function MuiTableSkeleton({
                                             rows = 5,
                                         }: MuiTableSkeletonProps) {
    const skeletonRows = Array.from({ length: rows });

    return (
        <>
        <Paper
            sx={{
                margin: "20px auto",
                padding: 2,

            }}
        >
            <TableContainer className={style.SceletonTableContainer}>
                <Table>
                    <TableHead>
                        <TableRow className={style.SceletonHeadRow}>
                            <TableCell>
                                <Skeleton variant="text" width={80} />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width={60} />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width={60} />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width={60} />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" width={80} />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {skeletonRows.map((_, index) => (
                            <TableRow key={index} className={style.bodyRow}>
                                <TableCell>
                                    <Skeleton variant="text" width="80%" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width="60%" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width="50%" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="circular" width={12} height={12} />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="rectangular" width={90} height={36} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </Paper>
            <Box display="flex" justifyContent="center" mt={2} >
                <Skeleton variant="rectangular" width={200} height={40} />
            </Box>
            </>
    );
}
