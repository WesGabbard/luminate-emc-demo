const puppeteer = require('puppeteer')
import { sendError } from '../lib/json'

const Auth = async ({ username, password, domain }, nextUrl) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  try {
    await page.goto(`${domain}/UserLogin`)
    await page.$eval('#USERNAME', (el, val) => el.value = val, username)
    await page.$eval('#Password', (el, val) => el.value = val, password)

    await page.click('#login')
    await page.goto(nextUrl)

    if (nextUrl === page.url()) {
      console.log('we have auth')
      return {
        auth: true,
        page
      }
    } else {
      throw new Error(`Login failed - redirected to ${page.url()}`)
    }
  } catch (error) {
    browser.close()
    return sendError(error.message, { target: 'login' })
  }
}

module.exports = Auth;
