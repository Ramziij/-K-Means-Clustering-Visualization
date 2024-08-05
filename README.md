# K-Means Clustering Visualization

## Project Overview

K-Means Clustering Visualization is a web application that allows users to visualize the K-Means clustering algorithm. Users can interactively add points to the canvas, set the number of clusters, and run the K-Means algorithm to see how the points are grouped into clusters.

## Launch

```bash
npm install -g pnpm@8.15.6
pnpm i —frozen-lockfile
pnpm start
```

#### http://localhost:3000/

## Project Structure

### Components

- **ClusterVisualization.tsx**

  This React component is responsible for rendering the data points, centroids, and clusters on an SVG canvas. It receives data points, labels, centroids, and a click handler as props.

### Core

- **index.tsx**

  This file contains the core K-Means algorithm implementation, including functions to initialize centroids, find the closest centroid, calculate Euclidean distance, update centroids, check for convergence, and run the K-Means algorithm.

### App Component

- **App.tsx**

  This is the main React component that manages the state of the application, including the data points, number of clusters, labels, and centroids. It provides functions to run the K-Means algorithm, handle canvas clicks, and reset the data points.

### Entry Point

- **index.tsx**

  The entry point of the application where the React component tree is rendered into the DOM.
