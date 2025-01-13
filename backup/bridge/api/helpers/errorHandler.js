function handleError(err, req, res, next) {
  console.error(err.stack);

  // Customize error responses based on error type
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation error', errors: err.errors });
  } else if (err.name === 'NotFoundError') {
    return res.status(404).json({ message: 'Resource not found' });
  } else if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Generic error response
  res.status(500).json({ message: 'Internal server error' });
}

module.exports = handleError;
