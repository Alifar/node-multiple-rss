var http = require('http');
var cron = require('node-cron');
var RSSCombiner = require('./utils/combine');

var xml = null;

var feedConfig = {
	title: 'News Feed',
	size: 20,
	feeds: [
		'https://nieuws.btcdirect.eu/feed/',
		'https://feedpress.me/iculture',
		'https://www.nu.nl/rss/Economie',
		'https://www.nu.nl/rss/Tech',
		'https://nl.investing.com/rss/news_285.rss',
		'https://www.rtlnieuws.nl/tech?_format=rss',
	],
	pubDate: new Date(),
	softFail: true,
};

RSSCombiner(feedConfig)
	.then(function (combinedFeed) {
		xml = combinedFeed.xml();
	})
	.catch(err => {
		console.log(err);
		res.status(200).send(err);
	});

cron.schedule('* * * * *', () => {
	RSSCombiner(feedConfig)
		.then(function (combinedFeed) {
			xml = combinedFeed.xml();
		})
		.catch(err => {
			console.log(err);
			res.status(200).send(err);
		});
});

http
	.createServer(function (req, res) {
		res.writeHead(200, { 'Content-Type': 'application/xhtml+xml' });
		res.end(xml);
	})
	.listen(5000);
