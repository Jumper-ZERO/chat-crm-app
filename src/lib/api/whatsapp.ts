import axios from 'axios'

import { API_URL } from '@/lib/api/config'

const whatsapp = axios.create({
  baseURL: API_URL + '/whatsapp',
  withCredentials: true
})

export async function send(to: string, message: string) {
  return whatsapp.post('/send', { to, message }).then((res) => res.request.status === 201)
}