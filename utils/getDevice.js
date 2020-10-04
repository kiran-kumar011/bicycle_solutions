const detect = (ua) => {
  if (
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
      ua
    )
  )
    return 'tablet';
  if (
    /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(
      ua
    )
  )
    return 'mobile';
  return 'desktop';
};

export const getMqFromUA = (ua) => {
  const device = detect(ua.toLowerCase());
  let mq;
  let deviceWidth;
  let deviceHeight;
  let orientation;

  if (device === 'mobile' || device === 'tablet') {
    mq = 'mobile';
    deviceWidth = 991;
    deviceHeight = 1500;
    orientation = 'portait';
  } else {
    mq = 'desktop';
    deviceWidth = 992;
    deviceHeight = 600;
    orientation = 'landscape';
  }

  return { mq, deviceWidth, deviceHeight, orientation };
};

export const getMqFromNavigator = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  const deviceWidth = window.innerWidth;
  const deviceHeight = window.innerHeight;
  const orientation =
    window.innerWidth < window.innerHeight ? 'portrait' : 'landscape';
  let mq = detect(window.navigator.userAgent.toLowerCase());
  const deviceOrientation = window.orientation;
  if (deviceWidth <= 991 && mq === 'desktop') {
    mq = 'mobile';
  }

  return { deviceWidth, deviceHeight, orientation, mq, deviceOrientation };
};
