const Ably = require("ably");
const rest = new Ably.Rest({ key: process.env.ABLY_API_KEY });

// Why are we using the Ably.Rest SDK function rather than standard createTokenRequest?.

exports.handler = (_event, _context, callback) => {
  rest.auth.createTokenRequest(
    {
      clientId:
        "clientId-" +
        Math.random()
          .toString(36)
          .substr(2, 16)
    },
    (err, tokenRequest) => {
      if (err) {
        callback({
          statusCode: 500,
          body: JSON.stringify(err)
        });
      } else {
        callback(null, {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
          },
          body: JSON.stringify(tokenRequest)
        });
      }
    }
  );
};
