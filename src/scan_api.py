#!/usr/bin/env python3
"""
ThreatChain Scan API
CLI interface for web dashboard to call Python backend.
"""
import sys
import json
import asyncio
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from src.orchestrator import ThreatChainOrchestrator


async def scan_address(address: str, chain: str):
    """Scan a single address and return JSON result."""
    orchestrator = ThreatChainOrchestrator(
        api_key="test-key",
        base_url="http://localhost:20128/v1",
        chains=[chain],
    )
    
    report = await orchestrator.monitor_address(address, chain)
    
    # Convert to JSON-serializable dict
    result = {
        "address": report.address,
        "chain": report.chain,
        "reputation_score": report.reputation_score,
        "threat_level": report.threat_level.value,
        "threat_types": [t.value for t in report.threat_types],
        "confidence": report.confidence,
        "evidence_count": len(report.evidence),
        "on_chain_published": report.on_chain_published,
        "tx_hash": report.tx_hash,
        "timestamp": report.timestamp.isoformat(),
        "agent_outputs": report.agent_outputs,
    }
    
    return result


def main():
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Usage: scan_api.py <address> <chain>"}))
        sys.exit(1)
    
    address = sys.argv[1]
    chain = sys.argv[2]
    
    try:
        result = asyncio.run(scan_address(address, chain))
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
