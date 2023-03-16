export const statusCodes = {
  clientError: {
    notFound: 404,
    badRequest: 400,
    unauthorized: 401,
    forbbiden: 403,
    tokenExpiredOrInvalid: 498,
  },
  serverError: {
    internalServer: 500,
  },
  success: { okCode: 200 },
};

export default statusCodes;
