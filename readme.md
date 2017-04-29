# My website's build pipeline

This is a simple [Gulp](http://gulpjs.com) pipeline to convert particularly organized [Markdown](https://daringfireball.net/projects/markdown/) content to static html. This is a quick personal project which I just put up here so others might benefit. It is not supported.

You can find my website at [pnksmr.fr](https://pnksmr.fr).

## Getting started

* Install Gulp if you haven't already done so
* Run `npm update && npm install`
* Add a `/src` folder with `template` and `content` folders
  For an example see my [website's content repo](https://github.com/Punksmurf/website-build)
  * The `/src/template` should contain:
    * `index.html`, your default template
    * `images/` for any images
    * `scss/styles.scss` for your styles
  * Put you site content in `/src/content`
    * `/src/content` will be the root of your site in `/pages`
    * All files starting with `%` are ignored, so you can use that for files which you want to include without generating a separate html file for them
    * Any `.md` or `.markdown` files will be converted to `html` and wrapped in `src/layout.html`
    * Any other files will be copied as is
* Run `gulp build` and watch `/pages` appear with your new website

I advice you to fork this project if you really want to use it, because changes might break your site at any time.

## Using the template

I opted for a default template name of `layout.html` and the [Handlebars](http://handlebarsjs.com) template engine. The contents of the page will be present in the `contents` variable.

I also use [FrontMatter](https://jekyllrb.com/docs/frontmatter/) to be able to add or modify template variables. This means you can make exceptions for the used template or engine by providing the `layout` (relative to the template directory) and `engine` variables. I also use the `title` variable to set the page title, and print a warning if it has not been set.

A very basic `layout.html` to use (using Handlebars):
```
<html>
  <head>
    <title>{{title}}</title>
  </head>
  <body>
    {{{contents}}}
  </body>
</html>
```

Using that with the following Markdown file:
```
---
layout: layout.html
engine: handlebars
title: Hello world
---
# Hello
```

Would deliver the following html:
```
<html>
  <head>
    <title>Hello world</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```

## Including files

Thanks to [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include) you can include files using `@@include("./%include.md")` anywhere in the file. Files prefixed with `%` are not processed on their own and do not show up in `./pages` by themselves.

## Notes on markup

* For my use, I wrap the content in an `<article>` tag. Any `<p>` in there with only images in it will get an `images` tag which is useful for the style I am using. If you do not want this remove the appropriate from the `content_markdown` task.

## Projects used

* [Gulp](http://gulpjs.com)
* [Del](https://github.com/sindresorhus/del)
* [Handlebars](http://handlebarsjs.com)
* [gulp-sass](https://github.com/dlmanning/gulp-sass)
* [gulp-front-matter](https://github.com/shinnn/gulp-front-matter)
* [gulp-markdown](https://github.com/sindresorhus/gulp-markdown)
* [gulp-layout](https://github.com/macoshita/gulp-layout)
* [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include)
* [gulp-dom](https://github.com/trygve-lie/gulp-dom)

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
