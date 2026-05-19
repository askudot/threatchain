"""
ThreatChain — Reputation Oracle Agent
Calculates reputation scores and publishes to on-chain oracle smart contracts.
"""
from dataclasses import dataclass
from typing import Dict, Optional
from datetime import datetime


@dataclass
class ReputationScore:
    address: str
    chain: str
    score: int  # 0-100 (100 = safe, 0 = critical)
    threat_level: str
    confidence: float
    evidence_count: int
    last_updated: datetime
    on_chain_tx: Optional[str]


class ReputationOracleAgent:
    """
    Calculates reputation scores and publishes to blockchain.
    Uses MiMo-V2.5 for score calculation and validation.
    Token consumption: ~400K per calculation + publish.
    """

    SCORE_WEIGHTS = {
        "threat_feed": 0.30,  # 30% weight
        "pattern_recognition": 0.35,  # 35% weight
        "community_intel": 0.20,  # 20% weight
        "historical_behavior": 0.15,  # 15% weight
    }

    def __init__(self, oracle_contract_address: str = None):
        self.oracle_address = oracle_contract_address or "0x..."
        self.scores_calculated = 0
        self.on_chain_publishes = 0

    async def calculate_score(
        self,
        address: str,
        chain: str,
        threat_feed: Dict,
        patterns: Dict,
        community: Dict,
    ) -> ReputationScore:
        """
        Calculate reputation score based on all agent inputs.
        Returns score 0-100 with confidence level.
        """
        # Extract threat indicators from each source
        feed_score = self._score_threat_feed(threat_feed)
        pattern_score = self._score_patterns(patterns)
        community_score = self._score_community(community)
        historical_score = await self._score_historical(address, chain)

        # Weighted average
        final_score = (
            feed_score * self.SCORE_WEIGHTS["threat_feed"]
            + pattern_score * self.SCORE_WEIGHTS["pattern_recognition"]
            + community_score * self.SCORE_WEIGHTS["community_intel"]
            + historical_score * self.SCORE_WEIGHTS["historical_behavior"]
        )

        # Use MiMo for final validation and adjustment
        validated_score = await self._validate_score(
            address, final_score, threat_feed, patterns, community
        )

        threat_level = self._score_to_threat_level(validated_score)
        confidence = self._calculate_confidence(threat_feed, patterns, community)

        self.scores_calculated += 1

        return ReputationScore(
            address=address,
            chain=chain,
            score=int(validated_score),
            threat_level=threat_level,
            confidence=confidence,
            evidence_count=self._count_evidence(threat_feed, patterns, community),
            last_updated=datetime.utcnow(),
            on_chain_tx=None,
        )

    async def publish_on_chain(self, reputation: ReputationScore) -> str:
        """
        Publish reputation score to on-chain oracle smart contract.
        Returns transaction hash.
        """
        # Smart contract interaction
        # web3.eth.contract(address=self.oracle_address, abi=ORACLE_ABI)
        # tx = contract.functions.updateReputation(address, score).transact()

        tx_hash = f"0x{datetime.utcnow().timestamp()}"  # Mock tx hash
        reputation.on_chain_tx = tx_hash
        self.on_chain_publishes += 1

        return tx_hash

    def _score_threat_feed(self, feed: Dict) -> float:
        """Score based on threat feed findings (0-100)."""
        if not feed or not feed.get("threats_found"):
            return 100.0  # No threats = high score

        threats = feed.get("threats_found", 0)
        confidence = feed.get("correlation", {}).get("confidence", 0.5)

        # More threats = lower score
        base_score = max(0, 100 - (threats * 20))
        return base_score * confidence

    def _score_patterns(self, patterns: Dict) -> float:
        """Score based on pattern recognition (0-100)."""
        if not patterns or not patterns.get("patterns_detected"):
            return 100.0

        detected = patterns.get("patterns_detected", 0)
        risk_score = patterns.get("correlation", {}).get("risk_score", 50)

        # Invert risk score (high risk = low reputation)
        return 100 - risk_score

    def _score_community(self, community: Dict) -> float:
        """Score based on community intelligence (0-100)."""
        if not community:
            return 75.0  # Neutral if no community data

        reports = community.get("reports_count", 0)
        verified = community.get("verified_reports", 0)

        if reports == 0:
            return 75.0

        # More verified negative reports = lower score
        return max(0, 100 - (verified * 15))

    async def _score_historical(self, address: str, chain: str) -> float:
        """Score based on historical behavior (0-100)."""
        # Query historical data from database
        # Check: past incidents, age of contract, transaction volume
        return 80.0  # Mock score

    async def _validate_score(
        self, address: str, score: float, feed: Dict, patterns: Dict, community: Dict
    ) -> float:
        """
        Use MiMo reasoning to validate and adjust final score.
        Catches edge cases and false positives.
        """
        prompt = f"""
        Validate reputation score for address {address}:
        
        Calculated Score: {score}/100
        
        Evidence:
        - Threat Feed: {feed.get('threats_found', 0)} threats
        - Patterns: {patterns.get('patterns_detected', 0)} suspicious patterns
        - Community: {community.get('reports_count', 0)} reports
        
        Tasks:
        1. Check for false positives
        2. Validate evidence quality
        3. Adjust score if needed (±10 points max)
        4. Provide reasoning for adjustment
        
        Return: Final validated score (0-100)
        """

        # MiMo API call
        # For now, return original score
        return score

    def _score_to_threat_level(self, score: int) -> str:
        """Convert numeric score to threat level."""
        if score >= 80:
            return "safe"
        elif score >= 60:
            return "low"
        elif score >= 40:
            return "medium"
        elif score >= 20:
            return "high"
        else:
            return "critical"

    def _calculate_confidence(self, feed: Dict, patterns: Dict, community: Dict) -> float:
        """Calculate confidence level based on evidence quality."""
        confidences = []

        if feed and "correlation" in feed:
            confidences.append(feed["correlation"].get("confidence", 0.5))

        if patterns and "correlation" in patterns:
            confidences.append(0.8)  # Pattern analysis is generally reliable

        if community:
            verified = community.get("verified_reports", 0)
            total = community.get("reports_count", 1)
            confidences.append(verified / total if total > 0 else 0.5)

        return sum(confidences) / len(confidences) if confidences else 0.5

    def _count_evidence(self, feed: Dict, patterns: Dict, community: Dict) -> int:
        """Count total pieces of evidence."""
        count = 0
        count += feed.get("threats_found", 0) if feed else 0
        count += patterns.get("patterns_detected", 0) if patterns else 0
        count += community.get("reports_count", 0) if community else 0
        return count

    def get_stats(self) -> Dict:
        """Return oracle statistics."""
        return {
            "scores_calculated": self.scores_calculated,
            "on_chain_publishes": self.on_chain_publishes,
            "oracle_address": self.oracle_address,
        }
