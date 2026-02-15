// ========================================
// NOVA AI - AKILLI EĞİTİM PLATFORMU
// Baştan yazılmış, temiz kod
// ========================================

console.log('🚀 Nova AI yükleniyor...');

// Global değişkenler
let currentUser = null;
let currentSlide = 1;
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;

// Avatar haritası
const AVATAR_MAP = {
    1: '😊', 2: '🎯', 3: '🚀', 4: '⭐', 5: '🎨', 6: '🎵'
};

// Duygu durumu mesajları
const MOOD_MESSAGES = {
    happy: {
        5: 'Harika! Bu enerjiyle çok güzel çalışacaksın bugün! 🌟',
        6: 'Süper! Mutlu bir günde öğrenmek çok daha kolay! 🎉',
        7: 'Mükemmel! Bu moralinle hedeflerine bir adım daha yaklaşacaksın! ✨',
        8: 'Harika bir enerji! LGS\'ye hazır olma yolunda ilerliyorsun! 🚀'
    },
    normal: {
        5: 'İyi görünüyorsun! Küçük adımlarla başlayalım bugün. 📚',
        6: 'Gayet iyi! Bugün de elimizden geleni yapalım. 💪',
        7: 'Normal bir gün, ama her gün ilerleme günü! 🎯',
        8: 'Düzenli çalışma en önemlisi. Haydi başlayalım! 📖'
    },
    tired: {
        5: 'Biraz yorgunsun, o zaman kısa ve verimli çalışalım! 😊',
        6: 'Yorgun olsan da küçük bir çalışma seni motive edebilir! 💫',
        7: 'Yorgunluğu yenmenin yolu düzenli dinlenmek ve az da olsa çalışmak! ⏰',
        8: 'LGS\'ye hazırlık maraton gibi. Ara ver ama bırakma! 🎓'
    },
    stressed: {
        5: 'Stresli hissediyorsun ama sen yapabilirsin! Derin bir nefes al. 🌸',
        6: 'Stres normal bir duygu. Ama sen bunun üstesinden geleceksin! 💚',
        7: 'Sınav stresi olabilir ama düzenli çalışma stresi azaltır! 🧘',
        8: 'LGS yaklaşıyor biliyorum, ama sen çok iyi gidiyorsun! Kendine güven! 🔥'
    }
};

