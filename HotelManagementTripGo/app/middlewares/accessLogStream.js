const fs = require('fs');
const path = require('path');
const countLinesInFile = require('count-lines-in-file');
const mkdirp = require('mkdirp');

// create a write stream (in append mode)
var i = 1;
var accessLogStream;
if(!fs.existsSync('app/var/log')){
    mkdirp.sync('app/var/log');
}

var targetFilePath = path.join('app/var/log', `access.log_${i}`);
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



