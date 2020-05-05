#IoT-db

#usage

```
js
const  setupDatabase = require('iot-db');
setupDatabase(config).then(db => {
  const {Agent, Metric} = db;
}).catch(err => console.err(err));
```