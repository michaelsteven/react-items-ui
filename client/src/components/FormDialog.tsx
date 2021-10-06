import React, {ReactElement, FC} from 'react';
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

interface IProps {
    formDialog: {
        isOpen: boolean,
        title: string
    },
    children: {}[],
    onCancel: any,
}

const FormDialog: FC<IProps> = (props): ReactElement<typeof Dialog> => {
    const { formDialog, children, onCancel} = props;
    const classes = useStyles();
    return(
        <Dialog open={formDialog.isOpen} className={classes.dialogWrapper}>
            <DialogTitle className={classes.dialogTitle}>
               <div style={{display: 'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow:1}}  >
                        {formDialog.title}
                    </Typography>
                    <Button color="primary" component="button" onClick={(e:any) => onCancel(e)}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers className={classes.dialogContent}>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default FormDialog;