// Sınıflara özel içerikler
const CONTENT_DATABASE = {
    5: {
        matematik: [
            { title: 'Doğal Sayılar', link: 'https://www.youtube.com/results?search_query=5.sınıf+doğal+sayılar', description: 'Doğal sayılar konusunu öğren' },
            { title: 'Kesirler', link: 'https://www.youtube.com/results?search_query=5.sınıf+kesirler', description: 'Kesirler konusunu pekiştir' }
        ],
        fen: [
            { title: 'Güneş Sistemi', link: 'https://www.youtube.com/results?search_query=5.sınıf+güneş+sistemi', description: 'Güneş sistemini keşfet' }
        ],
        turkce: [
            { title: 'Anlatım Türleri', link: 'https://www.youtube.com/results?search_query=5.sınıf+anlatım+türleri', description: 'Anlatım türlerini öğren' }
        ],
        motivasyon: [
            { title: 'Ortaokula Uyum', link: 'https://www.youtube.com/results?search_query=5.sınıf+motivasyon', description: 'Ortaokul hayatına adapte ol' }
        ],
        oyun: [
            { title: 'Matematik Oyunu', link: 'https://www.coolmathgames.com/', description: 'Eğlenceli matematik' }
        ]
    },
    6: {
        matematik: [
            { title: 'Tam Sayılar', link: 'https://www.youtube.com/results?search_query=6.sınıf+tam+sayılar', description: 'Tam sayıları öğren' }
        ],
        fen: [
            { title: 'Vücudumuz', link: 'https://www.youtube.com/results?search_query=6.sınıf+vücudumuz', description: 'İnsan vücudu' }
        ],
        turkce: [
            { title: 'Cümle Türleri', link: 'https://www.youtube.com/results?search_query=6.sınıf+cümle+türleri', description: 'Cümle çeşitlerini öğren' }
        ],
        motivasyon: [
            { title: 'Etkili Çalışma', link: 'https://www.youtube.com/results?search_query=6.sınıf+çalışma+teknikleri', description: 'Verimli çalış' }
        ],
        oyun: [
            { title: 'Kelime Oyunu', link: 'https://www.wordgames.com/', description: 'Kelime hazinen artsın' }
        ]
    },
    7: {
        matematik: [
            { title: 'Cebirsel İfadeler', link: 'https://www.youtube.com/results?search_query=7.sınıf+cebirsel+ifadeler', description: 'Cebir temelleri' }
        ],
        fen: [
            { title: 'Kuvvet ve Enerji', link: 'https://www.youtube.com/results?search_query=7.sınıf+kuvvet+enerji', description: 'Fizik temelleri' }
        ],
        turkce: [
            { title: 'Fiil Çekimi', link: 'https://www.youtube.com/results?search_query=7.sınıf+fiil', description: 'Fiiller konusu' }
        ],
        motivasyon: [
            { title: 'Sınav Hazırlık', link: 'https://www.youtube.com/results?search_query=7.sınıf+sınav+motivasyon', description: 'Sınavlara hazırlan' }
        ],
        oyun: [
            { title: 'Strateji Oyunu', link: 'https://www.coolmathgames.com/', description: 'Düşün ve kazan' }
        ]
    },
    8: {
        matematik: [
            { title: 'LGS Matematik', link: 'https://www.youtube.com/results?search_query=lgs+matematik', description: 'LGS matematiğe hazırlan' }
        ],
        fen: [
            { title: 'LGS Fen', link: 'https://www.youtube.com/results?search_query=lgs+fen', description: 'LGS fene hazırlan' }
        ],
        turkce: [
            { title: 'LGS Türkçe', link: 'https://www.youtube.com/results?search_query=lgs+türkçe', description: 'LGS Türkçeye hazırlan' }
        ],
        motivasyon: [
            { title: 'LGS Motivasyon', link: 'https://www.youtube.com/results?search_query=lgs+motivasyon', description: 'LGS\'ye moral' }
        ],
        oyun: [
            { title: 'Hızlı Düşünme', link: 'https://www.coolmathgames.com/', description: 'Hızlı düşün' }
        ]
    }
};

// ========================================
// YARDIMCI FONKSİYONLAR
// ========================================

function showPage(pageId) {
    console.log('Sayfa değiştiriliyor:', pageId);
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

function saveToLocalStorage() {
    localStorage.setItem('novaAI_user', JSON.stringify(currentUser));
    console.log('Veri kaydedildi:', currentUser);
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('novaAI_user');
    if (saved) {
        currentUser = JSON.parse(saved);
        console.log('Veri yüklendi:', currentUser);
        if (currentUser.type === 'student') {
            showPage('student-dashboard');
            initStudentDashboard();
        } else {
            showPage('teacher-dashboard');
            initTeacherDashboard();
        }
        return true;
    }
    return false;
}

// ========================================
// LANDING PAGE
// ========================================

function setupLandingPage() {
    const videoBtn = document.getElementById('open-video-btn');
    const continueBtn = document.getElementById('continue-btn');
    
    if (videoBtn) {
        videoBtn.addEventListener('click', () => {
            console.log('Video butonu tıklandı');
            window.open('https://youtu.be/jGzy8SgJ1Yo', '_blank');
        });
    }
    
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            console.log('Devam Et butonu tıklandı');
            showPage('register-selection');
        });
    }
}

// ========================================
// KAYIT SEÇİMİ
// ========================================

function setupRegisterSelection() {
    const studentCard = document.getElementById('select-student');
    const teacherCard = document.getElementById('select-teacher');
    
    if (studentCard) {
        studentCard.addEventListener('click', () => {
            console.log('Öğrenci seçildi');
            showPage('student-register');
        });
    }
    
    if (teacherCard) {
        teacherCard.addEventListener('click', () => {
            console.log('Öğretmen seçildi');
            showPage('teacher-register');
        });
    }
}

// ========================================
// ÖĞRENCİ KAYIT
// ========================================

