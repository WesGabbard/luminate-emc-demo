const puppeteer = require('puppeteer')

const Eventprops = async ({ content, targetField }, page) => {
  try {
    const input = `input[name="${targetField}"]`

    await page.waitForSelector(input, { timeout: 1000 })
      .then(() => true)
      .catch(() => false)

    await page.$eval(input, (el, val) => el.value = val, content)

    await page.waitForSelector('#pstep_save-button', { timeout: 1000 })
      .then(() => page.click('#pstep_save-button'))
      .catch(() => false)

    return {
      targetField,
      content
    }
  } catch {
    return {
      error: {
        targetField,
        content,
        message: 'Field is not available to edit'
      }
    }
  }
  await browser.close()
}

module.exports = Eventprops;
