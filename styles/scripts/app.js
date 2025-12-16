document.addEventListener('DOMContentLoaded', () => {
  // ===== THEME TOGGLE =====
  const themeSwitch = document.getElementById('theme-switch');
  themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', themeSwitch.checked ? 'dark' : 'light');
  });

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeSwitch.checked = true;
  }

  // ===== STEP NAVIGATION =====
  const steps = ['step-connect', 'step-method', 'step-unlock', 'step-complete'];
  let currentStep = 0;

  function showStep(stepIndex) {
    steps.forEach((step, i) => {
      document.getElementById(step).classList.toggle('active', i === stepIndex);
    });
    currentStep = stepIndex;
  }

  // Next button from Connect to Method
  document.getElementById('detect-device-btn').addEventListener('click', () => {
    detectDevice().then(device => {
      if (device) {
        showStep(1);
        document.getElementById('next-to-unlock').classList.remove('hidden');
      }
    });
  });

  // Next button from Method to Unlock
  document.getElementById('next-to-unlock').addEventListener('click', () => {
    showStep(2);
  });

  // New Device button from Complete
  document.getElementById('new-device-btn').addEventListener('click', () => {
    resetApp();
    showStep(0);
  });

  // ===== LOGGING SYSTEM =====
  window.addLog = (message) => {
    const logBox = document.getElementById('log-output');
    const now = new Date().toLocaleTimeString();
    logBox.innerHTML += `[${now}] ${message}\n`;
    logBox.scrollTop = logBox.scrollHeight;
  };

  // ===== RESET APP =====
  function resetApp() {
    document.getElementById('device-info').classList.add('hidden');
    document.getElementById('device-status-indicator').textContent = '🔴 Disconnected';
    document.getElementById('device-status-indicator').className = 'status-indicator disconnected';
    document.getElementById('log-output').innerHTML = '';
    document.getElementById('progress-fill').style.width = '0%';
    document.getElementById('progress-text').textContent = 'Preparing...';
  }
});
