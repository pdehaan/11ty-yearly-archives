const del = require("del");
const strftime = require("strftime");

// Purge the output "www/" directory before building.
del.sync("www");

module.exports = eleventyConfig => {
  eleventyConfig.addFilter("date", (date=new Date(), format="%Y/%m/%d") => strftime(format, date));
  // eleventyConfig.addFilter("inspect", require("util").inspect);

  eleventyConfig.addCollection("byYear", collection => {
    const years = new Map();
    const all = collection.getAll();
    for (const post of all) {
      const year = post.date.getFullYear();
      const yearPosts = years.get(year) || [];
      yearPosts.push(post);
      years.set(year, yearPosts);
    }

    const data = {};
    for (const [year, posts] of years.entries()) {
      // Make sure the posts are sorted by date (in descending order).
      data[year] = posts.sort((a, b) => b.date.getTime() - a.date.getTime());
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
