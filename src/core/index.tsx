type Point = number[];

const initializeCentroids = (data: Point[], k: number): Point[] => {
  const centroids: Point[] = [];
  for (let i = 0; i < k; i++) {
    centroids.push(data[Math.floor(Math.random() * data.length)]);
  }
  return centroids;
};

const findClosestCentroid = (point: Point, centroids: Point[]): number => {
  const distances: number[] = centroids.map((centroid) =>
    euclideanDistance(point, centroid)
  );
  return distances.indexOf(Math.min(...distances));
};

const euclideanDistance = (point1: Point, point2: Point): number => {
  return Math.sqrt(
    point1.reduce((sum, value, index) => sum + (value - point2[index]) ** 2, 0)
  );
};

const updateCentroids = (
  data: Point[],
  labels: number[],
  k: number
): Point[] => {
  const centroids: Point[] = [];
  for (let i = 0; i < k; i++) {
    const clusterPoints = data.filter((_, j) => labels[j] === i);
    if (clusterPoints.length > 0) {
      const newCentroid = clusterPoints[0].map(
        (_, index) =>
          clusterPoints.reduce((sum, point) => sum + point[index], 0) /
          clusterPoints.length
      );
      centroids.push(newCentroid);
    } else {
      centroids.push(data[Math.floor(Math.random() * data.length)]);
    }
  }
  return centroids;
};

const hasConverged = (centroids: Point[], oldCentroids: Point[]): boolean => {
  const threshold = 1e-4;
  return centroids.every(
    (centroid, i) => euclideanDistance(centroid, oldCentroids[i]) < threshold
  );
};

export const kmeans = (
  data: Point[],
  k: number,
  maxIters: number = 100
): { labels: number[]; centroids: Point[] } => {
  let centroids = initializeCentroids(data, k);
  let labels: number[] = new Array(data.length).fill(0);

  for (let iter = 0; iter < maxIters; iter++) {
    const currentCentroids = centroids;
    const oldCentroids = centroids.map((centroid) => [...centroid]);

    labels = data.map((point) => findClosestCentroid(point, currentCentroids));

    centroids = updateCentroids(data, labels, k);

    if (hasConverged(centroids, oldCentroids)) {
      break;
    }
  }

  return { labels, centroids };
};