function setupStudentRegister() {
    // Avatar seçimi
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => {
        option.addEventListener('click', function() {
            avatarOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            const avatarId = this.getAttribute('data-avatar');
            document.getElementById('selected-avatar').value = avatarId;
            console.log('Avatar seçildi:', avatarId);
        });
    });
    
    // Form gönderimi
    const studentForm = document.getElementById('student-form');
    if (studentForm) {
        studentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Öğrenci formu gönderiliyor...');
            
            const name = document.getElementById('student-name').value.trim();
            const grade = document.getElementById('student-grade').value;
            const avatar = document.getElementById('selected-avatar').value;
            const classCode = document.getElementById('class-code').value.trim();
            
            if (!name || !grade || !avatar) {
                alert('Lütfen tüm zorunlu alanları doldurun!');
                return;
            }
            
            currentUser = {
                type: 'student',
                name: name,
                grade: parseInt(grade),
                avatar: parseInt(avatar),
                classCode: classCode,
                studySessions: [],
                exams: [],
                totalStudyTime: 0,
                streak: 0,
                lastStudyDate: null,
                schedule: null,
                todaySchedule: []
            };
            
            saveToLocalStorage();
            showPage('schedule-setup');
        });
    }
}

// ========================================
// ÖĞRETMEN KAYIT
// ========================================

function setupTeacherRegister() {
    const teacherForm = document.getElementById('teacher-form');
    if (teacherForm) {
        teacherForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Öğretmen formu gönderiliyor...');
            
            const name = document.getElementById('teacher-name').value.trim();
            const email = document.getElementById('teacher-email').value.trim();
            const branch = document.getElementById('teacher-branch').value;
            
            if (!name || !email || !branch) {
                alert('Lütfen tüm zorunlu alanları doldurun!');
                return;
            }
            
            currentUser = {
                type: 'teacher',
                name: name,
                email: email,
                branch: branch,
                classes: []
            };
            
            saveToLocalStorage();
            showPage('teacher-dashboard');
            initTeacherDashboard();
        });
    }
}

// ========================================
// DERS PROGRAMI OLUŞTURMA
// ========================================

function setupScheduleSetup() {
    const scheduleForm = document.getElementById('schedule-form');
    if (scheduleForm) {
        scheduleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Ders programı oluşturuluyor...');
            
            const selectedSubjects = Array.from(document.querySelectorAll('input[name="subjects"]:checked'))
                .map(cb => cb.value);
            
            if (selectedSubjects.length === 0) {
                alert('En az bir ders seçmelisin!');
                return;
            }
            
            const dailyHours = parseInt(document.getElementById('daily-study-hours').value);
            const timePreference = document.getElementById('study-time-preference').value;
            
            currentUser.schedule = {
                subjects: selectedSubjects,
                dailyHours: dailyHours,
                timePreference: timePreference
            };
            
            saveToLocalStorage();
            showPage('onboarding');
        });
    }
}

// ========================================
// ONBOARDING
// ========================================

function setupOnboarding() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const startBtn = document.getElementById('start-btn');
    const dots = document.querySelectorAll('.dot');
    
    function updateSlides() {
        document.querySelectorAll('.slide').forEach(slide => {
            slide.classList.remove('active');
        });
        
        const activeSlide = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
        if (activeSlide) {
            activeSlide.classList.add('active');
        }
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === currentSlide);
        });
        
        if (prevBtn) prevBtn.style.display = currentSlide === 1 ? 'none' : 'inline-block';
        if (nextBtn) nextBtn.style.display = currentSlide === 4 ? 'none' : 'inline-block';
        if (startBtn) startBtn.style.display = currentSlide === 4 ? 'inline-block' : 'none';
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 1) {
                currentSlide--;
                updateSlides();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentSlide < 4) {
                currentSlide++;
                updateSlides();
            }
        });
    }
    
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            console.log('Uygulama başlatılıyor...');
            if (currentUser.type === 'student') {
                showPage('student-dashboard');
                initStudentDashboard();
            } else {
                showPage('teacher-dashboard');
                initTeacherDashboard();
            }
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index + 1;
            updateSlides();
        });
    });
}

