const puppeteer = require('puppeteer')

const Login = async ({ username, password, url }) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  console.log(page.url(), username, password)
  await page.click('#USERNAME');
  await page.keyboard.type(username);
  await page.click('#Password');
  await page.keyboard.type(password);
  await page.click('#login');
  console.log('click login')
  // await page.waitForNavigation()

  await page.goto('http://stj2dev.convio.net/site/TREM?tr.emgmt=em_event_center&fr_id=24014')
  console.log('in emc dashboard')
  await page.goto('https://fundraising.qa.stjude.org/site/TREM?tr.emgmt=em_edit_event_properties&mfc_pref=T&fr_id=24014')

  console.log('New Page URL:', page.url());


  return page.waitForSelector('input[name="shared_event_propsprop_sponsor_4.field"]')
    .then(() => {
      console.log('found it');
      page.focus('input[name="shared_event_propsprop_sponsor_4.field"]')
      console.log('focus')
      page.keyboard.type('Adding some new content');
      console.log('type')
    })
    .then(() => {
      return page.waitForSelector('#pstep_save-button')
        .then(() => {
          console.log('found btn');
          page.click('#pstep_save-button')
          console.log('save btn')
          return 'success'
        })
    })
    .then(() => 'success')
    .catch(() => 'error')



  //await page.focus('input[name=shared_event_propsprop_sponsor_4.field]')
  //console.log('focus')
  //await page.keyboard.type('Adding some new content');
  //await page.click('#pstep_save-button')
  //console.log('click submit')

  /*

  await page.click('#em_event_website')
  console.log('where are we now:', page.url());
  await page.click('.ManageLink .btn');
  console.log('click btn')
  await page.click('#eventmgr_website_pane #eventmgr_website_preview #tinymce')
  console.log('click content')
  await page.keyboard.type('Adding some new content');
  await page.click('#formedit_fr_html_container input[type="submit"]')

  */
  //return page.url()
  await browser.close()
}

module.exports = Login;
