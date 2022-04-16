const headers = require('./header');

const errorHandle = (res, err) => {
	res.writeHead(400, headers);
	res.write(
		JSON.stringify({
			status: 'ERROR',
			message: '資料格式錯誤，或是 id 不正確',
      err
		})
	);
	res.end();
};

module.exports = errorHandle;
