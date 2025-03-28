const axios = require("axios");

const sendPushNotification = async (expoPushToken, title, body) => {
  if (!expoPushToken || !expoPushToken.startsWith("ExponentPushToken[")) {
    console.error("Invalid Expo push token:", expoPushToken);
    return;
  }

  const message = {
    to: expoPushToken,
    sound: "default",
    title,
    body,
    priority: "high",
    channelId: "default",
    badge: 1,
    data: { screen: "TaskGallery" }, // Include relevant data
  };

  try {
    console.log("Sending notification to:", expoPushToken);
    const response = await axios.post(
      "https://exp.host/--/api/v2/push/send",
      message,
      {
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.data && response.data.data.status === "error") {
      console.error("Expo push notification failed:", response.data);
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error sending push notification:",
      error.response?.data || error
    );
    throw error;
  }
};

module.exports = { sendPushNotification };
