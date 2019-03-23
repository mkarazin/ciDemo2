class ResponseObjects {
  // Generic success message
  static Success(res, data) {
    res.status(200).json(
      {
        meta: {
          code: 200,
        },
        data,
      },
    );
  };

  static InvalidLogin(res) {
    res.status(401).json(
      {
        meta: {
          code: 401,
        },
      }
    )
  }

  static BadRequest(res, errorObjects) {
    res.status(400).json(
      {
        errors: errorObjects,
      },
    );
  }

  static ParameterValidationErrors(res, validationError) {
    const errors = validationError.errors.map(e => (
      {
        status: 400,
        title: 'INVALID_PARAMETER',
        source: {
          parameter: e.field,
          messages: e.messages,
        },
      }));
    return ResponseObjects.BadRequest(res, errors);
  }
}

export default ResponseObjects;
