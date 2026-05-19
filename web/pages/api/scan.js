import { spawn } from 'child_process'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { address, chain } = req.body

  if (!address || !chain) {
    return res.status(400).json({ error: 'Address and chain are required' })
  }

  // Validate address format
  if (chain === 'solana') {
    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
      return res.status(400).json({ error: 'Invalid Solana address' })
    }
  } else {
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return res.status(400).json({ error: 'Invalid EVM address' })
    }
  }

  try {
    // Call Python backend
    const pythonScript = path.join(process.cwd(), '..', 'src', 'scan_api.py')
    
    const result = await runPythonScript(pythonScript, address, chain)
    
    return res.status(200).json(result)
  } catch (error) {
    console.error('Scan error:', error)
    return res.status(500).json({ 
      error: 'Scan failed',
      details: error.message 
    })
  }
}

function runPythonScript(scriptPath, address, chain) {
  return new Promise((resolve, reject) => {
    const python = spawn('python3', [scriptPath, address, chain])
    
    let stdout = ''
    let stderr = ''
    
    python.stdout.on('data', (data) => {
      stdout += data.toString()
    })
    
    python.stderr.on('data', (data) => {
      stderr += data.toString()
    })
    
    python.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(stderr || 'Python script failed'))
        return
      }
      
      try {
        const result = JSON.parse(stdout)
        resolve(result)
      } catch (err) {
        reject(new Error('Invalid JSON response from Python'))
      }
    })
    
    // Timeout after 30 seconds
    setTimeout(() => {
      python.kill()
      reject(new Error('Scan timeout'))
    }, 30000)
  })
}
