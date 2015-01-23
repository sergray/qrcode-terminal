#!/usr/bin/env node

/*!
 * Module dependencies.
 */

var qrcode = require('../lib/main'),
    path = require('path'),
    fs = require('fs');

/*!
 * Parse the process name and input
 */

var name = process.argv[1].replace(/^.*[\\\/]/, '').replace('.js', ''),
    input = process.argv[2];

/*!
 * Display help
 */

if (!input || input === '-h' || input === '--help') {
    help();
    process.exit();
}

/*!
 * Display version
 */

if (input === '-v' || input === '--version') {
    version();
    process.exit();
}

/*!
 * Read from stdin
 */
if (input === '-') {
    process.stdin.resume();
    var response = fs.readSync(process.stdin.fd, 2048, null, "utf8");
    process.stdin.pause();
    input = response[0];
}

/*!
 * Render the QR Code
 */

qrcode.generate(input);

/*!
 * Helper functions
 */

function help() {
    console.log([
        '',
        'Usage: ' + name + ' <message>',
        '',
        'Options:',
        '  -h, --help           output usage information',
        '  -v, --version        output version number',
        '  -                    read from stdin',
        '',
        'Examples:',
        '',
        '  $ ' + name + ' hello',
        '  $ ' + name + ' "hello world"',
        ''
    ].join('\n'));
}

function version() {
    var packagePath = path.join(__dirname, '..', 'package.json'),
        packageJSON = JSON.parse(fs.readFileSync(packagePath), 'utf8');

    console.log(packageJSON.version);
}
