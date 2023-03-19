# ARTS 1422: Data Visualization, Spring 2023

## Homework 2

<div align = "center">(Due on Monday, Mar.20 at 23:59)</div>

Note that D3.js is the only library allowed to finish this assignment. In addition, please use D3 v4 or above.

### Problem

Comparing Dimensionality Reduction Techniques with D3.js

In this homework assignment, you will explore different methods of dimensionality reduction and visualize their results using D3.js. Your goal is to create an interactive visualization that allows users to compare the performance of different dimensionality reduction techniques on a given dataset.

Here are the detailed steps:

1. Data Preparation: Choose a suitable dataset with a high number of features or dimensions, such as MNIST or Iris. Preprocess the dataset if necessary (e.g., handle missing values, normalize features, etc.).
2. Dimensionality Reduction: Implement at least three different methods of dimensionality reduction, such as Principal Component Analysis (PCA), t-Distributed Stochastic Neighbor Embedding (t-SNE), andMultidimensional scaling (MDS). Apply each method to the dataset and obtain a reduced-dimensional representation of the data.
3. Visualization: Use D3.js to create an interactive visualization that shows the reduced-dimensional representations of the data obtained by the different dimensionality reduction methods. The visualization should have at least three panels, each showing a different method's results and implement cross-chart interactions. For example, the user select one or more data points in one panel and can see them highlighted in the other panels.
4. Evaluation: Evaluate the quality of each method's reduced-dimensional representation by comparing how well it preserves the structure and relationships of the original high-dimensional data by visual analytics.  Report your findings in a written report.

### Submission:

- A Jupyter notebook (or equivalent) with the implementation of the dimensionality reduction methods. **(3 points)**

- A `.html` file with your D3 JavaScript implementation. **(5 points)**
- A written report that includes an introduction to the problem, a description of the dataset, the methodology used for dimensionality reduction, an evaluation of the different methods, screenshorts of your visualization result,  which should be a `.pdf` file. **(2 points)**
- Any necessary data files, including the original dataset and the reduced-dimensional representations obtained by the different methods.
- Put all above into a `姓名_2020533138.zip` file and submit .