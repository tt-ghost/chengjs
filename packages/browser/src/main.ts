export const isIPad = (userAgent: string) => {
  return (
    /ipad/i.test(userAgent) ||
    (/apple/.test(userAgent) && "ontouchstart" in window)
  );
};

export function isMobile(userAgent: string) {
  const keys = ["android", "iphone", "ipad"];
  if (keys.find((item) => userAgent.indexOf(item) > -1) || isIPad(userAgent)) {
    return true;
  }
  return false;
}

export const isIOS = (userAgent: string) => {
  return /iphone|ipad/i.test(userAgent);
};

export const isWin = (userAgent: string) => {
  return /win/i.test(userAgent);
};

export const userAgentParser = (userAgent: string) => {
  const result = {
    deviceType: "Desktop",
    os: "",
    osVersion: "",
    browser: "",
    browserVersion: "",
    engine: "",
    engineVersion: "",
    brand: "",
    network: "",
    language: "",
    ua: userAgent,
  };

  if (!userAgent) return result;

  // --- OS & Device Detection ---
  if (/(Android)(?:\s+([0-9.]+))?/.test(userAgent)) {
    result.os = "Android";
    const match = userAgent.match(/(Android)(?:\s+([0-9.]+))?/);
    result.osVersion = match?.[2] || "";
    result.deviceType = "Mobile";
    if (userAgent.includes("Tablet") || userAgent.includes("Pad")) {
      result.deviceType = "Tablet";
    }
  } else if (/(iPhone|iPad|iPod)(?:.*OS\s([\d_]+))?/.test(userAgent)) {
    result.os = "iOS";
    const match = userAgent.match(/(iPhone|iPad|iPod)(?:.*OS\s([\d_]+))?/);
    result.osVersion = match?.[2]?.replace(/_/g, ".") || "";
    result.deviceType = match?.[1] === "iPad" ? "Tablet" : "Mobile";
    result.brand = "Apple";
  } else if (/(Mac OS X)\s?([\d_]+)?/.test(userAgent)) {
    result.os = "MacOS";
    const match = userAgent.match(/(Mac OS X)\s?([\d_]+)?/);
    result.osVersion = match?.[2]?.replace(/_/g, ".") || "";
    result.deviceType = "Desktop";
    result.brand = "Apple";
  } else if (/(Windows NT)\s?([\d.]+)?/.test(userAgent)) {
    result.os = "Windows";
    const match = userAgent.match(/(Windows NT)\s?([\d.]+)?/);
    const verMap: Record<string, string> = {
      "10.0": "10/11",
      "6.3": "8.1",
      "6.2": "8",
      "6.1": "7",
    };
    result.osVersion = verMap[match?.[2] || ""] || match?.[2] || "";
    result.deviceType = "Desktop";
  } else if (/Linux/.test(userAgent)) {
    result.os = "Linux";
    result.deviceType = "Desktop";
  }

  // --- Engine Detection ---
  if (/AppleWebKit\/([\d.]+)/.test(userAgent)) {
    result.engine = "WebKit";
    result.engineVersion = userAgent.match(/AppleWebKit\/([\d.]+)/)?.[1] || "";
  } else if (
    /Gecko\/([\d.]+)/.test(userAgent) &&
    !userAgent.includes("KHTML")
  ) {
    result.engine = "Gecko";
    result.engineVersion = userAgent.match(/rv:([\d.]+)/)?.[1] || "";
  } else if (/Trident\/([\d.]+)/.test(userAgent)) {
    result.engine = "Trident";
    result.engineVersion = userAgent.match(/Trident\/([\d.]+)/)?.[1] || "";
  }

  // --- Browser Detection ---
  const browserRegexes = [
    { name: "MicroMessenger", regex: /MicroMessenger\/([\d.]+)/ }, // WeChat
    { name: "QQ", regex: /QQ\/([\d.]+)/ },
    { name: "UCBrowser", regex: /UCBrowser\/([\d.]+)/ },
    { name: "Quark", regex: /Quark(?:PC)?\/([\d.]+)/ },
    { name: "360Spider", regex: /360Spider/ }, // Bot
    { name: "Edge", regex: /(?:Edg|Edge)\/([\d.]+)/ },
    { name: "Opera", regex: /(?:OPR|Opera)\/([\d.]+)/ },
    { name: "Chrome", regex: /Chrome\/([\d.]+)/ },
    { name: "Firefox", regex: /Firefox\/([\d.]+)/ },
    { name: "Safari", regex: /Version\/([\d.]+).*Safari/ },
    { name: "IE", regex: /(?:MSIE |rv:)([\d.]+)/ },
  ];

  for (const item of browserRegexes) {
    if (item.regex.test(userAgent)) {
      result.browser = item.name;
      const match = userAgent.match(item.regex);
      result.browserVersion = match?.[1] || "";
      break;
    }
  }

  // --- Brand Detection (Android mainly) ---
  if (result.os === "Android" && !result.brand) {
    const brandRegexes = [
      { name: "Huawei", regex: /(?:Huawei|HUAWEI|HONOR|HMA-|LYA-|VOG-)/i },
      { name: "Xiaomi", regex: /(?:Mi|Redmi|Xiaomi|Mix)/i },
      { name: "Samsung", regex: /(?:Samsung|SM-|GT-|SCH-)/i },
      { name: "Oppo", regex: /(?:Oppo|PACM00|PBEM00)/i },
      { name: "Vivo", regex: /(?:Vivo|V1\d+)/i },
      { name: "OnePlus", regex: /OnePlus/i },
      { name: "Meizu", regex: /MZ-/i },
      { name: "Lenovo", regex: /Lenovo/i },
      { name: "ZTE", regex: /ZTE/i },
      { name: "Tecno", regex: /TECNO/i },
      { name: "Infinix", regex: /Infinix/i },
      { name: "Itel", regex: /itel/i },
    ];

    // Check specific brands first
    for (const item of brandRegexes) {
      if (item.regex.test(userAgent)) {
        result.brand = item.name;
        break;
      }
    }

    // Generic Model Extraction (looking for "Build/")
    if (!result.brand) {
      const buildMatch = userAgent.match(/;\s?([a-zA-Z0-9\s-]+)\s+Build\//);
      if (buildMatch) {
        result.brand = buildMatch[1].trim();
        // Fallback: If retrieved looks like a brand known but missed
      }
    }
  }

  // --- Network Type Detection ---
  // Common in hybrid apps (WeChat, Alipay, etc)
  const netMatch = userAgent.match(/NetType\/([a-zA-Z0-9]+)/i);
  if (netMatch) {
    result.network = netMatch[1];
  }

  // --- Language Detection ---
  // Matches "zh-CN", "en-US", "zh_CN" etc in standard locations
  const langMatch = userAgent.match(/[;\s(]([a-z]{2}(?:-[a-zA-Z]{2})?)[;\s)]/);
  // Filter out common false positives like 'rv:11', 'WOW64'
  if (
    langMatch &&
    !["WOW64", "Win64", "NET"].some((x) => langMatch[1].includes(x)) &&
    langMatch[1].length <= 5
  ) {
    // Additional strict check: typically lowercase-UPPERCASE for lang like zh-CN, or just lowercase zh
    if (/^[a-z]{2}(-[A-Za-z]{2})?$/.test(langMatch[1])) {
      result.language = langMatch[1];
    }
  }

  return result;
};
