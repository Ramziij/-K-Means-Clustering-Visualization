import React from 'react';

interface ClusterVisualizationProps {
  data: number[][];
  labels: number[];
  centroids: number[][];
  onClick: (event: React.MouseEvent<SVGSVGElement>) => void;
}

const ClusterVisualization: React.FC<ClusterVisualizationProps> = ({
  data,
  labels,
  centroids,
  onClick,
}) => {
  const width = 600;
  const height = 400;
  const margin = 20;

  const clusters: { [key: number]: number[][] } = {};
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    if (!clusters[label]) {
      clusters[label] = [];
    }
    clusters[label].push(data[i]);
  }

  return (
    <svg
      width={width}
      height={height}
      style={{ border: '1px solid #ccc' }}
      onClick={onClick}
    >
      {data.map((point, index) => (
        <circle
          key={index}
          cx={point[0] + margin}
          cy={point[1] + margin}
          r={4}
          fill='rgba(75, 192, 192, 0.4)'
        />
      ))}
      {centroids.map((centroid, index) => (
        <circle
          key={index}
          cx={centroid[0] + margin}
          cy={centroid[1] + margin}
          r={6}
          fill='rgba(255, 0, 0, 1)'
        />
      ))}
      {Object.values(clusters).map((cluster, index) => (
        <polyline
          key={index}
          points={cluster
            .map((point) => `${point[0] + margin},${point[1] + margin}`)
            .join(' ')}
          fill='none'
          stroke='rgba(75, 192, 192, 0.4)'
        />
      ))}
    </svg>
  );
};

export default ClusterVisualization;
