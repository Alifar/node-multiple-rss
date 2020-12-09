This project is inspired by [rss-combiner](https://github.com/Geo-Developers/rss-combiner 'npm node-feedparser package') to combine multiple feeds including images.

## Project setup

Download or clone repository

```
npm install
```

### Usage

#### Example

In `index.js`

```js
var feedConfig = {
	title: 'Title of your feed',
	size: 20,
	feeds: [
		'https://website1.com/feed/',
		'https://website2.com/feed/',
		'https://website3.com/feed/',
	],
	pubDate: new Date(),
	softFail: true,
};
```

Additional options

- `title` **string** the title of your feed
- `size` **int** the maximum number of entries to keep (most recently published will be kept)
- `feeds` **array url string** array of feed_urls to retrieve content from
- `softFail` _optional_ **boolean** if true failing to retrieve a single feed will not result in an error being thrown (default value: false)

### Compiles and hot-reloads for development

```
npm run dev
```

## Docker

### Build docker image for production

```
docker build -f Dockerfile -t rss-feeds:prod .
```

### Run docker container with image

```
docker run -it -p 32791:5000 --rm rss-feeds:prod
```
# node-multiple-rss
