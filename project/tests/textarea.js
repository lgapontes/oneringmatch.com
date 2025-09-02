<TextField
  label={props.i18n('sheet.character-sheet.cultural-blessing-rules')}
  fullWidth
  style={props.styles.textarea}
  color="brown"
  focused
  variant="standard"
  multiline
  minRows={2}
  value={props.character.cultural_blessing}
  InputLabelProps={{
    shrink: true,
    sx: {
     left: "4px",
     top: "4px",
    }
  }}
  InputProps={{
    sx: {
     padding: '4px',
     readOnlye: 'true',
     fontFamily: 'NewBaskerville',
   },
   onFocus: (event) => {
     event.target.blur();
   }
  }}
/>
