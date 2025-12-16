document.getElementById('start-unlock-btn').addEventListener('click', startUnlockProcess);
document.getElementById('stop-unlock-btn').addEventListener('click', stopUnlockProcess);

let unlockInterval;
let progress = 0;

async function startUnlockProcess() {
  const method = document.querySelector('input[name="unlock-method"]:checked').value;
  const progressBar = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  const startBtn = document.getElementById('start-unlock-btn');
  const stopBtn = document.getElementById('stop-unlock-btn');

  startBtn.classList.add('hidden');
  stopBtn.classList.remove('hidden');
  progress = 0;
  document.getElementById('log-output').innerHTML = '';

  addLog(`🚀 Starting unlock process for: ${method.toUpperCase()}`);
  
  unlockInterval = setInterval(() => {
    progress += Math.random() * 5;
    if (progress >= 100) progress = 100;
    
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `Unlocking... ${Math.round(progress)}%`;
    
    // Simulate log messages
    if (progress === 20) addLog(`🔍 Analyzing device partitions...`);
    if (progress === 40) addLog(`🔧 Bypassing security layer...`);
    if (progress === 70) addLog(`⚙️ Removing lock data...`);
    if (progress === 95) addLog(`✅ Finalizing unlock...`);
    
    if (progress >= 100) {
      clearInterval(unlockInterval);
      completeUnlock(method);
    }
  }, 300);
}

function stopUnlockProcess() {
  clearInterval(unlockInterval);
  addLog(`⏹️ Unlock process stopped by user`);
  document.getElementById('start-unlock-btn').classList.remove('hidden');
  document.getElementById('stop-unlock-btn').classList.add('hidden');
  progress = 0;
  document.getElementById('progress-fill').style.width = '0%';
  document.getElementById('progress-text').textContent = 'Process stopped';
}

function completeUnlock(method) {
  addLog(`🎉 UNLOCK SUCCESSFUL!`);
  addLog(`📱 Device is now unlocked`);
  
  document.getElementById('complete-device').textContent = 
    document.getElementById('device-model').textContent;
  document.getElementById('complete-method').textContent = 
    document.querySelector('input[name="unlock-method"]:checked + .method-card h3').textContent;
  
  const startTime = new Date();
  const endTime = new Date();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(1);
  document.getElementById('time-taken').textContent = `${timeTaken} seconds`;
  
  showStep(3);
}
