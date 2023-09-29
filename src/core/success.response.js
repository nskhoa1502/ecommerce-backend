"use strict";

var ReasonStatusCode = {
  OK: "Success",
  CREATED: "Created!",
};

const StatusCode = {
  OK: 200,
  CREATED: 201,
};

// Construct a default success response
class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
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
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
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
};
