```bash
git clone git@github.com:brillout/vue-renderToString-bug
cd vue-renderToString-bug/
pnpm install
pnpm run build
pnpm run preview
```

Same as single line (copy-paste me):

```shell
git clone git@github.com:brillout/vue-renderToString-bug && cd vue-renderToString-bug/ && pnpm install && pnpm run build && pnpm run preview
```

Go to [localhost:3000/about](http://localhost:3000/about) and observe the logs.

What happens:

```
renderToString() success
appHtml <div class="layout" data-v-85208665><div class="navigation" data-v-85208665><a class="navitem" href="/" data-v-85208665>Home</a><a class="navitem" href="/about" data-v-85208665>About</a></div><div class="content" data-v-85208665><!--[--><!----><!--]--></div></div>
```

What is expected instead:

```
renderToString() error
```

The `renderToString()` call in [`/renderer/_default.page.server.js#L15`](/renderer/_default.page.server.js#L15) is expected to throw an error because [`/pages/about/index.page.vue#L6`](/pages/about/index.page.vue#L6) throws an error.

Note Vue's `renderToString()` erroneous behavior only happens in production. (You can try `$ pnpm run dev` to see how things behave as expected.)
