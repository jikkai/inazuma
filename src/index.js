import 'babel-polyfill'
import Axios from 'axios'

import './styles/main.css'

const axios = Axios.create({
  baseURL: 'http://wttr.in'
})

axios.get('/shanghai')
  .then(resp => {
    const html = resp.data
      .replace(/<meta[\w\s\-:/=.#;@>"]*>/g, '')
      .replace(/<a[\w\s\-:/=.#;@>"]*<\/a>/g, '')
      .replace(/<link[\w\s\-:/=.#;@>"]*>/g, '')
      .replace(/<script[\w\s\-:/=.#;@>"]*<\/script>/g, '')
      .replace(/<iframe[\w\s\-:/=.#;@>"]*<\/iframe>/g, '')
      .replace(/<link[\w\s\-:/=.#;@>"]*<\/link>/g, '')
    window.a = html

    document.querySelector('#app').innerHTML = html
  })
