const Ably = require("ably");
const rest = new Ably.Rest({ key: process.env.ABLY_API_KEY });

exports.handler = (_event, _context, callback) => {
  rest.auth.createTokenRequest(
    {
      clientId: String(Math.random()),
    },
    (err, tokenRequest) => {
      if (err) {
        callback({
          statusCode: 500,
          body: JSON.stringify(err),
        });
      } else {
        callback(null, {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          },
          body: JSON.stringify(tokenRequest),
        });
      }
    }
  );
};
