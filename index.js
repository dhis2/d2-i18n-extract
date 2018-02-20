#!/usr/bin/env node

var ArgumentParser = require('argparse').ArgumentParser;
var argsParser = new ArgumentParser({
    version: '1.0.0',
    addHelp: true,
    description: 'Extract i18n.t translation strings from dhis2 frontend apps'
})

argsParser.addArgument(
    ['-p', '--path'],
    {
        dest: 'path',
        required: true,
        help: 'directory path to recurse and extract i18n.t translation strings'
    }
)

argsParser.addArgument(
    ['-n', '--namespace'],
    {
        dest: 'namespace',
        required: true,
        help: 'usually your frontend app name, no spaces allowed'
    }
);

var args = argsParser.parseArgs();

var fs = require('fs');
var path = require('path');
var { walk } = require('./helpers');
var i18nParser = require('i18next-scanner').Parser;


try {
    var dirPath = path.normalize(args.path)
    var stat = fs.lstatSync(dirPath)

    if (!stat.isDirectory()) {
        console.log(dirPath, 'is not a directory');
        return;
    }
} catch (e) {
    console.error(dirPath, 'does not exist');
    return;
}


var files = walk(dirPath);
console.log('dirPath');
console.log(dirPath);
console.log('files');
console.log(files.join('\n'));