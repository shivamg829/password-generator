import { useState, useCallback, useRef, useEffect } from 'react'
import './App.css' 

function App() {
  const [len, setLen] = useState(12)
  const [numAllowed, setNumAllowed] = useState(true)
  const [symAllowed, setSymAllowed] = useState(true)
  const [generatedPassword, setGeneratedPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let password = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numAllowed) str += '0123456789'
    if (symAllowed) str += '!@#$%^&*()_+~`|}{[]:;?><,./-='
    for (let i = 0; i < len; i++) {
      const idx = Math.floor(Math.random() * str.length)
      password += str.charAt(idx)
    }
    setGeneratedPassword(password)
    setCopied(false)
  }, [len, numAllowed, symAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [len, numAllowed, symAllowed, passwordGenerator])

  const copyPassword = () => {
    passwordRef.current.select()
    navigator.clipboard.writeText(generatedPassword)
    setCopied(true)
  }

  const strength = len < 6 ? 'Weak' : len < 10 ? 'Medium' : 'Strong'
  const strengthClass = strength.toLowerCase()

  return (
    <div className="container">
      <div className="bg-blur-1"></div>
      <div className="bg-blur-2"></div>
      
      <div className="card">
        <div className="decor-top-right"></div>
        <div className="decor-bottom-left"></div>
        <div className="header">
          <div className="logo-container">
            <div className="logo logo-left"></div>
            <h1 className="title">SecurePass Pro</h1>
            <div className="logo logo-right"></div>
          </div>
          <p className="subtitle">Generate strong & secure passwords instantly</p>
        </div>
        <div className="password-container">
          <div className="password-glow"></div>
          <div className="password-input-wrapper">
            <input
              type="text"
              readOnly
              value={generatedPassword}
              ref={passwordRef}
              className="password-input"
            />
            <button
              onClick={copyPassword}
              className={`copy-button ${copied ? 'copied' : ''}`}
            >
              {copied ? (
                <div className="button-content">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Copied</span>
                </div>
              ) : (
                <div className="button-content">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <span>Copy</span>
                </div>
              )}
            </button>
          </div>
        </div>
        <div className="strength-section">
          <div className="strength-header">
            <span className="strength-label">Password Strength</span>
            <div className="strength-display">
              <div className="strength-dots">
                {[1, 2, 3].map((dot) => (
                  <div
                    key={dot}
                    className={`strength-dot ${strengthClass} dot-${dot}`}
                  ></div>
                ))}
              </div>
              <span className={`strength-text ${strengthClass}`}>{strength}</span>
            </div>
          </div>
          <div className="strength-bar">
            <div className={`strength-fill ${strengthClass}`}></div>
          </div>
        </div>
        <div className="length-section">
          <div className="length-header">
            <div className="length-label">Password Length</div>
            <div className="length-display">
              <span className="length-value">{len}</span>
              <span className="length-unit">chars</span>
            </div>
          </div>
          <input
            type="range"
            min="4"
            max="24"
            value={len}
            onChange={(e) => setLen(Number(e.target.value))}
            className="length-slider"
          />
          <div className="slider-labels">
            <span>4</span>
            <span>8</span>
            <span>12</span>
            <span>16</span>
            <span>20</span>
            <span>24</span>
          </div>
        </div>
        <div className="options-grid">
          <label className={`option-card ${numAllowed ? 'active' : ''}`}>
            <div className="option-content">
              <div className="option-icon-wrapper">
                <div className={`option-icon ${numAllowed ? 'active' : ''}`}>
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="option-text">
                  <div className="option-title">Numbers</div>
                  <div className="option-subtitle">0-9</div>
                </div>
              </div>
              <div className={`toggle-switch ${numAllowed ? 'active' : ''}`}>
                <div className="toggle-thumb"></div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={numAllowed}
              onChange={(e) => setNumAllowed(e.target.checked)}
              className="option-checkbox"
            />
          </label>

          <label className={`option-card ${symAllowed ? 'active' : ''}`}>
            <div className="option-content">
              <div className="option-icon-wrapper">
                <div className={`option-icon ${symAllowed ? 'active' : ''}`}>
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                  </svg>
                </div>
                <div className="option-text">
                  <div className="option-title">Symbols</div>
                  <div className="option-subtitle">!@#$%</div>
                </div>
              </div>
              <div className={`toggle-switch ${symAllowed ? 'active' : ''}`}>
                <div className="toggle-thumb"></div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={symAllowed}
              onChange={(e) => setSymAllowed(e.target.checked)}
              className="option-checkbox"
            />
          </label>
        </div>
        <button
          onClick={passwordGenerator}
          className="generate-button"
        >
          <div className="generate-glow"></div>
          <div className="button-inner">
            <svg className="icon spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Generate New Password
          </div>
        </button>
        <div className="footer">
          <p>🔒 Your password is generated locally in your browser</p>
          <p>No data is sent to any server</p>
        </div>
      </div>
    </div>
  )
}

export default App