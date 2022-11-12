const fs = require('fs')
const puppeteer = require('puppeteer')

const runBrowser = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false
  })

  const page = await browser.newPage()

  try {
    await page.setRequestInterception(true)
  } catch (err) {
    console.log('page.setRequestInterception not woeking in this version of puppeteer')
  }

  page.on('request', async (request, response) => {
    const url = request.url()

    if (url === 'https://www.youtube.com/watch?v=Kyx2PsuwomE') {
      request.respond({
        status: 200,
        contentType:'text/html; charset=utf-8',
        referrerPolicy: '*',
        body: `<html><body>Hello this page has been mocked</body></html>`
      })
    } else {
      request.continue()
    }
  })

  await page.goto(url)

  const html = await page.content()
  if (html.includes('Hello this page has been mocked')) {
    console.log(' request mock worked')
  } else {
    console.log('request mock did not work')
  }

  console.log(html)

  await page.close()
  await browser.close()
}

runBrowser('https://www.youtube.com/watch?v=Kyx2PsuwomE')
