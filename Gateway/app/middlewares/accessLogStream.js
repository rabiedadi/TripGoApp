const fs = require('fs');
const path = require('path');
const countLinesInFile = require('count-lines-in-file');

// create a write stream (in append mode)
let i = 1;
let accessLogStream;
let targetFilePath = path.join('app/var/log', `access.log_${i}`);
// first access log
if(!fs.existsSync(targetFilePath)){
    accessLogStream = fs.createWriteStream(targetFilePath, { flags: 'a' })
} else {
    while (fs.existsSync(targetFilePath)){
        i++;
        targetFilePath = path.join('app/var/log', `access.log_${i}`);
    }
    i--;
    targetFilePath = path.join('app/var/log', `access.log_${i}`);
}

accessLogStream =  fs.createWriteStream(targetFilePath, { flags: 'a' });

countLinesInFile(targetFilePath, (err, numberOfLines) => {
    if(numberOfLines >= 200){
        i++;
        targetFilePath = path.join('app/var/log', `access.log_${i}`);
        fs.createWriteStream(targetFilePath, { flags: 'a' });
    }
});
module.exports = accessLogStream;
