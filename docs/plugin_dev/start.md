# Plugin Development

## Introduction

A plugin is a set of feature which contains **UI**, **APIs**, **business logics** and **data models**. It is used by *application developer* to provide features for their application.

In this guide, we will create a plugin by together!

## Preconditions

Quick Web Framework is required by plugin. So you need to install the framework before you start below steps.

```shell
> npm install @iopanda/quick-web-base -g
```

## Create plugin project

The first step we have to do is create the project sturcture for your plugin. It is quite simple because the sturcture of plugin is exact same with an application. So you can use *wapp* command to create your project:

```shell
(nodejs) ➜  temp wapp create my-plugin
? Choose your plugins ›
Instructions:
    ↑/↓: Highlight option
    ←/→/[space]: Toggle selection
    a: Toggle all
    enter/return: Complete answer
◯   Framework::Middleware::Authenticator
◉   Framework::Middleware::StaticResources
◯   Framework::Middleware::ViewEngine
◉   Framework::Middleware::ExpressRouter
◯   Framework::database::ORMFramework
```

Choose your plugins which depended by your own plugin, and press *enter*.

```shell
(nodejs) ➜  my-plugin ls -al
total 40
drwxr-xr-x   9 user  staff  288 Oct 19 16:18 .
drwxr-xr-x  17 user  staff  544 Oct 19 16:18 ..
-rw-r--r--   1 user  staff  418 Oct 19 16:18 .env
-rw-r--r--   1 user  staff   54 Oct 19 16:18 .gitignore
-rw-r--r--   1 user  staff  447 Oct 19 16:18 application.yaml
-rw-r--r--   1 user  staff  110 Oct 19 16:18 index.js
-rw-r--r--   1 user  staff  273 Oct 19 16:18 package.json
drwxr-xr-x   3 user  staff   96 Oct 19 16:18 protected
drwxr-xr-x   3 user  staff   96 Oct 19 16:18 public
```

Now your project has been created.

## Develop business flow

Now you can use the project to develop features whatever you want. In this demo, we will guide you to create a static page and an API, then package them into a plugin.

## Develop static files

Create forder and your static file with below commands:

```shell
(nodejs) ➜  my-plugin mkdir static
(nodejs) ➜  my-plugin cd static
(nodejs) ➜  static touch index.html
```

Now paste below content into **index.html** which you just created:

```html
<html>
    <body>
        <h1>Hello world</h1>
    </body>
</html>
```

## Create Data Models


## Create APIs

Create forder and routes with below commands:

```shell
(nodejs) ➜  my-plugin mkdir routes
(nodejs) ➜  my-plugin cd routes
(nodejs) ➜  static touch user.js
```

Paste below content into **user.js** you created:

```javascript

```
