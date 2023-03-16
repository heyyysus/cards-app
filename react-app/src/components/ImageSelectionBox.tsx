import { Button, Paper } from '@mui/material';
import { createRef, FC, useRef, useState } from 'react';

export interface ImageSelectionBoxProps {
    closeButtonHandler: () => void,
    handleSubmit: (file: File) => void
};

export const ImageSelectionBox: FC<ImageSelectionBoxProps> =  ({ closeButtonHandler, handleSubmit }) => {

    const [ imageFile, setImageFile ] = useState<File | null>(null);
    return (<>
        <Paper elevation={3} sx={{
            padding: '15px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <p>Upload Image</p>
            <input 
                type="file" 
                accept='.gif,.jpeg,.jpg,.png' 
                onChange={ (e) => {setImageFile(e.target.files ? e.target.files[0] : null)} }  
            />
            <div style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignContent: 'sp'
            }}>
                <Button color='success' 
                    disabled={(imageFile) ? false : true} 
                    sx={{
                        marginTop: '15px'
                    }} 
                    onClick={() => {imageFile &&  handleSubmit(imageFile); closeButtonHandler()}}>Submit</Button>
                <Button color='error' sx={{
                    marginTop: '15px',
                }} onClick={() => closeButtonHandler()}>Cancel</Button>
            </div>
        </Paper>
    </>);
};
