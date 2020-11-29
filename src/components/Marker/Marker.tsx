import axios from 'axios';
import React, { Component } from 'react';
// import Plot from 'react-plotly.js';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

var ECGData;
var ECGLayout;

var contadorDePontosMarcados = 0;
var annotations;

const pontos_ecg = [
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

class Marker extends Component {
  componentDidMount() {
    axios
      .get('curva.json')
      .then((response) => {
        this.setState({
          data: [
            {
              x: response.data.columns,
              y: response.data.ecg[0],
            },
          ],
          layout: response.data.layout,
        });
      })
      .catch(() => {
        alert('Não foi possível acessar os dados.');
      });
  }

  constructor(props) {
    super(props);
    this.ECGData = {};
    this.state = { nome: 'Curva', data: ECGData, layout: ECGLayout, frames: [], config: {}, contadorDePontosMarcados };
  }
  rmLastECGPoint = () => {
    const { graphDiv } = this.state;
    try {
      if (this.state.contadorDePontosMarcados > 0) {
        annotations.pop();
        this.setState({ contadorDePontosMarcados: this.state.contadorDePontosMarcados - 1 });
        Plotly.relayout(graphDiv, { annotations: annotations });
      }
    } catch (error) {
      alert('Não há pontos para remover');
    }
  };

  setEcgPoints = (data) => {
    // contadorDePontosMarcados += 1;
    if (this.state.contadorDePontosMarcados <= 11) {
      const { graphDiv, layout } = this.state;
      data.points.forEach((point) => {
        var annotate_text = 'x = ' + point.x + 'y = ' + point.y.toPrecision(4);
        var annotation = {
          text: annotate_text,
          x: point.x,
          y: parseFloat(point.y.toPrecision(4)),
        };
        annotations = layout.annotations || [];
        annotations.push(annotation);
        this.setState({
          contadorDePontosMarcados: this.state.contadorDePontosMarcados + 1,
        });
        Plotly.relayout(graphDiv, { annotations: annotations });
      });
    }
  };

  //Type annotations can only be used in TypeScript files.
  onInitialized = (figure: any, graphDiv: any): void => {
    this.setState({ graphDiv });
    this.onInitialListner();
  };

  onInitialListner = () => {
    const { graphDiv } = this.state;
    graphDiv.addEventListener('click', (evt) => {
      //var xInDataCoord = evt.x;
      //var yInDataCoord = evt.y;
    });
  };

  render() {
    return (
      <div className="chart">
        <div>
          <h1>{pontos_ecg[this.state.contadorDePontosMarcados]}</h1>
          <button className="btn" onClick={() => this.rmLastECGPoint()}>
            Remover último ponto
          </button>
        </div>
        <div>
          <Plot
            ref={(node) => {
              this.graphNode = node;
            }}
            data={this.state.data}
            layout={this.state.layout}
            onInitialized={this.onInitialized}
            onClick={(data) => this.setEcgPoints(data)}
          />
        </div>
      </div>
    );
  }
}

export default Marker;