// ========================================
// ÖĞRENCİ PANELİ
// ========================================

function initStudentDashboard() {
    console.log('Öğrenci paneli yükleniyor...');
    
    document.getElementById('user-name-display').textContent = currentUser.name;
    document.getElementById('user-avatar').textContent = AVATAR_MAP[currentUser.avatar];
    
    setupMoodSelection();
    setupTabs();
    setupTimer();
    setupExamForm();
    setupContentFilters();
    displayDailySchedule();
    loadContentList('all');
    updateStats();
    
    // Çıkış butonu
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
                currentUser = null;
                localStorage.removeItem('novaAI_user');
                showPage('landing-page');
            }
        });
    }
    
    // Program düzenle butonu
    const editScheduleBtn = document.getElementById('edit-schedule-btn');
    if (editScheduleBtn) {
        editScheduleBtn.addEventListener('click', () => {
            showPage('schedule-setup');
            if (currentUser.schedule) {
                document.getElementById('daily-study-hours').value = currentUser.schedule.dailyHours;
                document.getElementById('study-time-preference').value = currentUser.schedule.timePreference;
                currentUser.schedule.subjects.forEach(subject => {
                    const checkbox = document.querySelector(`input[name="subjects"][value="${subject}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            }
        });
    }
}

function setupMoodSelection() {
    const moodOptions = document.querySelectorAll('.mood-option');
    moodOptions.forEach(option => {
        option.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            console.log('Duygu durumu seçildi:', mood);
            
            moodOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            const messageEl = document.getElementById('mood-message');
            const message = MOOD_MESSAGES[mood][currentUser.grade];
            messageEl.textContent = message;
            messageEl.classList.add('show');
            
            const today = new Date().toDateString();
            currentUser.lastMood = mood;
            currentUser.lastMoodDate = today;
            
            currentUser.todaySchedule = generateDailySchedule(mood);
            
            displayDailySchedule();
            saveToLocalStorage();
        });
    });
}

function generateDailySchedule(mood) {
    if (!currentUser.schedule) return [];
    
    const subjects = currentUser.schedule.subjects;
    const dailyHours = currentUser.schedule.dailyHours;
    
    let studyMultiplier = 1;
    let sessionLength = 45;
    
    if (mood === 'happy') {
        studyMultiplier = 1.2;
        sessionLength = 50;
    } else if (mood === 'tired') {
        studyMultiplier = 0.7;
        sessionLength = 30;
    } else if (mood === 'stressed') {
        studyMultiplier = 0.85;
        sessionLength = 35;
    }
    
    const adjustedHours = Math.ceil(dailyHours * studyMultiplier);
    const totalMinutes = adjustedHours * 60;
    const breakTime = 10;
    
    const schedule = [];
    let currentTime = getStartTime(currentUser.schedule.timePreference);
    let remainingMinutes = totalMinutes;
    let subjectIndex = 0;
    
    while (remainingMinutes > 0 && subjectIndex < subjects.length * 3) {
        const subject = subjects[subjectIndex % subjects.length];
        const duration = Math.min(sessionLength, remainingMinutes);
        
        schedule.push({
            subject: subject,
            startTime: currentTime,
            duration: duration
        });
        
        currentTime = addMinutes(currentTime, duration + breakTime);
        remainingMinutes -= duration;
        subjectIndex++;
    }
    
    return schedule;
}

function getStartTime(preference) {
    const times = {
        morning: '08:00',
        afternoon: '14:00',
        evening: '19:00',
        mixed: '15:00'
    };
    return times[preference] || '14:00';
}

function addMinutes(time, minutes) {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMins = totalMinutes % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
}

function displayDailySchedule() {
    const scheduleEl = document.getElementById('daily-schedule');
    
    if (!currentUser.todaySchedule || currentUser.todaySchedule.length === 0) {
        scheduleEl.innerHTML = '<p style="text-align:center; color: #6b7280;">Önce duygu durumunu seç, sana özel program hazırlansın!</p>';
        return;
    }
    
    scheduleEl.innerHTML = '';
    
    const subjectNames = {
        matematik: 'Matematik',
        fen: 'Fen Bilimleri',
        turkce: 'Türkçe',
        sosyal: 'Sosyal Bilgiler',
        ingilizce: 'İngilizce',
        din: 'Din Kültürü'
    };
    
    currentUser.todaySchedule.forEach(item => {
        const scheduleItem = document.createElement('div');
        scheduleItem.className = 'schedule-item';
        
        scheduleItem.innerHTML = `
            <div>
                <div class="schedule-time">${item.startTime}</div>
                <div class="schedule-subject">${subjectNames[item.subject]}</div>
            </div>
            <div class="schedule-duration">${item.duration} dk</div>
        `;
        
        scheduleEl.appendChild(scheduleItem);
    });
}

function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            console.log('Sekme değiştirildi:', tabName);
            
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            const targetContent = document.getElementById(`${tabName}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            if (tabName === 'stats') {
                updateStats();
                drawStatsChart();
            } else if (tabName === 'exam') {
                loadExamHistory();
            } else if (tabName === 'study') {
                displayDailySchedule();
            }
        });
    });
}

function setupTimer() {
    const startBtn = document.getElementById('start-timer-btn');
    const pauseBtn = document.getElementById('pause-timer-btn');
    const stopBtn = document.getElementById('stop-timer-btn');
    
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            console.log('Zamanlayıcı başlatıldı');
            timerRunning = true;
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
            stopBtn.style.display = 'inline-block';
            
            timerInterval = setInterval(() => {
                timerSeconds++;
                updateTimerDisplay();
            }, 1000);
        });
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            if (timerRunning) {
                console.log('Zamanlayıcı duraklatıldı');
                timerRunning = false;
                clearInterval(timerInterval);
                pauseBtn.textContent = 'Devam Et';
            } else {
                console.log('Zamanlayıcı devam ettiriliyor');
                timerRunning = true;
                pauseBtn.textContent = 'Duraklat';
                timerInterval = setInterval(() => {
                    timerSeconds++;
                    updateTimerDisplay();
                }, 1000);
            }
        });
    }
    
    if (stopBtn) {
        stopBtn.addEventListener('click', () => {
            console.log('Zamanlayıcı durduruldu');
            clearInterval(timerInterval);
            timerRunning = false;
            
            document.getElementById('focus-selection').style.display = 'block';
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'none';
            stopBtn.style.display = 'none';
        });
    }
    
    // Odak butonları
    const focusBtns = document.querySelectorAll('.btn-focus');
    focusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const focusLevel = this.getAttribute('data-focus');
            console.log('Odak seviyesi kaydedildi:', focusLevel);
            
            const session = {
                duration: timerSeconds,
                focus: focusLevel,
                date: new Date().toISOString()
            };
            
            currentUser.studySessions.push(session);
            currentUser.totalStudyTime += timerSeconds;
            
            updateStreak();
            saveToLocalStorage();
            
            timerSeconds = 0;
            updateTimerDisplay();
            document.getElementById('focus-selection').style.display = 'none';
            document.getElementById('start-timer-btn').style.display = 'inline-block';
            
            alert('Çalışman kaydedildi! Harikasın! 🎉');
            updateStats();
        });
    });
}

