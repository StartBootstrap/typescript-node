import chalk from 'chalk';
import childProcess from 'child_process';
import chokidar from 'chokidar';
import _ from 'lodash';
import sh from 'shelljs';
import upath from 'upath';

import config from '#lib/config';

let READY = false;
let TS_ERRORS = false;
let COMPILING = false;

process.title = 'node-ts-watch';
console.log(chalk.blue('### INFO: Starting Development Server'));

let serverProcess: childProcess.ChildProcess | undefined;

const result = sh.exec(`npm run build`);
if (result.code !== 0) {
    TS_ERRORS = true;
}

const watcher = chokidar.watch('src', {
    persistent: true,
});

watcher.on('add', filePath => _processFile(upath.normalize(filePath), 'add'));
watcher.on('change', filePath => _processFile(upath.normalize(filePath), 'change'));
watcher.on('ready', () => {
    READY = true;
    _startServer();
});

const debounced = _.debounce(filePath => _typescriptChanged(filePath), 1000);

function _processFile(filePath: string, watchEvent: 'add' | 'change') {
    if (!READY) {
        return;
    }
    if (filePath.match(/\.ts$/)) {
        debounced(filePath);
    }
}

async function _typescriptChanged(filePath: string) {
    console.log(chalk.blue(`### INFO: File changed: ${filePath}`));
    await _killCompileRestart();
}

async function _killCompileRestart() {
    if (COMPILING) {
        console.log(chalk.magenta(`### INFO: Currently Compiling, not triggering another`));
        return;
    }
    COMPILING = true;
    if (serverProcess) {
        console.log(chalk.blue(`### INFO: Killing running node process`));

        serverProcess.kill();
        serverProcess = undefined;
    }
    console.log(chalk.blue(`### INFO: Re-compiling`));
    await _compileTSAsync();

    COMPILING = false;
    _startServer();
}

async function _compileTSAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
        const compileTSProcess = sh.exec(`npm run build:dev`, { async: true, silent: true });
        compileTSProcess.stdout?.on('data', data => {
            process.stdout.write(data);
        });
        compileTSProcess.stderr?.on('data', data => {
            process.stdout.write(chalk.red(data));
        });
        compileTSProcess.on('close', code => {
            if (code !== 0) {
                TS_ERRORS = true;
            } else {
                TS_ERRORS = false;
            }
            resolve();
        });
        compileTSProcess.on('error', error => {
            console.error(error);
            TS_ERRORS = true;
            reject();
        });
    });
}

function _startServer() {
    if (TS_ERRORS) {
        console.log(chalk.red(`\n### INFO: Not starting server since there are TS errors\n`));
        return;
    }
    serverProcess = childProcess.spawn(
        './scripts/env.sh && node --es-module-specifier-resolution=node dist/index.js',
        {
            shell: true,
        }
    );
    serverProcess.stdout?.on('data', function (data) {
        process.stdout.write(data);
    });
    serverProcess.stderr?.on('data', function (data) {
        process.stdout.write(chalk.red(data));
    });
    serverProcess.on('exit', () => {
        console.log(chalk.red(`\n### INFO: Child Process Exited. Killing Server\n`));
        sh.exec(`set -x && kill -kill $(pgrep ${config().processTitle})`);
    });
}
