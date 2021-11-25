#!/usr/bin/env node
const constants = require('../src/constants');
const path = require('path');
let ejs = require('ejs');
const fs = require('fs-extra');
const prompts = require('prompts');

const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');

const QUESTIONS = [
    {
        type: "text",
        name: "name",
        message: "Project name"
    },
    {
        type: "multiselect",
        name: "plugins",
        message: "Choose your plugins",
        choices: [
            { title: 'Framework::Middleware::Authenticator', value: "framework::middleware::authenticator" },
            { title: 'Framework::Middleware::StaticResources', value: "framework::middleware::staticResources" },
            { title: 'Framework::Middleware::ViewEngine', value: "framework::middleware::viewEngine" },
            { title: 'Framework::Middleware::ExpressRouter', value: "framework::middleware::expressRouters" },
            // { title: 'Framework::Middleware::SessionManagement', value: "framework::middleware::session" },
            { title: 'Framework::Module::Sequelize', value: "framework::module::sequelize" },
            // { title: 'Framework::sdk::Email', value: "framework::sdk::email" }
        ]
    }
]
program
    .command('init')
    .description('Init current folder with project structure')
    .action(() => {
        console.log("init")
    })

program
    .command('create <project_name>')
    .description('create project')
    .action(async (project_name) => {
        const answer = await prompts(QUESTIONS.slice(1));
        const PARAM = {
            name: project_name,
            plugins: answer.plugins
        }
        const TARGET_ROOT = path.join(constants.PROJECT_ROOT_DIR, project_name);
        const SOURCE_ROOT = path.join(constants.FRAMEWORK_ROOT_DIR, '..','bin', 'template');
        fs.ensureDirSync(TARGET_ROOT);
        // package.json
        var packageJson = await ejs.renderFile(path.join(SOURCE_ROOT, 'package.json'), PARAM)
        fs.writeFileSync(path.join(TARGET_ROOT, 'package.json'), packageJson)

        // index.js, gitignore
        fs.copySync(path.join(SOURCE_ROOT, 'index.js'), path.join(TARGET_ROOT, 'index.js'))
        fs.copySync(path.join(SOURCE_ROOT, 'gitignore'), path.join(TARGET_ROOT, '.gitignore'))

        // application.yaml
        var appYaml = await ejs.renderFile(path.join(SOURCE_ROOT, 'application.yaml'), PARAM)
        fs.writeFileSync(path.join(TARGET_ROOT, 'application.yaml'), appYaml)

        // env file
        var dotEnv = await ejs.renderFile(path.join(SOURCE_ROOT, '.env'), PARAM)
        fs.writeFileSync(path.join(TARGET_ROOT, '.env'), dotEnv)

        if(answer.plugins.indexOf('framework::middleware::staticResources') != -1){
            fs.copySync(path.join(SOURCE_ROOT, 'public'), path.join(TARGET_ROOT, 'public'))
            fs.copySync(path.join(SOURCE_ROOT, 'protected'), path.join(TARGET_ROOT, 'protected'))
        }

        console.log("Project created at " + TARGET_ROOT)
    })

program
    .command('start')
    .description('start server')
    .action(() => {
        const wapp = require('../index');
        const server = wapp.server;
        server.start();
    })

program.parse(process.argv);
