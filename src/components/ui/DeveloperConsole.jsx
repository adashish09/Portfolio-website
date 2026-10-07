import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Tabs, Tab, Chip, Button } from '@mui/material';
import { Terminal, Code, Hub, FiberManualRecord, AutoAwesome } from '@mui/icons-material';
import { personalInfo } from '../../data/socialLinks';
import { useThemeMode } from '../../context/ThemeContext';
import HolographicCore from '../3d/HolographicCore';

const DeveloperConsole = () => {
  const { mode, toggleTheme, setThemeMode, isDark, themes, currentTheme } = useThemeMode();
  const [activeTab, setActiveTab] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Ashish Kumar\'s interactive developer environment.' },
    { type: 'system', text: 'Type "help" to view commands, or click any command chip below. Try "hologram" to inspect 3D core!' }
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
  • hologram    - Open interactive 3D Holographic Architecture Core
  • theme       - List all 4 themes & active preset
  • theme <id>  - Switch theme: cosmic, synthwave, matrix, frost
  • about       - Who is Ashish Kumar?
  • projects    - List 4 featured engineering projects
  • skills      - View core technical stack
  • stack       - Polyglot & adaptability breakdown
  • timeline    - Education & experience overview
  • contact     - Direct email and professional links
  • resume      - Download verified PDF resume
  • clear       - Clear terminal screen`
        });
        break;

      case 'hologram':
      case '3d':
      case 'core':
        setActiveTab(1);
        newHistory.push({
          type: 'output',
          text: `Switched to 3D Holographic Architecture Core tab. Click & drag to inspect 360° orbital satellites!`
        });
        break;

      case 'theme':
      case 'themes':
        newHistory.push({
          type: 'output',
          text: `Active Theme: [${currentTheme.name}] (${currentTheme.tagline})
Available Presets:
  1. cosmic    - Cosmic Cyber (Deep space obsidian & cyan glow)
  2. synthwave - Neon Synthwave (Outrun & magenta sunset)
  3. matrix    - Matrix Terminal (Encrypted emerald & cyber teal)
  4. frost     - Nordic Frost (Glacier pearl & cobalt blue)
Type "theme <name>" or use the top navbar switcher to morph universe.`
        });
        break;

      case 'theme cosmic':
      case 'theme dark':
        setThemeMode('dark');
        newHistory.push({ type: 'output', text: `Universe warped to: COSMIC CYBER [Deep Space]` });
        break;

      case 'theme synthwave':
      case 'theme outrun':
      case 'theme neon':
        setThemeMode('synthwave');
        newHistory.push({ type: 'output', text: `Universe warped to: NEON SYNTHWAVE [Outrun Sunset]` });
        break;

      case 'theme matrix':
      case 'theme hacker':
      case 'theme terminal':
        setThemeMode('matrix');
        newHistory.push({ type: 'output', text: `Universe warped to: MATRIX TERMINAL [Hacker Emerald]` });
        break;

      case 'theme frost':
      case 'theme light':
      case 'theme glacier':
        setThemeMode('light');
        newHistory.push({ type: 'output', text: `Universe warped to: NORDIC FROST [Glacier Pearl]` });
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
      case 'education':
      case 'experience':
        newHistory.push({
          type: 'output',
          text: `Chronology:
• 2024 - 2026: Master of Computer Applications (MCA) @ Chandigarh University (CGPA: 8.24)
• 2021 - 2024: Bachelor of Computer Applications (BCA) @ Arka Jain University (CGPA: 8.42)
• 2024: Full Stack Developer Trainee @ Cognifyz Technologies (Responsive UI & RESTful APIs)`
        });
        break;

      case 'contact':
      case 'email':
        newHistory.push({
          type: 'output',
          text: `Connect with Ashish:
