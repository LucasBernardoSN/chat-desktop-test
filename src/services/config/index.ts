import { DevicesTypes } from '../../types';

const DEV: boolean = false;

const API_PORT = DEV ? 3976 : 3975;

const SOCKET_PORT = DEV ? 3970 : 3971;

const DEVICE: DevicesTypes = 'application';

const MAIN_URL = `http://erochat.ddns.net:${API_PORT}`;

const SOCKET_URL = `http://erochat.ddns.net:${SOCKET_PORT}`;

const AUTH_URL = `http://erosoft.com.br:8085/servererosoft/EroSoftOS/OSServer.exe/usuario`;

const BASE_IMAGE_URL = `http://erochat.ddns.net:8085/servererosoft/EroArquivos/EroArquivos.exe`;

const CHAT_IMAGES_URL = `${BASE_IMAGE_URL}/chat${DEV ? '.dev' : ''}/chats`;

const PROFILE_IMAGE_URL = `${BASE_IMAGE_URL}/chat${DEV ? '.dev' : ''}/users`;

const SECRET = 'X*Yqp*sGwWtz!^#4PrmahEylRL4fqTDP@ThSFHhn^knmDVU@pl';

export {
  DEVICE,
  MAIN_URL,
  AUTH_URL,
  BASE_IMAGE_URL,
  SOCKET_URL,
  CHAT_IMAGES_URL,
  PROFILE_IMAGE_URL,
  SECRET,
  DEV,
};
