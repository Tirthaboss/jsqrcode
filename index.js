const QRCode = require('qrcode');
const sharp = require('sharp');

/**
 * QRCodeGenerator class.
 * @class QRCodeGenerator
 */
class QRCodeGenerator {
  /**
   * Creates a new QRCodeGenerator instance.
   * @param {Object} options - QR code options.
   * @param {number} options.size - QR code size.
   * @param {string} options.errorCorrectionLevel - Error correction level (L, M, Q, H).
   * @param {string} options.fillColor - Fill color.
   * @param {string} options.backgroundColor - Background color.
   */
  constructor(options) {
    this.options = options;
  }

  /**
   * Generates a QR code for the given text.
   * @param {string} text - Text to encode.
   * @param {Object} outputOptions - Output options.
   * @param {string} outputOptions.outputFormat - Output format (png, svg).
   * @param {string} outputOptions.logo - Logo image path.
   * @param {Object} outputOptions.logoOptions - Logo positioning options.
   * @param {string} outputOptions.logoOptions.position - Logo position (top-left, top-right, bottom-left, bottom-right, center).
   * @returns {Promise<string>} QR code image data URL.
   */
  async generateText(text, outputOptions) {
    try {
      if (!text) {
        throw new Error('Text is required');
      }

      const qrCodeDataURL = await QRCode.toDataURL(text, {
        width: this.options.size,
        errorCorrectionLevel: this.options.errorCorrectionLevel,
        color: {
          dark: this.options.fillColor,
          light: this.options.backgroundColor,
        },
      });

      if (outputOptions.logo) {
        const logoImage = await this.addLogoToQRCode(qrCodeDataURL, outputOptions.logo, outputOptions.logoOptions);
        return logoImage;
      }

      return qrCodeDataURL;
    } catch (error) {
      throw new Error(`Error generating QR code: ${error.message}`);
    }
  }

  /**
   * Adds a logo to the QR code.
   * @param {string} qrCodeDataURL - QR code image data URL.
   * @param {string} logoPath - Logo image path.
   * @param {Object} logoOptions - Logo positioning options.
   * @param {string} logoOptions.position - Logo position (top-left, top-right, bottom-left, bottom-right, center).
   * @returns {Promise<string>} QR code image data URL with logo.
   */
  async addLogoToQRCode(qrCodeDataURL, logoPath, logoOptions) {
    try {
      const qrCodeImage = await sharp(qrCodeDataURL);
      const logoImage = await sharp(logoPath);
      const { width, height } = await qrCodeImage.metadata();
      const logoWidth = width / 5;
      const logoHeight = height / 5;

      let top, left;
      switch (logoOptions.position) {
        case 'top-left':
          top = 0;
          left = 0;
          break;
        case 'top-right':
          top = 0;
          left = width - logoWidth;
          break;
        case 'bottom-left':
          top = height - logoHeight;
          left = 0;
          break;
        case 'bottom-right':
          top = height - logoHeight;
          left = width - logoWidth;
          break;
        case 'center':
          top = (height - logoHeight) / 2;
          left = (width - logoWidth) / 2;
          break;
        default:
          throw new Error(`Invalid logo position: ${logoOptions.position}`);
      }

      const compositeImage = await qrCodeImage.composite([{
        input: await logoImage.resize(logoWidth, logoHeight).toBuffer(),
        top,
        left,
      }]);
      return compositeImage.toDataURL();
    } catch (error) {
      throw new Error(`Error adding logo to QR code: ${error.message}`);
    }
  }

  // Other methods (generateUrl, generatePhoneNumber, generateEmail, generateSms, generateWifi)
}

module.exports = QRCodeGenerator;
