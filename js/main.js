//main variables
let connectionValue = document.querySelector(".warehouse-data .connection .value span");
let mq2Value = document.querySelector(".warehouse-data .mq-2 .value span");
let dht22Value = document.querySelector(".warehouse-data .dht22 .value span");
let timeValue = document.querySelector(".warehouse-data .time .value span");

let connectionMQ2;
let connectionDHT22;

function timeout() {
setTimeout(() => {
getMq2();
getDht22();
getConnection();
let date = new Date();
timeValue.innerHTML = ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()};
timeout();
}, 1000);
}

function getMq2() {
fetch(
"https://ny3.blynk.cloud/external/api/get?token=U-nfUdhCpO9A5VhMmw7c6nULbVJWnFvM&dataStreamId=6"
).then((response) => {
response.json().then((data) => {
mq2Value.innerHTML = data;
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