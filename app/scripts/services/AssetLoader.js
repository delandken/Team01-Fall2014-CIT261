angular.module('MatchingGame').factory('AssetLoader', function() {
	function AssetManager() {
		this.imageQueue = [];
		this.soundsQueue = [];

		this.imageMap = {};
		this.soundMap = {};

		this.successCount = 0;
		this.errorCount = 0;

	}

	AssetManager.prototype.queueImage = function(path) {
		this.imageQueue.push(path);
	}

	AssetManager.prototype.queueSound = function(path) {
		this.soundsQueue.push(path);
	}

	AssetManager.prototype.downloadAll = function(queue, assetTag, assetCache) {
		var _this = this;

		for (var i = 0, path; path = queue[i]; i++) {
			var el = document.createElement(assetTag);
			el.onload = function() {
				_this.successCount++;
			}
			assetCache[path] = el;
			el.src = path;
		}
	}

	AssetManager.prototype.downloadSounds = function() {
		this.downloadAll(this.soundsQueue, 'audio', this.soundMap);
	}

	AssetManager.prototype.downloadImages = function() {
		this.downloadAll(this.imageQueue, 'img', this.imageMap);
	}

	return new AssetManager();
});