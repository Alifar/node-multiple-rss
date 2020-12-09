var http = require('http');
var RSSCombiner = require('./utils/combine');

var feedConfig = {
	title: 'News Feed',
	size: 20,
	feeds: [
		'https://nieuws.btcdirect.eu/feed/',
		'https://feedpress.me/iculture',
		'https://www.nu.nl/rss/Economie',
		'https://www.nu.nl/rss/Tech',
		'https://nl.investing.com/rss/news_285.rss',
	],
	pubDate: new Date(),
	softFail: true,
};

RSSCombiner(feedConfig)
	.then(function (combinedFeed) {
		var xml = combinedFeed.xml();
		http
			.createServer(function (req, res) {
				res.writeHead(200, { 'Content-Type': 'application/xhtml+xml' });
				res.end(xml);
			})
			.listen(5000);
	})
	.catch(err => {
		console.log(err);
		res.status(200).send(err);
	});
