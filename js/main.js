//indexed database
const dbName = 'warehouse';
const dbVersion = 1;

const request = indexedDB.open(dbName, dbVersion);

request.onerror = (event) => {
  console.log('Database error:', event.target.errorCode);
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const objectStore = db.createObjectStore('warehouseData', { keyPath: 'id', autoIncrement: true });
  objectStore.createIndex('time', 'timeValue');
  objectStore.createIndex('mq2', 'mq2Value');
  objectStore.createIndex('dht22', 'dht22Value');
  objectStore.createIndex('connection', 'connectionValue');
};


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
    timeValue.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    timeout();
  }, 1000);
}
function storeData(timeValue, mq2Value, dht22Value, connectionValue) {
  const request = indexedDB.open(dbName, dbVersion);

  request.onerror = (event) => {
    console.log('Database error:', event.target.errorCode);
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(['warehouseData'], 'readwrite');
    const objectStore = transaction.objectStore('warehouseData');
    const request = objectStore.add({
      timeValue: timeValue,
      mq2Value: mq2Value,
      dht22Value: dht22Value,
      connectionValue: connectionValue
    });
    request.onerror = (event) => {
      console.log('Data store error:', event.target.errorCode);
    };
    transaction.oncomplete = () => {
      console.log('Data stored successfully.');
    };
  };
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
      const date = new Date();
      const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      storeData(time, data, null, null);
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
      const date = new Date();
      const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      storeData(time, null, data, null);
    });
  });
}

function getConnection() {
  if (connectionMQ2 == 0 && connectionDHT22 == 0) {
    connectionValue.innerHTML = "offline";
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    storeData(time, null, null, "offline");
  } else {
    connectionValue.innerHTML = "online";
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    storeData(time, null, null, "online");
  }
}
function displayData() {
  const request = indexedDB.open(dbName, dbVersion);

  request.onerror = (event) => {
    console.log('Database error:', event.target.errorCode);
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(['warehouseData'], 'readonly');
    const objectStore = transaction.objectStore('warehouseData');
    const getAllRequest = objectStore.getAll();
    getAllRequest.onsuccess = (event) => {
      const data = event.target.result;
      console.log(data);
      // Display the data in the HTML document
      data.forEach((item) => {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        const mq2Cell = document.createElement('td');
        const dht22Cell = document.createElement('td');
        const connectionCell = document.createElement('td');
        timeCell.textContent = item.timeValue;
        mq2Cell.textContent = item.mq2Value;
        dht22Cell.textContent = item.dht22Value;
        connectionCell.textContent = item.connectionValue;
        row.appendChild(timeCell);
        row.appendChild(mq2Cell);
        row.appendChild(dht22Cell);
        row.appendChild(connectionCell);
        document.querySelector('.data-table tbody').appendChild(row);
      });
    };
  };
}


timeout();
displayData();
