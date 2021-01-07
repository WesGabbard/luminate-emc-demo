import axios from 'axios'
import { stringify } from 'qs'

export const secureClient = axios.create({
  baseURL: 'https://fundraising.qa.stjude.org/site',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

export const defaultParams = {
  v: '1.0',
  response_format: 'json',
  suppress_response_codes: true,
  api_key: 'alsacdev'
}

export const getAuthToken = () => {
  const params = {
    method: 'getLoginUrl',
    withCredentials: true,
    ...defaultParams
  }
  return Promise.resolve()
    .then(() =>
      secureClient({
        method: 'get',
        url: `CRConsAPI?${stringify({ ...params })}`
      })
    )
    .then(({ data: { getLoginUrlResponse } }) => getLoginUrlResponse)
    .catch(error => Promise.reject(error))
}

export const logout = ({ JSESSIONID, routing_id, token }) => {
  const params = {
    method: 'login',
    auth: token,
    JSESSIONID,
    logout,
    ...defaultParams
  }
  return Promise.resolve()
    .then(() =>
      secureClient({
        method: 'post',
        url: `CRConsAPI;jsessionid=${routing_id}?${stringify({ ...params })}`
      })
    )
    .then(response => response)
    .catch(error => Promise.reject(error))
}

export const login = (
  { JSESSIONID, routing_id, token },
  { user_name, password }
) => {
  const params = {
    method: 'login',
    auth: token,
    user_name,
    password,
    JSESSIONID,
    logout,
    ...defaultParams
  }
  return Promise.resolve()
    .then(() =>
      secureClient({
        method: 'post',
        url: `CRConsAPI;jsessionid=${routing_id}?${stringify({ ...params })}`
      })
    )
    .then(response => response)
    .catch(error => Promise.reject(error))
}

export const getContent = (
  { JSESSIONID, routing_id, token },
  content
) => {
  const params = {
    method: 'getTagInfo',
    auth: token,
    content,
    JSESSIONID,
    ...defaultParams
  }
  return Promise.resolve()
    .then(() =>
      secureClient({
        method: 'post',
        url: `CRContentAPI;jsessionid=${routing_id}?${stringify({ ...params })}`
      })
    )
    .then(({ data: { getTagInfoResponse } }) => getTagInfoResponse)
    .catch(error => Promise.reject(error))
}

export const updateContent = data => {
  const url = 'https://fundraising.qa.stjude.org/site/TRPreview/Walk/Walk?fr_id=24014&pg=entry'
  const requestData = `Gfr_htmltextareauic_html_editor=TRUE&ajax_component=C%3Aajax-custompage-edit-component%3Aedit_fr_html_container&edit_fr_html_containersubmit=true&Gfr_htmltextarea=${encodeURIComponent(data.content)}`

  return Promise.resolve()
    .then(() =>
      axios.post(url, requestData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Accept': 'text/javascript, text/html, application/xml, text/xml, */*',
          'X-Requested-With': 'XMLHttpRequest',
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Accept-Language': 'en-US,en;q=0.9,la;q=0.8'
        }
      })
    )
    .then(response => {
      if (response.data.indexOf('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">') !== -1) {
        throw Error('You do not have permissions to make this update')
      }
      return response
    })
    .catch(error => Promise.reject(error))
}

