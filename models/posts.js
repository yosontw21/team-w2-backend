const mongoose = require('mongoose');

const PostScheam = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: [ true, '名字必填' ]
		},
		userContent: {
			type: String,
			required: [ true, '內容必填' ]
		},
		userPhoto: {
			type: String,
			default: ''
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		}
	},
	{
		versionKey: false,
		collection: 'posts'
	}
);

const Posts = mongoose.model('', PostScheam);

module.exports = Posts;
