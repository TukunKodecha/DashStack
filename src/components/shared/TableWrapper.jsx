import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableSortLabel,
  Paper,
} from "@mui/material";
import { tableStyles } from "../../utils/styles";

export function TableWrapper({
  columns,
  rows,
  maxHeight,
  onRowClick,
  rowSx,
  rowSxFunc,
  stickyHeader = true,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); // Add state for selected row

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = React.useMemo(() => {
    if (orderBy) {
      const column = columns.find((col) => col.id === orderBy);
      return [...rows].sort((a, b) => {
        const aValue = a[orderBy] ?? "";
        const bValue = b[orderBy] ?? "";

        if (column && column.sortComparator) {
          // Use custom sortComparator if provided
          return order === "asc"
            ? column.sortComparator(a, b)
            : -column.sortComparator(a, b);
        } else {
          // Default string comparison
          const normalizedA = String(aValue).toLowerCase();
          const normalizedB = String(bValue).toLowerCase();
          if (normalizedA < normalizedB) return order === "asc" ? -1 : 1;
          if (normalizedA > normalizedB) return order === "asc" ? 1 : -1;
          return 0;
        }
      });
    }
    return rows;
  }, [order, orderBy, columns, rows]);

  const renderCellValue = (column, row) => {
    const cellValue = row[column.id];
    if (column.render) {
      return column.render(cellValue, row);
    }
    // Safely handle cell values by converting to string if not ReactNode
    return typeof cellValue === "string" || typeof cellValue === "number"
      ? cellValue
      : JSON.stringify(cellValue);
  };

  const handleRowClick = (row) => {
    if (onRowClick) {
      setSelectedRow(row);
      onRowClick(row);
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        border: "0.063rem solid var(--neuro-secondary_border)",
        borderBottom: "none",
        maxHeight: maxHeight || "auto",
        overflow: "auto",
      }}
    >
      <Table stickyHeader={stickyHeader} aria-label="sticky sorting table">
        <TableHead>
          <TableRow
            sx={{
              "& >th": {
                p: "0.5rem",
              },
            }}
          >
            {columns.map((column) => (
              <TableCell
                key={String(column.id)}
                sx={tableStyles.tableCell}
                sortDirection={orderBy === column.id ? order : false}
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "& >td": {
                  p: "0.5rem",
                },
                backgroundColor:
                  selectedRow && selectedRow.id === row.id
                    ? "var(--neuro-bg-light-grey-secondary)"
                    : "var(--neuro-white-text)",
                ...rowSx,
                ...(typeof rowSxFunc === "function"
                  ? rowSxFunc(row)
                  : rowSxFunc),
              }}
              onClick={(event) => {
                event?.stopPropagation();
                handleRowClick(row);
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  sx={tableStyles.subTableCell}
                >
                  {renderCellValue(column, row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
