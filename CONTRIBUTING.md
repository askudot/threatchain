# Contributing to ThreatChain

We welcome contributions from the community! ThreatChain is an open-source threat intelligence platform, and we appreciate your help in making blockchain security better.

## How to Contribute

### 1. Report Issues
- Found a bug? Open an issue on GitHub
- Have a feature request? Let us know!
- Security vulnerabilities? Email security@threatchain.io

### 2. Submit Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 3. Add Threat Intelligence Sources
Help us expand our threat detection by adding new data sources:
- Phishing databases
- Scam token lists
- Exploit databases
- Community threat reports

### 4. Improve Detection Patterns
Contribute new attack pattern detection logic:
- Smart contract vulnerabilities
- Transaction anomalies
- Behavioral patterns

### 5. Documentation
- Improve README
- Add code comments
- Write tutorials
- Create examples

## Development Setup

```bash
git clone https://github.com/askudot/threatchain.git
cd threatchain
pip install -r requirements.txt
cp .env.example .env
# Add your API keys to .env
python src/orchestrator.py
```

## Code Style
- Follow PEP 8 for Python code
- Add docstrings to all functions
- Write unit tests for new features
- Keep commits atomic and well-described

## Testing
```bash
pytest tests/
```

## Community
- Discord: [Join our server](#)
- Twitter: [@ThreatChain](#)
- Telegram: [ThreatChain Community](#)

## License
By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make blockchain security better! 🔗🛡️
