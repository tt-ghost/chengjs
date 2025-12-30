type userAgentParser = (userAgent: string) => {
  deviceType: string;
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
  engine: string;
  engineVersion: string;
  brand: string;
  network: string;
  language: string;
  ua: string;
}

type isMobile = (userAgent: string) => boolean

type isIOS = (userAgent: string) => boolean

type isWin = (userAgent: string) => boolean

type isIPad = (userAgent: string) => boolean
