let connectionValue = document.querySelector(".warehouse-data .connection .value span");
let mq2Value = document.querySelector(".warehouse-data .mq-2 .value span");
let dht22Value = document.querySelector(".warehouse-data .dht22 .value span");
let timeValue = document.querySelector(".warehouse-data .time .value span");
let status = document.querySelector(".js-status");

let connectionMQ2 = 0;
let connectionDHT22 = 0;

function timeout() {
  setTimeout(() => {
    getStatus();
    getMq2();
    getDht22();
    getConnection();
    let date = new Date();
    timeValue.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    timeout();
  }, 1000);
}
function getStatus(){
  // Get the text content of the element
const text = status.textContent;

// Split the text by whitespace into an array of words
const words = text.split(' ');

// Remove all but the last word from the array
words.splice(0, words.length - 1);

// Join the remaining words into a string
const lastWord = words.join(' ');

// Set the innerHTML of the element to the last word
status.innerHTML = lastWord;
}
function getMq2() {
  fetch(
    "https://ny3.blynk.cloud/external/api/get?token=U-nfUdhCpO9A5VhMmw7c6nULbVJWnFvM&dataStreamId=6"
  ).then((response) => {
    response.json().then((data) => {
      mq2Value.innerHTML = data;
      connectionMQ2 = data;
      if (data == 0) {
        connectionMQ2 = 0;
      }
    });
  });
}

function getDht22() {
  fetch(
    "https://ny3.blynk.cloud/external/api/get?token=U-nfUdhCpO9A5VhMmw7c6nULbVJWnFvM&dataStreamId=8"
  ).then((response) => {
    response.json().then((data) => {
      dht22Value.innerHTML = data;
      connectionDHT22 = data;
      if (data == 0) {
        connectionDHT22 = 0;
      }
    });
  });
}

function getConnection() {
  if (connectionMQ2 == 0 && connectionDHT22 == 0) {
    connectionValue.innerHTML = "offline";
  } else {
    connectionValue.innerHTML = "online";
  }
}

timeout();
