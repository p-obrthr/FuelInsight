const spawner = require('child_process').spawn;

const data_to_pass_in = {
    text_send: 'sent to python script',
    numers_send: [1,2,3,4,5],
    text_returned: undefined
}

console.log('data send to python script:', data_to_pass_in);

const python_process = spawner('python', ['./python.py', JSON.stringify(data_to_pass_in)]);


python_process.stdout.on('data', (data: JSON) => {
    console.log('data received from python script: ', JSON.parse(data.toString()));
});