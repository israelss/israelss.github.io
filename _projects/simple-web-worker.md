---
layout: project
title: Simple Web Worker
categories: highlight
# project_repo: used by utterances comments
project_repo: israelss/simple-web-worker
# featured_on: Shows articles where this project featured on
# usage: <Name to display 1>|<URL 1> <Name to display 2>|<URL 2> ... <Name to display n>|<URL n>
# always separated by spaces
# example: Blog|israelss.github.io/blog
featured_on: DigitalOcean|https://www.digitalocean.com/community/tutorials/vuejs-vue-workers
---

> An utility to simplify the use of web workers

See full README, with examples, [here](https://github.com/israelss/simple-web-worker/){: class="external-link" target="_blank"}.

## Why

Create and use [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) can be cumbersome sometimes. This plugin aims to facilitate the use of Web Workers.

## How to install and use

```bash
yarn add simple-web-worker

// or

npm install simple-web-worker --save
```

Then:

```javascript
import SWorker from "simple-web-worker";
```

Obviously, you don't have to call it `SWorker`. You are free to use the name you want!

## API

###### SWorker.run(_func, [args]?_)

> Where:
> - _func_ is the function to be runned in worker
> - _[args]_ is an optional array of arguments that will be used by _func_

> This method creates a disposable web worker, runs and returns the result of given function and closes the worker.
{: class="info"}

This method works like <code>Promise.resolve()</code>, but in another thread.

##### SWorker.create(_[actions]?_)

> Where:
> - _[actions]_ is an optional array of objects with two fields, `message` and `func`. Essentially, it is a messages-actions map.

> If _[actions]_ is omitted or `undefined`, the created **<worker\>** will have no registered actions, so you'll have to use the method `register` before you can use the **<worker\>**.
{: class="info"}

If you plan to reuse a **<worker\>**, you should use this method. It creates a reusable **<worker\>** (not a real Web Worker, more on this ahead) with determined actions to be runned through its `postMessage()` or `postAll()` methods.

##### <worker\>.postMessage(_message, [args]?_)

> Where:
> - **<worker\>** is a worker created with `SWorker.create([actions])`
> - _message_ is one of the messages in _[actions]_
> - _[args]_ is an optional array of arguments that will be used by the function registered with _message_

> When the function does not expect any arguments or the expected arguments have default values, _[args]_ can be omitted safely.
{: class="info"}

When the expected arguments do not have default values, _[args]_ should be provided.

This method works like <code>Promise.resolve()</code>, but in another thread.

##### <worker\>.postAll(_[message1,... || {message: message1, args: [args1]},... || [args1],...]?_)

> Where:
> - **<worker\>** is a worker created with `SWorker.create([actions])`
> - The argument is an optional array which accepts one of the following:
>   - _message1,..._ - strings containing one or more of the messages in _[actions]_
>   - _{message: message1, args: [args1]},..._ - objects containing two fields, `message` (a message from _actions_) and `args` (the arguments to be used by the correspondent function)
>   - _[args1],..._ - arrays of arguments to be used by the registered actions.

> If _[message1,...]_ is `undefined` or no argument is given, **<worker\>** will run all registered actions without arguments.
{: class="info"}

If _[{message: message1, args: [args1]},...]_ or _[[args1],...]_ is used, you should use `[]` (an empty array) as _[args]_ for the functions that does not expect arguments, or if the respective argument of your function has a default value and you want it to be used. If you use `[null]` this will be the value assumed by function argument.

When using _[[args1],...]_, you MUST input the same number of arguments as registered actions, even if some action doesn't accept any arguments! In that case use a `[]`, as stated above. See examples below.

If _[{message: message1, args: [args1]},...]_ is used, every object must contain the fields `message` and `args`.

This method works like Promise.all(), but in another thread.

##### <worker\>.register(_action_ || _[actions]_)

> Where:
> - **<worker\>** is a worker created with `SWorker.create([actions])`
> - _action_ is an object with two fields, `message` and `func`
> - _[actions]_ is an array of objects, and each object is an _action_, as defined above

> You can use _action_ or _[actions]_, but not both at the same time.
{: class="info"}

##### <worker\>.unregister(_message_ || _[messages]_)

> Where:
> - **<worker\>** is a worker created with `SWorker.create([actions])`
> - _message_ is one of the messages in _[actions]_
> - _[messages]_ is an array containing one or more messages, and each message is a _message_, as defined above

> You can use _message_ or _[messages]_, but not both at the same time.
{: class="info"}

## Closing workers?

You may be thinking: "How do I terminate those reusable workers if there's no `close()` or `terminate()` methods?"

Well, when you create a reusable worker, you don't receive a real Web Worker.

Instead, you get an object which holds the given messages-actions map, and when you call `postMessage()` or `postAll()` it will, under the hood, call `run()` with the correspondent functions.

So, to "terminate" a "worker" when it is not needed anymore, you can just do:

```javascript
worker = null; // after create and use the worker
```
