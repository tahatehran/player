// player.js - کنترل‌های پخش‌کننده حرفه‌ای Ththt.ir
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('videoPlayer');
    if (!video) return;
    
    // ==================== Elements ====================
    const wrapper = document.getElementById('playerWrapper');
    const container = document.getElementById('videoContainer');
    const overlay = document.getElementById('videoOverlay');
    const bigPlayBtn = document.getElementById('bigPlayBtn');
    const loader = document.getElementById('videoLoader');
    const msg = document.getElementById('centerMessage');
    const controls = document.getElementById('playerControls');
    const bufferIndicator = document.getElementById('bufferIndicator');
    
    // Progress
    const progressWrap = document.getElementById('progressWrapper');
    const progressBar = document.getElementById('progressBar');
    const progressBuffered = document.getElementById('progressBuffered');
    const progressCurrent = document.getElementById('progressCurrent');
    const progressHandle = document.getElementById('progressHandle');
    const progressTooltip = document.getElementById('progressTooltip');
    
    // Controls
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const rewindBtn = document.getElementById('rewindBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const prevFrameBtn = document.getElementById('prevFrameBtn');
    const nextFrameBtn = document.getElementById('nextFrameBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volIcon = document.getElementById('volIcon');
    const muteVolIcon = document.getElementById('muteVolIcon');
    const volumeSlider = document.getElementById('volumeSlider');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const fsIcon = document.getElementById('fsIcon');
    const fsExitIcon = document.getElementById('fsExitIcon');
    const speedSelect = document.getElementById('speedSelect');
    const rotateLeftBtn = document.getElementById('rotateLeftBtn');
    const rotateRightBtn = document.getElementById('rotateRightBtn');
    const pipBtn = document.getElementById('pipBtn');
    
    // Time
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const videoStatus = document.getElementById('videoStatus');
    
    // ==================== State ====================
    let hideTimeout;
    let isDragging = false;
    let rotation = 0;
    let lastVolume = 1;
    let isFullscreen = false;
    let controlsVisible = true;
    
    // ==================== Format Time ====================
    function formatTime(seconds) {
        if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '00:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return m + ':' + s.toString().padStart(2, '0');
    }
    
    // ==================== Show Message ====================
    function showCenterMessage(text, duration = 1000) {
        msg.textContent = text;
        msg.classList.add('show');
        setTimeout(() => msg.classList.remove('show'), duration);
    }
    
    // ==================== Update UI ====================
    function updateUI() {
        if (!video.duration) return;
        
        // Time
        currentTimeEl.textContent = formatTime(video.currentTime);
        durationEl.textContent = formatTime(video.duration);
        
        // Progress
        const progress = (video.currentTime / video.duration) * 100;
        progressCurrent.style.width = progress + '%';
        progressHandle.style.left = progress + '%';
        
        // Buffered
        if (video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1);
            const bufferedProgress = (bufferedEnd / video.duration) * 100;
            progressBuffered.style.width = bufferedProgress + '%';
        }
        
        // Play/Pause icon
        if (video.paused) {
            playIcon.classList.remove('d-none');
            pauseIcon.classList.add('d-none');
            bigPlayBtn.classList.add('show');
        } else {
            playIcon.classList.add('d-none');
            pauseIcon.classList.remove('d-none');
            bigPlayBtn.classList.remove('show');
        }
        
        // Volume icon
        if (video.muted || video.volume === 0) {
            volIcon.classList.add('d-none');
            muteVolIcon.classList.remove('d-none');
        } else {
            volIcon.classList.remove('d-none');
            muteVolIcon.classList.add('d-none');
        }
        
        // Fullscreen icon
        const isFs = !!document.fullscreenElement || !!document.webkitFullscreenElement;
        isFullscreen = isFs;
        fsIcon.classList.toggle('d-none', isFs);
        fsExitIcon.classList.toggle('d-none', !isFs);
        
        // Big play button visibility
        if (!video.paused) {
            bigPlayBtn.classList.remove('show');
        }
    }
    
    // ==================== Show Controls ====================
    function showControls() {
        controls.classList.add('visible');
        controlsVisible = true;
        clearTimeout(hideTimeout);
        if (!video.paused) {
            hideTimeout = setTimeout(() => {
                if (!video.paused && !isDragging) {
                    controls.classList.remove('visible');
                    controlsVisible = false;
                }
            }, 3000);
        }
    }
    
    function hideControls() {
        if (!video.paused) {
            controls.classList.remove('visible');
            controlsVisible = false;
        }
    }
    
    // ==================== Apply Rotation ====================
    function applyRotation() {
        video.style.transform = 'rotate(' + rotation + 'deg)';
        showCenterMessage('چرخش: ' + rotation + '°');
    }
    
    // ==================== Toggle Play ====================
    function togglePlay() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
    
    // ==================== Toggle Fullscreen ====================
    function toggleFullscreen() {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            if (wrapper.requestFullscreen) {
                wrapper.requestFullscreen();
            } else if (wrapper.webkitRequestFullscreen) {
                wrapper.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }
    
    // ==================== Toggle PiP ====================
    async function togglePiP() {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled) {
                await video.requestPictureInPicture();
            }
        } catch (err) {
            showCenterMessage(' PIP پشتیبانی نمی‌شود');
        }
    }
    
    // ==================== Video Events ====================
    video.addEventListener('loadedmetadata', function() {
        loader.classList.remove('show');
        videoStatus.innerHTML = '<span class="badge bg-success"><i class="fa-solid fa-check me-1"></i> آماده</span>';
        updateUI();
        bigPlayBtn.classList.add('show');
    });
    
    video.addEventListener('canplay', function() {
        loader.classList.remove('show');
    });
    
    video.addEventListener('waiting', function() {
        loader.classList.add('show');
        videoStatus.innerHTML = '<span class="badge bg-warning"><i class="fa-solid fa-spinner fa-spin me-1"></i> بارگذاری...</span>';
    });
    
    video.addEventListener('playing', function() {
        loader.classList.remove('show');
        videoStatus.innerHTML = '<span class="badge bg-success"><i class="fa-solid fa-play me-1"></i> در حال پخش</span>';
        bigPlayBtn.classList.remove('show');
    });
    
    video.addEventListener('pause', function() {
        videoStatus.innerHTML = '<span class="badge bg-secondary"><i class="fa-solid fa-pause me-1"></i> متوقف</span>';
        controls.classList.add('visible');
        bigPlayBtn.classList.add('show');
    });
    
    video.addEventListener('play', function() {
        videoStatus.innerHTML = '<span class="badge bg-success"><i class="fa-solid fa-play me-1"></i> در حال پخش</span>';
        showControls();
    });
    
    video.addEventListener('ended', function() {
        videoStatus.innerHTML = '<span class="badge bg-primary"><i class="fa-solid fa-check me-1"></i> پایان یافت</span>';
        controls.classList.add('visible');
        bigPlayBtn.classList.add('show');
    });
    
    video.addEventListener('error', function() {
        loader.classList.remove('show');
        videoStatus.innerHTML = '<span class="badge bg-danger"><i class="fa-solid fa-xmark me-1"></i> خطا!</span>';
        showCenterMessage('خطا در پخش!', 2000);
    });
    
    video.addEventListener('timeupdate', updateUI);
    video.addEventListener('progress', updateUI);
    
    video.addEventListener('volumechange', function() {
        volumeSlider.value = video.muted ? 0 : video.volume;
    });
    
    // ==================== Click Events ====================
    
    // Click overlay to play/pause
    overlay.addEventListener('click', function(e) {
        e.preventDefault();
        if (e.detail === 1) {
            togglePlay();
        }
    });
    
    // Double click for fullscreen
    overlay.addEventListener('dblclick', function(e) {
        e.preventDefault();
        toggleFullscreen();
    });
    
    // Big play button
    bigPlayBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        togglePlay();
    });
    
    // Play/Pause button
    playPauseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        togglePlay();
    });
    
    // Rewind 10s
    rewindBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        video.currentTime = Math.max(0, video.currentTime - 10);
        showCenterMessage('-10 ثانیه');
    });
    
    // Forward 10s
    forwardBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
        showCenterMessage('+10 ثانیه');
    });
    
    // Previous frame
    prevFrameBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        video.pause();
        video.currentTime = Math.max(0, video.currentTime - (1/24));
        showCenterMessage('◀ فریم قبلی');
    });
    
    // Next frame
    nextFrameBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        video.pause();
        video.currentTime = Math.min(video.duration, video.currentTime + (1/24));
        showCenterMessage('فریم بعدی ▶');
    });
    
    // Mute
    muteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (video.muted || video.volume === 0) {
            video.muted = false;
            video.volume = lastVolume || 0.5;
            showCenterMessage('صدا فعال شد');
        } else {
            lastVolume = video.volume;
            video.muted = true;
            showCenterMessage('بی‌صدا');
        }
    });
    
    // Volume slider
    volumeSlider.addEventListener('input', function(e) {
        e.stopPropagation();
        video.volume = this.value;
        video.muted = this.value == 0;
        showCenterMessage('صدا: ' + Math.round(this.value * 100) + '%');
    });
    
    // Speed
    speedSelect.addEventListener('change', function(e) {
        e.stopPropagation();
        video.playbackRate = parseFloat(this.value);
        showCenterMessage('سرعت: ' + this.value + 'x');
    });
    
    // Rotate left
    rotateLeftBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        rotation = (rotation - 90 + 360) % 360;
        applyRotation();
    });
    
    // Rotate right
    rotateRightBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        rotation = (rotation + 90) % 360;
        applyRotation();
    });
    
    // Fullscreen
    fullscreenBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleFullscreen();
    });
    
    // PiP
    pipBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        togglePiP();
    });
    
    // ==================== Progress Bar ====================
    function seekToPercent(percent) {
        const clampedPercent = Math.max(0, Math.min(1, percent));
        video.currentTime = clampedPercent * video.duration;
    }
    
    progressWrap.addEventListener('click', function(e) {
        e.stopPropagation();
        const rect = progressWrap.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        seekToPercent(percent);
    });
    
    progressWrap.addEventListener('mousedown', function(e) {
        e.preventDefault();
        e.stopPropagation();
        isDragging = true;
        controls.classList.add('visible');
        const rect = progressWrap.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        seekToPercent(percent);
    });
    
    progressWrap.addEventListener('mousemove', function(e) {
        e.stopPropagation();
        const rect = progressWrap.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        
        if (isDragging) {
            seekToPercent(percent);
        } else {
            // Tooltip
            const time = percent * video.duration;
            if (!isNaN(time) && isFinite(time)) {
                progressTooltip.textContent = formatTime(time);
                progressTooltip.style.left = Math.max(20, Math.min(rect.width - 20, e.clientX - rect.left)) + 'px';
                progressTooltip.classList.add('show');
            }
        }
    });
    
    progressWrap.addEventListener('mouseleave', function() {
        if (!isDragging) {
            progressTooltip.classList.remove('show');
        }
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    // Touch for progress
    progressWrap.addEventListener('touchstart', function(e) {
        e.preventDefault();
        isDragging = true;
        const touch = e.touches[0];
        const rect = progressWrap.getBoundingClientRect();
        const percent = (touch.clientX - rect.left) / rect.width;
        seekToPercent(percent);
    }, { passive: false });
    
    progressWrap.addEventListener('touchmove', function(e) {
        e.preventDefault();
        if (isDragging) {
            const touch = e.touches[0];
            const rect = progressWrap.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
            seekToPercent(percent);
        }
    }, { passive: false });
    
    progressWrap.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    // ==================== Keyboard ====================
    document.addEventListener('keydown', function(e) {
        // Ignore if typing in input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                togglePlay();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                video.currentTime = Math.max(0, video.currentTime - 10);
                showCenterMessage('-10 ثانیه');
                break;
            case 'ArrowRight':
                e.preventDefault();
                video.currentTime = Math.min(video.duration, video.currentTime + 10);
                showCenterMessage('+10 ثانیه');
                break;
            case 'ArrowUp':
                e.preventDefault();
                video.volume = Math.min(1, video.volume + 0.1);
                showCenterMessage('صدا: ' + Math.round(video.volume * 100) + '%');
                break;
            case 'ArrowDown':
                e.preventDefault();
                video.volume = Math.max(0, video.volume - 0.1);
                showCenterMessage('صدا: ' + Math.round(video.volume * 100) + '%');
                break;
            case 'KeyM':
                muteBtn.click();
                break;
            case 'KeyF':
                e.preventDefault();
                toggleFullscreen();
                break;
            case 'KeyP':
                pipBtn.click();
                break;
            case 'KeyQ':
                rotateLeftBtn.click();
                break;
            case 'KeyE':
                rotateRightBtn.click();
                break;
            case 'Comma':
                e.preventDefault();
                video.pause();
                video.currentTime = Math.max(0, video.currentTime - (1/24));
                showCenterMessage('◀ فریم قبلی');
                break;
            case 'Period':
                e.preventDefault();
                video.pause();
                video.currentTime = Math.min(video.duration, video.currentTime + (1/24));
                showCenterMessage('فریم بعدی ▶');
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                break;
            case 'Key0':
            case 'Key1':
            case 'Key2':
            case 'Key3':
            case 'Key4':
            case 'Key5':
            case 'Key6':
            case 'Key7':
            case 'Key8':
            case 'Key9':
                e.preventDefault();
                const percent = parseInt(e.key) / 10;
                video.currentTime = percent * video.duration;
                showCenterMessage(Math.round(percent * 100) + '%');
                break;
        }
    });
    
    // ==================== Mouse & Touch Events ====================
    
    // Show controls on mouse move
    wrapper.addEventListener('mousemove', function() {
        showControls();
    });
    
    wrapper.addEventListener('mouseleave', function() {
        hideControls();
    });
    
    // Swipe to seek (mobile) with visual feedback
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let swipeDirection = null;
    
    overlay.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = video.currentTime;
        swipeDirection = null;
    }, { passive: true });
    
    overlay.addEventListener('touchmove', function(e) {
        const touchX = e.touches[0].clientX;
        const deltaX = touchX - touchStartX;
        
        if (Math.abs(deltaX) > 30) {
            swipeDirection = 'horizontal';
            const seekTime = (deltaX / window.innerWidth) * video.duration * 0.5;
            const newTime = Math.max(0, Math.min(video.duration, touchStartTime + seekTime));
            const percent = (newTime / video.duration) * 100;
            progressCurrent.style.width = percent + '%';
            progressHandle.style.left = percent + '%';
            currentTimeEl.textContent = formatTime(newTime);
            showCenterMessage((deltaX > 0 ? '+' : '') + Math.round(seekTime) + 's');
        }
    }, { passive: true });
    
    // ==================== Fullscreen Change ====================
    document.addEventListener('fullscreenchange', function() {
        updateUI();
        if (document.fullscreenElement) {
            wrapper.classList.add('fullscreen-mode');
        } else {
            wrapper.classList.remove('fullscreen-mode');
        }
    });
    
    document.addEventListener('webkitfullscreenchange', function() {
        updateUI();
    });
    
    // ==================== PiP Events ====================
    video.addEventListener('enterpictureinpicture', function() {
        pipBtn.querySelector('i').className = 'fa-solid fa-compress';
        showCenterMessage('تصویر در تصویر فعال شد');
    });
    
    video.addEventListener('leavepictureinpicture', function() {
        pipBtn.querySelector('i').className = 'fa-solid fa-clover';
        showCenterMessage('تصویر در تصویر غیرفعال شد');
    });
    
    // ==================== Context Menu ====================
    video.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // ==================== Initialize ====================
    video.load();
    loader.classList.add('show');
    controls.classList.add('visible');
    
    // Auto-hide controls after a delay
    setTimeout(() => {
        if (!video.paused) {
            hideControls();
        }
    }, 4000);
});