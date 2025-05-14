import { Client } from "@stomp/stompjs";

class WebSocketService {
  constructor() {
    this.client = new Client({
      brokerURL: "wss://textchat-ast1.onrender.com/ws",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.log("STOMP:", str),
    });
    this.client.onWebSocketError = (error) => {
      console.error("WebSocket error:", error);
    };

    this.client.onDisconnect = () => {
      console.log("WebSocket disconnected");
    };

    this.subscriptions = {};
    this.messageHandlers = {
      private: [],
      edited: [],
      deleted: [],
    };
  }

  connect(userId) {
    this.client.onConnect = (frame) => {
      console.log("WebSocket connected");

      this.subscriptions.private = this.client.subscribe(
        `/user/queue/private`,
        this.handlePrivateMessage.bind(this)
      );

      this.subscriptions.edited = this.client.subscribe(
        `/user/queue/message-edited`,
        this.handleEditedMessage.bind(this)
      );

      this.subscriptions.deleted = this.client.subscribe(
        `/user/queue/message-deleted`,
        this.handleDeletedMessage.bind(this)
      );
    };

    this.client.onStompError = (frame) => {
      console.error("STOMP error:", frame.headers.message);
    };

    this.client.activate();
  }

  handlePrivateMessage(message) {
    const msg = JSON.parse(message.body);
    const date = new Date(msg.createdAt);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedMessage = {
      ...msg,
      time: `${day}.${month} ${hours}:${minutes}`,
      isFrom: true,
    };

    this.messageHandlers.private.forEach((handler) =>
      handler(formattedMessage)
    );
  }

  handleEditedMessage(message) {
    const msg = JSON.parse(message.body);
    this.messageHandlers.edited.forEach((handler) => handler(msg));
  }

  handleDeletedMessage(message) {
    const msg = JSON.parse(message.body);
    this.messageHandlers.deleted.forEach((handler) => handler(msg));
  }

  onPrivateMessage(handler) {
    this.messageHandlers.private.push(handler);
  }

  onMessageEdited(handler) {
    this.messageHandlers.edited.push(handler);
  }

  onMessageDeleted(handler) {
    this.messageHandlers.deleted.push(handler);
  }

  sendMessage(messageData) {
    return this.publish("/app/addNewMessage", messageData);
  }

  editMessage(editData) {
    return this.publish("/app/editMessage", editData);
  }

  deleteMessage(id, userId) {
    return this.publish(`/app/deleteMessage`, { id, userId });
  }

  publish(destination, body) {
    return new Promise((resolve, reject) => {
      if (!this.client.connected) {
        reject(new Error("WebSocket connection not established"));
        return;
      }

      this.client.publish({
        destination,
        body: JSON.stringify(body),
        headers: { "content-type": "application/json" },
      });

      resolve({ status: "success" });
    });
  }

  disconnect() {
    Object.values(this.subscriptions).forEach((sub) => sub.unsubscribe());
    this.client.deactivate();
  }
}

export const webSocketService = new WebSocketService();
