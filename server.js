const http = require('http');
const mongoose = require('mongoose');
const Posts = require('./models/posts');
const errorHandle = require('./errorHendle');
const headers = require('./header');

const DB = 'mongodb://localhost:27017/week2-team';

mongoose
	.connect(DB)
	.then(() => console.log('連到資料庫成功'))
	.catch((err) => console.log(err));

const requestListener = async (req, res) => {
	const reqUrl = req.url;
	const reqMethod = req.method;

	let body = '';
	req.on('data', (chuck) => {
		body += chuck;
	});

	if (reqUrl == '/posts' && reqMethod == 'GET') {
		const getPosts = await Posts.find();

		res.writeHead(200, headers);
		res.write(
			JSON.stringify({
				status: 'success',
				posts: getPosts
			})
		);
		res.end();

		// 新增貼文
	} else if (reqUrl == '/posts' && reqMethod == 'POST') {
		req.on('end', async () => {
			try {
				const post = JSON.parse(body);
				if (
					!post.userName ||
					!post.userContent ||
					post.userPhoto !== undefined
				) {
					// 新增貼文內容，前端要照順序給資料 userName, userContent, userPhoto
					const createPost = await Posts.create({
						userName: post.userName,
						userContent: post.userContent,
						userPhoto: post.userPhoto
					});

					res.writeHead(200, headers);
					res.write(
						JSON.stringify({
							status: 'success',
							post: createPost
						})
					);
					res.end();
				} else {
					errorHandle(res);
				}
			} catch (err) {
				errorHandle(res, err.message);
			}
		});
	} else if (reqMethod == 'OPTIONS') {
		res.writeHead(200, headers);
		res.end();
	} else {
		res.writeHead(404, headers);
		res.write(
			JSON.stringify({
				status: 'ERROR',
				message: '路徑不正確，或是資料格式錯誤'
			})
		);
		res.end();
	}
};

const server = http.createServer(requestListener);
const port = process.env.PORT || 3005;
server.listen(port);