function updateTimerDisplay() {
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;
    
    const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('timer-display').textContent = display;
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastDate = currentUser.lastStudyDate;
    
    if (!lastDate) {
        currentUser.streak = 1;
    } else {
        const lastStudy = new Date(lastDate);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastStudy.toDateString() === yesterday.toDateString()) {
            currentUser.streak++;
        } else if (lastStudy.toDateString() !== today) {
            currentUser.streak = 1;
        }
    }
    
    currentUser.lastStudyDate = today;
}

function setupExamForm() {
    const examForm = document.getElementById('exam-form');
    if (examForm) {
        examForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Deneme ekleniyor...');
            
            const exam = {
                date: new Date().toISOString(),
                turkce: {
                    dogru: parseInt(document.getElementById('turkce-dogru').value) || 0,
                    yanlis: parseInt(document.getElementById('turkce-yanlis').value) || 0,
                    bos: parseInt(document.getElementById('turkce-bos').value) || 0
                },
                matematik: {
                    dogru: parseInt(document.getElementById('matematik-dogru').value) || 0,
                    yanlis: parseInt(document.getElementById('matematik-yanlis').value) || 0,
                    bos: parseInt(document.getElementById('matematik-bos').value) || 0
                },
                fen: {
                    dogru: parseInt(document.getElementById('fen-dogru').value) || 0,
                    yanlis: parseInt(document.getElementById('fen-yanlis').value) || 0,
                    bos: parseInt(document.getElementById('fen-bos').value) || 0
                },
                sosyal: {
                    dogru: parseInt(document.getElementById('sosyal-dogru').value) || 0,
                    yanlis: parseInt(document.getElementById('sosyal-yanlis').value) || 0,
                    bos: parseInt(document.getElementById('sosyal-bos').value) || 0
                }
            };
            
            exam.turkce.net = parseFloat((exam.turkce.dogru - (exam.turkce.yanlis / 4)).toFixed(2));
            exam.matematik.net = parseFloat((exam.matematik.dogru - (exam.matematik.yanlis / 4)).toFixed(2));
            exam.fen.net = parseFloat((exam.fen.dogru - (exam.fen.yanlis / 4)).toFixed(2));
            exam.sosyal.net = parseFloat((exam.sosyal.dogru - (exam.sosyal.yanlis / 4)).toFixed(2));
            exam.totalNet = parseFloat((exam.turkce.net + exam.matematik.net + exam.fen.net + exam.sosyal.net).toFixed(2));
            
            currentUser.exams.push(exam);
            saveToLocalStorage();
            
            examForm.reset();
            loadExamHistory();
            
            let message = '';
            if (exam.totalNet >= 60) {
                message = 'Muhteşem bir performans! Böyle devam et! 🌟';
            } else if (exam.totalNet >= 40) {
                message = 'İyi gidiyorsun! Biraz daha çalışmayla harika olacaksın! 💪';
            } else {
                message = 'Her deneme bir öğrenme fırsatı! Pes etme, sen yapabilirsin! 🎯';
            }
            alert(message);
        });
    }
}

