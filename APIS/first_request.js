const request = require('request');
request('https://jsonplaceholder.typicode.com/users/10', (err, res, body) =>ç {
  if(!err && res.statusCode === 200) {
      const parsedData = JSON.parse(body);
      console.log(`${parsedData.name} lives in ${parsedData.address.city}`);
  }
});

