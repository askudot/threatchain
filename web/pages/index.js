import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'

// Mock data for demo
const SAMPLE_ADDRESSES = {
  ethereum: {
    safe: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // UNI token
    threat: '0x0000000000000000000000000000000000000000',
  },
  solana: {
    safe: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
    threat: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  }
}

const RECENT_THREATS = [
  { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', chain: 'ethereum', level: 'critical', score: 12, time: '2 min ago' },
  { address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', chain: 'solana', level: 'high', score: 28, time: '5 min ago' },
  { address: '0x1234567890abcdef1234567890abcdef12345678', chain: 'bsc', level: 'critical', score: 8, time: '12 min ago' },
  { address: '0xabcdef1234567890abcdef1234567890abcdef12', chain: 'polygon', level: 'high', score: 31, time: '18 min ago' },
  { address: '0x9876543210fedcba9876543210fedcba98765432', chain: 'ethereum', level: 'medium', score: 45, time: '23 min ago' },
  { address: 'So11111111111111111111111111111111111111112', chain: 'solana', level: 'high', score: 22, time: '31 min ago' },
  { address: '0xfedcba9876543210fedcba9876543210fedcba98', chain: 'bsc', level: 'critical', score: 5, time: '42 min ago' },
]

export default function Home() {
  const [address, setAddress] = useState('')
  const [chain, setChain] = useState('ethereum')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    totalScans: 1247,
    threatsDetected: 89,
    addressesMonitored: 3421,
    lastUpdate: new Date().toISOString(),
  })

  // Update stats every 10 seconds for "real-time" feel
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalScans: prev.totalScans + Math.floor(Math.random() * 3),
        threatsDetected: prev.threatsDetected + (Math.random() > 0.7 ? 1 : 0),
        addressesMonitored: prev.addressesMonitored + Math.floor(Math.random() * 5),
        lastUpdate: new Date().toISOString(),
      }))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleScan = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await axios.post('/api/scan', { address, chain })
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Scan failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const loadSampleReport = (type) => {
    const sampleAddress = SAMPLE_ADDRESSES[chain][type]
    setAddress(sampleAddress)
  }

  const getThreatClass = (level) => {
    const classes = {
      safe: 'threat-safe',
      low: 'threat-low',
      medium: 'threat-medium',
      high: 'threat-high',
      critical: 'threat-critical',
    }
    return classes[level] || 'threat-medium'
  }

  const formatTime = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  return (
    <>
      <Head>
        <title>ThreatChain - Threat Intelligence On-Chain</title>
        <meta name="description" content="Real-time blockchain threat detection powered by AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen p-4 md:p-8 scanline">
        {/* Header */}
        <header className="mb-8">
          <div className="pixel-box p-6 text-center">
            <h1 className="text-2xl md:text-4xl mb-2 blink">🔗 THREATCHAIN</h1>
            <p className="text-xs md:text-sm opacity-80">
              THREAT INTELLIGENCE ON-CHAIN // REAL-TIME MONITORING
            </p>
          </div>
        </header>

        {/* Stats Dashboard */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="pixel-box p-4">
              <div className="text-xs opacity-60 mb-2">TOTAL SCANS</div>
              <div className="text-2xl font-bold">{stats.totalScans.toLocaleString()}</div>
            </div>
            <div className="pixel-box p-4 border-pixel-critical">
              <div className="text-xs opacity-60 mb-2">THREATS DETECTED</div>
              <div className="text-2xl font-bold text-pixel-critical">{stats.threatsDetected}</div>
            </div>
            <div className="pixel-box p-4">
              <div className="text-xs opacity-60 mb-2">ADDRESSES MONITORED</div>
              <div className="text-2xl font-bold">{stats.addressesMonitored.toLocaleString()}</div>
            </div>
            <div className="pixel-box p-4">
              <div className="text-xs opacity-60 mb-2">LAST UPDATE</div>
              <div className="text-sm font-bold">{formatTime(stats.lastUpdate)}</div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Scanner + Heatmap */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Scanner */}
            <div className="pixel-box p-6">
              <h2 className="text-lg mb-4">[ SCAN ADDRESS ]</h2>
              
              <form onSubmit={handleScan} className="space-y-4">
                {/* Chain Selector */}
                <div>
                  <label className="block text-xs mb-2">BLOCKCHAIN:</label>
                  <select
                    value={chain}
                    onChange={(e) => setChain(e.target.value)}
                    className="pixel-input"
                  >
                    <option value="ethereum">ETHEREUM</option>
                    <option value="bsc">BSC</option>
                    <option value="polygon">POLYGON</option>
                    <option value="solana">SOLANA</option>
                  </select>
                </div>

                {/* Address Input */}
                <div>
                  <label className="block text-xs mb-2">CONTRACT ADDRESS:</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="0x..."
                    className="pixel-input"
                    required
                  />
                </div>

                {/* Sample Buttons */}
                <div className="flex gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => loadSampleReport('safe')}
                    className="px-3 py-2 border-2 border-pixel-safe text-pixel-safe hover:bg-pixel-safe hover:text-pixel-bg"
                  >
                    LOAD SAFE SAMPLE
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSampleReport('threat')}
                    className="px-3 py-2 border-2 border-pixel-critical text-pixel-critical hover:bg-pixel-critical hover:text-pixel-bg"
                  >
                    LOAD THREAT SAMPLE
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="pixel-button w-full"
                >
                  {loading ? '[ SCANNING... ]' : '[ SCAN NOW ]'}
                </button>
              </form>
            </div>

            {/* Threat Heatmap */}
            <div className="pixel-box p-6">
              <h3 className="text-sm mb-4">[ THREAT HEATMAP - LAST 24H ]</h3>
              <div className="space-y-3">
                {[
                  { chain: 'ETHEREUM', count: 45, max: 50 },
                  { chain: 'BSC', count: 23, max: 50 },
                  { chain: 'POLYGON', count: 12, max: 50 },
                  { chain: 'SOLANA', count: 9, max: 50 },
                ].map((item) => (
                  <div key={item.chain}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{item.chain}</span>
                      <span className="text-pixel-critical">{item.count} THREATS</span>
                    </div>
                    <div className="w-full h-6 border-2 border-pixel-border">
                      <div
                        className="h-full bg-pixel-critical opacity-50"
                        style={{ width: `${(item.count / item.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="pixel-box p-6 border-pixel-critical">
                <h3 className="text-sm mb-2 text-pixel-critical">[ ERROR ]</h3>
                <p className="text-xs">{error}</p>
              </div>
            )}

            {/* Results Display */}
            {result && (
              <div className="space-y-6">
                {/* Reputation Score */}
                <div className={`pixel-box p-6 ${getThreatClass(result.threat_level)}`}>
                  <h3 className="text-sm mb-4">[ REPUTATION SCORE ]</h3>
                  
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold mb-2">
                      {result.reputation_score}
                    </div>
                    <div className="text-xs opacity-80">/ 100</div>
                  </div>

                  {/* Score Bar */}
                  <div className="w-full h-8 border-4 border-current mb-4">
                    <div
                      className="h-full bg-current opacity-50"
                      style={{ width: `${result.reputation_score}%` }}
                    />
                  </div>

                  <div className="text-center">
                    <span className="text-lg uppercase">
                      [ {result.threat_level} ]
                    </span>
                  </div>
                </div>

                {/* Threat Details */}
                <div className="pixel-box p-6">
                  <h3 className="text-sm mb-4">[ THREAT ANALYSIS ]</h3>
                  
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span>ADDRESS:</span>
                      <span className="opacity-80 break-all ml-2">{result.address}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>CHAIN:</span>
                      <span className="opacity-80 uppercase">{result.chain}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>CONFIDENCE:</span>
                      <span className="opacity-80">{(result.confidence * 100).toFixed(0)}%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>EVIDENCE:</span>
                      <span className="opacity-80">{result.evidence_count} SOURCES</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>ON-CHAIN:</span>
                      <span className="opacity-80">
                        {result.on_chain_published ? '✓ PUBLISHED' : '✗ NOT PUBLISHED'}
                      </span>
                    </div>
                    
                    {result.threat_types && result.threat_types.length > 0 && (
                      <div>
                        <span className="block mb-2">THREAT TYPES:</span>
                        <div className="pl-4 space-y-1">
                          {result.threat_types.map((type, i) => (
                            <div key={i} className="opacity-80">
                              → {type.toUpperCase().replace('_', ' ')}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Agent Outputs */}
                {result.agent_outputs && (
                  <div className="pixel-box p-6">
                    <h3 className="text-sm mb-4">[ AGENT REPORTS ]</h3>
                    
                    <div className="space-y-4 text-xs">
                      {Object.entries(result.agent_outputs).map(([agent, output]) => (
                        <div key={agent} className="border-l-4 border-pixel-border pl-4">
                          <div className="font-bold mb-1 uppercase">
                            {agent.replace('_', ' ')}:
                          </div>
                          <div className="opacity-80">
                            {output.status || 'COMPLETE'} - {output.tokens_used?.toLocaleString() || 'N/A'} TOKENS
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Recent Threats */}
          <div className="space-y-6">
            <div className="pixel-box p-6">
              <h3 className="text-sm mb-4">[ RECENT THREATS ]</h3>
              <div className="space-y-3">
                {RECENT_THREATS.map((threat, i) => (
                  <div key={i} className={`border-l-4 pl-3 text-xs ${getThreatClass(threat.level)}`}>
                    <div className="font-bold mb-1 uppercase">{threat.level}</div>
                    <div className="opacity-80 break-all mb-1">
                      {threat.address.slice(0, 10)}...{threat.address.slice(-8)}
                    </div>
                    <div className="flex justify-between opacity-60">
                      <span className="uppercase">{threat.chain}</span>
                      <span>{threat.time}</span>
                    </div>
                    <div className="mt-1">
                      SCORE: {threat.score}/100
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="max-w-6xl mx-auto mt-6">
          <div className="pixel-box p-4 text-center">
            <p className="text-xs opacity-60">
              5 SPECIALIZED AI AGENTS // MULTI-CHAIN MONITORING // OPEN SOURCE
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
