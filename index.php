<?php
// index.php - پخش‌کننده ویدیو حرفه‌ای
// طراحی شده توسط Ththt.ir

$videoUrl = $_GET['u'] ?? '';

// اصلاح اعتبارسنجی: هم download و هم online را پشتیبانی می‌کند
$isValidUrl = !empty($videoUrl) && (
    strpos($videoUrl, 'https://download.ththt.ir/file/') === 0 || 
    strpos($videoUrl, 'https://online.ththt.ir/file/') === 0
);

// عنوان صفحه
$pageTitle = $isValidUrl ? 'پخش ویدیو' : 'پخش‌کننده ویدیو آنلاین';
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#0f172a">
    <meta name="description" content="پخش آنلاین ویدیو با کیفیت بالا - Ththt.ir">
    <title><?php echo $pageTitle; ?> | Ththt.ir</title>
    <!-- Bootstrap RTL -->
    <link rel="stylesheet" href="https://cdn2.ththt.ir/bootstrap-5.3.8-dist/css/bootstrap.rtl.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdn2.ththt.ir/fontawesome-free-6.7.2-web/css/all.min.css">
    <!-- فونت وزیر -->
    <link rel="stylesheet" href="https://cdn2.ththt.ir/font-vazir.css">
    <!-- استایل سفارشی -->
    <link rel="stylesheet" href="style.css">
