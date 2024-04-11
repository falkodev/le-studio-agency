# Web agency template for ApostropheCMS
A starter kit for building marketing-themed websites. Add hero blocks, feature lists, multi-column layouts, pricing, team members, and more with this rich starter kit for Apostrophe.

## Demo
<video src="https://user-images.githubusercontent.com/1889830/257867010-767f9ab6-3472-4057-8780-38cb9d861640.mp4" controls="controls" style="max-width: 730px;">
</video>

## Get started
### Method 1
1. Install the project using the [Apostrophe CLI tool]() using:
   ``` sh
   apos create my-project --starter=marketing
   ```
2. Start the site using:
   ``` sh
   npm run dev
   ```
3. Login using the credentials created during project creation - note that the username is `admin`

### Method 2
1. Clone the template locally. You can use the GitHub desktop app or the CLI
2. Install dependencies using: `npm install`
3. Create Admin user
   ```bash
   node app @apostrophecms/user:add admin admin
   ```
4. Start the site using:
   ``` sh
   npm run dev
   ```
5. Login using the credentials just created - note that the username is `admin`

## Theming

Colors, fonts, and other aesthetic variables are set in `modules/asset/ui/src/scss/_theme.scss`. These can be overridden by making changes directly in the `_theme.scss` file.

The marketing starter kit uses fonts provided by Google. These are imported into the primary layout file in `views/layout.html:19`

