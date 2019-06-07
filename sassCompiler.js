var fs = require('fs');
// --file=PATH_TO_FILE_RELATIVE --id=ID --colorA=COLOR --colorB=COLOR
// node sassCompiler.js --file=scss/style.scss --id=1 --colorA=colorAAA --colorB=colorBBB
var argv = require('optimist').argv;
var sass = require('node-sass');
var path = require('path');

var filePathIn = path.join(__dirname, argv.file);
var filePathOut = path.join(__dirname, 'css/' + argv.id + '.css');
var fileDataBUff = fs.readFileSync(filePathIn);
var colorStr = '$colorA:' + argv.colorA + ';\n' + '$colorB:' + argv.colorB + ';\n';
var colorBuff = Buffer.from(colorStr);
var scssString = Buffer.concat([colorBuff, fileDataBUff]).toString();
var compiledResult = sass.renderSync({data: scssString});

fs.writeFile(filePathOut, compiledResult.css, function (err) {
    console.error(err);
});
