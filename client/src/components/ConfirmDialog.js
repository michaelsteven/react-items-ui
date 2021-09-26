import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material'
import {makeStyles} from '@mui/styles'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const useStyles = makeStyles(() => ( {
    dialog: {
        position: 'absolute'
    },
    dialogTitle: {
        justifyContent: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    }
}))


export default function ConfirmDialog(props) {
    const { confirmDialog } = props;
    const classes = useStyles();

    return(
        <Dialog open={confirmDialog.isOpen}>
            <DialogTitle className = {classes.dialogTitle}>
                <DeleteForeverIcon />
            </DialogTitle>
            <DialogContent className = {classes.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className = {classes.dialogAction}>
                <Button color="primary" onClick={confirmDialog.onCancel}>No</Button>
                <Button color="secondary" onClick={confirmDialog.onConfirm}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}