</head>
<body class="bg-dark">
    <!-- هدر -->
    <header class="main-header shadow">
        <nav class="navbar navbar-expand-lg py-2">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center gap-2" href="?">
                    <span class="brand-icon"><i class="fa-solid fa-film"></i></span>
                    <span class="brand-text">Ththt<span class="text-primary">.ir</span></span>
                </a>
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link <?php echo !$isValidUrl ? 'active' : ''; ?>" href="?">
                                <i class="fa-solid fa-home"></i> خانه
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#features">
                                <i class="fa-solid fa-star"></i> امکانات
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#help">
                                <i class="fa-solid fa-circle-question"></i> راهنما
                            </a>
                        </li>
                    </ul>
                    <div class="d-flex gap-2">
                        <a href="https://ththt.ir" target="_blank" class="btn btn-outline-light btn-sm">
                            <i class="fa-solid fa-globe"></i> سایت اصلی
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <!-- محتوای اصلی -->
    <main class="main-content">
        <?php if (!$isValidUrl): ?>
        <!-- صفحه ورود -->
        <section class="hero-section py-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center">
                        <div class="hero-badge mb-3">
                            <span class="badge bg-gradient"><i class="fa-solid fa-play me-1"></i> پخش‌کننده حرفه‌ای</span>
                        </div>
                        <h1 class="hero-title mb-3">
                            پخش آنلاین ویدیو
                            <span class="text-gradient">با کیفیت بالا</span>
                        </h1>
                        <p class="hero-desc text-muted mb-4">
                            ویدیوهای خود را با بالاترین کیفیت و سرعت پخش کنید
                        </p>
                        <!-- فرم جستجو -->
                        <form action="" method="GET" class="search-form mb-4">
                            <div class="input-group input-group-lg search-box">
                                <span class="input-group-text bg-card border-end-0">
                                    <i class="fa-solid fa-link"></i>
                                </span>
                                <input type="url"
                                       name="u"
                                       class="form-control border-start-0 bg-card border-secondary"
                                       placeholder="https://download.ththt.ir/file/ یا https://online.ththt.ir/file/..."
                                       required
                                       dir="ltr">
                                <button class="btn btn-primary px-4" type="submit">
                                    <i class="fa-solid fa-play me-1"></i>
                                    پخش ویدیو
                                </button>
                            </div>
                        </form>
                        <?php if ($videoUrl && !$isValidUrl): ?>
                        <div class="alert alert-danger d-inline-flex align-items-center gap-2">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            لینک وارد شده معتبر نیست! فقط لینک‌های download.ththt.ir و online.ththt.ir پشتیبانی می‌شوند.
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </section>
        <!-- امکانات -->
        <section class="features-section py-5" id="features">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="section-title">امکانات ویژه</h2>
                    <p class="text-muted">ابزارهای حرفه‌ای برای تجربه بهتر</p>
                </div>
                <div class="row g-4">
                    <div class="col-md-6 col-lg-3">
                        <div class="feature-card">
                            <div class="feature-icon bg-primary bg-opacity-10 text-primary">
                                <i class="fa-solid fa-film"></i>
                            </div>
                            <h5>فریم‌گذاری</h5>
                            <p>فریم به فریم ویدیو را مشاهده کنید</p>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="feature-card">
                            <div class="feature-icon bg-success bg-opacity-10 text-success">
                                <i class="fa-solid fa-volume-high"></i>
                            </div>
                            <h5>کنترل صدا</h5>
                            <p>صدا را به دلخواه کم و زیاد کنید</p>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="feature-card">
                            <div class="feature-icon bg-warning bg-opacity-10 text-warning">
                                <i class="fa-solid fa-rotate"></i>
                            </div>
                            <h5>چرخش ویدیو</h5>
                            <p>ویدیو را در زوایای مختلف بچرخانید</p>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="feature-card">
                            <div class="feature-icon bg-info bg-opacity-10 text-info">
                                <i class="fa-solid fa-mobile-screen-button"></i>
                            </div>
                            <h5>ریسپانسیو</h5>
                            <p>سازگار با تمام دستگاه‌ها</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- راهنما -->
        <section class="help-section py-5 bg-card" id="help">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="text-center mb-4">
                            <h2 class="section-title">راهنمای استفاده</h2>
                        </div>
                        <div class="help-accordion" id="helpAccordion">
                            <div class="accordion-item bg-transparent border-secondary">
                                <h2 class="accordion-header">
                                    <button class="accordion-button bg-card collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#help1">
                                        <i class="fa-solid fa-circle-question me-2"></i>
                                        نحوه استفاده از پخش‌کننده
                                    </button>
                                </h2>
                                <div id="help1" class="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                                    <div class="accordion-body text-muted">
                                        ۱. لینک ویدیو از سایت <code>download.ththt.ir/file/</code> یا <code>online.ththt.ir/file/</code> را کپی کنید.<br>
                                        ۲. در فرم بالا paste کنید.<br>
                                        ۳. دکمه پخش ویدیو را بزنید.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item bg-transparent border-secondary">
                                <h2 class="accordion-header">
                                    <button class="accordion-button bg-card collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#help2">
                                        <i class="fa-solid fa-keyboard me-2"></i>
                                        میانبرهای کیبورد
                                    </button>
                                </h2>
                                <div id="help2" class="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                                    <div class="accordion-body text-muted">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <ul class="list-unstyled">
                                                    <li><kbd>Space</kbd> پخش/توقف</li>
                                                    <li><kbd>←</kbd> عقب ۱۰ ثانیه</li>
                                                    <li><kbd>→</kbd> جلو ۱۰ ثانیه</li>
                                                </ul>
                                            </div>
                                            <div class="col-md-6">
                                                <ul class="list-unstyled">
                                                    <li><kbd>↑</kbd> زیاد کردن صدا</li>
                                                    <li><kbd>↓</kbd> کم کردن صدا</li>
                                                    <li><kbd>F</kbd> تمام‌صفحه</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <?php else: ?>
        <!-- صفحه پلیر -->
        <section class="player-section py-3">
            <div class="container-fluid px-2 px-md-3">
                <!-- Breadcrumb -->
                <nav aria-label="breadcrumb" class="mb-3 d-none d-md-block">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="?" class="text-muted"><i class="fa-solid fa-home"></i> خانه</a></li>
                        <li class="breadcrumb-item active text-light" aria-current="page"><i class="fa-solid fa-play"></i> پخش ویدیو</li>
                    </ol>
                </nav>
                <!-- پلیر -->
                <div class="player-wrapper" id="playerWrapper">
                    <!-- ویدیو -->
                    <div class="video-container" id="videoContainer">
                        <video id="videoPlayer"
                               playsinline
                               webkit-playsinline
                               preload="metadata">
                            <source src="<?php echo htmlspecialchars($videoUrl); ?>" type="video/mp4">
                        </video>
                        <!-- Overlay Click Handler -->
                        <div class="video-overlay" id="videoOverlay">
                            <!-- Big Play Button (center) -->
                            <div class="big-play-btn" id="bigPlayBtn">
                                <i class="fa-solid fa-play"></i>
                            </div>
                        </div>
                        <!-- Loading Spinner -->
                        <div class="video-loader" id="videoLoader">
                            <div class="loader-ring"></div>
                            <p class="mt-3 mb-0">در حال بارگذاری...</p>
                        </div>
                        <!-- Center Message -->
                        <div class="center-message" id="centerMessage"></div>
                        <!-- Buffer Progress -->
                        <div class="buffer-indicator" id="bufferIndicator"></div>
                    </div>
                    <!-- کنترل‌ها -->
                    <div class="player-controls" id="playerControls">
                        <!-- Progress Bar -->
                        <div class="progress-wrapper" id="progressWrapper">
                            <div class="progress-bar-custom" id="progressBar">
                                <div class="progress-buffered" id="progressBuffered"></div>
                                <div class="progress-current" id="progressCurrent"></div>
                                <div class="progress-handle" id="progressHandle"></div>
                            </div>
                            <div class="progress-tooltip" id="progressTooltip"></div>
                        </div>
                        <!-- دکمه‌های کنترل -->
                        <div class="controls-row">
                            <!-- گروه چپ -->
                            <div class="controls-group controls-group-right">
                                <!-- پخش/توقف -->
                                <button class="btn-control btn-play" id="playPauseBtn" title="پخش/توقف (Space)">
                                    <i class="fa-solid fa-play icon-play" id="playIcon"></i>
                                    <i class="fa-solid fa-pause icon-pause d-none" id="pauseIcon"></i>
                                </button>
                                <!-- عقب/جلو -->
                                <button class="btn-control btn-skip" id="rewindBtn" title="عقب ۱۰ ثانیه (←)">
                                    <i class="fa-solid fa-rotate-left"></i>
                                    <span class="skip-text">10</span>
                                </button>
                                <button class="btn-control btn-skip" id="forwardBtn" title="جلو ۱۰ ثانیه (→)">
                                    <span class="skip-text">10</span>
                                    <i class="fa-solid fa-rotate-right"></i>
                                </button>
                                <!-- فریم -->
                                <button class="btn-control btn-sm" id="prevFrameBtn" title="فریم قبلی (,)">
                                    <i class="fa-solid fa-backward-step"></i>
                                </button>
                                <button class="btn-control btn-sm" id="nextFrameBtn" title="فریم بعدی (.)">
                                    <i class="fa-solid fa-forward-step"></i>
                                </button>
                                <!-- صدا -->
                                <div class="volume-group">
                                    <button class="btn-control" id="muteBtn" title="بی‌صدا (M)">
                                        <i class="fa-solid fa-volume-high icon-vol" id="volIcon"></i>
                                        <i class="fa-solid fa-volume-xmark icon-mute d-none" id="muteVolIcon"></i>
                                    </button>
                                    <input type="range" class="volume-slider" id="volumeSlider" min="0" max="1" step="0.05" value="1">
                                </div>
                                <!-- زمان -->
                                <div class="time-display">
                                    <span id="currentTime">00:00</span>
                                    <span class="time-separator">/</span>
                                    <span id="duration">00:00</span>
                                </div>
                            </div>
                            <!-- گروه راست -->
                            <div class="controls-group controls-group-left">
                                <!-- چرخش -->
                                <button class="btn-control btn-sm" id="rotateLeftBtn" title="چرخش چپ (Q)">
                                    <i class="fa-solid fa-rotate-left"></i>
                                </button>
                                <button class="btn-control btn-sm" id="rotateRightBtn" title="چرخش راست (E)">
                                    <i class="fa-solid fa-rotate-right"></i>
                                </button>
                                <!-- سرعت -->
                                <div class="speed-group">
                                    <select class="speed-select" id="speedSelect" title="سرعت پخش">
                                        <option value="0.25">0.25x</option>
                                        <option value="0.5">0.5x</option>
                                        <option value="0.75">0.75x</option>
                                        <option value="1" selected>1x</option>
                                        <option value="1.25">1.25x</option>
                                        <option value="1.5">1.5x</option>
                                        <option value="2">2x</option>
                                    </select>
                                </div>
                                <!-- Picture-in-Picture -->
                                <button class="btn-control btn-sm" id="pipBtn" title="تصویر در تصویر (P)">
                                    <i class="fa-solid fa-clover"></i>
                                </button>
                                <!-- تمام‌صفحه -->
                                <button class="btn-control" id="fullscreenBtn" title="تمام‌صفحه (F)">
                                    <i class="fa-solid fa-expand icon-expand" id="fsIcon"></i>
                                    <i class="fa-solid fa-compress icon-compress d-none" id="fsExitIcon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- اطلاعات -->
                <div class="player-info mt-3">
                    <div class="row g-2 g-md-3">
                        <div class="col-6 col-md-4">
                            <div class="info-card">
                                <span class="info-label"><i class="fa-solid fa-circle-info me-1"></i> وضعیت</span>
                                <span class="info-value" id="videoStatus">
                                    <span class="badge bg-secondary">آماده</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-6 col-md-4">
                            <div class="info-card">
                                <span class="info-label"><i class="fa-solid fa-link me-1"></i> لینک ویدیو</span>
                                <a href="<?php echo htmlspecialchars($videoUrl); ?>" target="_blank" class="info-link">
                                    <i class="fa-solid fa-up-right-from-square"></i> مشاهده
                                </a>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="info-card">
                                <span class="info-label"><i class="fa-solid fa-share-nodes me-1"></i> اشتراک‌گذاری</span>
                                <button class="btn btn-sm btn-outline-primary w-100" id="shareBtn">
                                    <i class="fa-solid fa-share"></i> اشتراک‌گذاری
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <?php endif; ?>
    </main>
    <!-- فوتر -->
    <footer class="main-footer">
        <div class="container">
            <div class="row g-4">
                <div class="col-lg-4">
                    <div class="footer-brand">
                        <span class="brand-icon"><i class="fa-solid fa-film"></i></span>
                        <span class="brand-name">Ththt<span>.ir</span></span>
                    </div>
                    <p class="text-muted mt-3">
                        پخش‌کننده ویدیو آنلاین با بالاترین کیفیت و سرعت.
                        تمامی حقوق محفوظ است.
                    </p>
                    <div class="social-links mt-3">
                        <a href="#" class="social-link"><i class="fa-brands fa-telegram"></i></a>
                        <a href="#" class="social-link"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" class="social-link"><i class="fa-brands fa-github"></i></a>
                    </div>
                </div>
                <div class="col-lg-4">
                    <h6 class="footer-title">دسترسی سریع</h6>
                    <ul class="footer-links">
                        <li><a href="?"><i class="fa-solid fa-chevron-right"></i> صفحه اصلی</a></li>
                        <li><a href="#features"><i class="fa-solid fa-chevron-right"></i> امکانات</a></li>
                        <li><a href="#help"><i class="fa-solid fa-chevron-right"></i> راهنما</a></li>
                        <li><a href="https://ththt.ir" target="_blank"><i class="fa-solid fa-chevron-right"></i> سایت اصلی</a></li>
                    </ul>
                </div>
                <div class="col-lg-4">
                    <h6 class="footer-title">اطلاعات</h6>
                    <ul class="footer-links text-muted">
                        <li><i class="fa-solid fa-shield-halved me-2"></i> امن و سریع</li>
                        <li><i class="fa-solid fa-bolt me-2"></i> پخش با سرعت بالا</li>
                        <li><i class="fa-solid fa-mobile-screen me-2"></i> سازگار با موبایل</li>
                        <li><i class="fa-solid fa-rotate me-2"></i> پشتیبانی از فرمت‌های مختلف</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p class="mb-0">
                    ساخته شده با
                    <i class="fa-solid fa-heart text-danger"></i>
                    توسط
                    <a href="https://ththt.ir" target="_blank" class="text-primary text-decoration-none">Ththt.ir</a>
                </p>
                <p class="mb-0 text-muted small">
                    © ۱۴۰۴ - تمامی حقوق محفوظ است
                </p>
            </div>
        </div>
    </footer>
    <!-- Bootstrap JS -->
    <script src="https://cdn2.ththt.ir/bootstrap-5.3.8-dist/js/bootstrap.bundle.min.js"></script>
    <!-- Player JS -->
    <script src="player.js"></script>
    <?php if ($isValidUrl): ?>
    <script>
    // اشتراک‌گذاری
    document.getElementById('shareBtn').addEventListener('click', function() {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: 'پخش ویدیو',
                text: 'ویدیو را در Ththt.ir ببینید',
                url: url
            });
        } else {
            navigator.clipboard.writeText(url);
            showCenterMessage('لینک کپی شد!', 2000);
        }
    });
    </script>
    <?php endif; ?>
</body>
</html>