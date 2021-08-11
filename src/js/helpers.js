import {
  QUERY_TIMEOUT_SECONDS,
  IMAGE_URL,
  LARGE_IMAGE_PART_URL,
  SMALL_IMAGE_PART_URL,
  REQUEST_HEADER_IDENTIFY_FIELD,
  REQUEST_HEADER_PROJECT_INFO,
} from './config';

export const urlEncodeQuery = q => encodeURIComponent(JSON.stringify(q));

const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request timed out after ${seconds} seconds`));
    }, seconds * 1000);
  });
};

const headers = {
  [REQUEST_HEADER_IDENTIFY_FIELD]: REQUEST_HEADER_PROJECT_INFO,
};

export const getData = async function (url) {
  try {
    const res = await Promise.race([
      fetch(url, {
        headers: headers,
      }),
      timeout(QUERY_TIMEOUT_SECONDS),
    ]);
    const data = await res.json();

    if (!res.ok)
      throw new Error(
        `${data?.error?.root_cause[0]?.type ?? 'No data received'} ${
          data?.error?.root_cause[0]?.reason ?? ''
        } (status: ${res.status})`
      );
    return data;
  } catch (err) {
    throw err;
  }
};

export const getImageUrl = function (id, isSmall = false) {
  return `${IMAGE_URL}${id}${
    isSmall ? SMALL_IMAGE_PART_URL : LARGE_IMAGE_PART_URL
  }`;
};
