// --file=PATH_TO_FILE_RELATIVE --id=ID --colorA=COLOR --colorB=COLOR
// node sassCompiler.js --file=scss/style.scss --id=1 --colorA=colorAAA --colorB=colorBBB

var fs = require('fs');
var argv = require('optimist').argv;
var sass = require('node-sass');
var path = require('path');

var filePathIn = path.join(__dirname, argv.file);
var filePathOut = path.join(__dirname, 'css/' + argv.id + '.css');
var fileDataBUff = fs.readFileSync(filePathIn);
var colorStr = '$colorA:' + argv.colorA + ';\n' + '$colorB:' + argv.colorB + ';\n';
var compiledResult = sass.renderSync({data: colorStr + fileDataBUff.toString()});

fs.writeFile(filePathOut, compiledResult.css, function (err) {
    if (err) {
        console.error(err);
    }
});
