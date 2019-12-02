// ========== constiables
const videosContainer = document.getElementsByClassName('videos')[0];
const menu = document.getElementsByClassName('menu')[0];
const menuOptions = menu.getElementsByClassName('options')[0];
const playBtn = document.getElementsByClassName('play')[0];
const catLink = document.getElementById('cat-person');
const dogLink = document.getElementById('dog-person');

// ========== Init Video
window.onload = initVideo();

// ========== Init Video Function
function initVideo() {
	// ========== Click Event Listeners
	playBtn.addEventListener('click', function() {
		playBtn.style.display = 'none';
		initMenu();
	});
	catLink.addEventListener('click', () => showVideos(0, videosContainer.getElementsByClassName('cat')));
	dogLink.addEventListener('click', () => showVideos(0, videosContainer.getElementsByClassName('dog')));

	// ========== Menus
	function initMenu() {
		playVideo(videosContainer.getElementsByClassName('initial')[0], (loop = true));
		menu.style.display = 'block';
		menu.getElementsByClassName('initial')[0].style.display = 'block';
		menuOptions.style.display = 'block';
	}

	function endMenu() {
		playVideo(videosContainer.getElementsByClassName('closing')[0], (loop = true));

		menu.getElementsByClassName('initial')[0].style.display = 'none';
		menu.style.display = 'block';
		menu.getElementsByClassName('closing')[0].style.display = 'block';
		menuOptions.style.display = 'block';
	}

	// ========== Play video
	function playVideo(videoContainer, loop = false) {
		const lastVideoContainer = videosContainer.getElementsByClassName('active')[0];
		lastVideoContainer.classList.remove('active');
		lastVideoContainer.style.display = 'none';

		videoContainer.style.display = 'block';
		videoContainer.classList.add('active');

		const video = videoContainer.getElementsByTagName('video')[0];
		video.preload = 'auto';
		video.load();
		video.play();
		video.loop = loop;

		return video;
	}

	function showVideos(index, videos) {
		menu.style.display = 'none';
		index < videos.length - 1 ? (nextVideo = true) : (nextVideo = false);

		const video = playVideo(videos[index]);
		video.addEventListener('timeupdate', function() {
			const currentTime = this.currentTime / this.duration * 100;
			if (nextVideo && currentTime > 70) {
				nextVideo = videos[index + 1];
				nextVideoTag = nextVideo.getElementsByTagName('video')[0];
				nextVideoTag.preload = 'auto';
			}
		});
		video.onended = () => (nextVideo ? showVideos(index + 1, videos) : endMenu());
	}
}
