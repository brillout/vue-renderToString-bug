import { renderToString } from '@vue/server-renderer'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { createApp } from './app'

export { render }
export { passToClient }

// See https://vite-plugin-ssr.com/data-fetching
const passToClient = ['pageProps']

async function render(pageContext) {
  const app = createApp(pageContext)
  let appHtml
  let err
  app.config.errorHandler = (err_) => {
    err = err_
  }
  try {
    appHtml = await renderToString(app)
    console.log('renderToString() success')
    console.log('appHtml', appHtml)
  } catch(err) {
    console.log('renderToString() error')
    throw err
  }
  if(err) {
    console.log('app.config.errorHandler() error')
    throw err
  }

  return escapeInject`<!DOCTYPE html>
    <html>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`
}
