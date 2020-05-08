const auth = require('server/methods/auth');
const WebContent = require('server/methods/website-content');

export default ({ query }, res) => {
  const nextUrl = `${query.domain}/TREM?tr.emgmt=em_event_website&mfc_pref=T&fr_id=${query.frId}`
  return Promise.resolve()
    .then(() => auth(query, nextUrl))
    .then(({ auth, page, error }) => auth ?
        WebContent(query, page)
          .then(response => response.error ? Promise.reject(response) : response)
      :
        Promise.reject(error ? error : 'An unexpected error occured, please try again later')
    )
    .then(result => res.json({ data: { ...result }}))
    .catch(error => res.json({ data: { ...error }}))
}

