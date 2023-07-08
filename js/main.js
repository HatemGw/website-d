let connectionValue = document.querySelector(".warehouse-data .connection .value span");
let mq2Value = document.querySelector(".warehouse-data .mq-2 .value span");
let dht22Value = document.querySelector(".warehouse-data .dht22 .value span");
let timeValue = document.querySelector(".warehouse-data .time .value span");
let status = document.getElementById("status");
let DangeLocation = document.querySelector('.location-1 > span');
let tempValue = document.querySelector('.warehouses .warehouse-data .weather .value > span');
//data for temperature api
const apiKey = 'f86085de609fb88c1602104f3fbc0d1b';
const city = 'Misratah, LY';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


let connectionMQ2 = 0;
let connectionDHT22 = 0;

function timeout() {
  setTimeout(() => {
    getMq2();
    getDht22();
    getTemp();
    getConnection();
    getStatus();
    changeCircle();

    let date = new Date();
    timeValue.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    timeout();
  }, 1000);
}

//show the last status of site
function getStatus() {
  if(connectionValue.innerHTML == 'offline'){
    status.innerHTML='Dangerous';
  }
  else{

    const text = status.textContent;
    const words = text.split(' ');
  
    const lastWord = words[words.length - 1];
    status.innerHTML = lastWord;
  }
}

//get MQ-2 data from blynk cloud
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

//get DHT22 data from blynk cloud
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

function getTemp(){
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // Print the current temperature in Kelvin
    tempValue.innerHTML = (data.main.temp - 273.15).toFixed(1)+ '°C';
  });
}
//show if the location is online or not
function getConnection() {
  if (connectionMQ2 == 0 && connectionDHT22 == 0) {
    connectionValue.innerHTML = "offline";
  } else {
    connectionValue.innerHTML = "online";
  }
}


//change location of site if safe=> green || if dangerous status => red;
function changeCircle(){
  if(status.innerHTML = 'Dangerous'){
    DangeLocation.style.animationName = 'dange';
  }
  else{
    DangeLocation.style.animationName = 'safe';
  }
}

timeout();
