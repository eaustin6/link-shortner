<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Anime Link Shortener</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #2d1b47 0%, #1a1030 100%);
            min-height: 100vh;
            color: #fff;
        }
        
        .anime-card {
            background: rgba(92, 67, 138, 0.25);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            border: 1px solid rgba(255, 179, 236, 0.2);;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }
        
        .anime-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        
        .btn-anime {
            background: linear-gradient(45deg, #ff5e8a 0%, #9d50ff 100%);
            border: none;
            color: white;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
        }
        
        .btn-anime:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(255, 45, 117, 0.4);
        }
        
        .anime-input {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            transition: all 0.3s ease;
        }
        
        .anime-input:focus {
            outline: none;
            border-color: #ff2d75;
            box-shadow: 0 0 0 2px rgba(255, 45, 117, 0.2);
        }
        
        .anime-logo {
            font-weight: 700;
            background: linear-gradient(45deg, #ff2d75 0%, #91d5ff 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .result-container {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(5px);
            border-radius: 10px;
            transition: all 0.5s ease;
            max-height: 0;
            overflow: hidden;
        }
        
        .result-container.show {
            max-height: 200px;
            padding: 1rem;
            margin-top: 1rem;
        }
        
        .copy-btn {
            background: rgba(255, 255, 255, 0.1);
            transition: all 0.2s ease;
        }
        
        .copy-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .sakura-petal {
            position: absolute;
            background-image: url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bd307a7d-bc66-4396-97ea-de3a28acfe02.png');
            background-size: cover;
            pointer-events: none;
            z-index: 1;
            animation: fall linear infinite;
        }
        
        @keyframes fall {
            0% {
                transform: translate(0, -10vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translate(calc(15vw * var(--random-x)), 100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .floating-emoji {
            position: absolute;
            animation: float 6s ease-in-out infinite;
            opacity: 0.7;
            z-index: -1;
        }
        
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
    </style>
</head>
<body class="flex items-center justify-center p-4 relative overflow-hidden">
    <div id="sakura-container"></div>
    <!-- Floating decorative emojis -->
    <div class="floating-emoji" style="top: 10%; left: 15%; font-size: 2rem;">🌸</div>
    <div class="floating-emoji" style="top: 70%; right: 20%; font-size: 2.5rem;">✨</div>
    <div class="floating-emoji" style="bottom: 15%; left: 25%; font-size: 1.8rem;">⚡</div>
    
    <div class="w-full max-w-2xl mx-auto">
        <div class="text-center mb-8">
            <div class="flex items-center justify-center mb-4">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5ec92fa4-8602-46f6-a89a-6a4e1109b8f3.png" alt="Anime-style mascot character with pink hair and holding a link chain" class="w-16 h-16 rounded-full mr-3" />
                <h1 class="text-4xl font-bold anime-logo">AnimeLink</h1>
            </div>
            <p class="text-lg text-gray-300">Shorten your URLs with anime style!</p>
        </div>
        
        <div class="anime-card p-6 mb-6">
            <div class="space-y-3">
                <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <input type="text" id="url-input" class="anime-input flex-grow px-4 py-3 rounded-lg" placeholder="Paste your long URL here..." />
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-gray-300 whitespace-nowrap mr-2">anime.li/</span>
                    <input type="text" id="custom-path" class="anime-input flex-grow px-4 py-3 rounded-lg" placeholder="custom-path (optional)" />
                    <button id="shorten-btn" class="btn-anime px-6 py-3 rounded-lg hover:shadow-purple-500/30">Shorten</button>
                </div>
            </div>
            
            <div id="result-container" class="result-container">
                <div class="flex items-center">
                    <input type="text" id="short-url" class="anime-input flex-grow px-4 py-2 rounded-l-lg" readonly />
                    <button id="copy-btn" class="copy-btn px-4 py-2 rounded-r-lg">Copy</button>
                </div>
                <div class="mt-3 text-sm text-center text-gray-300">
                    <p>Link will not expire. Enjoy your custom URL!</p>
                </div>
            </div>
        </div>
        
        <div class="anime-card p-6">
            <h2 class="text-xl font-semibold mb-4">Recent Links</h2>
            <div id="recent-links" class="space-y-3">
                <!-- Recent links will appear here -->
                <div class="text-center py-4 text-gray-400">No recent links yet</div>
            </div>
        </div>

        <div class="anime-card p-6">
            <h2 class="text-xl font-semibold mb-4">Telegram Logging</h2>
            <div class="space-y-4">
                <p class="text-gray-300">Get notifications in Telegram when your links are clicked</p>
                <input type="text" id="telegram-username" class="anime-input w-full px-4 py-3 rounded-lg" placeholder="Your Telegram username (without @)" />
                <button id="connect-telegram" class="btn-anime w-full px-6 py-3 rounded-lg">Enable Logging</button>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const urlInput = document.getElementById('url-input');
            const customPathInput = document.getElementById('custom-path');
            const shortenBtn = document.getElementById('shorten-btn');
            const resultContainer = document.getElementById('result-container');
            const shortUrlInput = document.getElementById('short-url');
            const copyBtn = document.getElementById('copy-btn');
            // Simulated "database" of shortened URLs (telegram username will be added here)
            const urlDatabase = {};
            
            // Generate short code (random or custom)
            function generateShortCode() {
                const customPath = document.getElementById('custom-path').value.trim();
                if (customPath) {
                    // Validate custom path
                    if (!/^[a-z0-9_-]+$/i.test(customPath)) {
                        throw new Error('Custom path can only contain letters, numbers, dashes and underscores');
                    }
                    if (customPath in urlDatabase) {
                        throw new Error('This custom path is already in use');
                    }
                    return customPath;
                }
                
                // Generate random if no custom path
                const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
                let result = '';
                for (let i = 0; i < 6; i++) {
                    result += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return result;
            }
            
            // Shorten URL
            shortenBtn.addEventListener('click', function() {
                const longUrl = urlInput.value.trim();
                
                if (!longUrl) {
                    alert('Please enter a URL to shorten');
                    return;
                }
                
                // Validate URL format
                if (!isValidUrl(longUrl)) {
                    alert('Please enter a valid URL starting with http:// or https://');
                    return;
                }
                
                try {
                    // Generate short URL
                    const shortCode = generateShortCode();
                    const shortUrl = window.location.href.split('/')[0] + '//' + window.location.host + '/' + shortCode;
                } catch (error) {
                    alert(error.message);
                    return;
                }
                
                // Store in "database" (simulated)
                urlDatabase[shortCode] = {
                    longUrl: longUrl,
                    createdAt: new Date().toISOString(),
                    clicks: 0
                };
                
                // Update UI
                shortUrlInput.value = shortUrl;
                resultContainer.classList.add('show');
                
                // For demo, show Telegram connect reminder if not set
                if (!localStorage.getItem('telegramUsername')) {
                    telegramUsernameInput.focus();
                }
            });
            
            // Copy short URL
            copyBtn.addEventListener('click', function() {
                shortUrlInput.select();
                document.execCommand('copy');
                
                // Visual feedback
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            });
            
            // URL validation helper
            function isValidUrl(string) {
                try {
                    new URL(string);
                    return true;
                } catch (_) {
                    return false;
                }
            }
            
            // Update recent links list
            function updateRecentLinks() {
                recentLinksContainer.innerHTML = '';
                
                if (Object.keys(urlDatabase).length === 0) {
                    recentLinksContainer.innerHTML = '<div class="text-center py-4 text-gray-400">No recent links yet</div>';
                    return;
                }
                
                Object.entries(urlDatabase).forEach(([code, data]) => {
                    const shortUrlElement = document.createElement('div');
                    shortUrlElement.className = 'flex items-center justify-between p-3 bg-gray-800 bg-opacity-50 rounded-lg';
                    
                    const urlInfo = document.createElement('div');
                    urlInfo.className = 'flex-1 truncate mr-2';
                    
                    const shortUrl = window.location.href.split('/')[0] + '//' + window.location.host + '/' + code;
                    urlInfo.innerHTML = `
                        <div class="text-sm font-medium truncate">${shortUrl}</div>
                        <div class="text-xs text-gray-400 truncate">${data.longUrl}</div>
                    `;
                    
                    const actions = document.createElement('div');
                    actions.className = 'flex items-center space-x-2';
                    
                    const copyBtn = document.createElement('button');
                    copyBtn.className = 'copy-btn px-2 py-1 text-xs rounded';
                    copyBtn.textContent = 'Copy';
                    copyBtn.addEventListener('click', () => {
                        navigator.clipboard.writeText(shortUrl);
                        copyBtn.textContent = 'Copied!';
                        setTimeout(() => {
                            copyBtn.textContent = 'Copy';
                        }, 2000);
                    });
                    
                    actions.appendChild(copyBtn);
                    shortUrlElement.appendChild(urlInfo);
                    shortUrlElement.appendChild(actions);
                    recentLinksContainer.appendChild(shortUrlElement);
                });
            }
        });

        // Telegram Bot Integration
            const telegramUsernameInput = document.getElementById('telegram-username');
            const connectTelegramBtn = document.getElementById('connect-telegram');
            
            connectTelegramBtn.addEventListener('click', function() {
                const username = telegramUsernameInput.value.trim();
                if (!username) {
                    alert('Please enter your Telegram username');
                    return;
                }
                
                // In a real implementation, you would send this to your backend
                alert(`Telegram logging enabled for @${username}\nYou will receive notifications when links are clicked.`);
                
                // Store username in localStorage for demo purposes
                localStorage.setItem('telegramUsername', username);
            });

            // Sakura petals animation
        function createSakura() {
            const petal = document.createElement('div');
            petal.classList.add('sakura-petal');
            
            // Random properties
            const size = Math.random() * 15 + 10;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${Math.random() * 100}vw`;
            petal.style.animationDuration = `${Math.random() * 5 + 5}s`;
            petal.style.setProperty('--random-x', Math.random() * 2 - 1);
            
            document.getElementById('sakura-container').appendChild(petal);
            
            setTimeout(() => {
                petal.remove();
            }, 10000);
        }
        
        setInterval(createSakura, 300);
    </script>
</body>
</html>
