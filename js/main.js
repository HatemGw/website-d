//indexedDB


//main varibales
let mq2Value = document.querySelector(".warehouse-data .mq-2 .value span");
let dht22Value = document.querySelector(".warehouse-data .dht22 .value span");
let timeValue = document.querySelector(".warehouse-data .time .value span");

let i = 0;
let date = new Date();
function timeout() {
  setTimeout(()=> {
    getMq2();
    getDht22();
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
      //time info


      //appending to main container
      //delete

      
    });
  });

}

function getWeather(){
  fetch('https://api.openweathermap.org/data/3.0/onecall?lat=32.36&lon=15.07exclude=alerts,daily,hourly,minutely&appid=f86085de609fb88c1602104f3fbc0d1b'
  ).then((response)=>{
    response.json().then((data) =>{

    })
  })
}

timeout();