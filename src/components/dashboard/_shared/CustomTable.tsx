import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Box,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";

import { Edit, Delete, Visibility } from "@mui/icons-material";

type Column = {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
};

type CustomTableProps = {
  title?: string;
  columns: Column[];
  rows: Record<string, any>[];
  onDetail?: (row: Record<string, any>) => void;
  onEdit?: (row: Record<string, any>) => void;
  onDelete?: (row: Record<string, any>) => void;
  isLoading?: boolean;
};

export default function CustomTable({
  title,
  columns,
  rows,
  onDetail,
  onEdit,
  onDelete,
  isLoading,
}: CustomTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 3,
        backgroundColor: "#fff",
        p: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {title && (
        <Typography
          variant="h6"
          component="h2"
          sx={{ mb: 2, fontWeight: 600, color: "#1e293b" }}
        >
          {title}
        </Typography>
      )}

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    backgroundColor: "#f9fafb",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                    color: "#475569",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              {(onDetail || onEdit || onDelete) && (
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: "#f9fafb",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                    color: "#475569",
                  }}
                >
                  Aksi
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <Typography variant="body2" color="textSecondary">
                    Sedang memuat data...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : visibleRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <Typography variant="body2" color="textSecondary">
                    Tidak ada data.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              visibleRows.map((row, idx) => (
                <TableRow hover key={idx}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "left"}
                      sx={{ fontSize: "0.875rem", color: "#334155" }}
                    >
                      {row[column.id]}
                    </TableCell>
                  ))}

                  {(onDetail || onEdit || onDelete) && (
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        {onDetail && (
                          <Tooltip title="Lihat Detail" arrow>
                            <IconButton
                              onClick={() => onDetail(row)}
                              size="small"
                              sx={{
                                color: "#3b82f6",
                                backgroundColor: "#eff6ff",
                                "&:hover": { backgroundColor: "#dbeafe" },
                              }}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {onEdit && (
                          <Tooltip title="Edit Data" arrow>
                            <IconButton
                              onClick={() => onEdit(row)}
                              size="small"
                              sx={{
                                color: "#f59e0b",
                                backgroundColor: "#fef3c7",
                                "&:hover": { backgroundColor: "#fde68a" },
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {onDelete && (
                          <Tooltip title="Hapus Data" arrow>
                            <IconButton
                              onClick={() => onDelete(row)}
                              size="small"
                              sx={{
                                color: "#ef4444",
                                backgroundColor: "#fee2e2",
                                "&:hover": { backgroundColor: "#fecaca" },
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2 }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Baris per halaman"
        />
      </Box>
    </Paper>
  );
}
