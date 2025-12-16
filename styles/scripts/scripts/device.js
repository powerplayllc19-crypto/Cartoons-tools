// Simulate device detection (In real app, use Web USB API or ADB)
async function detectDevice() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // SIMULATED DEVICE INFO
      const devices = [
        { model: "Samsung Galaxy S23", android: "13.0", lockType: "PIN" },
        { model: "Google Pixel 7", android: "14.0", lockType: "FRP" },
        { model: "OnePlus 11", android: "13.0", lockType: "Fingerprint" }
      ];
      
      const randomDevice = devices[Math.floor(Math.random() * devices.length)];
      
      // Update UI
      document.getElementById('device-info').classList.remove('hidden');
      document.getElementById('device-model').textContent = randomDevice.model;
      document.getElementById('android-version').textContent = randomDevice.android;
      document.getElementById('lock-type').textContent = randomDevice.lockType;
      document.getElementById('device-status-indicator').textContent = `🟢 Connected: ${randomDevice.model}`;
      document.getElementById('device-status-indicator').className = 'status-indicator connected';
      
      addLog(`✅ Device detected: ${randomDevice.model}`);
      addLog(`🔒 Lock Type: ${randomDevice.lockType}`);
      
      resolve(randomDevice);
    }, 2000); // Simulate detection delay
  });
      }
