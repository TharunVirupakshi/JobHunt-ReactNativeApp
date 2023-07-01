export const checkImageURL = (url) => {
    if (!url) {
    return false;
  } else {
    const pattern = /^https?:\/\/firebasestorage\.googleapis\.com\/v0\/b\/jobhunt-app\.appspot\.com\/o\/.+$/i;
    const imageExtensions = /\.(png|jpg|jpeg|bmp|gif|webp)$/i;
    return pattern.test(url) || imageExtensions.test(url);
  }
};
