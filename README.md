# 11ty-yearly-archives

Create yearly archive pages for our blog posts.

## WHY

You have blog permalinks like "/{year}/{month}/{slug}/" and you want yearly archives at "/{year}/index.html".

## HOW

We can add a custom collection to our [.eleventy.js](.eleventy.js) file which sorts and groups the blog posts by year:

```js
// ##### .eleventy.js snippet #####
eleventyConfig.addCollection("byYear", collection => {
  const data = {};
  const all = collection.getAllSorted().reverse();
  for (const post of all) {
    const year = post.date.getFullYear();
    const yearPosts = data[year] || [];
    yearPosts.push(post);
    data[year] = yearPosts;
  }
  return data;
});
```

Next, we create a [src/posts/year-archive.njk](src/posts/year-archive.njk) template which uses `pagination` to loop over our custom `collections.byYear` collection, to create the "/{year}/index.html" file for each respective year. And finally, we can set a `posts` variable inside our template which we can use to loop over the current pagination year's posts and display them in a list:

```njk
---
eleventyExcludeFromCollections: true
pagination:
  data: collections.byYear
  size: 1
  alias: year
permalink: "{{ year }}/"
renderData:
  title: "{{ year }} Archive"
---

{%- set posts = collections.byYear[year] -%}

{# ... #}
```
