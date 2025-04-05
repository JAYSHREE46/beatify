import { KeyRounded } from '@mui/icons-material';
import axios from 'axios';
const USER_AUTH = {
  "grant_type":"client_credentials",
  "client_id": "a9463e19e0df4b0d98e95a9db629f6f4",
  "client_secret": "2fcfd769253946ba86e23e7ebb9d3617",
};
const LOGIN_API =  "https://accounts.spotify.com/api/token"

export const loginApi =async ()=>{
  let res = await axios.post(LOGIN_API, USER_AUTH, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  return res.data;
}