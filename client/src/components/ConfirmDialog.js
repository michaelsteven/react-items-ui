import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { Typography, Button, makeStyles } from '@material-ui/core';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const useStyles = makeStyles(theme => ( {
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
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

    const { confirmDialog, setConfirmDialog} = props;
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
                <Button color="default" onClick={ () => setConfirmDialog({ ...confirmDialog, isOpen: false})}>No</Button>
                <Button color="secondary" onClick={confirmDialog.onConfirm}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}