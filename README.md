# Vue notifications plugin

### Usage

Install in your VueJS project:

```bash
npm i -s tb-vue-notifications
```

Import in __main.js__ and install:

```javascript
import NotificationPlugin from 'tb-vue-notifications'

Vue.use(NotificationPlugin)
```

A global _notifications-root_ tag will be added.<br>
Use it in any (one) component - most likely in the root, but does not really matter:

```html
<template>
  <div id="root">
    <app-root></app-root>
    <notifications-root></notifications-root>
  </div>
</template>
```

<hr>



And you are good to go!

Create a notification<br>
In your templates...
```html
<!-- Will create one with green background (bootstrap bg-success) -->
<button @click="$report('Saved!')">Report some success</div>

<!-- Will create one with grey background (bootstrap bg-secondary) -->
<button @click="$note('Logout complete')">Note some information</div>

<!-- Will create one with red background (bootstrap bg-danger) -->
<button @click="$warn('Your session will expire!')">Warn the user</div>
```

...or in your code
```js
methods: {
  reportSomeSuccess: function(text) {
    this.$report(text))
  }
}
```
