import React, { useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { FileUploader } from "react-drag-drop-files";
import { SEVERITY } from '../../utils/Snackbar';
import { uploadFile } from '../../utils/Api';

const fileTypes = ["JPG", "PNG"];
const formatter = new Intl.ListFormat('br', { style: 'short', type: 'disjunction' });
const types = formatter.format(fileTypes);

function FileUpload(props) {

  const [file, setFile] = useState(null);

  const handleTypeError = (error) => {
    props.handleMessage(
      `Tipo de arquivo inválido. Os tipos permitidos são ${types}`,
      SEVERITY.WARNING
    );
  };

  const handleSizeError = (error) => {
    props.handleMessage(
      `Tamanho máximo do arquivo: ${props.maxSize}MB`,
      SEVERITY.WARNING
    );
  };

  const handleChange = (file) => {
    setFile(file);
    props.setLoading(true);

    uploadFile('api/uploader/', file, (json,message,severity)=>{
      props.setLoading(false);
      props.handleUpload(json.url,false);
    },(error,message,severity)=>{
      props.setLoading(false);
      props.handleMessage(message,severity,error);
      props.handleUpload(null,true);
    });
  };

  return (
    <FileUploader
      multiple={false}
      label={props.label}
      required={false}
      hoverTitle=""
      dropMessageStyle={{display: 'none'}}
      maxSize={props.maxSize}

      onTypeError={handleTypeError}
      onSizeError={handleSizeError}
      handleChange={handleChange}

      name="file"
      types={fileTypes}

      children={
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: '100%',
            borderRadius: 2,
            border: '2px dashed #7b4296',
            color: '#7b4296',
          }}
        >
          <Grid item>
            <FileUploadIcon sx={{ fontSize: 60 }} />
          </Grid>
          <Grid item>
            <Typography>Clique ou arraste</Typography>
          </Grid>
        </Grid>
      }
    />
  );
}

export default FileUpload;