function loadExamHistory() {
    const historyEl = document.getElementById('exam-history');
    
    if (!currentUser.exams || currentUser.exams.length === 0) {
        historyEl.innerHTML = '<p style="text-align:center; color: #6b7280;">Henüz deneme girmedin. İlk denemeni ekle!</p>';
        return;
    }
    
    historyEl.innerHTML = '';
    
    currentUser.exams.slice().reverse().forEach((exam) => {
        const examDate = new Date(exam.date).toLocaleDateString('tr-TR');
        const examDiv = document.createElement('div');
        examDiv.className = 'exam-item';
        
        const messageClass = exam.totalNet >= 50 ? 'success' : 'warning';
        const message = exam.totalNet >= 50 ? 'Harika bir sonuç! 🎉' : 'Gelişmeye devam! 💪';
        
        examDiv.innerHTML = `
            <div class="exam-header">
                <span class="exam-date">${examDate}</span>
                <span class="exam-total">Toplam: ${exam.totalNet} net</span>
            </div>
            <div class="exam-details">
                <div class="exam-subject">
                    <strong>Türkçe</strong>
                    <span>${exam.turkce.net}</span>
                </div>
                <div class="exam-subject">
                    <strong>Matematik</strong>
                    <span>${exam.matematik.net}</span>
                </div>
                <div class="exam-subject">
                    <strong>Fen</strong>
                    <span>${exam.fen.net}</span>
                </div>
                <div class="exam-subject">
                    <strong>Sosyal</strong>
                    <span>${exam.sosyal.net}</span>
                </div>
            </div>
            <div class="exam-message ${messageClass}">${message}</div>
        `;
        
        historyEl.appendChild(examDiv);
    });
    
    drawExamChart();
}

