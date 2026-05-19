# 🔗 ThreatChain

**Threat Intelligence On-Chain** — Real-time blockchain threat detection and on-chain reputation system powered by multi-agent AI.

## 🎯 Mission

ThreatChain transforms reactive security into proactive threat intelligence. Instead of auditing contracts one-by-one, we continuously monitor the blockchain ecosystem, detect emerging threats, and publish reputation scores on-chain.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     ThreatChain                          │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐ ┌──────────────┐ ┌─────────────────┐ │
│  │ Threat Feed  │ │ Pattern      │ │ Reputation      │ │
│  │ Aggregator   │ │ Recognition  │ │ Oracle          │ │
│  │ Agent        │ │ Agent        │ │ Agent           │ │
│  └──────┬───────┘ └──────┬───────┘ └────────┬────────┘ │
│         │                 │                  │          │
│  ┌──────┴─────────────────┴──────────────────┴────────┐ │
│  │          Agent Orchestrator                         │ │
│  │          (Hermes Agent + 9Router)                   │ │
│  └─────────────────┬───────────────────────────────────┘ │
│                    │                                      │
│  ┌─────────────────┴───────────────────────────────────┐ │
│  │         Multi-Agent AI Engine                      │ │
│  │         (Long-chain Reasoning + Analysis)          │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌──────────────┐ ┌──────────────┐ ┌─────────────────┐ │
│  │ Alert        │ │ Community    │ │ Blockchain      │ │
│  │ System       │ │ Intel        │ │ Data Layer      │ │
│  │ Agent        │ │ Agent        │ │ (Multi-chain)   │ │
│  └──────────────┘ └──────────────┘ └─────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Key Features

### 1. **Continuous Threat Monitoring**
- Real-time blockchain scanning (Ethereum, BSC, Polygon, Solana)
- Detect: phishing contracts, rug pulls, honeypots, exploit patterns
- 24/7 automated surveillance

### 2. **On-Chain Reputation System**
- Publish reputation scores directly to blockchain
- Immutable threat intelligence records
- Queryable by any dApp or wallet

### 3. **Multi-Agent Intelligence**
- **Threat Feed Agent**: Aggregates phishing sites, scam tokens, exploit patterns
- **Pattern Recognition Agent**: ML-powered detection of new attack vectors
- **Reputation Oracle Agent**: Calculates and publishes on-chain scores
- **Alert System Agent**: Real-time notifications (Telegram, Discord, Email)
- **Community Intel Agent**: Crowdsourced threat reports validation

### 4. **Proactive Alerts**
- Instant notifications for high-risk contracts
- Customizable alert rules
- Integration with Telegram, Discord, Slack

### 5. **Threat Analytics Dashboard**
- Historical threat trends
- Attack vector heatmaps
- Reputation score explorer

## 📊 Token Consumption Model

| Agent | Tokens/Operation | Frequency | Daily Estimate |
|-------|-----------------|-----------|----------------|
| Threat Feed Aggregator | 600K | Continuous (96x/day) | 57.6M |
| Pattern Recognition | 800K | 48x/day | 38.4M |
| Reputation Oracle | 400K | 24x/day | 9.6M |
| Alert System | 150K | Event-driven (~100x/day) | 15M |
| Community Intel | 200K | 50x/day | 10M |
| **Total** | | | **~130M/day** |

At 100 active monitors: ~13B tokens/day → ~390B/month

## 🔄 How It Works

```
1. Continuous Blockchain Monitoring
   ↓
2. Anomaly Detection (new token, suspicious TX, phishing pattern)
   ↓
3. Multi-Agent Analysis (5 specialized agents)
   ↓
4. Reputation Score Calculation (0-100)
   ↓
5. Publish to On-Chain Oracle
   ↓
6. Alert Subscribers (Telegram/Discord/Email)
   ↓
7. Update Threat Intelligence Database
```

## 🛠️ Tech Stack

- **AI Models:** Advanced LLM (reasoning), Multi-agent orchestration (analysis)
- **Agent Framework:** Hermes Agent + 9Router
- **IDE:** Cursor + Claude Code
- **Blockchain:** Etherscan, BSCScan, Polygonscan, Solana APIs
- **Smart Contracts:** Solidity (EVM), Rust (Solana)
- **Database:** PostgreSQL + Redis + IPFS
- **Deploy:** Docker + Kubernetes + Vercel

## 🎯 Differentiators

| Traditional Security | ThreatChain |
|---------------------|-------------|
| Reactive audits | Proactive monitoring |
| One contract at a time | Ecosystem-wide surveillance |
| Off-chain reports | On-chain reputation |
| Manual submission | Automated detection |
| Static analysis | Pattern recognition + ML |

## 📈 Use Cases

1. **Wallet Integration**: Show reputation scores before transactions
2. **DEX Protection**: Block high-risk token listings
3. **DeFi Protocols**: Whitelist verification
4. **NFT Marketplaces**: Detect fake collections
5. **Bridge Security**: Monitor cross-chain exploits

## 🔐 On-Chain Reputation Oracle

Smart contract deployed on multiple chains:

```solidity
interface IThreatChainOracle {
    function getReputationScore(address target) external view returns (uint8);
    function getThreatLevel(address target) external view returns (ThreatLevel);
    function getLastUpdate(address target) external view returns (uint256);
}
```

## 🚧 Status

**Phase 1 (Current):** Multi-agent architecture + threat detection engine  
**Phase 2:** On-chain oracle deployment (Ethereum, BSC, Polygon)  
**Phase 3:** Community intel platform + API  
**Phase 4:** ML model training + pattern recognition  

🔥 **Seeking API credits for production-scale threat intelligence deployment.**

## 📦 Installation

```bash
git clone https://github.com/moonaskyou/threatchain.git
cd threatchain
pip install -r requirements.txt
cp .env.example .env
# Add your API keys to .env
python src/orchestrator.py
```

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

**Built with ❤️ by [moonaskyou](https://github.com/moonaskyou)**
