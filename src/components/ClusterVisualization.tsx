import React from 'react';

interface ClusterVisualizationProps {
  data: number[][];
  labels: number[];
  centroids: number[][];
}

const ClusterVisualization: React.FC<ClusterVisualizationProps> = ({
  data,
  labels,
  centroids,
}) => {
  const width = 600;
  const height = 400;
  const margin = 20;

  const xScale = (value: number) => (value / 10) * (width - 2 * margin);
  const yScale = (value: number) =>
    height - margin - (value / 12) * (height - 2 * margin);

  const clusters: { [key: number]: number[][] } = {};
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    if (!clusters[label]) {
      clusters[label] = [];
    }
    clusters[label].push(data[i]);
  }

  return (
    <svg width={width} height={height} style={{ border: '1px solid #ccc' }}>
      {data.map((point, index) => (
        <circle
          key={index}
          cx={xScale(point[0]) + margin}
          cy={yScale(point[1]) + margin}
          r={4}
          fill='rgba(75, 192, 192, 0.4)'
        />
      ))}
      {centroids.map((centroid, index) => (
        <circle
          key={index}
          cx={xScale(centroid[0]) + margin}
          cy={yScale(centroid[1]) + margin}
          r={6}
          fill='rgba(255, 0, 0, 1)'
        />
      ))}
      {Object.values(clusters).map((cluster, index) => (
        <polyline
          key={index}
          points={cluster
            .map(
              (point) =>
                `${xScale(point[0]) + margin},${yScale(point[1]) + margin}`
            )
            .join(' ')}
          fill='none'
          stroke='rgba(75, 192, 192, 0.4)'
        />
      ))}
    </svg>
  );
};

export default ClusterVisualization;
