export class ApplicationError extends Error {
  constructor(
    public message: string,
    public code: string,
    public status: number,
    public details?: any
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export class ErrorHandler {
  handleError(error: any, context?: string): ApplicationError {
    if (error instanceof ApplicationError) {
      return error;
    }

    // Log the error
    console.error('Error occurred:', {
      context,
      error: error.message,
      stack: error.stack
    });

    // Map common errors to ApplicationError
    if (error.code === 'ER_DUP_ENTRY') {
      return new ApplicationError(
        'Resource already exists',
        'DUPLICATE_ERROR',
        409,
        { field: this.extractDuplicateField(error.message) }
      );
    }

    if (error.name === 'ValidationError') {
      return new ApplicationError(
        'Validation failed',
        'VALIDATION_ERROR',
        400,
        { errors: error.errors }
      );
    }

    // Default error
    return new ApplicationError(
      context || 'An unexpected error occurred',
      'INTERNAL_ERROR',
      500
    );
  }

  private extractDuplicateField(errorMessage: string): string {
    // Extract field name from MySQL duplicate error message
    const matches = errorMessage.match(/Duplicate entry .* for key '(.*)'/);
    return matches ? matches[1] : 'unknown';
  }
}
