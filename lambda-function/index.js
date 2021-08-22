const { Poll, Client } = require("pg");

exports.handler = (incomingObject, context, callback) => {
  const client = new Client({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
  client.connect();
  const msgPayload = incomingObject.messages[0];
  const msgData = JSON.parse(msgPayload.data);

  if (msgPayload.name == "chatMsg") {
    const queryText =
      "INSERT INTO chat_data(username, msg_id, msg_data, client_id, created_at_timestamp) VALUES($1, $2, $3, $4, $5)";
    const queryValues = [
      msgData.username,
      msgPayload.id,
      msgData.content,
      msgPayload.clientId,
      msgPayload.timestamp,
    ];
    client.query(queryText, queryValues, (err, res) => {
      console.log("Error", err);
      console.log("Result", res);
      client.end();
    });
    return "insert function done";
  } else if (msgPayload.name == "editedMsg") {
    const queryText =
      "UPDATE chat_data SET msg_data = $1, is_edited = $2 WHERE msg_id = $3";
    const queryValues = [msgData.content, true, msgData.msgIdToEdit];
    client.query(queryText, queryValues, (err, res) => {
      console.log("Error", err);
      console.log("Result", res);
      client.end();
    });
    return "update function done";
  }
  return "all done";
};
