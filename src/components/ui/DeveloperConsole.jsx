import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Tabs, Tab, Chip } from '@mui/material';
import { Terminal, Code, Hub, FiberManualRecord } from '@mui/icons-material';
import { personalInfo } from '../../data/socialLinks';
import { useThemeMode } from '../../context/ThemeContext';

const DeveloperConsole = () => {
  const { mode, toggleTheme, setThemeMode, isDark } = useThemeMode();
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
  • projects  - List 4 featured engineering projects
  • skills    - View core technical stack
  • stack     - Polyglot & adaptability breakdown
  • timeline  - Education & experience overview
  • theme     - Toggle or set visual theme (light / dark)
  • contact   - Direct email and professional links
  • resume    - Download verified PDF resume
  • clear     - Clear terminal screen`
        });
        break;

      case 'theme':
      case 'toggle-theme':
        toggleTheme();
        newHistory.push({
          type: 'output',
          text: `Theme toggled to: ${mode === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}`
        });
        break;

      case 'theme light':
        setThemeMode('light');
        newHistory.push({ type: 'output', text: `Theme switched to LIGHT MODE.` });
        break;

      case 'theme dark':
        setThemeMode('dark');
        newHistory.push({ type: 'output', text: `Theme switched to DARK MODE.` });
        break;

      case 'about':
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `${personalInfo.name} | ${personalInfo.title}
📍 Location: ${personalInfo.location}
🎓 Education: ${personalInfo.educationHighlight}
💡 Superpower: Eager learner who built 4 independent production projects across 4 distinct tech stacks in 12 months.`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `Featured Engineering Systems:
1. AI Resume Interviewer [AI/LLM] - RAG + Local Ollama Llama 3.1:8B, React, Node.js, Python
2. NetSentinel [Security] - Linux Raw Packet Capture, Anomaly Detection, React Dashboard
3. FlipLearn [Mobile] - Cross-platform Flutter & Dart, Offline-First Cloud Firestore Sync
4. ESquare [Android] - Native Android SDK, Java, Firebase Realtime DB (Google Play Published)
Run 'stack' to see how these architectures connect, or click any project card.`
        });
        break;

      case 'stack':
        newHistory.push({
          type: 'output',
          text: `Adaptability & Architecture Stacks:
[AI / RAG]     Python • Ollama (Llama 3.1:8B) • Vector Embeddings • Semantic Search
[Systems]      Linux (Ubuntu/Kali) • Raw Packet Sockets • Rule-based Anomaly Engine
[Mobile]       Flutter / Dart (Offline Sync) • Native Android SDK (Java/Kotlin)
[Full-Stack]   React.js • Node.js • Express.js • MongoDB • Firebase • MySQL
[Philosophy]   "Read the RFCs, inspect the codebase, prototype in 48 hours."`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `Technical Skills Matrix:
• AI & ML: Ollama, Llama 3.1, RAG Pipelines, Vector Search, Prompt Engineering
• Frontend & Mobile: React.js, Android (Kotlin/XML), Flutter, Dart, Bootstrap, HTML5/CSS3
• Backend & DB: Node.js, Express.js, REST APIs, MongoDB, Firebase Firestore, MySQL
• Core & Systems: Java, Python, JavaScript, Linux CLI/Daemons, Git, DSA, OOP`
        });
        break;

      case 'timeline':
        newHistory.push({
          type: 'output',
          text: `Engineering Milestones:
• 2024 – 2026: MCA @ Chandigarh University (CGPA: 8.24/10)
• Apr 2026 – May 2026: AI Resume Interviewer Platform (RAG & Ollama)
• Jan 2026 – Mar 2026: NetSentinel Linux NIDS Suite
• Sept 2025 – Nov 2025: FlipLearn (Cross-platform Flutter App)
• Jan 2024 – May 2024: ESquare Native Android App (Netrom Services / Google Play)
• 2021 – 2024: BCA @ IGNOU (Score: 70.11%)`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Direct Contact Channels:
• Email:    ${personalInfo.email} (Primary • Replies < 12h)
• LinkedIn: ${personalInfo.linkedin}
• GitHub:   ${personalInfo.github}
• Portfolio: ${personalInfo.portfolioUrl}
• Location: ${personalInfo.location}`
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
        <Box sx={{ p: { xs: 2, sm: 2.5 }, height: { xs: '380px', sm: '460px', md: '500px' }, display: 'flex', flexDirection: 'column', bgcolor: 'var(--code-bg)' }}>
          <Box ref={terminalLogsRef} sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
            {history.map((item, idx) => (
              <Box key={idx} sx={{ mb: 1, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.84rem', lineHeight: 1.55 }}>
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
                  <Typography component="pre" sx={{ color: 'var(--text-secondary)', fontFamily: 'inherit', fontSize: 'inherit', whiteSpace: 'pre-wrap' }}>
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
          <Box sx={{ display: 'flex', alignItems: 'center', pt: 1.2, borderTop: '1px solid var(--card-border)' }}>
            <Typography sx={{ color: 'var(--primary-glow)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.84rem', mr: 1, whiteSpace: 'nowrap', fontWeight: 700 }}>
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
                color: 'var(--text-primary)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.84rem'
              }}
            />
          </Box>

          {/* Quick command buttons */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mt: 1.5 }}>
            {['help', 'about', 'projects', 'stack', 'skills', 'timeline', 'theme', 'contact', 'clear'].map((cmd) => (
              <Chip
                key={cmd}
                label={cmd}
                size="small"
                onClick={() => executeCommand(cmd)}
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.72rem',
                  height: 24,
                  bgcolor: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.08)',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.25)',
                  color: isDark ? 'var(--secondary-glow)' : '#0284c7',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(0, 242, 254, 0.2)' : 'rgba(2, 132, 199, 0.16)',
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
        <Box sx={{ p: 2.5, height: { xs: '380px', sm: '460px', md: '500px' }, overflowY: 'auto', bgcolor: 'var(--code-bg)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.84rem', lineHeight: 1.65 }}>
          <Typography component="pre" sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: 'var(--text-secondary)' }}>
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
        <Box sx={{ p: 2.5, height: { xs: '380px', sm: '460px', md: '500px' }, overflowY: 'auto', bgcolor: 'var(--code-bg)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.84rem', lineHeight: 1.65 }}>
          <Typography component="pre" sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: 'var(--text-secondary)' }}>
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
