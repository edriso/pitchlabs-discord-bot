export const isValidUrl = (url) => {
  const urlPattern = /^(https?):\/\/[-\w.]+(:\d+)?(\/([^\s]*)?)?$/;
  return urlPattern.test(url);
};