function drawExamChart() {
    const canvas = document.getElementById('exam-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!currentUser.exams || currentUser.exams.length === 0) {
        ctx.fillStyle = '#6b7280';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Henüz deneme verisi yok', canvas.width / 2, canvas.height / 2);
        return;
    }
    
    const exams = currentUser.exams.slice(-5);
    const pointWidth = (canvas.width - 100) / (exams.length - 1 || 1);
    const maxNet = 80;
    
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    exams.forEach((exam, index) => {
        const x = 50 + index * pointWidth;
        const y = canvas.height - 40 - (exam.totalNet / maxNet) * (canvas.height - 60);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        ctx.fillStyle = '#6366f1';
        ctx.fillRect(x - 4, y - 4, 8, 8);
        
        ctx.fillStyle = '#1f2937';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(exam.totalNet, x, canvas.height - 20);
    });
    
    ctx.stroke();
}

function setupContentFilters() {
    const filterBtns = document.querySelectorAll('.btn-category');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            console.log('İçerik filtresi:', category);
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            loadContentList(category);
        });
    });
}

function loadContentList(category) {
    const contentList = document.getElementById('content-list');
    contentList.innerHTML = '';
    
    const gradeContent = CONTENT_DATABASE[currentUser.grade];
    let contentItems = [];
    
    if (category === 'all') {
        Object.values(gradeContent).forEach(items => {
            contentItems = contentItems.concat(items);
        });
    } else {
        contentItems = gradeContent[category] || [];
    }
    
    contentItems.forEach(item => {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content-item';
        contentDiv.style.cursor = 'pointer';
        
        contentDiv.addEventListener('click', () => {
            window.open(item.link, '_blank');
        });
        
        contentDiv.innerHTML = `
            <div class="content-info">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `;
        
        contentList.appendChild(contentDiv);
    });
    
    if (contentItems.length === 0) {
        contentList.innerHTML = '<p style="text-align:center; color: #6b7280;">Bu kategoride içerik bulunamadı.</p>';
    }
}

function updateStats() {
    const totalMinutes = Math.floor(currentUser.totalStudyTime / 60);
    document.getElementById('total-study-time').textContent = `${totalMinutes} dk`;
    
    document.getElementById('streak-days').textContent = `${currentUser.streak} gün`;
    
    if (currentUser.studySessions.length > 0) {
        const focusMap = { low: 1, medium: 2, high: 3 };
        const avgFocus = currentUser.studySessions.reduce((sum, session) => sum + focusMap[session.focus], 0) / currentUser.studySessions.length;
        const focusText = avgFocus >= 2.5 ? 'Yüksek' : avgFocus >= 1.5 ? 'Orta' : 'Düşük';
        document.getElementById('avg-focus').textContent = focusText;
    } else {
        document.getElementById('avg-focus').textContent = '-';
    }
    
    if (currentUser.exams.length > 0) {
        const avgNet = currentUser.exams.reduce((sum, exam) => sum + parseFloat(exam.totalNet), 0) / currentUser.exams.length;
        document.getElementById('avg-net').textContent = avgNet.toFixed(1);
    } else {
        document.getElementById('avg-net').textContent = '0.0';
    }
}

