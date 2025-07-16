import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function NotFound() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          marginTop: 2
        }}
      >
        <Grid
          item
          xs={3}
          sx={{
            background: 'linear-gradient(to right bottom, #7b4296, #db2330)',
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Box
            component="img"
            sx={{
              width: '70vh',
              maxWidth: '90%',
            }}
            alt="Imagem de erro."
            src="img/imagem_nao_encontrado.png"
          />
        </Grid>
      </Grid>
    )
}
