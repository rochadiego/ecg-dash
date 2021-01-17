export const ECG_POINTS = [
  'Início da onda P',
  'Pico da onda P',
  'Final da onda P',
  'Início do complexo QRS',
  'Vale Q',
  'Pico R',
  'Vale S',
  'Final do complexo QRS',
  'Início da onda T',
  'Pico da onda T',
  'Final da onda T',
  'Marcação concluída',
];

export const GRAPH = {
  labels: [0],
  datasets: [
    {
      label: 'ECG nº 001',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: ['#fff'],
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: [1],
      pointHitRadius: 5,
      data: [0],
    },
  ],
};