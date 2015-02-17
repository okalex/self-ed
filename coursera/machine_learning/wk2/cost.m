function cost = cost(X, y, theta)

cost = sum(1 / (2 * size(X, 1)) * (X * theta - y) .^ 2);