## Maps and Geocoding
This project comes with a map widget that geocodes addresses to points on the map. Geocoding is provided by [`node-geocoder`](https://www.npmjs.com/package/node-geocoder). You must configure a geocoding service provider and API key in order to use it. [See a list of geocoding service providers](https://github.com/nchaulet/node-geocoder#geocoder-providers-in-alphabetical-order).

To configure your project's geocoding service provider see `modules/content-widget-modules/modules.js`

```js
  'map-widget': {
    options: {
      geocoderSettings: {
        // For a full list of the node-geocoder npm package options please view the modules documentation - https://www.npmjs.com/package/node-geocoder
        // Requred
        provider: 'mapbox',

        // Optional depending on the providers
        apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
        formatter: null, // 'gpx', 'string', ...
        minConfidence: 0.5,
        limit: 1
      }
    }
  },

```

More configuration details for `node-geocoder` [noted here](#node-geocoder-config).

## Making use of the .env set up

There is a `.env.sample` file located within the top-level directory. To set up the `.env` file:

 - Either rename this file to `.env` or,
 - Add a new file named `.env` and copy the contents from `.env.sample`

Next, these variables need to have values set:

GEOCODER_API_KEY= must be the value of the geocoder provider

## Running the project

Run `npm run dev` to build the Apostrophe UI and start the site up. Remember, this is during alpha development, so we're all in "dev mode." The `dev` script will watch for saves in client-side CSS and Javascript and trigger a build and page refresh if they are detected. It will also restart the app when server side code is saved.

## Making it your own

This starter kit is designed so you can install and start running it right away. If you are starting a project that will go into production one day, there are a few things you should be sure to check:

- [ ] **Update the shortname.** This step can be skipped if the kit was installed using the CLI tool as it does this for you. The `shortname` option in `app.js` is used for the database name (unless another is given in the `@apostrophecms/db` module). You should change this to an appropriate project name before you start adding any users or content you would like to keep.
- [ ] **Update the Express.js session secret.** The secret is set to `undefined` initially in the `modules/@apostrophecms/express/index.js` file. You should update this to a unique string.
- [ ] **Decide if you want hot reloading on.** This starter kit uses nodemon to restart the app when files are changed. In `modules/@apostrophecms/asset/index.js` there is an option enabled to refresh the browser on restart. If you like this, do nothing. If you don't, remove the option or set it to `false`. The option has no effect when the app is in production.

## ApostropheCMS module extensions
The below ApostropheCMS extensions have been included within this theme's main ApostropheCMS `app.js` file.

- [ ] **@apostrophecms/form.** Allows editors to create their own forms for gathering and delivering user input.
(View extension - https://apostrophecms.com/extensions/form-builder-3-x)
- [ ] **@apostrophecms/open-graph.** Provides a way to edit metadata for Facebook's Open Graph standard.
(View extension - https://apostrophecms.com/extensions/open-graph-tools-3)
- [ ] **@apostrophecms/seo.** SEO configuration for ApostropheCMS. Adds useful meta fields to all pages and pieces.
(View extension - https://apostrophecms.com/extensions/seo-tools-3)
- [ ] **@apostrophecms/sitemap.** Generates XML and plaintext sitemaps for sites in Apostrophe.
(View extension - https://apostrophecms.com/extensions/site-maps-3-x)

## Themes imported NPM Packages
- [ ] **dotenv.** "dotenv" is a npm package that loads environment variables from a .env file. It's useful for securely storing sensitive information like API keys, passwords, and other configuration settings.

    The import statement should only be set within the main ApostropheCMS `app.js` file:
    ```js
    require('dotenv').config();
    ```
    You can then reference environment variables within the server js files for Apostrophe,

    ```js
    const port = process.env.PORT || 3000;
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASSWORD;
    ```
- [ ] **rfs (Responsive Font Sizing).** The "rfs" package is a node.js module that provides a simple way to create responsive and fluid typography in CSS. It allows you to define font sizes using a unitless value (usually "rem") and automatically adjust them based on the viewport or container width.

    Mainly used within `modules/asset/ui/src/_typography.scss` file for consistent rem based font sizing. Usage applied to headings and paragraphs.

    E.g ``` @include font-size($h1-font-size)```
    where $h1-font-size is a rem value determined by a base value.

    in this theme a default of 16px: ```$h1-font-size: $font-size-base * 3; // 48px```

- [ ] **swiper (Slideshows).** The "swiper" package is a JavaScript library for creating responsive and touch-enabled sliders, carousels, and other interactive content on the web. Its usage within this theme is located at modules/content-widget-modules/image-gallery-widget

    You can import it in your JavaScript file using the import statement:
    ```js
    import Swiper from 'swiper/bundle';
    ```
    Then, you can create a new instance of the "swiper" class and pass in a configuration object with your desired options. For example:
    ```js
    const mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And more...
    });
    ```
- [ ] **photoswipe (Lightbox)** "PhotoSwipe Lightbox" is a plugin for the popular JavaScript library "PhotoSwipe" that simplifies the process of creating responsive image galleries with lightbox functionality. It offers an easy-to-use API for adding lightboxes to your images and is highly customizable and flexible.

    Its usage within this theme is located at `modules/content-widget-modules/image-gallery-widget`, and is applied in conjunction with the swiper npm package.

    You can import it in your JavaScript file using the import statement:

    ```js
    import PhotoSwipeLightbox from 'photoswipe/lightbox';
    import PhotoSwipe from 'photoswipe';
    ```
    Then, you can create a new instance of the "Photoswiper lightbox" class and pass in a configuration object with your desired options. For example:
    ```js
    // Photoswiper lightbox and gallery
    const photoSwipeOptions = {
        gallery: '#imageGallery',
        pswpModule: PhotoSwipe,
        // set background opacity
        bgOpacity: 1,
        showHideOpacity: true,
        children: 'a',
        loop: true,
        showHideAnimationType: 'fade', /* options: fade, zoom, none */

        /* Click on image moves to the next slide */
        imageClickAction: 'next',
        tapAction: 'next',

        /* ## Hiding a specific UI element ## */
        zoom: false,
        close: true,
        counter: true,
        arrowKeys: true
    };

    const lightbox = new PhotoSwipeLightbox(photoSwipeOptions);

    lightbox.init();
    ```

- [ ] [**Node-geocoder**](#node-geocoder-config) is an npm package that simplifies geocoding and reverse-geocoding in Node.js. It supports various geocoding services, allowing developers to convert addresses to coordinates and vice versa with ease.

    See a basic example of this package below:
    ```js
    const NodeGeocoder = require('node-geocoder');
    ```
    Then, you can create a new instance of the "Map" class and add one or more layers to it. For example:
    ```js
    const options = {
      // For a full list of the node-geocoder npm package options please view the modules documentation - https://www.npmjs.com/package/node-geocoder
      // Requred
      provider: 'mapbox',

      // Optional depending on the providers
      apiKey: 'include provider apikey', // for Mapquest, OpenCage, Google Premier
      formatter: null, // 'gpx', 'string', ...
      minConfidence: 0.5,
      limit: 1
    };
    const geocoder = NodeGeocoder(options);
    const geocoderAddress = await geocoder.geocode(data.widget.address);
    ```

- [ ] **ol (Maps)** The "ol" package is a JavaScript library for creating interactive maps on the web. Its usage within this theme is located at `modules/content-widget-modules/map-widget`

    See a basic example of this package below:
    ```js
    import { Map, View } from 'ol';
    import TileLayer from 'ol/layer/Tile';
    import OSM from 'ol/source/OSM';
    ```
    Then, you can create a new instance of the "Map" class and add one or more layers to it. For example:
    ```js
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    ```

- [ ] **AOS (Animations)** Animate On Scroll (AOS) library allows you to animate elements as you scroll down and up. If you scroll back to the top, elements will animate to their previous state and are ready to animate again if you scroll down.

    You can import it in your JavaScript file (`modules/asset/ui/src/index.js`) using the import statement:

    ```js
    import AOS from 'aos';
    ```
    Then, initialize AOS. For example:

    ```js
    AOS.init();
    ```

    For usage within this theme, Create an instance of 'aosSchema' in your widget and add it as field. For example:

    ```js
    const aosSchema = require('../../../lib/aosSchema.js');

    add: {
      ...aosSchema
    }
    ```

## Advanced Apostrophe configuration

Right now, [all the juicy info is in the ApostropheCMS docs](https://docs.apostrophecms.org), so head over there and start reading! This starter kit project is a fun introduction to the UI, but you'll want to know more to really try it out.

## Thanks

![Thanks to our partner Hellocomputer](https://static.apostrophecms.com/apostrophecms/starter-kit-hellocomputer/images/thanks.png)

### About Apostrophe
ApostropheCMS is a powerful content management system designed for developers who want to build dynamic and robust websites and applications. The intuitive admin interface provides a user-friendly editing experience, empowering content editors to create and update content effortlessly. As a developer, you have complete control over the content structure, defining custom schemas and creating relationships between different content types.

With its developer-friendly architecture, ApostropheCMS provides the flexibility and extensibility you need to build a simple blog, an enterprise-level website, or a complex web application.


## Apostrophe starter kits
This Starter Kit was originally crafted by Hellocomputer in partnership with Apostrophe. To learn more about Hellocomputer visit [hellocomputer.com](https://www.hellocomputer.com/). As with any open-source project, this too is a community collaboration. We welcome feedback, tickets, bug fixes, and improvements.

Want to upgrade your Starter Kit to Apostrophe Pro? [Get started here](https://apostrophecms.com/pro).

Interested in publishing an Apostrophe Starter Kit and becoming a featured Apostrophe Partner? [Submit a Starter Kit](https://apostrophecms.com/starter-kits).
