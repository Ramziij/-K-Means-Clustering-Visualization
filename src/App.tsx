import React from 'react';
import { kmeans } from './core/index';
import ClusterVisualization from './components/ClusterVisualization';

const App: React.FC = () => {
  const initialData: number[][] = [
    [100, 200],
    [500, 350],
    [323, 300],
    [400, 150],
    [140, 300],
    [97, 110],
  ];

  const [data, setData] = React.useState<number[][]>(initialData);
  const [k, setK] = React.useState(2);
  const [labels, setLabels] = React.useState<number[]>([]);
  const [centroids, setCentroids] = React.useState<number[][]>([]);

  const runKMeans = () => {
    const { labels, centroids } = kmeans(data, k);
    setLabels(labels);
    setCentroids(centroids);
  };
  const handleSVGClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setData((prevData) => [...prevData, [x, y]]);
  };

  const handleReset = () => {
    setLabels([]);
    setCentroids([]);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>K-Means Clustering Visualization</h1>
      <ClusterVisualization
        data={data}
        labels={labels}
        centroids={centroids}
        onClick={handleSVGClick}
      />
      <div>
        <label>
          Number of Clusters (k):
          <input
            type='number'
            value={k}
            onChange={(e) => setK(e.target.valueAsNumber)}
            min={1}
            max={10}
          />
        </label>
      </div>
      <div>
        <button onClick={runKMeans}>Run K-Means</button>
      </div>
      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default App;