• Direct Email: ${personalInfo.email}
• LinkedIn: ${personalInfo.linkedin}
• GitHub: ${personalInfo.github}`
        });
        break;

      case 'resume':
      case 'cv':
        window.open('/Ashish_Kumar_Resume.pdf', '_blank');
        newHistory.push({
          type: 'output',
          text: `Opening Ashish Kumar's verified Resume (PDF) in a new tab...`
        });
        break;

      case 'clear':
      case 'cls':
        setHistory([
          { type: 'system', text: 'Terminal cleared. Type "help" or click any command chip below.' }
        ]);
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
    <Box className="terminal-window" sx={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
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
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            minHeight: 28,
            maxWidth: { xs: 'calc(100% - 60px)', sm: 'auto' },
            '& .MuiTab-root': {
              minHeight: 28,
              py: 0.5,
              px: { xs: 0.8, sm: 1.2 },
              fontSize: { xs: '0.68rem', sm: '0.74rem' },
              fontFamily: 'JetBrains Mono, monospace',
              color: 'var(--text-secondary)',
              textTransform: 'none',
              minWidth: 'auto',
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
          <Tab icon={<Terminal sx={{ fontSize: 13 }} />} iconPosition="start" label="terminal.sh" />
          <Tab icon={<AutoAwesome sx={{ fontSize: 13, color: 'var(--primary-glow)' }} />} iconPosition="start" label="hologram.3d" />
          <Tab icon={<Code sx={{ fontSize: 13 }} />} iconPosition="start" label="ashish.config.ts" />
          <Tab icon={<Hub sx={{ fontSize: 13 }} />} iconPosition="start" label="telemetry.json" />
        </Tabs>

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.8 }}>
          <FiberManualRecord sx={{ fontSize: 10, color: currentTheme.primaryColor }} />
          <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--primary-glow)', fontSize: '0.7rem' }}>
            {currentTheme.name.toUpperCase()}
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
                  <Typography sx={{ color: '#ef4444', fontFamily: 'inherit', fontSize: 'inherit' }}>
                    {item.text}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>

          {/* Terminal Input Line */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 1.5, borderTop: '1px solid var(--card-border)' }}>
            <Typography sx={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--primary-glow)', fontSize: '0.84rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
              ashish@portfolio:~$
            </Typography>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help' or click a chip below..."
              style={{
                flexGrow: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.84rem'
              }}
              autoComplete="off"
              spellCheck="false"
            />
          </Box>

          {/* Quick Clickable Command Chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, pt: 1.5 }}>
            {[
              { label: 'help', cmd: 'help' },
              { label: '✨ 3d hologram', cmd: 'hologram' },
              { label: 'about', cmd: 'about' },
              { label: 'projects', cmd: 'projects' },
              { label: 'stack', cmd: 'stack' },
              { label: '🌌 cosmic', cmd: 'theme cosmic' },
              { label: '🌆 synthwave', cmd: 'theme synthwave' },
              { label: '💻 matrix', cmd: 'theme matrix' },
              { label: '❄️ frost', cmd: 'theme frost' },
              { label: 'clear', cmd: 'clear' }
            ].map((chip, idx) => (
              <Chip
                key={idx}
                label={chip.label}
                size="small"
                onClick={() => executeCommand(chip.cmd)}
                sx={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.70rem',
                  height: 24,
                  bgcolor: 'var(--subtle-chip-bg)',
                  border: '1px solid var(--card-border)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'var(--theme-halo)',
                    borderColor: 'var(--primary-glow)',
                    color: 'var(--text-primary)'
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Tab 1: Interactive 3D Holographic Core */}
      {activeTab === 1 && (
        <Box sx={{ height: { xs: '380px', sm: '460px', md: '500px' }, bgcolor: 'var(--code-bg)' }}>
          <HolographicCore onBackToTerminal={() => setActiveTab(0)} />
        </Box>
      )}

      {/* Tab 2: TypeScript Config */}
      {activeTab === 2 && (
        <Box sx={{ p: 2.5, height: { xs: '380px', sm: '460px', md: '500px' }, overflowY: 'auto', bgcolor: 'var(--code-bg)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.84rem', lineHeight: 1.65 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, pb: 1, borderBottom: '1px solid var(--card-border)' }}>
            <Typography variant="caption" sx={{ color: 'var(--primary-glow)', fontFamily: 'inherit', fontWeight: 700 }}>
              // ashish.config.ts
            </Typography>
            <Button
              size="small"
              onClick={() => setActiveTab(0)}
              startIcon={<Terminal sx={{ fontSize: 13 }} />}
              sx={{
                color: 'var(--primary-glow)',
                fontFamily: 'inherit',
                fontSize: '0.72rem',
                textTransform: 'none',
                py: 0.3,
                px: 1.2,
                borderRadius: '6px',
                bgcolor: 'var(--subtle-chip-bg)',
                border: '1px solid var(--card-border)',
                '&:hover': { bgcolor: 'var(--theme-halo)' }
              }}
            >
              ← Back to Terminal
            </Button>
          </Box>
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

      {/* Tab 3: Telemetry JSON */}
      {activeTab === 3 && (
        <Box sx={{ p: 2.5, height: { xs: '380px', sm: '460px', md: '500px' }, overflowY: 'auto', bgcolor: 'var(--code-bg)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.84rem', lineHeight: 1.65 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, pb: 1, borderBottom: '1px solid var(--card-border)' }}>
            <Typography variant="caption" sx={{ color: 'var(--primary-glow)', fontFamily: 'inherit', fontWeight: 700 }}>
              // telemetry.json
            </Typography>
            <Button
              size="small"
              onClick={() => setActiveTab(0)}
              startIcon={<Terminal sx={{ fontSize: 13 }} />}
              sx={{
                color: 'var(--primary-glow)',
                fontFamily: 'inherit',
                fontSize: '0.72rem',
                textTransform: 'none',
                py: 0.3,
                px: 1.2,
                borderRadius: '6px',
                bgcolor: 'var(--subtle-chip-bg)',
                border: '1px solid var(--card-border)',
                '&:hover': { bgcolor: 'var(--theme-halo)' }
              }}
            >
              ← Back to Terminal
            </Button>
          </Box>
          <Typography component="pre" sx={{ fontFamily: 'inherit', fontSize: 'inherit', color: 'var(--text-secondary)' }}>
            &#123;{'\n'}
            {'  '}<span className="code-syntax-variable">"nodeEnv"</span>: <span className="code-syntax-string">"production"</span>,{'\n'}
            {'  '}<span className="code-syntax-variable">"activeUniverse"</span>: <span className="code-syntax-string">"{currentTheme.name}"</span>,{'\n'}
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
