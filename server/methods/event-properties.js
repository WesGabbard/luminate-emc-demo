const puppeteer = require('puppeteer')
import { sendError, sendSuccess } from '../lib/json'

const Eventprops = async ({ content, target }, page) => {
  try {
    const input = `input[name="${target}"]`

    await page.waitForSelector(input, { timeout: 1000 })
      .catch(() => {
        throw new Error('Requested field does not exists')
      })

    await page.$eval(input, (el, val) => el.value = val, content)
      .catch(error => {
        throw new Error(error ? error.message : 'Not able to update content')
      })

    await page.waitForSelector('#pstep_save-button', { timeout: 1000 })
      .then(() => page.click('#pstep_save-button'))
      .catch(() => {
        throw new Error('Not able to save update')
      })

    return sendSuccess({ content, target })

  } catch (error) {
    return sendError(error.message, { target, content })
  }
  await browser.close()
}

module.exports = Eventprops;
