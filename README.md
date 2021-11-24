# Quick Web Framework based on Node.js

Welcome to Quick Web Platform, the goal of this project is accelerate the development process for developers.

## Introduction

As a developer, commonly you have to consider about very basic things like web engine, database connection, object relational mapping, sometimes about the features like user management, security and configuration management. But in most of the cases, we just need the same feature in defferent applications. So this project is trying to save your time on these domains.

Currently we integrated below components, it will hide a lot of detail things. You just need to setup the configuration, then the application will ready for you.

- Web Engine: \[ Express \]
- ORM Framework: \[ Sequelize \]
- Middlewares
    - Authenticator: \[ oidc-client | saml | ibm_appid | openidconnect \]
    - View Engine: \[ EJS | Pug | React \]
    - Static Resources
    - Session Persistence: \[ Redis | MongoDB | Cloudant | MySQL \]

## Installation

Install with CLI mode:

```shell
npm install @iopanda/quick-web-framework -g
```

Install with package mode:

```shell
npm install @iopanda/quick-web-framework --save
```

## Create your first application

If you install with CLI mode, then you can use the command 'wapp' to create your project:

```shell
wapp create myapp
```

There will be a prompt to guide you setup your project:

```shell
(nodejs) ➜  temp wapp create myapp

? Choose your plugins ›
Instructions:
    ↑/↓: Highlight option
    ←/→/[space]: Toggle selection
    a: Toggle all
    enter/return: Complete answer
◯   Framework::Middleware::Authenticator
◯   Framework::Middleware::StaticResources
◯   Framework::Middleware::ViewEngine
◯   Framework::Middleware::ExpressRouter
◯   Framework::database::ORMFramework
```

Now you can only select to use plugin **StaticResources**, this plugin will post your folder as static resources.

Now you got a folder with structures as below:

```shell
> ls -al

drwxr-xr-x   9 sunxiaoyu  staff  288 Oct 11 18:18 .
drwxr-xr-x  11 sunxiaoyu  staff  352 Oct 11 18:18 ..
-rw-r--r--   1 sunxiaoyu  staff   66 Oct 11 18:18 .env
-rw-r--r--   1 sunxiaoyu  staff   54 Oct 11 18:18 .gitignore
-rw-r--r--   1 sunxiaoyu  staff  207 Oct 11 18:18 application.yaml
-rw-r--r--   1 sunxiaoyu  staff  110 Oct 11 18:18 index.js
-rw-r--r--   1 sunxiaoyu  staff  269 Oct 11 18:18 package.json
drwxr-xr-x   3 sunxiaoyu  staff   96 Oct 11 18:18 protected
drwxr-xr-x   3 sunxiaoyu  staff   96 Oct 11 18:18 public
```

Here's the description for each file:

```shell
.env
# this file is used by your local to setup environment variables for runtime. We suggest only use this file in DEV mode.

.gitignore
# ignore some useless file for git.

application.yaml
# the mainly configuration file of your application.

index.js
# if you are making a plugin, this file is the entry to setup your plugin.

package.json
# nodejs package file

public/
private/
# sample folder created for plugin staticResources
```

In above files, the most important file is **application.yaml**. In this file, it contains all of configuration of plugins. Now open the file and you will see as below:

```yaml
application:
  name: myapp
  staticResources:
    - path: public
      location: /pages/public
    - path: protected
      location: /pages/protected

  plugins:
    - framework::middleware::staticResources
```

The root node must named with *application*, there're 3 subnodes under application:
- **name**: Name of the application
- **plugins**: Plugin list, the application will init the plugin by the sequence.
- **staticResources**: Plugin configuration. The structure is depended on the rule by different plugins.

There's only one plugin **staticResources** be added, this plugin will publish folders as static resources.

By default, there're 2 object for this plugin. The path is your local folder path, and the location is the URL which the folder will be published.

Before your start yoru application, you have to use NPM to install required packages:

```shell
> cd myapp
> npm install
```

After the installation, now everything's ready! You can use below command to run your application:

```shell
> npm start

> myapp@0.0.1 start /Users/sunxiaoyu/Documents/temp/myapp
> wapp start

[framework::staticResources] Mounted /myapp/pages/public -> /Users/sunxiaoyu/Documents/temp/myapp/public
[framework::staticResources] Mounted /myapp/pages/protected -> /Users/sunxiaoyu/Documents/temp/myapp/protected
plugin staticResources has configured
```

Check the console information, you can see your folder has been published to */myapp/pages/public* and */myapp/pages/public*, now you can visit your application by below link:

public: [http://localhost:3001/myapp/pages/public]()

protected: [http://localhost:3001/myapp/pages/protected]()

## Have a nice journey!