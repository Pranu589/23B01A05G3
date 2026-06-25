import axios from "axios";

const API_URL = "http://4.224.186.213/evaluation-service";

let token = null;

async function getToken() {
  if (token) return token;

  const response = await axios.post(`${API_URL}/auth`, {
    email: "spranathi.589@gmail.com",
    name: "samudanapalepu pranathi",
    rollNo: "23b01a05g3",
    accessCode: "ahXjvp",
    clientID: "b0da73e5-3108-4e63-939d-abe8e3aa41d1",
    clientSecret: "gyNcCukCXHQTHwjH",
  });

  token = response.data.access_token;

  return token;
}

export async function fetchNotifications() {
  const jwt = await getToken();

  const response = await axios.get(`${API_URL}/notifications`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data.notifications;
}