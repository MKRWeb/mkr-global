// ==========================================================
// 1. CONSTANTS & CONFIGURATION
// ==========================================================
const API_KEYS = { POLLINATIONS: "c2tfZ3lKdTJIWjlpUjRLZlpYZTNJbjc1Z3M1ZmhHeTBPRjU=" };
const DESTINATION_WALLET = "0x08b1f390a769027230D51BF6A2729D84Db1e6cE6";

const MONAD_CONFIG = {
  chainId: "0x279f", // 10143
  chainName: 'Monad Testnet',
  nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
  rpcUrls: ['https://testnet-rpc.monad.xyz'],
  blockExplorerUrls: ['https://testnet.monadexplorer.com']
};

const TOKEN_CONTRACTS = {
  USDT: "0x1111111111111111111111111111111111111111", 
  USDC: "0x2222222222222222222222222222222222222222"  
};
const MON_PRICE_USD = 3.00;

// ==========================================================
// 2. DATABASE ($9 - $15 Dynamic Pricing & Premium Abstract Images)
// ==========================================================
const data = {
  elements: [
    { id: "soil", name: "Soil", img: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=400&q=80", 
      desc: "The upper layer of earth in which plants grow.", usage: "Agriculture, construction material.", pollution: "Chemical fertilizers, deforestation.", preservation: "Crop rotation, organic farming.", aiContext: "Focus on soil as a living super-organism, mycelial network.",
      nftData: { name: "Genesis Core: Cyber-Soil", priceUsd: 12.00, img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80" } },
    { id: "water", name: "Water", img: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=400&q=80",
      desc: "A transparent, tasteless chemical substance.", usage: "Drinking, agriculture, hydroelectric power.", pollution: "Sewage spillages, plastic waste.", preservation: "Water conservation, protecting wetlands.", aiContext: "Focus on water memory, the universal solvent.",
      nftData: { name: "Aqua Node: Liquid Matrix", priceUsd: 15.00, img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80" } },
    { id: "air", name: "Air", img: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=400&q=80",
      desc: "The invisible gaseous substance surrounding earth.", usage: "Respiration, wind energy.", pollution: "Vehicle emissions, factory smog.", preservation: "Transitioning to renewable energy.", aiContext: "Focus on the atmosphere as a protective shield.",
      nftData: { name: "Aero Synth: Wind Protocol", priceUsd: 9.00, img: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=600&q=80" } },
    { id: "sound", name: "Sound", img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=400&q=80",
      desc: "Vibrations that travel through the air.", usage: "Communication, music, echolocation.", pollution: "Noise pollution from traffic, machinery.", preservation: "Soundproofing, quiet zones.", aiContext: "Focus on cymatics, healing frequencies.",
      nftData: { name: "Sonic Wave: Echo Fragment", priceUsd: 11.50, img: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=600&q=80" } },
    { id: "light", name: "Light", img: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=400&q=80",
      desc: "Natural agent that stimulates sight.", usage: "Vision, photosynthesis, solar power.", pollution: "Light pollution disrupting ecosystems.", preservation: "Energy-efficient bulbs, dark-sky compliance.", aiContext: "Focus on light as a particle and wave across the cosmos.",
      nftData: { name: "Photon Drive: Prism Core", priceUsd: 14.00, img: "https://images.unsplash.com/photo-1550859491-1fa2824b22c4?auto=format&fit=crop&w=600&q=80" } }
  ],
  rights: [
    { id: "food", name: "Food", img: "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=400&q=80",
      desc: "The right to have access to adequate food.", usage: "Sustaining human life, energy.", pollution: "Food waste, supply chain monopolies.", preservation: "Local farmers, decentralized networks.", aiContext: "Focus on the biochemistry of nutrition.",
      nftData: { name: "Bio-Harvest Replicant", priceUsd: 10.00, img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=600&q=80" } },
    { id: "clothes", name: "Clothes", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80",
      desc: "The right to adequate clothing.", usage: "Protection from weather, hygiene.", pollution: "Fast fashion waste, unethical labor.", preservation: "Thrifting, sustainable fabrics.", aiContext: "Focus on the future of biodegradable smart-fabrics.",
      nftData: { name: "Synth-Weave Armor", priceUsd: 9.50, img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=600&q=80" } },
    { id: "education", name: "Education", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80",
      desc: "The right to free and compulsory education.", usage: "Empowerment, societal advancement.", pollution: "Defunding schools, digital divide.", preservation: "Open-source learning, Web3 EdTech.", aiContext: "Focus on neuroplasticity and borderless education.",
      nftData: { name: "Neural Link: Knowledge Shard", priceUsd: 12.50, img: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=600&q=80" } },
    { id: "healthcare", name: "Healthcare", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80",
      desc: "The right to physical and mental health.", usage: "Treating illness, well-being.", pollution: "Privatization making care unaffordable.", preservation: "Universal policies, health decentralization.", aiContext: "Focus on the bioethics of longevity.",
      nftData: { name: "Medi-Bot: Life Code", priceUsd: 14.50, img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=600&q=80" } },
    { id: "accommodation", name: "Accommodation", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80",
      desc: "The right to live in security and dignity.", usage: "Safety, psychological stability.", pollution: "Homelessness crises, predatory lending.", preservation: "Affordable housing, community trusts.", aiContext: "Focus on architecture of sustainable smart cities.",
      nftData: { name: "Citadel: Geo-Hab", priceUsd: 15.00, img: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=600&q=80" } },
    { id: "communication", name: "Communication", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
      desc: "The right to freedom of opinion and expression.", usage: "Sharing ideas, organizing societies.", pollution: "Internet censorship, data harvesting.", preservation: "End-to-end encryption, Web3 platforms.", aiContext: "Focus on how cryptographic protocols protect absolute truth.",
      nftData: { name: "Signal: Crypto-Node", priceUsd: 11.00, img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" } }
  ]
};

// ==========================================================
// 3. WEB3 ARCHITECTURE
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
          UIManager.updateWalletUI(this.userAddress);
        }
      } catch (err) { console.warn("Silent connection check failed", err); }
    }
  },

  setupListeners() {
    this.provider.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) this.disconnect();
      else {
        this.userAddress = accounts[0];
        UIManager.updateWalletUI(this.userAddress);
      }
    });
    this.provider.on('chainChanged', () => window.location.reload());
  },

  async connectWallet(walletType) {
    let targetProvider = null;
    if (walletType === 'metamask') {
      targetProvider = window.ethereum?.providers?.find(p => p.isMetaMask) || window.ethereum;
    } else if (walletType === 'haha') {
      targetProvider = window.haha || window.ethereum;
    } else if (walletType === 'walletconnect') {
      alert("WalletConnect v2 Requires a Project ID integration. Defaulting to browser injected provider.");
      targetProvider = window.ethereum;
    }

    if (!targetProvider) { alert(`Provider for ${walletType} not found.`); return false; }

    try {
      this.provider = targetProvider;
      const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
      this.userAddress = accounts[0];
      this.setupListeners();
      UIManager.updateWalletUI(this.userAddress);
      return true;
    } catch (error) { console.error("Connection rejected", error); return false; }
  },

  disconnect() {
    this.userAddress = null;
    UIManager.updateWalletUI(null);
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

  encodeERC20Transfer(toAddress, amountWei) {
    const methodId = "0xa9059cbb"; 
    const paddedAddress = toAddress.toLowerCase().replace("0x", "").padStart(64, "0");
    const amountHex = amountWei.toString(16);
    return methodId + paddedAddress + amountHex.padStart(64, "0");
  }
};

// ==========================================================
// 4. UI MANAGER & HISTORY ROUTING LOGIC
// ==========================================================
const UIManager = {
  activeInfoItem: null,
  activeNFTItem: null,

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
    document.getElementById('nft-modal').classList.add('hidden-modal');
  },

  init() {
    // 1. PREVENT BROWSER REFRESH EFFECT (State Persistence)
    const currentHash = window.location.hash;
    
    // If user refreshes on any internal page, instantly jump them back to the dashboard
    if (currentHash === '#dashboard' || currentHash === '#info' || currentHash === '#nft' || currentHash === '#wallet') {
      this.showDashboardUI();
      history.replaceState({ view: 'dashboard' }, '', '#dashboard');
    } else {
      history.replaceState({ view: 'splash' }, '', window.location.pathname);
    }

    // 2. HISTORY API (Back Button Support)
    window.addEventListener('popstate', (e) => {
      const state = e.state;
      this.hideAllModalsUI();

      if (!state || state.view === 'splash') {
        this.showSplashUI();
      } else if (state.view === 'dashboard') {
        this.showDashboardUI();
      }
    });

    // 3. NAVIGATION LISTENERS
    document.getElementById('initiate-btn').addEventListener('click', () => {
      history.pushState({ view: 'dashboard' }, '', '#dashboard');
      
      const splash = document.getElementById('monad-splash-screen');
      splash.classList.add('fade-out');
      this.showDashboardUI();
    });

    document.getElementById('back-to-splash-btn').addEventListener('click', () => {
      history.back(); 
    });

    // 4. WALLET CONNECTION LOGIC
    const headerWalletBtn = document.getElementById('header-wallet-btn');
    headerWalletBtn.addEventListener('click', () => {
      if(!Web3Manager.userAddress) {
        history.pushState({ view: 'modal' }, '', '#wallet');
        document.getElementById('web3-modal').classList.remove('hidden-modal');
      }
      else if(confirm("Disconnect wallet and wipe session state?")) {
        Web3Manager.disconnect();
      }
    });

    headerWalletBtn.addEventListener('mouseover', () => { if (Web3Manager.userAddress) headerWalletBtn.textContent = "Disconnect"; });
    headerWalletBtn.addEventListener('mouseout', () => { if (Web3Manager.userAddress) headerWalletBtn.textContent = Web3Manager.userAddress.slice(0, 6) + "..." + Web3Manager.userAddress.slice(-4); });
    
    document.getElementById('close-wallet-modal-btn').addEventListener('click', () => history.back());
    
    document.querySelectorAll('.provider-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const type = e.currentTarget.getAttribute('data-wallet');
        if(await Web3Manager.connectWallet(type)) {
          history.back(); 
        }
      });
    });

    // 5. MODAL CLOSING LOGIC
    document.getElementById('close-info-modal').addEventListener('click', () => history.back());
    document.getElementById('close-nft-modal').addEventListener('click', () => history.back());

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) history.back();
      });
    });

    // 6. SETUP SUBSYSTEMS
    this.renderGrids();
    this.setupAI();
    this.setupMinting();
  },

  updateWalletUI(address) {
    const btn = document.getElementById('header-wallet-btn');
    if (address) {
      btn.textContent = address.slice(0, 6) + "..." + address.slice(-4);
      btn.style.background = "#00ffaa"; btn.style.color = "#000"; btn.classList.add('connected');
    } else {
      btn.textContent = "Connect Wallet";
      btn.style.background = "var(--app-primary)"; btn.style.color = "#fff"; btn.classList.remove('connected');
    }
  },

  renderGrids() {
    const elGrid = document.getElementById('elements-grid');
    const rightGrid = document.getElementById('rights-grid');
    const nftGrid = document.getElementById('nfts-grid');

    const allItems = [...data.elements, ...data.rights];

    data.elements.forEach(item => elGrid.appendChild(this.createInfoCard(item, 'element')));
    data.rights.forEach(item => rightGrid.appendChild(this.createInfoCard(item, 'right')));
    allItems.forEach(item => nftGrid.appendChild(this.createNFTCard(item)));
  },

  createInfoCard(item, type) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<img src="${item.img}" alt="${item.name}"><h3>${item.name}</h3>`;
    div.addEventListener('click', () => this.openInfoModal(item, type));
    return div;
  },

  createNFTCard(item) {
    const div = document.createElement('div');
    div.className = 'card nft-dash-card';
    div.innerHTML = `
      <img src="${item.nftData.img}" alt="${item.nftData.name}">
      <h3>${item.nftData.name}</h3>
      <p class="nft-dash-price">$${item.nftData.priceUsd.toFixed(2)}</p>
    `;
    div.addEventListener('click', () => this.openNFTModal(item));
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
    document.getElementById('ai-response-container').innerHTML = '';

    history.pushState({ view: 'modal' }, '', '#info');
    document.getElementById('info-modal').classList.remove('hidden-modal');
  },

  openNFTModal(item) {
    this.activeNFTItem = item;
    
    document.getElementById('dedicated-nft-image').src = item.nftData.img;
    document.getElementById('dedicated-nft-title').textContent = item.nftData.name;
    document.getElementById('dedicated-nft-origin').textContent = `Inspired by: ${item.name}`;
    document.getElementById('dedicated-nft-price').textContent = `$${item.nftData.priceUsd.toFixed(2)}`;
    
    const buyBtn = document.getElementById('buy-nft-btn');
    buyBtn.disabled = false;
    buyBtn.textContent = "Mint Asset";
    buyBtn.style.background = "#fff";
    document.getElementById('tx-status').classList.add('hidden-element');

    history.pushState({ view: 'modal' }, '', '#nft');
    document.getElementById('nft-modal').classList.remove('hidden-modal');
  },

  setupAI() {
    document.getElementById('ask-ai-btn').addEventListener('click', async (e) => {
      const btn = e.target;
      const container = document.getElementById('ai-response-container');
      btn.style.display = 'none';
      container.classList.remove('hidden-element');
      container.style.display = 'block';
      container.innerHTML = '<span class="typing-indicator">> Connecting to AI Oracle... Analyzing...</span>';

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

  setupMinting() {
    const buyBtn = document.getElementById('buy-nft-btn');
    const tokenSelector = document.getElementById('payment-token');
    const statusText = document.getElementById('tx-status');

    buyBtn.addEventListener('click', async () => {
      if (!Web3Manager.userAddress) {
        history.back(); 
        setTimeout(() => {
          history.pushState({ view: 'modal' }, '', '#wallet');
          document.getElementById('web3-modal').classList.remove('hidden-modal');
        }, 100);
        return;
      }
      
      try {
        buyBtn.disabled = true;
        buyBtn.textContent = "Confirming...";
        await Web3Manager.enforceMonadNetwork();

        const selectedToken = tokenSelector.value;
        const usdPrice = this.activeNFTItem.nftData.priceUsd;
        let txParams = { from: Web3Manager.userAddress };

        if (selectedToken === "MON") {
          const monAmount = usdPrice / MON_PRICE_USD;
          const weiAmount = BigInt(Math.floor(monAmount * 10**18)); 
          txParams.to = DESTINATION_WALLET;
          txParams.value = "0x" + weiAmount.toString(16);
        } else {
          const tokenAmount = usdPrice; 
          const microTokenAmount = BigInt(Math.floor(tokenAmount * 10**6)); 
          txParams.to = TOKEN_CONTRACTS[selectedToken]; 
          txParams.value = "0x0"; 
          txParams.data = Web3Manager.encodeERC20Transfer(DESTINATION_WALLET, microTokenAmount); 
        }

        buyBtn.textContent = "Sign Wallet...";
        const txHash = await Web3Manager.provider.request({
          method: 'eth_sendTransaction',
          params: [txParams],
        });

        buyBtn.textContent = "Minting...";
        statusText.classList.remove('hidden-element');
        statusText.style.color = "#00ffaa";
        statusText.textContent = `Tx Hash: ${txHash.slice(0,8)}... waiting for confirmation`;

        const receipt = await Web3Manager.waitForReceipt(txHash);

        if (receipt && receipt.status === "0x1") {
          buyBtn.textContent = "Minted!";
          buyBtn.style.background = "#00ffaa";
          buyBtn.style.color = "#000";
          statusText.textContent = "Transaction Successful ✓";
        } else throw new Error("Transaction reverted by EVM");
        
      } catch (error) {
        console.error(error);
        buyBtn.disabled = false;
        buyBtn.textContent = "Mint Asset";
        statusText.classList.remove('hidden-element');
        statusText.style.color = "#ff5555";
        statusText.textContent = "Transaction Failed or Cancelled.";
      }
    });
  }
};

// ==========================================================
// 5. BOOTSTRAP APP
// ==========================================================
document.addEventListener("DOMContentLoaded", async () => {
  UIManager.init();
  await Web3Manager.init(); 
});
