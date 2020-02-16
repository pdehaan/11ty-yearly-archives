const del = require("del");
const strftime = require("strftime");

// Purge the output "www/" directory before building.
del.sync("www");

module.exports = eleventyConfig => {
  eleventyConfig.addFilter("date", (date=new Date(), format="%Y/%m/%d") => strftime(format, date));
  // eleventyConfig.addFilter("inspect", require("util").inspect);

  eleventyConfig.addCollection("byYear", collection => {
    const data = {};
    const all = collection.getFilteredByTag("blog").reverse();
    for (const post of all) {
      const year = post.date.getFullYear();
      const yearPosts = data[year] || [];
      yearPosts.push(post);
      data[year] = yearPosts;
    }
    return data;
  });

  return {
    dir: {
      input: "src",
      output: "www"
    }
  };
};
