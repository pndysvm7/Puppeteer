const fs = require('fs')
const puppeteer = require('puppeteer')

const waitOnPage = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

const runBrowser = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false
  })

  const page = await browser.newPage()

  await page.goto(url)
  // wait 5 seconds when url is visited
  waitOnPage(5000)

  await page.close()

  // wait for 2 seconds then close the browser
  await waitOnPage(2000)
  await browser.close()
}

runBrowser('https://www.youtube.com/watch?v=Kyx2PsuwomE')
