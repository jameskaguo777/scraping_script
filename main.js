const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

const url = "https://www.tripadvisor.com/ShowForum-g293752-i9486-o2980-Zanzibar_Archipelago.html";

axios.get(url).then(response => {
  const html = response.data;
  const $ = cheerio.load(html);
  const links = [];
  
  $(".topics").each(function (i, element) {

    $(this).find("a").each(function (i1, element1) {
      const link = $(this).attr("href");
      links.push(link);
    });
    
    const title = $(this)
      .find("b")
      .text();
    links.push({
      title,
    });
  });
  console.log(links);
} );

