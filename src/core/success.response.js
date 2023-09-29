"use strict";

const {
  StatusCodes,
  ReasonPhrases,
} = require("../utils/httpStatusCodes/httpStatusCode");

// Construct a default success response
class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    metadata = {},
  }) {
    this.message = !message ? reasonStatusCode.OK : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  // Method: Send response
  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

// Customize the RESPONSE with OK
class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

// Customize the RESPONSE with CREATED
class CREATED extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    metadata,
    options = {},
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
    this.options = options;
  }
}

module.exports = {
  OK,
  CREATED,
  SuccessResponse,
};
