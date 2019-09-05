import firebase from "react-native-firebase";
import { get } from "lodash";

const TOKEN_METHOD = {
  GET_TOKEN: "GET_TOKEN",
  ON_TOKEN_REFRESH_LISTENER: "TOKEN_REFRESH_LISTENER"
};

const createAndroidChannel = async () => {
  const channel = new firebase.notifications.Android.Channel(
    "pg-channel",
    "Pg Channel",
    firebase.notifications.Android.Importance.Max
  ).setDescription("Parents Gateway Channel");

  await firebase.notifications().android.createChannel(channel);
};

class NotificationManager {
  static init() {
    // await firebase.iid().delete();
    firebase.messaging().requestPermission();
    createAndroidChannel();
    this._notificationListeners = {};
    this._notificationOpenedListeners = {};
    this._tokenRefreshListener = () => {};
    this.notificationListener = firebase
      .notifications()
      .onNotification(NotificationManager.onNotificationHandler);
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(NotificationManager.onNotificationOpenedHandler);
  }

  static getPushPermission() {
    return firebase.messaging().requestPermission();
  }

  static getToken() {
    return firebase.messaging().getToken();
  }

  static getInitialNotification() {
    return firebase.notifications().getInitialNotification();
  }

  static initializeNewSession(callback, parentId) {
    console.log(">>> initializing new session");

    NotificationManager.registerTokenForNewSession(parentId);

    NotificationManager.unintializeSession();
    NotificationManager.subscribeNotification(
      "overallPNHandler",
      "default",
      callback
    );
    NotificationManager.subscribeNotificationOpened(
      "overallPNHandler",
      "default",
      () => {
        console.log(">>> pn opened");
      }
    );
    NotificationManager._tokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh(NotificationManager.registerTokenOnRefresh(parentId));
  }

  static unintializeSession() {
    console.log(">>> unintialized session");
    NotificationManager.unsubscribeNotification("overallPNHandler");
    NotificationManager.unsubscribeNotificationOpened("overallPNHandler");
    NotificationManager._tokenRefreshListener();
  }

  static async registerTokenForNewSession(parentId) {
    let token;
    try {
      await NotificationManager.getPushPermission();
      token = await NotificationManager.getToken();
    } catch (err) {
      console.log(">>> error while getting push token", err);
      return;
    }

    NotificationManager.registerTokenWithServer(
      TOKEN_METHOD.GET_TOKEN,
      parentId,
      token
    );
  }

  static registerTokenOnRefresh = parentId => newToken => {
    return NotificationManager.registerTokenWithServer(
      TOKEN_METHOD.ON_TOKEN_REFRESH_LISTENER,
      parentId,
      newToken
    );
  };

  static async registerTokenWithServer(method, parentId, token) {
    console.log(`>>> registering token with ${method}`, token);

    fetch("http://httpbin.org/delay/5", { method: "POST" })
      .then(response => response.json())
      .then(body => console.log(">>> registered token"))
      .catch(err => console.log(">>> failed to register token somehow"));
  }

  /**
   *
   * @param {string} key
   * @param {string} type
   * @param {Function} listener
   */
  static subscribeNotification(key, type, listener) {
    NotificationManager._notificationListeners[key] = { type, listener };
  }

  static unsubscribeNotification(key) {
    delete NotificationManager._notificationListeners[key];
  }

  static subscribeNotificationOpened(key, type, listener) {
    NotificationManager._notificationOpenedListeners[key] = { type, listener };
  }

  static unsubscribeNotificationOpened(key) {
    delete NotificationManager._notificationOpenedListeners[key];
  }

  static async onNotificationHandler(notification) {
    const notificationType = String(
      get(notification, "data.type")
    ).toLowerCase();

    Object.entries(NotificationManager._notificationListeners).forEach(
      subscriber => {
        const [key, value] = subscriber;
        const { type, listener } = value;

        if (notificationType === type.toLowerCase() || type === "default") {
          listener(notification);
        }
      }
    );

    /** Propose to have a toggle or indicator whether or not to display push notification */
    NotificationManager.displayNotification(notification);
  }

  static async onNotificationOpenedHandler(notification) {
    const notificationType = String(
      get(notification, "data.type")
    ).toLowerCase();

    Object.entries(NotificationManager._notificationOpenedListeners).forEach(
      subscriber => {
        const [key, value] = subscriber;
        const { type, listener } = value;

        if (notificationType === type.toLowerCase() || type === "default") {
          listener(notification);
        }
      }
    );
  }

  static displayNotification(notification) {
    let _notification = new firebase.notifications.Notification({
      sound: "default",
      show_in_foreground: true
    })
      .setNotificationId(notification.notificationId)
      .setTitle(notification.title)
      .setSubtitle(notification.subtitle)
      .setBody(notification.body)
      .setData(notification.data)
      .android.setChannelId("pg-channel")
      .android.setSmallIcon("android_logo")
      .android.setPriority(firebase.notifications.Android.Priority.High)
      .android.setAutoCancel(true)
      .ios.setBadge(notification.ios.badge);

    firebase.notifications().displayNotification(_notification);
  }
}

export default NotificationManager;
