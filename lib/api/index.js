import axios from 'axios'
import { stringify } from 'qs'

export const secureClient = axios.create({
  baseURL: 'https://fundraising.qa.stjude.org/site',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

export const emcClient = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept-Language': 'en-US,en;q=0.9,la;q=0.8'
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

  //const xhr = new XMLHttpRequest();
  //xhr.open('POST', url);
  //xhr.setRequestHeader('Accept', 'text/javascript, text/html, application/xml, text/xml, */*');
  //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
  //xhr.setRequestHeader('Accept-Language', 'en-US,en;q=0.9,la;q=0.8');
  /*xhr.onreadystatechange = function () {
    console.log(xhr)
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      return xhr
    }
  };*/
  // xhr.send(requestData);
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
      console.log(response)
      return response
    })
    .catch(error => Promise.reject(error))
}

