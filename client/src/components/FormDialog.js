import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(() => ( {
    dialogWrapper: {
        position: 'absolute',
    },
    dialogTitle: {
        paddingRight: '0px',
        justifyContent: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    }
}))


export default function FormDialog(props) {
    const { formDialog, children, onCancel} = props;
    const classes = useStyles();
    return(
        <Dialog open={formDialog.isOpen} classes={{paper:classes}}>
            <DialogTitle className = {classes.dialogTitle}>
               <div style={{display: 'flex'}}>
                    <Typography variant="h6" componen="div" style={{flexGrow:1}}  >
                        {formDialog.title}
                    </Typography>
                    <Button color="secondary" onClick={onCancel}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers className = {classes.dialogContent}>
                {children}
            </DialogContent>
        </Dialog>
    )
}