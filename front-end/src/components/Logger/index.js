import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CheckIcon from '@mui/icons-material/Check';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { get, put, del } from '../../utils/Api';

export default function Logger(props) {
  const navigate = useNavigate();
  const [errors,setErrors] = useState([]);

  const handleResolveError = (id) => {
    props.setLoading(true);

    put('api/logger',{'id': id},(json,message,severity)=>{
      if (json) {
        setErrors(json);
        props.setLoading(false);
      } else {
        props.setLoading(false);
        navigate("/unauthorized");
      }
    },(error,message,severity)=>{
      props.setLoading(false);
      navigate("/unauthorized");
    });
  };

  const handleResolveAllErrors = (id) => {
    props.setLoading(true);

    del('api/logger',{},(json,message,severity)=>{
      if (json) {
        setErrors(json);
        props.setLoading(false);
      } else {
        props.setLoading(false);
        navigate("/unauthorized");
      }
    },(error,message,severity)=>{
      props.setLoading(false);
      navigate("/unauthorized");
    });
  };

  useEffect(()=>{
    props.setLoading(true);

    get(`api/logger`,(json,message,severity)=>{

      if (json) {
        setErrors(json);
        props.setLoading(false);
      } else {
        props.setLoading(false);
        navigate("/unauthorized");
      }

    },(error,message,severity)=>{
      props.setLoading(false);
      navigate("/unauthorized");
    });

  },[]);

  return (
    <List>
      <ListItem
        key='list_item_menu'
        secondaryAction={
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ChecklistIcon />}
            onClick={handleResolveAllErrors}
          >
            Apagar todos erros
          </Button>
        }
        sx={{
          margin: '0 0 16px 0',
          padding: 2,
          backgroundColor: '#F5F5F5',
          maxWidth: "92vw",
          boxSizing: 'border-box',
        }}
      >
        <Typography sx={{ ml: 0.5 , fontWeight: 'bold', color: '#7b4296' }} variant="h6">
          Há {errors.length} erro{(errors.length === 1) ? '' : 's'} sem tratamento.
        </Typography>
      </ListItem>

      {
        errors.map((error,index) => (
            <ListItem
              key={error._id}
              secondaryAction={
                <Button
                  edge="end"
                  aria-label="delete"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleResolveError(error._id)}
                >
                  <CheckIcon />
                </Button>
              }
              sx={{
                margin: '0 0 16px 0',
                padding: 2,
                backgroundColor: '#F5F5F5',
                maxWidth: "92vw",
                boxSizing: 'border-box',
              }}
            >
              <ListItemText
                sx={{
                  display: 'block',
                  unicodeBidi: 'embed',
                  fontFamily: 'monospace',
                  whiteSpace: 'pre',
                  overflowX: 'scroll',
                }}
              >
                {error.traceback}
              </ListItemText>
            </ListItem>
          )
        )
      }
    </List>
  );
}
