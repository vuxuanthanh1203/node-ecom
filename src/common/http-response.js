const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const HTTP_RESPONSE = {
  COMMON: {
    SUCCESS: {
      MESSAGE: "Success",
      CODE: 200,
    },
    CREATED: {
      MESSAGE: "Create Success",
      CODE: 201,
    },
    BAD_REQUEST: {
      MESSAGE: "Bad Request",
      CODE: 400,
    },
    UNAUTHORIZED: {
      MESSAGE: "Unauthorized",
      CODE: 401,
    },
    FORBIDDEN: {
      MESSAGE: "Forbidden",
      CODE: 403,
    },
    NOT_FOUND: {
      MESSAGE: "Not Found",
      CODE: 404,
    },
    INTERNAL_SERVER_ERROR: {
      MESSAGE: "Internal Server Error",
      CODE: 500,
    },
  },

  /** File */
  FILE: {
    REQUIRED: {
      MESSAGE: "File is required",
      CODE: 39000,
    },
    UPLOAD_SUCCESS: {
      MESSAGE: "Upload file successful",
      CODE: 39001,
    },
    UPLOAD_FAIL: {
      MESSAGE: "Upload file failed",
      CODE: 39002,
    },
    ACCEPT_MEDIA: {
      MESSAGE: "Only accepts media files: PNG, JPG, JPEG, MP4",
      CODE: 39003,
    },
    ACCEPT_IMAGE: {
      MESSAGE: "Only accepts image files: PNG, JPG, JPEG",
      CODE: 39004,
    },
    MUST_BE_VIDEO: {
      MESSAGE: "File must be video",
      CODE: 39005,
    },
    ACCEPT_DOCUMENT: {
      MESSAGE:
        "Only accepts document files: PDF, XLS, XLSX, DOC, DOCX, PPT, PPTX, TXT,",
      CODE: 39006,
    },
  },

  AUTH: {
    LOGIN_SUCCESS: {
      MESSAGE: "Login Success",
      CODE: 10000,
    },
    INVALID_API_KEY: {
      MESSAGE: "Invalid Api Key",
      CODE: 10003,
    },
    KEY_ERROR: {
      MESSAGE: "keyStore Error!",
      CODE: 10004,
    },
    CREATE_KEY_SUCCESS: {
      MESSAGE: "Create Key Success!",
      CODE: 10005,
    },
  },

  // Shop
  SHOP: {
    ALREADY_EXIST: {
      MESSAGE: "Shop Already Exist",
      CODE: 11000,
    },
  },
};

module.exports = { HTTP_STATUS, HTTP_RESPONSE };
