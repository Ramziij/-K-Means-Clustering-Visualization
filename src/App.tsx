import React, { useState } from 'react';
import { kmeans } from './core/index';
import ClusterVisualization from './components/ClusterVisualization';

const App: React.FC = () => {
  const initialData: number[][] = [
    [1, 2],
    [5, 8],
    [1.5, 1.8],
    [8, 8],
    [1, 0.6],
    [9, 11],
  ];

  const [data, setData] = useState(initialData);
  const [k, setK] = useState(2);
  const [labels, setLabels] = useState<number[]>([]);
  const [centroids, setCentroids] = useState<number[][]>([]);

  const runKMeans = () => {
    const { labels, centroids } = kmeans(data, k);
    setLabels(labels);
    setCentroids(centroids);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>K-Means Clustering Visualization</h1>
      <ClusterVisualization data={data} labels={labels} centroids={centroids} />
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
    </div>
  );
};

export default App;
