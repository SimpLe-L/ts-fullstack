export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR',
    public details?: Record<string, any>,
  ) {
    super(message)
    this.name = this.constructor.name
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        statusCode: this.statusCode,
        details: this.details,
        timestamp: new Date().toISOString(),
      },
    }
  }
}

export class AppConfigError extends AppError {
  constructor(message: string = 'app config error', details?: Record<string, any>) {
    super(message, 500, 'CONFIG_ERROR', details)
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'parameter validation error', details?: Record<string, any>) {
    super(message, 400, 'VALIDATION_ERROR', details)
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'request limit exceeded', details?: Record<string, any>) {
    super(message, 429, 'RATE_LIMIT_ERROR', details)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'unauthorized', details?: Record<string, any>) {
    super(message, 401, 'UNAUTHORIZED', details)
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'forbidden access', details?: Record<string, any>) {
    super(message, 403, 'FORBIDDEN', details)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'source not found', details?: Record<string, any>) {
    super(message, 404, 'NOT_FOUND', details)
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'database error', details?: Record<string, any>) {
    super(message, 500, 'DATABASE_ERROR', details)
  }
}

export class ExternalServiceError extends AppError {
  constructor(message: string = 'external service error', details?: Record<string, any>) {
    super(message, 502, 'EXTERNAL_SERVICE_ERROR', details)
  }
}

export class TimeoutError extends AppError {
  constructor(message: string = 'request timeout', details?: Record<string, any>) {
    super(message, 408, 'TIMEOUT_ERROR', details)
  }
}
