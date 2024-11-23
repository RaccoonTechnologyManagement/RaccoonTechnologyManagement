import React, { useState } from 'react';
import { Grid, Paper, Typography, Button, Menu, MenuItem, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Container from '../layout/Container';

// Registrar todos os componentes necessários
Chart.register(...registerables);

// Dados fixos para cada gráfico, incluindo títulos e legendas
const chartsData = [
  {
    title: 'MEUS CHAMADOS',
    data: {
      'Últimos 7 dias': [5, 3],
      'Últimos 30 dias': [10, 5],
      'Últimos 3 meses': [20, 15],
    },
    labels: ['Em andamento', 'Finalizados'],
  },
  {
    title: 'CHAMADOS',
    data: {
      'Últimos 7 dias': [7, 2, 1],
      'Últimos 30 dias': [12, 8, 3],
      'Últimos 3 meses': [25, 10, 10],
    },
    labels: ['Abertos', 'Em andamento', 'Finalizados'],
  },
  {
    title: 'PRIORIDADE DE CHAMADOS ABERTOS',
    data: {
      'Últimos 7 dias': [3, 5, 7],
      'Últimos 30 dias': [9, 4, 6],
      'Últimos 3 meses': [14, 9, 5],
    },
    labels: ['Alta', 'Média', 'Baixa'],
  },
  {
    title: 'ATIVOS',
    data: {
      'Últimos 7 dias': [6, 1],
      'Últimos 30 dias': [8, 6],
      'Últimos 3 meses': [11, 12],
    },
    labels: ['Online', 'Offline'],
  },
];

const Dashboard = () => {
  const initialData = chartsData.map(chart => ({
    labels: chart.labels,
    datasets: [
      {
        data: chart.data['Últimos 7 dias'], // Inicia com dados dos últimos 7 dias
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  }));

  const [currentData, setCurrentData] = useState(initialData);
  const [filters, setFilters] = useState(Array(4).fill('Últimos 7 dias'));
  const [anchorEls, setAnchorEls] = useState(Array(4).fill(null));

  // Tema escuro
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleFilterClick = (index, event) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleFilterSelect = (index, option) => {
    const newFilters = [...filters];
    newFilters[index] = option;
    setFilters(newFilters);
    setAnchorEls(Array(4).fill(null)); // Fecha todos os menus

    // Atualiza apenas o gráfico correspondente com os dados do filtro selecionado
    const updatedData = [...currentData];
    const newData = chartsData[index].data[option] || chartsData[index].data['Últimos 7 dias'];

    updatedData[index] = {
      labels: chartsData[index].labels,
      datasets: [
        {
          data: newData,
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
          ],
          borderWidth: 1,
        },
      ],
    };

    setCurrentData(updatedData);
  };

  const handleClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Grid container spacing={2} style={{ padding: '20px' }}>
          {chartsData.map((chart, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#424242' }}>
                <Typography variant="h5" gutterBottom>
                  {chart.title}
                </Typography>
                <Button variant="contained" onClick={(event) => handleFilterClick(index, event)}>
                  {filters[index]}
                </Button>
                <Menu
                  anchorEl={anchorEls[index]}
                  open={Boolean(anchorEls[index])}
                  onClose={() => handleClose(index)}
                >
                  <MenuItem onClick={() => handleFilterSelect(index, 'Últimos 7 dias')}>Últimos 7 dias</MenuItem>
                  <MenuItem onClick={() => handleFilterSelect(index, 'Últimos 30 dias')}>Últimos 30 dias</MenuItem>
                  <MenuItem onClick={() => handleFilterSelect(index, 'Últimos 3 meses')}>Últimos 3 meses</MenuItem>
                </Menu>
                <Grid container spacing={2} style={{ marginTop: '20px', alignItems: 'center' }}>
                  <Grid item xs={8}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '250px' }}>
                      <Pie 
                        data={currentData[index]} // Usa dados fixos para cada gráfico
                        options={{ 
                          plugins: { 
                            legend: { display: false } 
                          },
                          responsive: true,
                          maintainAspectRatio: false,
                        }} 
                      />
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '250px' }}>
                      {currentData[index].labels.map((label, labelIndex) => (
                        <div key={labelIndex} style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: currentData[index].datasets[0].backgroundColor[labelIndex],
                            marginRight: '10px',
                          }} />
                          <Typography variant="body1">{label}</Typography>
                        </div>
                      ))}
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