function drawStatsChart() {
    const canvas = document.getElementById('stats-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (currentUser.studySessions.length === 0) {
        ctx.fillStyle = '#6b7280';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Henüz çalışma verisi yok', canvas.width / 2, canvas.height / 2);
        return;
    }
    
    const last7Days = currentUser.studySessions.slice(-7);
    const barWidth = (canvas.width - 100) / last7Days.length;
    const maxDuration = Math.max(...last7Days.map(s => s.duration), 1);
    
    last7Days.forEach((session, index) => {
        const barHeight = (session.duration / maxDuration) * (canvas.height - 60);
        const x = 50 + index * barWidth;
        const y = canvas.height - 40 - barHeight;
        
        ctx.fillStyle = '#6366f1';
        ctx.fillRect(x, y, barWidth - 10, barHeight);
        
        ctx.fillStyle = '#1f2937';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.floor(session.duration / 60)}dk`, x + barWidth / 2, canvas.height - 20);
    });
}

// ========================================
// ÖĞRETMEN PANELİ
// ========================================

function initTeacherDashboard() {
    console.log('Öğretmen paneli yükleniyor...');
    
    document.getElementById('teacher-name-display').textContent = currentUser.name;
    
    const createClassBtn = document.getElementById('create-class-btn');
    if (createClassBtn) {
        createClassBtn.addEventListener('click', () => {
            const className = prompt('Sınıf adını girin (örn: 8-A):');
            if (!className) return;
            
            const classCode = generateClassCode();
            const newClass = {
                id: Date.now(),
                name: className,
                code: classCode,
                students: []
            };
            
            currentUser.classes.push(newClass);
            saveToLocalStorage();
            loadClassList();
            alert(`Sınıf oluşturuldu! Kod: ${classCode}`);
        });
    }
    
    const teacherLogoutBtn = document.getElementById('teacher-logout-btn');
    if (teacherLogoutBtn) {
        teacherLogoutBtn.addEventListener('click', () => {
            if (confirm('Çıkış yapmak istediğinize emin misiniz?')) {
                currentUser = null;
                localStorage.removeItem('novaAI_user');
                showPage('landing-page');
            }
        });
    }
    
    loadClassList();
}

function generateClassCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function loadClassList() {
    const listEl = document.getElementById('class-list');
    
    if (!currentUser.classes || currentUser.classes.length === 0) {
        listEl.innerHTML = '<p style="text-align:center; color: #6b7280; margin-top: 20px;">Henüz sınıf oluşturmadınız.</p>';
        return;
    }
    
    listEl.innerHTML = '';
    
    currentUser.classes.forEach(cls => {
        const classDiv = document.createElement('div');
        classDiv.className = 'selection-card';
        classDiv.style.cursor = 'pointer';
        classDiv.addEventListener('click', () => {
            viewClassDetails(cls.id);
        });
        classDiv.innerHTML = `
            <h3>${cls.name}</h3>
            <p>Kod: ${cls.code}</p>
            <p>${cls.students.length} öğrenci</p>
        `;
        listEl.appendChild(classDiv);
    });
}

function viewClassDetails(classId) {
    const selectedClass = currentUser.classes.find(c => c.id === classId);
    if (!selectedClass) return;
    
    document.getElementById('class-details').style.display = 'block';
    document.getElementById('selected-class-name').textContent = selectedClass.name;
    document.getElementById('class-code-display').textContent = selectedClass.code;
    
    const copyCodeBtn = document.getElementById('copy-code-btn');
    if (copyCodeBtn) {
        copyCodeBtn.onclick = () => {
            const code = document.getElementById('class-code-display').textContent;
            navigator.clipboard.writeText(code).then(() => {
                alert('Sınıf kodu kopyalandı!');
            });
        };
    }
    
    const studentsEl = document.getElementById('students-list');
    
    if (selectedClass.students.length === 0) {
        studentsEl.innerHTML = '<p style="text-align:center; color: #6b7280;">Bu sınıfta henüz öğrenci yok.</p>';
    } else {
        studentsEl.innerHTML = '';
        selectedClass.students.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.className = 'student-card';
            studentDiv.innerHTML = `
                <div class="student-header">
                    <span class="student-name">${student.name}</span>
                    <span class="student-grade">${student.grade}. Sınıf</span>
                </div>
                <div class="student-stats">
                    <div class="student-stat">
                        <strong>Çalışma</strong>
                        <span>${Math.floor(student.totalStudyTime / 60)} dk</span>
                    </div>
                    <div class="student-stat">
                        <strong>Ortalama Net</strong>
                        <span>${student.avgNet || 0}</span>
                    </div>
                    <div class="student-stat">
                        <strong>Son Aktivite</strong>
                        <span>${student.lastActive || 'Yok'}</span>
                    </div>
                </div>
            `;
            studentsEl.appendChild(studentDiv);
        });
    }
}

// ========================================
// BAŞLATMA
// ========================================

function init() {
    console.log('✅ Nova AI başlatıldı!');
    
    // Tüm sayfa event listener'larını kur
    setupLandingPage();
    setupRegisterSelection();
    setupStudentRegister();
    setupTeacherRegister();
    setupScheduleSetup();
    setupOnboarding();
    
    // Kaydedilmiş kullanıcı var mı kontrol et
    if (!loadFromLocalStorage()) {
        showPage('landing-page');
    }
}

// Sayfa yüklendiğinde başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

console.log('✅ Nova AI Script tamamen yüklendi!');
