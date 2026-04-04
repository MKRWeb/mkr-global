// ==========================================================
// 1. CONSTANTS & CONFIGURATION (MONAD MAINNET)
// ==========================================================
const API_KEYS = { POLLINATIONS: "c2tfZ3lKdTJIWjlpUjRLZlpYZTNJbjc1Z3M1ZmhHeTBPRjU=" };
const DESTINATION_WALLET = "0x08b1f390a769027230D51BF6A2729D84Db1e6cE6";

const MONAD_CONFIG = {
  chainId: "0x8f", // 143 in Hex
  chainName: 'Monad Mainnet',
  nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
  rpcUrls: ['https://rpc.monad.xyz'],
  blockExplorerUrls: ['https://monadscan.com/'] 
};

const TOKEN_CONTRACTS = {
  USDC: "0x754704Bc059F8C67012fEd69BC8A327a5aafb603",
  USDT0: "0xe7cd86e13AC4309349F30B3435a9d337750fC82D" 
};

// ==========================================================
// 2. DATABASE (5 Elements & 6 Rights Intact)
// ==========================================================
const data = {
  elements: [
    { id: "soil", name: "Soil", img: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=400&q=80", desc: "The upper layer of earth in which plants grow.", usage: "Agriculture, construction material.", pollution: "Chemical fertilizers, deforestation.", preservation: "Crop rotation, organic farming.", aiContext: "Focus on soil as a living super-organism, mycelial network." },
    { id: "water", name: "Water", img: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=400&q=80", desc: "A transparent, tasteless chemical substance.", usage: "Drinking, agriculture, hydroelectric power.", pollution: "Sewage spillages, plastic waste.", preservation: "Water conservation, protecting wetlands.", aiContext: "Focus on water memory, the universal solvent." },
    { id: "air", name: "Air", img: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=400&q=80", desc: "The invisible gaseous substance surrounding earth.", usage: "Respiration, wind energy.", pollution: "Vehicle emissions, factory smog.", preservation: "Transitioning to renewable energy.", aiContext: "Focus on the atmosphere as a protective shield." },
    { id: "sound", name: "Sound", img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=400&q=80", desc: "Vibrations that travel through the air.", usage: "Communication, music, echolocation.", pollution: "Noise pollution from traffic, machinery.", preservation: "Soundproofing, quiet zones.", aiContext: "Focus on cymatics, healing frequencies." },
    { id: "light", name: "Light", img: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=400&q=80", desc: "Natural agent that stimulates sight.", usage: "Vision, photosynthesis, solar power.", pollution: "Light pollution disrupting ecosystems.", preservation: "Energy-efficient bulbs, dark-sky compliance.", aiContext: "Focus on light as a particle and wave across the cosmos." }
  ],
  rights: [
    { id: "food", name: "Food Security", img: "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=400&q=80", desc: "The right to have access to adequate food.", usage: "Sustaining human life, energy.", pollution: "Food waste, supply chain monopolies.", preservation: "Local farmers, decentralized networks.", aiContext: "Focus on the biochemistry of nutrition." },
    { id: "clothes", name: "Clothes", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80", desc: "The right to adequate clothing.", usage: "Protection from weather, hygiene.", pollution: "Fast fashion waste, unethical labor.", preservation: "Thrifting, sustainable fabrics.", aiContext: "Focus on the future of biodegradable smart-fabrics." },
    { id: "education", name: "Education", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80", desc: "The right to free and compulsory education.", usage: "Empowerment, societal advancement.", pollution: "Defunding schools, digital divide.", preservation: "Open-source learning, Web3 EdTech.", aiContext: "Focus on neuroplasticity and borderless education." },
    { id: "healthcare", name: "Healthcare", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80", desc: "The right to physical and mental health.", usage: "Treating illness, well-being.", pollution: "Privatization making care unaffordable.", preservation: "Universal policies, health decentralization.", aiContext: "Focus on the bioethics of longevity." },
    { id: "accommodation", name: "Accommodation", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80", desc: "The right to live in security and dignity.", usage: "Safety, psychological stability.", pollution: "Homelessness crises, predatory lending.", preservation: "Affordable housing, community trusts.", aiContext: "Focus on architecture of sustainable smart cities." },
    { id: "communication", name: "Communication", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80", desc: "The right to freedom of opinion and expression.", usage: "Sharing ideas, organizing societies.", pollution: "Internet censorship, data harvesting.", preservation: "End-to-end encryption, Web3 platforms.", aiContext: "Focus on how cryptographic protocols protect absolute truth." }
  ]
};

// ==========================================================
// 3. WEB3 ARCHITECTURE (With Mobile Intelligence)
// ==========================================================
const Web3Manager = {
  provider: null,
  userAddress: null,

  async init() {
    if (window.ethereum) {
      this.provider = window.ethereum;
      try {
        const accounts = await this.provider.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          this.userAddress = accounts[0];
          this.setupListeners();
        }
      } catch (err) { console.warn("Silent connection check failed"); }
    }
  },

  setupListeners() {
    this.provider.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) this.disconnect();
      else this.userAddress = accounts[0];
    });
    this.provider.on('chainChanged', () => window.location.reload());
  },

  async connectWallet(walletType) {
    let targetProvider = null;

    // Detect Extensions or In-App Web3 Browsers
    if (window.ethereum || window.haha) {
      if (walletType === 'metamask') {
        targetProvider = window.ethereum?.providers?.find(p => p.isMetaMask) || window.ethereum;
      } else if (walletType === 'haha') {
        targetProvider = window.haha || window.ethereum;
      } else if (walletType === 'walletconnect') {
        alert("WalletConnect v2 Requires a Project ID. Defaulting to standard provider.");
        targetProvider = window.ethereum;
      }
    } 
    // Deep Linking Fallback for Standard Mobile Safari/Chrome
    else {
      const currentUrl = window.location.host + window.location.pathname;
      if (walletType === 'metamask') {
        window.open(`https://metamask.app.link/dapp/${currentUrl}`, '_blank');
        return false;
      } else {
        alert("Web3 environment not detected. Please open this site inside your Wallet's App browser.");
        return false;
      }
    }

    if (!targetProvider) return false;

    try {
      this.provider = targetProvider;
      const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
      this.userAddress = accounts[0];
      this.setupListeners();
      return true;
    } catch (error) { 
      console.error("Connection rejected", error); 
      return false; 
    }
  },

  disconnect() {
    this.userAddress = null;
  },

  async enforceMonadNetwork() {
    try { await this.provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: MONAD_CONFIG.chainId }] }); } 
    catch (switchError) {
      if (switchError.code === 4902) await this.provider.request({ method: 'wallet_addEthereumChain', params: [MONAD_CONFIG] });
      else throw switchError;
    }
  },

  async waitForReceipt(txHash) {
    let receipt = null; let attempts = 0;
    while (receipt === null && attempts < 20) { 
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      receipt = await this.provider.request({ method: 'eth_getTransactionReceipt', params: [txHash] });
      attempts++;
    }
    return receipt;
  },

  encodeERC20Transfer(toAddress, amountBaseUnits) {
    const methodId = "0xa9059cbb"; 
    const paddedAddress = toAddress.toLowerCase().replace("0x", "").padStart(64, "0");
    const amountHex = amountBaseUnits.toString(16).padStart(64, "0");
    return methodId + paddedAddress + amountHex;
  }
};

// ==========================================================
// 4. UI MANAGER & INTERACTIVE MODAL STATE MACHINE
// ==========================================================
const UIManager = {
  activeInfoItem: null,

  showDashboardUI() {
    const splash = document.getElementById('monad-splash-screen');
    const dash = document.getElementById('dashboard-window');
    splash.style.display = 'none';
    dash.classList.add('active-screen');
    dash.classList.remove('hidden-screen');
  },

  showSplashUI() {
    const splash = document.getElementById('monad-splash-screen');
    const dash = document.getElementById('dashboard-window');
    splash.style.display = 'flex'; 
    setTimeout(() => {
      dash.classList.remove('active-screen');
      dash.classList.add('hidden-screen');
      splash.classList.remove('fade-out');
    }, 10);
  },

  hideAllModalsUI() {
    document.getElementById('web3-modal').classList.add('hidden-modal');
    document.getElementById('info-modal').classList.add('hidden-modal');
    document.getElementById('donation-modal').classList.add('hidden-modal');
  },

  init() {
    const currentHash = window.location.hash;
    
    if (currentHash === '#dashboard' || currentHash === '#info' || currentHash === '#donate' || currentHash === '#wallet') {
      this.showDashboardUI();
      history.replaceState({ view: 'dashboard' }, '', '#dashboard');
    } else {
      history.replaceState({ view: 'splash' }, '', window.location.pathname);
    }

    window.addEventListener('popstate', (e) => {
      const state = e.state;
      this.hideAllModalsUI();
      if (!state || state.view === 'splash') this.showSplashUI();
      else if (state.view === 'dashboard') this.showDashboardUI();
    });

    document.getElementById('initiate-btn').addEventListener('click', () => {
      history.pushState({ view: 'dashboard' }, '', '#dashboard');
      const splash = document.getElementById('monad-splash-screen');
      splash.classList.add('fade-out');
      this.showDashboardUI();
    });

    document.getElementById('back-to-splash-btn').addEventListener('click', () => history.back());

    // --- UX FLOW 1: Clicking Donate Now opens Donation Form Immediately ---
    document.getElementById('header-donate-btn').addEventListener('click', () => {
      this.openDonationModal({ name: "MKR Global Initiative" });
    });

    // --- Wallet Providers Click Logic ---
    document.getElementById('close-wallet-modal-btn').addEventListener('click', () => history.back());
    
    document.querySelectorAll('.provider-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const type = e.currentTarget.getAttribute('data-wallet');
        if(await Web3Manager.connectWallet(type)) {
          // If connection is successful, seamlessly bring them back to the donation modal they were looking at
          document.getElementById('web3-modal').classList.add('hidden-modal');
          document.getElementById('donation-modal').classList.remove('hidden-modal');
          // Replace state so the back button functionality remains clean
          history.replaceState({ view: 'modal' }, '', '#donate');
        } 
      });
    });

    document.getElementById('close-info-modal').addEventListener('click', () => history.back());
    document.getElementById('close-donation-modal').addEventListener('click', () => history.back());

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => { if (e.target === modal) history.back(); });
    });

    this.renderGrids();
    this.setupAI();
    this.setupDonationProcessor();
  },

  renderGrids() {
    const elGrid = document.getElementById('elements-grid');
    const rightGrid = document.getElementById('rights-grid');

    data.elements.forEach(item => elGrid.appendChild(this.createInfoCard(item, 'element')));
    data.rights.forEach(item => rightGrid.appendChild(this.createInfoCard(item, 'right')));
  },

  createInfoCard(item, type) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<img src="${item.img}" alt="${item.name}"><h3>${item.name}</h3>`;
    div.addEventListener('click', () => this.openInfoModal(item, type));
    return div;
  },

  openInfoModal(item, type) {
    this.activeInfoItem = item; 
    document.getElementById('modal-image').src = item.img;
    document.getElementById('modal-title').textContent = item.name;
    document.getElementById('modal-desc').textContent = item.desc;
    document.getElementById('modal-sec1-title').textContent = type === 'element' ? 'Usage in Nature' : 'Importance';
    document.getElementById('modal-sec1-desc').textContent = item.usage;
    document.getElementById('modal-sec2-title').textContent = type === 'element' ? 'Pollution & Threats' : 'Violations';
    document.getElementById('modal-sec2-desc').textContent = item.pollution;
    document.getElementById('modal-sec3-title').textContent = type === 'element' ? 'Preservation' : 'Solutions';
    document.getElementById('modal-sec3-desc').textContent = item.preservation;

    document.getElementById('ask-ai-btn').style.display = 'block';
    document.getElementById('ai-response-container').style.display = 'none';

    history.pushState({ view: 'modal' }, '', '#info');
    document.getElementById('info-modal').classList.remove('hidden-modal');
    
    const donateBtn = document.getElementById('trigger-donate-btn');
    donateBtn.onclick = () => {
      history.back(); 
      setTimeout(() => this.openDonationModal(item), 150); 
    };
  },

  openDonationModal(item) {
    document.getElementById('donation-target-name').textContent = `Support: ${item.name}`;
    document.getElementById('tx-status').classList.add('hidden-element');
    
    const sendBtn = document.getElementById('process-donation-btn');
    sendBtn.disabled = false;
    sendBtn.textContent = "Send Donation";
    sendBtn.style.background = "#fff";

    history.pushState({ view: 'modal' }, '', '#donate');
    document.getElementById('donation-modal').classList.remove('hidden-modal');
  },

  setupAI() {
    document.getElementById('ask-ai-btn').addEventListener('click', async (e) => {
      const btn = e.target;
      const container = document.getElementById('ai-response-container');
      btn.style.display = 'none';
      container.classList.remove('hidden-element');
      container.style.display = 'block';
      container.innerHTML = '<span class="typing-indicator">> Connecting to AI Oracle...</span>';

      try {
        const sysPrompt = `You are a visionary Web3 AI Oracle. Provide a deeply profound 3-sentence explanation regarding: ${this.activeInfoItem.name}. FOCUS: ${this.activeInfoItem.aiContext}. Speak directly, concisely, and with authoritative wisdom.`;
        const response = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + atob(API_KEYS.POLLINATIONS) },
          body: JSON.stringify({ messages: [ { role: 'system', content: sysPrompt }, { role: 'user', content: "Generate oracle insight." } ] })
        });
        if (response.ok) {
          const resData = await response.json();
          container.innerHTML = `<span class="ai-text"><strong>✦ Oracle Insight:</strong><br><br>${resData.choices[0].message.content}</span>`;
        } else throw new Error("Network error");
      } catch (err) {
        container.innerHTML = '<span style="color: #ff5555;">[!] Oracle Connection Failed.</span>';
        setTimeout(() => { btn.style.display = 'block'; container.style.display = 'none'; }, 3000);
      }
    });
  },

  setupDonationProcessor() {
    const processBtn = document.getElementById('process-donation-btn');
    const amountInput = document.getElementById('donation-amount');
    const tokenSelector = document.getElementById('donation-token');
    const statusText = document.getElementById('tx-status');

    processBtn.addEventListener('click', async () => {
      const userAmount = parseFloat(amountInput.value);
      
      // We validate the amount BEFORE bugging them about a wallet
      if (isNaN(userAmount) || userAmount <= 0) {
        alert("Please enter a valid amount greater than 0.");
        return;
      }
      
      // --- UX FLOW 2: Intercept the transaction if wallet is missing ---
      if (!Web3Manager.userAddress) {
        // Swap out the Donation modal for the Wallet modal programmatically
        document.getElementById('donation-modal').classList.add('hidden-modal');
        document.getElementById('web3-modal').classList.remove('hidden-modal');
        history.replaceState({ view: 'modal' }, '', '#wallet');
        return; 
      }

      try {
        processBtn.disabled = true;
        processBtn.textContent = "Switching Network...";
        statusText.classList.remove('hidden-element');
        statusText.style.color = "#888";
        statusText.textContent = "Verifying Monad Mainnet...";

        await Web3Manager.enforceMonadNetwork();

        const selectedToken = tokenSelector.value;
        let txParams = { from: Web3Manager.userAddress };

        if (selectedToken === "MON") {
          const weiAmount = BigInt(Math.floor(userAmount * 10**18)); 
          txParams.to = DESTINATION_WALLET;
          txParams.value = "0x" + weiAmount.toString(16);
        } else {
          const baseUnits = BigInt(Math.floor(userAmount * 10**6)); 
          txParams.to = TOKEN_CONTRACTS[selectedToken]; 
          txParams.value = "0x0"; 
          txParams.data = Web3Manager.encodeERC20Transfer(DESTINATION_WALLET, baseUnits); 
        }

        processBtn.textContent = "Sign in Wallet...";
        statusText.style.color = "#00ffaa";
        statusText.textContent = "Please sign the transaction in your wallet.";

        const txHash = await Web3Manager.provider.request({
          method: 'eth_sendTransaction',
          params: [txParams],
        });

        processBtn.textContent = "Processing...";
        statusText.textContent = `Tx Hash: ${txHash.slice(0,8)}... waiting for confirmation`;

        const receipt = await Web3Manager.waitForReceipt(txHash);

        if (receipt && receipt.status === "0x1") {
          processBtn.textContent = "Thank You! ♥";
          processBtn.style.background = "#00ffaa";
          processBtn.style.color = "#000";
          statusText.textContent = "Donation Successful ✓";
          amountInput.value = '';
        } else throw new Error("Transaction reverted by the blockchain.");
        
      } catch (error) {
        console.error(error);
        processBtn.disabled = false;
        processBtn.textContent = "Send Donation";
        statusText.style.color = "#ff5555";
        
        if (error.message && error.message.includes("User denied") || error.code === 4001) {
          statusText.textContent = "Transaction was cancelled.";
        } else {
          statusText.textContent = "Transaction Failed.";
        }
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  UIManager.init();
  await Web3Manager.init(); 
});
          
