//indexedDB


//main varibales
let connectionValue = document.querySelector(".warehouse-data .connection .value span");
let mq2Value = document.querySelector(".warehouse-data .mq-2 .value span");
let dht22Value = document.querySelector(".warehouse-data .dht22 .value span");
let timeValue = document.querySelector(".warehouse-data .time .value span");


var conncetionMQ2;
var connecctionDHT22;
let i = 0;
let date = new Date();
function timeout() {
  setTimeout(function () {
    getMq2();
    getDht22();
    getConnection();
    let date = new Date();
    timeValue.innerHTML= `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;


    timeout();
    
  }, 1000);
}



function getMq2() {
  fetch(
    `https://ny3.blynk.cloud/external/api/get?token=U-nfUdhCpO9A5VhMmw7c6nULbVJWnFvM&dataStreamId=6`
  ).then((response) => {
    response.json().then((data) => {
      //create container for data
      //sensor info
      mq2Value.innerHTML = data;
      if(data == 0){
        conncetionMQ2 = 0;
      }
      //time info


      //appending to main container
      //delete

      
    });
  });

}

function getDht22() {
  fetch(
    `https://ny3.blynk.cloud/external/api/get?token=U-nfUdhCpO9A5VhMmw7c6nULbVJWnFvM&dataStreamId=8`
  ).then((response) => {
    response.json().then((data) => {
      //create container for data
      //sensor info
      dht22Value.innerHTML = data;
      if(data == 0){
        connecctionDHT22 = 0;
      }
      //time info


      //appending to main container
      //delete

      
    });
  });

}

//connection
function getConnection(){
  if((conncetionMQ2 ==0)&& (connecctionDHT22 ==0)){
    connectionValue.innerHTML = 'offline';
  }
  else{
    connectionValue.innerHTML ='online';
  }
}

function getWeather(){
  fetch('https://api.openweathermap.org/data/3.0/onecall?lat=32.36&lon=15.07exclude=alerts,daily,hourly,minutely&appid=f86085de609fb88c1602104f3fbc0d1b'
  ).then((response)=>{
    response.json().then((data) =>{

    })
  })
}

timeout();