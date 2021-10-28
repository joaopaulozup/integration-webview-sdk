import "url-search-params-polyfill";
import Constants from "./Constants";
import * as SDKMockedData from "./SDKMockedData";

// Callback function name created in the index.html
const CALLBACK_FUNC_NAME = "execCallBackFunction";

const params = new URLSearchParams(window.location?.href.split("?")[1]);
const sdkFlag = !process.env.REACT_APP_USE_SDK
  ? !process.env.REACT_APP_USE_SDK
  : !!(params.get("sdk") && params.get("sdk").toLowerCase() === "true");
const deviceAndroid = params.get("android") && params.get("android") === "true";

if (deviceAndroid) {
  window.addEventListener("message", window.execCallBackFunction, false);
}

!sdkFlag && SDKMockedData.setMockedSDKEnvironment();

function getNativeResource() {
  return sdkFlag ? window.native : window.mocked_native;
}

/**
 * Simply compares two string version values.
 *
 * Example:
 * versionCompare('1.1', '1.2') => -1
 * versionCompare('1.1', '1.1') =>  0
 * versionCompare('1.2', '1.1') =>  1
 * versionCompare('2.23.3', '2.22.3') => 1
 *
 * Returns:
 * -1 = left is LOWER than right
 *  0 = they are equal
 *  1 = left is GREATER = right is LOWER
 *  And FALSE if one of input versions are not valid
 */

function versionCompare(left, right) {
  console.log("### left", left);
  console.log("### right", right);

  if (left && /\./i.test(left) && right && /\./i.test(right)) {
    const a = left.split(".");
    const b = right.split(".");
    const len = Math.max(a.length, b.length);

    console.log("### if left right", { a, b, len });

    for (let i = 0; i < len; i++) {
      if (
        (a[i] && !b[i] && parseInt(a[i], 10) > 0) ||
        parseInt(a[i], 10) > parseInt(b[i], 10)
      ) {
        return 1;
      } else if (
        (b[i] && !a[i] && parseInt(b[i], 10) > 0) ||
        parseInt(a[i], 10) < parseInt(b[i], 10)
      ) {
        return -1;
      }
    }
    return 0;
  }
  return false;
}

function getUserAgentComponents(userAgent, regEx) {
  const kDelimiter = "=";
  const components = {};
  userAgent.match(regEx).forEach((match) => {
    const [key, value] = match.split(kDelimiter);
    components[key] = value.replace(/;/g, "");
  });
  return components;
}

function isAsynchronous() {
  if (window.isAsync !== undefined) {
    return window.isAsync;
  } else {
    const synchronousIOSCardAppVersion = "6.1.9";
    const synchronousIOSPFAppVersion = "6.56.0";
    const userAgent = navigator.userAgent;
    const userAgentRegExFormat = /([\w&.\-\s]+?=[\w&.\-\s]+?)(?:;|$)/g;
    const valid = userAgentRegExFormat.test(userAgent);

    window.isAsync = false;

    if (userAgent && valid) {
      const components = getUserAgentComponents(
        userAgent,
        userAgentRegExFormat
      );
      const appid = components.app_id;

      if (
        appid.includes("credicard") ||
        appid.includes("hipercard") ||
        appid.includes("itaucard") ||
        appid.includes("magalu")
      ) {
        window.isAsync =
          components.os === "ios" &&
          !(
            versionCompare(
              components.app_version,
              synchronousIOSCardAppVersion
            ) === -1
          );
      } else if (
        appid.includes("enterprise") ||
        appid.includes("personnalite") ||
        appid.includes("varejo")
      ) {
        window.isAsync =
          components.os === "ios" &&
          !(
            versionCompare(
              components.app_version,
              synchronousIOSPFAppVersion
            ) === -1
          );
      }
    }
    return window.isAsync;
  }
}

export const native = getNativeResource();

