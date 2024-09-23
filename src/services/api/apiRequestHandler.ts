import axios from 'axios';
import React from 'react';

import { ApiRequestProps, ResponseData, ResponseProps } from '../../types';

export async function apiRequestHandler<
  ResponseDataKey extends
    | 'fetchChatList'
    | 'fetchContactList'
    | 'fetchMessageList'
    | 'fetchOneChat'
    | 'noResponseData'
    | 'userLogin'
    | 'validateUserImage'
    | 'createUpdateUser'
    | 'fetchSearchMessages'
    | 'sendMessage'
>(
  responseDataKey: ResponseDataKey,
  { baseUrl, params, headers, data, method, requestName }: ApiRequestProps
) {
  let requestResponse = {
    failed: true,
    status: null,
  } as ResponseData[ResponseDataKey] & ResponseProps;

  await axios
    .request({
      url: `${baseUrl}${params}`,
      headers,
      method,
      data,
    })
    .then((response) => {
      requestResponse = {
        data: response.data,
        failed: false,
        status: response.status,
      };
    })
    .catch((error) => {
      self.reportError(error);
      // console.error('ERROR ON: ', requestName);
      if (error.response) {
        // console.error('ERROR:', error.response.data.error);
        // console.error('STATUS:', error.response.status);
        // console.error('HEADERS:', error.response.headers);
        // console.error('MESSAGE:', error.message);
        requestResponse.status = error.response.status;
      } else if (error.message) {
        requestResponse.status = error.message;
      }
      if (error.config) {
        // console.error('REQUEST DATA:', error.config.data);
        // console.error('HEADERS:', error.config.headers);
      }
      // console.error(error.toJSON());
    });

  return requestResponse;
}
