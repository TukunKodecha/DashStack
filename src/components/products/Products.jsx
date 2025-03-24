import { Box, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TableWrapper } from "../shared/TableWrapper";
import SearchInput from "../ui/SearchInput";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/getProductSlice";
import CustomPagination from "../shared/CustomPagination";
import { capitalizeFirstLetter } from "../../utils/common";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LoadingScreen from "../shared/LoadingScreen";
import NoDataScreen from "../shared/NoDataScreen";
import ConfirmModal from "../shared/ConfirmModal";
import { showToast } from "../../store/toastSlice";
import { removeProduct } from "../../store/deleteProductSlice";

const Products = () => {
  // props, state & variables
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.getProducts);
  const {
    deleted,
    loading: deleteLoading,
    error: deleteError,
  } = useSelector((state) => state.deleteProduct);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10; // ✅ Number of items per page
  const totalPages = products?.total || 0; // ✅ Simulating total pages

  // callbacks & functions
  const debouncedFetch = useRef(
    debounce((value) => {
      dispatch(
        fetchProducts({
          limit: pageSize,
          // skip: (currentPage - 1) * pageSize,
          search: value,
        })
      );
    }, 1000)
  ).current;

  const handleSearchChange = (value) => {
    setSearchValue(value);
    debouncedFetch(value);
  };

  useEffect(() => {
    dispatch(
      fetchProducts({ limit: pageSize, skip: (currentPage - 1) * pageSize })
    );
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (deleteLoading) {
      dispatch(
        showToast({
          message: "Deleting product",
          severity: "info",
        })
      );
    } else if (deleted) {
      dispatch(
        showToast({
          message: "Product Deleted",
          severity: "success",
        })
      );
      setOpenConfirmModal(false);
      dispatch(
        fetchProducts({ limit: pageSize, skip: (currentPage - 1) * pageSize })
      );
    } else if (deleteError) {
      dispatch(
        showToast({
          message: "deleteError",
          severity: "error",
        })
      );
    }
  }, [deleted, deleteError, deleteLoading, dispatch, currentPage]);

  const handleConfirm = () => {
    if (!deleteProductId || deleteProductId === "") {
      dispatch(
        showToast({
          message: "Could not delete product, please try again",
          severity: "error",
        })
      );
      return;
    }
    // delete product api
    dispatch(removeProduct(deleteProductId));
  };

  const handleCancel = () => {
    setOpenConfirmModal(false);
  };

  const handleDelete = async (id) => {
    setDeleteProductId(id);
    setOpenConfirmModal(true);
  };

  // table columns
  const columns = [
    {
      id: "thumbnail",
      label: t("Image"),
      sortable: true,
      render: (_, row) => (
        <img
          width={50}
          height={50}
          src={row?.thumbnail}
          key={row?.thumbnail}
          alt="product-image"
        />
      ),
    },
    {
      id: "title",
      label: t("Product Name"),
      sortable: true,
      render: (value) => `${capitalizeFirstLetter(value || "") || "-"}`,
    },
    {
      id: "category",
      label: t("Category"),
      render: (value) => `${capitalizeFirstLetter(value || "") || "-"}`,
      sortable: true,
    },
    {
      id: "price",
      label: t("Price"),
      sortable: true,
      render: (value) => `$${value || "-"}`,
    },
    {
      id: "stock",
      label: t("Piece"),
      sortable: true,
      render: (value) => value || "-",
    },
    {
      id: "actions",
      label: t("Actions"),
      render: (_, row) => (
        <Box display="flex" alignItems="center">
          <IconButton
            // onClick={() => handleEdit(row)}
            color="secondary"
            disableRipple
            sx={{
              border: "1px solid var(--dashstack-secondary_border)",
              width: "40px",
              height: "30px",
              borderRadius: 0,
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <ModeEditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(row?.id)}
            color="primary"
            disableRipple
            sx={{
              border: "1px solid var(--dashstack-secondary_border)",
              width: "40px",
              height: "30px",
              borderRadius: 0,
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
              borderLeft: "none",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "var(--dashstack-primary-bg)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "30px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography sx={{ fontSize: "25px", fontWeight: 700 }}>
          {t("Products")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <SearchInput
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t("Search product name")}
            startIcon={<SearchIcon sx={{ color: "var(--dashstack-black)" }} />}
            width={300}
            backgroundColor="var(--dashstack-white)"
          />
        </Box>
      </Box>

      {loading && <LoadingScreen />}

      {!loading && products?.products && products?.products.length > 0 && (
        <TableWrapper
          columns={columns}
          rows={products?.products || []}
          stickyHeader={true}
          // maxHeight="calc(100% - 8rem)"
          // onRowClick={TableRowClick}
          // rowSx={{
          //   cursor: "pointer",
          // }}
        />
      )}

      {!loading && products?.products && products?.products.length === 0 && (
        <NoDataScreen text="No products available" />
      )}

      {products && products?.products && products?.products.length > 0 && (
        <CustomPagination
          totalItems={totalPages}
          currentPage={currentPage}
          itemsPerPage={pageSize}
          onPageChange={setCurrentPage}
        />
      )}

      <ConfirmModal
        open={openConfirmModal}
        description="Are you sure, you want to delete this product?"
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </Box>
  );
};

export default Products;
