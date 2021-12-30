import React, { useState, useCallback, useEffect } from "react";
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableSortLabel,
  TableCell,  
  TablePagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "../FormDialog";
import ConfirmDialog from "../ConfirmDialog";
import ItemForm from "./ItemForm";
import ItemTableRow from "./ItemTableRow";
import { addItem, editItem, deleteItem, getPageItems } from "../../api/ItemApi";
import { Page } from "../common/index";

const Items = () => {
  const [sort, setSort] = useState({ by: "id", direction: "asc" });
  const [data, setData] = useState({
    totalElements: 0,
    content: [],
    sort: { sorted: false, unsorted: true, empty: true },
  });
  const [formDialog, setFormDialog] = useState({ isOpen: false, title: "" });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: (event: any) => {},
    onCancel: (event: any) => {},
  });
  const [itemUnderEdit, setItemUnderEdit] = useState({ name: "", description: ""});
  const [activePage, setActivePage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [showLoading, setShowLoading] = useState(false);
  const [preventReload, setPreventReload] = useState(false);

  const showAlert = (message: string, type: string) => {
    alert(message);
    console.log(message, type);
  };

  const displayError = useCallback((error) => {
    if (error.message && error.success === false) {
      showAlert(error.message, "error");
    } else {
      showAlert(error.message, "error");
    }
    console.log(error);
  }, []);

  const setPage = useCallback(
    (pageNumberValue) => {
      setShowLoading(true);
      setActivePage(pageNumberValue);
      const defaultPageable = {
        pageNumber: pageNumberValue,
        // eslint-disable-next-line object-shorthand
        pageSize: pageSize,
        sort: "".concat(sort.by, ",", sort.direction),
      };
      getPageItems(defaultPageable)
        .then((res: any) => {
          setData(res);
          setShowLoading(false);
        })
        .catch((error: any) => {
          displayError(error);
          setShowLoading(false);
        });
    },
    [sort, displayError, pageSize]
  );

  /**
   * call setPage on closing the dialogs and and when pageSize or sort
   * also prevent calling setPage when the dialog closure is caused by dialog cancel buttons (preventReload)
   */
  useEffect(() => {
    if (
      confirmDialog.isOpen === false &&
      formDialog.isOpen === false &&
      !preventReload === true
    ) {
      setPreventReload(false);
      setPage(0);
    }
  }, [setPage, confirmDialog, formDialog, pageSize, sort, preventReload]);

  const handleFormDialogCancel = (event: any) => {
    event.preventDefault();
    setPreventReload(true);
    setFormDialog({ isOpen: false, title: "" });
  };

  const handleConfirmDialogCancel = (event: any) => {
    event.preventDefault();
    setPreventReload(true);
    setConfirmDialog({
      isOpen: false,
      title: "",
      subTitle: "",
      onConfirm: () => {},
      onCancel: () => {},
    });
  };

  const handlePageChange = (
    event: any,
    newPage: any
  ) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: {
    preventDefault: any;
    target: { value: any };
  }) => {
    event.preventDefault();
    setPageSize(event.target.value);
  };

  const handleNewClicked = (event: any) => {
    event.preventDefault();
    const formDialogValue = {
      isOpen: true,
      title: "New Item",
      action: "new",
    };
    setItemUnderEdit({ name: "", description: ""});
    setFormDialog(formDialogValue);
  };

  const handleEditClicked =
    (item: any) =>
    (event: any) => {
      event.preventDefault();
      const formDialogValue = {
        isOpen: true,
        title: "Edit Item",
        action: "edit",
      };
      setItemUnderEdit(item);
      setFormDialog(formDialogValue);
    };

  const onDelete =
    (item: { id: any }) => (event: any) => {
      event.preventDefault();
      deleteItem(item.id)
        .then((res: any) => {
          console.log(res);
          setConfirmDialog({
            isOpen: false,
            title: "",
            subTitle: "",
            onConfirm: () => {},
            onCancel: () => {},
          });
        })
        .catch((error: { message: string }) => {
          showAlert(error.message, "error");
          console.log(error);
        });
    };

  const handleDeleteClicked =
    (item: any) => (event: any) => {
      event.preventDefault();
      const confirmDialogValue = {
        isOpen: true,
        title: "Are you sure you want to delete?",
        subTitle: "You can't undo this operation",
        onConfirm: onDelete(item),
        onCancel: handleConfirmDialogCancel,
      };
      setConfirmDialog(confirmDialogValue);
    };

  const handleAddOrEdit = (item: { id: number; }) => {
    if (item.id > 0) {
      editItem(item)
        .then((res: any) => {
          console.log(res);
          setFormDialog({ isOpen: false, title: ""});
        })
        .catch((error: any) => {
          displayError(error);
        });
    } else {
      addItem(item)
        .then((res: any) => {
          console.log(res);
          setFormDialog({ isOpen: false, title: "" });
        })
        .catch((error: any) => {
          displayError(error);
        });
    }
  };

  const handleSort = (sortBy: string) => {
    let sortOrder = sort.direction;
    return () => {
      if (sortBy === sort.by) {
        sortOrder = sortOrder === "asc" ? "desc" : "asc";
      } else {
        sortOrder = "asc";
      }
      setSort({ by: sortBy, direction: sortOrder });
    };
  };

  const renderTableData = () => {
    let tableLines = [];
    if (data && data.content && data.totalElements > 0) {
      tableLines = Object.keys(data.content).map((key:string) => (
        <ItemTableRow
          key={key}
          handleEditClicked={handleEditClicked}
          handleDeleteClicked={handleDeleteClicked}
          item={data.content[parseInt(key)]}
        />
      ));
      return tableLines;
    }
  };

  return (
    <Page>
      <h3>Items</h3>
      {showLoading ? (
        <div className="align-content-center text-center">
          <h4 className="text-muted">Loading. Please Wait...</h4>
          <i className="material-icons w3-xxxlarge w3-spin align-content-center">
            refresh
          </i>
        </div>
      ) : (
        <div>
          <Table className="table table-hover">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sort.by === "id"}
                    //direction={sort.direction}
                    onClick={handleSort("id")}
                  >
                    id
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sort.by === "name"}
                    //direction={sort.direction}
                    onClick={handleSort("name")}
                  >
                    Item name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sort.by === "description"}
                    //direction={sort.direction}
                    onClick={handleSort("description")}
                  >
                    Item Description
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sort.by === "createdTimestamp"}
                    //direction={sort.direction}
                    onClick={handleSort("createdTimestamp")}
                  >
                    Date Created
                  </TableSortLabel>
                </TableCell>
                <TableCell colSpan={2} align="center">
                  <IconButton onClick={handleNewClicked}>
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderTableData()}</TableBody>
          </Table>
          <div className="d-flex justify-content-center">
            <TablePagination
              rowsPerPageOptions={[5, 10, 100]}
              component="div"
              count={data.totalElements}
              rowsPerPage={pageSize}
              page={activePage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </div>
        </div>
      )}
      <FormDialog formDialog={formDialog} onCancel={handleFormDialogCancel}>
        <ItemForm
          initialItem={itemUnderEdit}
          onSubmit={handleAddOrEdit}
          onCancel={handleFormDialogCancel}
        />
      </FormDialog>
      <ConfirmDialog confirmDialog={confirmDialog} />
    </Page>
  );
};

export default Items;
