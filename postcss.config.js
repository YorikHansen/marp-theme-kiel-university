const pkg = require('./package.json');

// TODO: Also look at these:
// https://github.com/madeleineostoja/rucksack
// https://github.com/ismamz/postcss-utilities
// https://github.com/evrone/postcss-px-to-viewport


/** Generates the banner for the CSS output */
const generateBanner = () =>
  `
${pkg.description}

@theme ${pkg.name}
@author ${pkg.author}
@version ${pkg.version}
@license ${pkg.license}

@auto-scaling fittingHeader,math
@size 16:9 1920px 1080px
@size 4:3 1600px 1200px
@size 3:2 1620px 1080px
@size 1:1 1080px 1080px
@size a4 2480px 3508px
// TODO: autoscaling for code
`.trim();

const TEMP_PATH = 'tmp/';
const SOURCE_PATH = 'src/';
const LOGO_ROOT = 'https://www.uni-kiel.de/ps/cgi-bin/logos/files/';

module.exports = {
  plugins: [
    // require('postcss-import')(), // Enables @import in CSS
    require('postcss-normalize')(),
    require('autoprefixer'), // Adds vendor prefixes for compatibility
    require('postcss-font-magician')({
      // protocol: 'https:',
      // formats: ['woff2', 'woff', 'ttf'],
      foundries: ['google'],
    }),
    require('postcss-remote-font-inliner')({}),
    require('postcss-image-inliner')({
      assetPaths: [SOURCE_PATH, TEMP_PATH, LOGO_ROOT],
      b64Svg: true,
      maxFileSize: 20480, // 20kb
      strict: true,
    }),
    require('cssnano')({
      preset: 'default',
    }), // Minifies CSS
    require('postcss-banner')({
      banner: generateBanner(),
      important: true, // Ensures it's not removed by minification
    }),
  ],
};