export const nativeHelper = {
  callback: (methodName, resolve) => {
    const hash = Math.floor(Math.random() * +new Date());
    const callbackName = `${methodName}_${hash}`;
    window[callbackName] = (key, value) => {
      resolve(value);
    };
    return callbackName;
  },

  getItem: async (key) => {
    if (isAsynchronous()) {
      return await new Promise((resolve) => {
        getNativeResource().getItem(
          key,
          nativeHelper.callback("getItem", resolve)
        );
      });
    } else {
      return getNativeResource().getItem(key);
    }
  },

  getMemoryItem: async (key) => {
    if (isAsynchronous()) {
      return await new Promise((resolve) => {
        getNativeResource().getMemoryItem(
          key,
          nativeHelper.callback("getMemoryItem", resolve)
        );
      });
    } else {
      return getNativeResource().getMemoryItem(key);
    }
  },
};

const requestNativeFeature = (data, callback) => {
  window.setCallBackFunction(callback);
  console.log("data.action:", data.action);
  console.log(JSON.stringify(data));
  getNativeResource().requestNativeFeature(
    JSON.stringify(data),
    CALLBACK_FUNC_NAME
  );
};

export const checkSDKFlag = () => {
  const sdkFlag = process.env.REACT_APP_USE_SDK
    ? process.env.REACT_APP_USE_SDK
    : !!(params.get("sdk") && params.get("sdk").toLowerCase() === "true");
  return sdkFlag;
};

export const getSDKItem = async (key) => {
  let value = await nativeHelper.getMemoryItem(key);
  if (
    typeof value !== "number" &&
    typeof value !== "object" &&
    (!value || value === null || value.replace(/ /g, "") === "")
  ) {
    value = await nativeHelper.getItem(key);
  }

  return value;
};

export const setSDKItem = (key, value) => {
  const setItem =
    getNativeResource().setMemoryItem || getNativeResource().setItem;
  setItem(key, value);
};

export const checkActiveToken = (callback) => {
  const data = _getSDKDataPayload(Constants.SDK_ACTIONS.CHECK_ACTIVE_TOKEN);
  requestNativeFeature(data, callback);
};

export const simulateSDKCheckout = (payloadObj, callback) => {
  const data = _getSDKDataPayload(
    Constants.SDK_ACTIONS.SIMULATE_CHECKOUT,
    payloadObj
  );
  requestNativeFeature(data, callback);
};

export const getRegistrationDataComplete = (payloadObj, callback) => {
  const data = _getSDKDataPayload(
    Constants.SDK_ACTIONS.GET_REGISTRATION_DATA_COMPLETE,
    payloadObj
  );
  requestNativeFeature(data, callback);
};

export const getSDKAllCards = (callback) => {
  const data = _getSDKDataPayload(Constants.SDK_ACTIONS.CARD_LIST);
  requestNativeFeature(data, callback);
};

export const openURLNative = (payloadObj, callback) => {
  const data = _getSDKDataPayload(Constants.SDK_ACTIONS.OPEN_LINK, payloadObj);
  requestNativeFeature(data, callback);
};

export const redirectToNativeView = (viewAction) => {
  const data = _getSDKDataPayload(viewAction);
  console.log("Native call, data sent: ", data);
  requestNativeFeature(data);
};

export const sharingLinkSDK = (shareContent, shareType) => {
  let actionName = "";
  switch (shareType) {
    case "whatsApp":
      actionName = "WHATSAPP_SHARING";
      break;
    default:
      actionName = "OTHER_APP_SHARING";
      break;
  }

  const data = _getSDKDataPayload(actionName, shareContent);
  requestNativeFeature(data);
};

const _getSDKDataPayload = (
  actionName,
  data = null,
  category = Constants.SDK_CATEGORIES.DEFAULT
) => {
  const defaultObj = {
    action: `com.itau.${actionName}`,
    category: `com.itau.category.${category}`,
  };

  if (data) {
    return { ...defaultObj, data: data ? JSON.stringify(data) : null };
  }

  return defaultObj;
};
