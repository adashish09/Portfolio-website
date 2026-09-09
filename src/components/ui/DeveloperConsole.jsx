import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Tabs, Tab, Chip } from '@mui/material';
import { Terminal, Code, Hub, FiberManualRecord } from '@mui/icons-material';
import { personalInfo } from '../../data/socialLinks';

const DeveloperConsole = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Ashish Kumar\'s interactive developer environment.' },
    { type: 'system', text: 'Type "help" to view commands, or click any command chip below.' }
  ]);
  const [currentTime, setCurrentTime] = useState('');
  const terminalLogsRef = useRef(null);

  // Update IST clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Internal terminal log scroll ONLY - do NOT scroll page window
  useEffect(() => {
    if (terminalLogsRef.current) {
      terminalLogsRef.current.scrollTop = terminalLogsRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', text: `ashish@portfolio:~$ ${cmd}` }];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available commands:
  • about     - Who is Ashish Kumar?
  • projects  - List featured projects
  • skills    - View core technical stack
  • timeline  - Education & experience overview
  • contact   - Email, phone, and social links
  • resume    - View resume download command
  • clear     - Clear terminal screen`
        });
        break;

      case 'about':
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `${personalInfo.name} | ${personalInfo.title}
📍 Location: ${personalInfo.location}
🎓 Education: ${personalInfo.educationHighlight}
💡 Focus: RAG pipelines, local LLM inference (Ollama), full-stack apps, and cross-platform mobile.`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `Featured Engineering Projects:
1. AI Resume Interviewer (RAG, Llama 3.1:8B via Ollama, React, Node.js)
2. NetSentinel (Linux Packet Capture, Python, Intrusion Detection)
3. FlipLearn (Flutter, Dart, Offline-first Firestore)
4. ESquare (Production Native Android Trivia App, Java, Firebase)
5. StockMate (React, Firebase, Inventory Analytics)
Run 'about' or click 'View Projects' to explore details.`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `Technical Stack:
• AI/LLM: Ollama (Llama 3.1), RAG, Vector Search, MCP, Prompt Engineering
• Frontend: React.js, JavaScript (ES6+), Material UI, Tailwind CSS, HTML5/CSS3
• Backend: Node.js, Express.js, REST APIs, MongoDB, Firebase
• Mobile: Android (Java/Kotlin), Flutter & Dart
• Systems: Linux (Ubuntu/Kali), Packet Capture, Git`
        });
        break;

      case 'timeline':
        newHistory.push({
          type: 'output',
          text: `Chronology:
• 2024 – 2026: MCA @ Chandigarh University (CGPA: 8.24)
• 2026: AI Resume Interviewer (RAG & Ollama) & NetSentinel (Linux NIDS)
• 2025: FlipLearn (Cross-platform Flutter App)
• 2024: ESquare (Native Android Trivia App with Netrom Services)
• 2021 – 2024: BCA @ IGNOU (70.11%)`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Connect with Ashish:
• Email:    ${personalInfo.email}
• Phone:    ${personalInfo.phone}
• GitHub:   ${personalInfo.github}
• LinkedIn: ${personalInfo.linkedin}`
        });
        break;

      case 'resume':
      case 'cat resume.txt': {
        newHistory.push({
          type: 'output',
          text: `Downloading Ashish_Kumar_Resume.pdf... (Initiated)`
        });
        const link = document.createElement('a');
        link.href = '/assets/resume/Ashish_Kumar_Resume.pdf';
        link.download = 'Ashish_Kumar_Resume.pdf';
        link.click();
        break;
      }

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case '':
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `command not found: "${cmd}". Type "help" for a list of commands.`
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  return (
    <Box className="terminal-window" sx={{ width: '100%', maxWidth: '620px', margin: '0 auto' }}>
      {/* Header bar */}
      <Box className="terminal-header">
        <Box className="terminal-dots">
          <Box className="terminal-dot red" />
          <Box className="terminal-dot yellow" />
          <Box className="terminal-dot green" />
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          sx={{
            minHeight: 28,
            '& .MuiTab-root': {
              minHeight: 28,
              py: 0.5,
              px: 1.5,
              fontSize: '0.75rem',
              fontFamily: 'JetBrains Mono, monospace',
              color: 'var(--text-secondary)',
              textTransform: 'none',
              '&.Mui-selected': {
                color: 'var(--primary-glow)',
                fontWeight: 600
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'var(--primary-glow)',
              height: 2
            }
          }}
        >
          <Tab icon={<Terminal sx={{ fontSize: 14 }} />} iconPosition="start" label="terminal.sh" />
          <Tab icon={<Code sx={{ fontSize: 14 }} />} iconPosition="start" label="ashish.config.ts" />
          <Tab icon={<Hub sx={{ fontSize: 14 }} />} iconPosition="start" label="telemetry.json" />
        </Tabs>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.8 }}>
          <FiberManualRecord sx={{ fontSize: 10, color: '#10b981' }} />
          <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: '#10b981', fontSize: '0.7rem' }}>
            ONLINE
          </Typography>
        </Box>
      </Box>

      {/* Tab 0: Interactive Terminal */}
      {activeTab === 0 && (
        <Box sx={{ p: { xs: 1.5, sm: 2 }, height: { xs: '280px', sm: '320px' }, display: 'flex', flexDirection: 'column', bgcolor: '#040814' }}>
          <Box ref={terminalLogsRef} sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
            {history.map((item, idx) => (
              <Box key={idx} sx={{ mb: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', lineHeight: 1.5 }}>
                {item.type === 'system' && (
                  <Typography sx={{ color: 'var(--text-muted)', fontFamily: 'inherit', fontSize: 'inherit' }}>
                    # {item.text}
                  </Typography>
                )}
                {item.type === 'input' && (
                  <Typography sx={{ color: 'var(--primary-glow)', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 600 }}>
                    {item.text}
                  </Typography>
                )}
                {item.type === 'output' && (
                  <Typography component="pre" sx={{ color: '#e2e8f0', fontFamily: 'inherit', fontSize: 'inherit', whiteSpace: 'pre-wrap' }}>
                    {item.text}
                  </Typography>
                )}
                {item.type === 'error' && (
                  <Typography sx={{ color: '#f87171', fontFamily: 'inherit', fontSize: 'inherit' }}>
                    {item.text}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>

          {/* Prompt line */}
          <Box sx={{ display: 'flex', alignItems: 'center', pt: 1, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Typography sx={{ color: 'var(--primary-glow)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', mr: 1, whiteSpace: 'nowrap' }}>
              ashish@portfolio:~$
            </Typography>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help' or click a chip below..."
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.82rem'
              }}
            />
          </Box>

          {/* Quick command buttons */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mt: 1.5 }}>
            {['help', 'about', 'projects', 'skills', 'timeline', 'contact', 'clear'].map((cmd) => (
              <Chip
                key={cmd}
                label={cmd}
                size="small"
                onClick={() => executeCommand(cmd)}
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
                  height: 22,
                  bgcolor: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  color: 'var(--secondary-glow)',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'rgba(0, 242, 254, 0.2)',
                    borderColor: 'var(--primary-glow)'
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Tab 1: TypeScript Config */}
      {activeTab === 1 && (
        <Box sx={{ p: 2.5, height: '320px', overflowY: 'auto', bgcolor: '#040814', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', lineHeight: 1.6 }}>
          <Typography component="pre" sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: '#94a3b8' }}>
            <span className="code-syntax-keyword">import</span> &#123; DeveloperProfile &#125; <span className="code-syntax-keyword">from</span> <span className="code-syntax-string">'@ashish/core'</span>;{'\n\n'}
            <span className="code-syntax-keyword">export const</span> <span className="code-syntax-variable">ashishKumar</span>: DeveloperProfile = &#123;{'\n'}
            {'  '}<span className="code-syntax-variable">name</span>: <span className="code-syntax-string">"{personalInfo.name}"</span>,{'\n'}
            {'  '}<span className="code-syntax-variable">title</span>: <span className="code-syntax-string">"Software Engineer"</span>,{'\n'}
            {'  '}<span className="code-syntax-variable">education</span>: &#123;{'\n'}
            {'    '}<span className="code-syntax-variable">degree</span>: <span className="code-syntax-string">"MCA"</span>,{'\n'}
            {'    '}<span className="code-syntax-variable">institution</span>: <span className="code-syntax-string">"Chandigarh University"</span>,{'\n'}
            {'    '}<span className="code-syntax-variable">cgpa</span>: <span className="code-syntax-number">8.24</span>,{'\n'}
            {'    '}<span className="code-syntax-variable">graduationYear</span>: <span className="code-syntax-number">2026</span>{'\n'}
            {'  '}&#125;,{'\n'}
            {'  '}<span className="code-syntax-variable">location</span>: <span className="code-syntax-string">"{personalInfo.location}"</span>,{'\n'}
            {'  '}<span className="code-syntax-variable">status</span>: <span className="code-syntax-string">"{personalInfo.status}"</span>,{'\n'}
            {'  '}<span className="code-syntax-variable">domains</span>: [{'\n'}
            {'    '}<span className="code-syntax-string">"Full-Stack Web (React, Node.js)"</span>,{'\n'}
            {'    '}<span className="code-syntax-string">"AI & LLMs (RAG, Ollama Llama 3.1)"</span>,{'\n'}
            {'    '}<span className="code-syntax-string">"Mobile (Android Native & Flutter)"</span>,{'\n'}
            {'    '}<span className="code-syntax-string">"Systems & Linux Security (NIDS)"</span>{'\n'}
            {'  '}],{'\n'}
            {'  '}<span className="code-syntax-variable">openForHire</span>: <span className="code-syntax-keyword">true</span>{'\n'}
            &#125;;
          </Typography>
        </Box>
      )}

      {/* Tab 2: Telemetry JSON */}
      {activeTab === 2 && (
        <Box sx={{ p: 2.5, height: '320px', overflowY: 'auto', bgcolor: '#040814', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', lineHeight: 1.6 }}>
          <Typography component="pre" sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: '#94a3b8' }}>
            &#123;{'\n'}
            {'  '}<span className="code-syntax-variable">"nodeEnv"</span>: <span className="code-syntax-string">"production"</span>,{'\n'}
            {'  '}<span className="code-syntax-variable">"serverStatus"</span>: <span className="code-syntax-string">"HEALTHY_200_OK"</span>,{'\n'}
            {'  '}<span className="code-syntax-variable">"localTimeIST"</span>: <span className="code-syntax-string">"{currentTime}"</span>,{'\n'}
            {'  '}<span className="code-syntax-variable">"gitBranch"</span>: <span className="code-syntax-string">"main"</span>,{'\n'}
            {'  '}<span className="code-syntax-variable">"commitHash"</span>: <span className="code-syntax-string">"6b8fab2-HEAD"</span>,{'\n'}
            {'  '}<span className="code-syntax-variable">"inferenceEngine"</span>: &#123;{'\n'}
            {'    '}<span className="code-syntax-variable">"model"</span>: <span className="code-syntax-string">"Llama 3.1:8B"</span>,{'\n'}
            {'    '}<span className="code-syntax-variable">"serving"</span>: <span className="code-syntax-string">"Ollama Local Runtime"</span>,{'\n'}
            {'    '}<span className="code-syntax-variable">"ragEmbeddings"</span>: <span className="code-syntax-string">"Active"</span>{'\n'}
            {'  '}&#125;,{'\n'}
            {'  '}<span className="code-syntax-variable">"telemetryPing"</span>: <span className="code-syntax-string">"18ms"</span>,{'\n'}
            {'  '}<span className="code-syntax-variable">"portfolioHost"</span>: <span className="code-syntax-string">"Netlify Edge CDN"</span>{'\n'}
            &#125;
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DeveloperConsole;
