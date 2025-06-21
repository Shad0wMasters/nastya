// Функция для переключения экранов
function switchScreen(fromId, toId) {
    const fromScreen = document.getElementById(fromId);
    const toScreen = document.getElementById(toId);
    
    if (fromScreen && toScreen) {
        fromScreen.classList.remove('active');
        setTimeout(() => {
            toScreen.classList.add('active');
            createParticles();
        }, 300);
    }
}

// Показать второй вопрос
function showQuestion() {
    switchScreen('welcome-screen', 'question-screen');
    playSound('success');
}

// Показать скример
function showScrimer() {
    // Определяем текущий активный экран
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen) {
        const currentId = activeScreen.id;
        switchScreen(currentId, 'scrimer-screen');
    }
    
    // Интенсивные эффекты скримера
    playScrimerSound();
    createScrimerEffects();
    
    // Добавляем эффект тряски экрана
    document.body.style.animation = 'scrimerShake 0.1s ease-in-out infinite';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);
    
    // Мигание экрана
    flashScreen();
}

// Перезапустить игру
function restart() {
    const scrimerScreen = document.getElementById('scrimer-screen');
    const welcomeScreen = document.getElementById('welcome-screen');
    
    if (scrimerScreen && welcomeScreen) {
        scrimerScreen.classList.remove('active');
        setTimeout(() => {
            welcomeScreen.classList.add('active');
        }, 300);
    }
}

// Движение кнопки "Нет" при наведении
function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    
    button.style.position = 'absolute';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
    button.style.transition = 'all 0.3s ease';
}

// Создание частиц
function createParticles() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            particle.style.animationDuration = (Math.random() * 2 + 1) + 's';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }, i * 100);
    }
}

// Создание эффектов скримера
function createScrimerEffects() {
    // Создаем красные частицы
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '3px';
            particle.style.height = '3px';
            particle.style.background = '#ff0000';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.style.zIndex = '9999';
            particle.style.pointerEvents = 'none';
            particle.style.animation = `scrimerParticle ${Math.random() * 2 + 1}s linear`;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, i * 50);
    }
    
    // Создаем вспышки
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const flash = document.createElement('div');
            flash.style.position = 'fixed';
            flash.style.top = '0';
            flash.style.left = '0';
            flash.style.width = '100%';
            flash.style.height = '100%';
            flash.style.background = 'rgba(255, 0, 0, 0.3)';
            flash.style.zIndex = '9998';
            flash.style.pointerEvents = 'none';
            flash.style.animation = 'flash 0.1s ease-out';
            
            document.body.appendChild(flash);
            
            setTimeout(() => {
                flash.remove();
            }, 100);
        }, i * 200);
    }
}

// Мигание экрана
function flashScreen() {
    const flashes = [
        { color: 'rgba(255, 0, 0, 0.5)', duration: 100 },
        { color: 'rgba(255, 255, 255, 0.8)', duration: 50 },
        { color: 'rgba(255, 0, 0, 0.3)', duration: 150 },
        { color: 'rgba(255, 255, 255, 0.6)', duration: 75 }
    ];
    
    flashes.forEach((flash, index) => {
        setTimeout(() => {
            const flashDiv = document.createElement('div');
            flashDiv.style.position = 'fixed';
            flashDiv.style.top = '0';
            flashDiv.style.left = '0';
            flashDiv.style.width = '100%';
            flashDiv.style.height = '100%';
            flashDiv.style.background = flash.color;
            flashDiv.style.zIndex = '9997';
            flashDiv.style.pointerEvents = 'none';
            
            document.body.appendChild(flashDiv);
            
            setTimeout(() => {
                flashDiv.remove();
            }, flash.duration);
        }, index * 300);
    });
}

// Звуковые эффекты (если браузер поддерживает)
function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (type === 'success') {
            // Приятный звук для "Да"
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }
    } catch (e) {
        console.log('Звук не поддерживается в этом браузере');
    }
}

// Звук скримера с реальным аудиофайлом
function playScrimerSound() {
    try {
        // Создаем аудио элемент
        const audio = new Audio('fvfyfyfyv.mp3');
        audio.volume = 0.8; // Устанавливаем громкость на 80%
        
        // Пытаемся воспроизвести звук
        audio.play().catch(error => {
            console.log('Ошибка воспроизведения звука:', error);
            // Если не удалось воспроизвести файл, используем синтезированный звук
            playIntenseScrimerSound();
        });
        
        // Добавляем обработчик ошибок
        audio.addEventListener('error', function() {
            console.log('Ошибка загрузки аудиофайла, используем синтезированный звук');
            playIntenseScrimerSound();
        });
        
    } catch (e) {
        console.log('Ошибка создания аудио, используем синтезированный звук:', e);
        playIntenseScrimerSound();
    }
}

// Интенсивный звук скримера (запасной вариант)
function playIntenseScrimerSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Создаем несколько осцилляторов для более интенсивного звука
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                // Разные частоты для более пугающего эффекта
                const baseFreq = 100 + (i * 50);
                oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 3, audioContext.currentTime + 0.2);
                
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
            }, i * 100);
        }
    } catch (e) {
        console.log('Звук не поддерживается в этом браузере');
    }
}

// Добавляем дополнительные эффекты при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Создаем летающие сердечки
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = ['💕', '💖', '💗', '💓'][Math.floor(Math.random() * 4)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.zIndex = '1';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `float ${Math.random() * 3 + 2}s linear`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 2000);
    
    // Эффект при клике на кнопки
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Создаем эффект волны
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Добавляем отладочную информацию
    console.log('Сайт загружен! Кнопки должны работать.');
    
    // Проверяем наличие всех элементов
    const welcomeScreen = document.getElementById('welcome-screen');
    const questionScreen = document.getElementById('question-screen');
    const scrimerScreen = document.getElementById('scrimer-screen');
    
    console.log('Экраны найдены:', {
        welcome: !!welcomeScreen,
        question: !!questionScreen,
        scrimer: !!scrimerScreen
    });
    
    // Проверяем наличие аудиофайла
    const audio = new Audio('fvfyfyfyv.mp3');
    audio.addEventListener('canplaythrough', function() {
        console.log('Аудиофайл скримера загружен успешно!');
    });
    audio.addEventListener('error', function() {
        console.log('Аудиофайл скримера не найден, будет использован синтезированный звук');
    });
});

// Добавляем CSS для эффекта волны и скримера
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes scrimerParticle {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateY(-100px);
            opacity: 0;
        }
    }
    
    @keyframes flash {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Эффект при наведении на кнопку "Нет" (только для первого экрана)
document.addEventListener('DOMContentLoaded', function() {
    const noButton = document.querySelector('#welcome-screen .btn-no');
    if (noButton) {
        noButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(0.9)';
        });
        
        noButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// Добавляем эффект печатания для заголовков
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Применяем эффект печатания к заголовкам
document.addEventListener('DOMContentLoaded', function() {
    const titles = document.querySelectorAll('.title');
    titles.forEach(title => {
        const originalText = title.textContent;
        setTimeout(() => {
            typeWriter(title, originalText, 50);
        }, 500);
    });
}); 