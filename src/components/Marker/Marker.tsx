import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import Alert from '@paljs/ui/Alert';
import Col from '@paljs/ui/Col';
import Row from '@paljs/ui/Row';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Line } from 'react-chartjs-2';

import * as defaults from './defaults';

interface ICoordinate {
  x: number;
  y: number;
}

interface ICoordinateIndex {
  x: number;
  y: number;
}

function Marker() {
  const [state, setState] = useState(defaults.GRAPH);
  const [pointerCount, setPointerCount] = useState(0);
  const [coordinates, setCoordinates] = useState<ICoordinate[]>([]);
  const [coordinatesIndex, setCoordinatesIndex] = useState<ICoordinateIndex[]>([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get('curve.json');
        if (res) {
          const x: number[] = res.data.columns;
          const y: number[] = res.data.ecg[0];
          const pointBackgroundColor: string[] = Array.from(Array(x.length).keys()).map(() => '#fff');
          const pointRadius: number[] = Array.from(Array(x.length).keys()).map(() => 1);

          setState({
            ...state,
            labels: x,
            datasets: [
              ...state.datasets.map((obj) => {
                return {
                  ...obj,
                  data: y,
                  pointRadius: pointRadius,
                  pointBackgroundColor: pointBackgroundColor,
                };
              }),
            ],
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  function removeLastPoint() {
    if (pointerCount > 0) {
      setPointerCount(pointerCount - 1);
      const newCoordinates = coordinates.splice(-1, 1);
      setCoordinates(newCoordinates);
      const newCoordinatesIndex = coordinatesIndex.splice(-1, 1);
      setCoordinatesIndex(newCoordinatesIndex);
    } else setAlert(true);
  }

  const setPoints = {
    onClick: (_e: MouseEvent, element: any) => {
      if (element.length > 0 && pointerCount < 11) {
        const labelIndex = element[0]._index;
        const valueIndex = element[0]._datasetIndex;
        const label = state.labels[labelIndex];
        const value = state.datasets[valueIndex].data[labelIndex];

        setPointerCount(pointerCount + 1);
        setAlert(false);
        const newCoordinates = [...coordinates, { x: label, y: value }];
        setCoordinates(newCoordinates);
        const newCoordinatesIndex = [...coordinatesIndex, { x: labelIndex, y: valueIndex }];
        setCoordinatesIndex(newCoordinatesIndex);
      }
      // console.log(coordinatesIndex);
    },
  };

  // useEffect(() => {
  //   // const color = '#ed5249';
  //   const radius = 6;

  //   setState({
  //     ...state,
  //     datasets: [
  //       ...state.datasets.map((obj, objIdx) => {
  //         return {
  //           ...obj,
  //           pointRadius: obj.pointRadius.map((a, pointIdx) => {

  //             return coordinatesIndex.map(coordinatesIndexObj => {
  //               if (coordinatesIndexObj.y == objIdx && coordinatesIndexObj.x == pointIdx) return radius;
  //               else return a;
  //             })
  //             // return aaa;
  //           }),

  //           pointBackgroundColor: obj.pointBackgroundColor.map(b => {
  //             return b;
  //           })
  //         }
  //       })
  //     ]
  //   });
  // }, []);
  // coordinatesIndex.map(coordinatesIndexObj => {
  //   state.datasets[coordinatesIndexObj.y].pointBackgroundColor[coordinatesIndexObj.x] = '#ed5249';
  //   state.datasets[coordinatesIndexObj.y].pointRadius[coordinatesIndexObj.x] = 6;
  //   setState(state);
  // })
  // }, [coordinatesIndex])

  const alertJsx = alert ? (
    <Alert status="Danger" closable onClose={() => setAlert(false)} key="0">
      Não há pontos para remover!
    </Alert>
  ) : null;

  return (
    <div>
      {alertJsx}
      <Card>
        <h2 style={{ textAlign: 'center' }}>{defaults.ECG_POINTS[pointerCount]}</h2>
        <CardBody>
          <Row>
            <Col key="Danger" style={{ marginBottom: '1.5rem' }} breakPoint={{ xs: true }}>
              <Button fullWidth status="Danger" onClick={removeLastPoint}>
                remover último ponto marcado
              </Button>
            </Col>
            <Col key="Success" style={{ marginBottom: '1.5rem' }} breakPoint={{ xs: true }}>
              <Button fullWidth status="Success">
                enviar pontos marcados
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Line data={state} options={setPoints} width={400} height={200} />
    </div>
  );
}

export default Marker;
