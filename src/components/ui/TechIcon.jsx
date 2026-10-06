import React from 'react';
import {
  SiPython,
  SiReact,
  SiFlutter,
  SiAndroid,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiMysql,
  SiJavascript,
  SiCplusplus,
  SiLinux,
  SiGit,
  SiGithub,
  SiWireshark,
  SiOpenai,
  SiPytorch,
  SiDart
} from 'react-icons/si';
import { FaJava, FaNetworkWired, FaBrain, FaDatabase, FaCode } from 'react-icons/fa';
import { Memory, AccountTree, Psychology, PrecisionManufacturing } from '@mui/icons-material';

/**
 * High-fidelity authentic brand icons for Ashish's Technical Stack.
 */
export const TechIcon = ({ iconKey, size = 28, color }) => {
  const iconProps = {
    size,
    style: {
      color: color || 'currentColor',
      display: 'inline-block',
      verticalAlign: 'middle',
      transition: 'transform 0.25s ease, filter 0.25s ease'
    }
  };

  switch (iconKey) {
    case 'python':
      return <SiPython {...iconProps} />;
    case 'react':
      return <SiReact {...iconProps} />;
    case 'flutter':
      return <SiFlutter {...iconProps} />;
    case 'android':
      return <SiAndroid {...iconProps} />;
    case 'nodejs':
      return <SiNodedotjs {...iconProps} />;
    case 'express':
      return <SiExpress {...iconProps} />;
    case 'mongodb':
      return <SiMongodb {...iconProps} />;
    case 'firebase':
      return <SiFirebase {...iconProps} />;
    case 'mysql':
      return <SiMysql {...iconProps} />;
    case 'javascript':
      return <SiJavascript {...iconProps} />;
    case 'java':
      return <FaJava {...iconProps} />;
    case 'cpp':
      return <SiCplusplus {...iconProps} />;
    case 'linux':
      return <SiLinux {...iconProps} />;
    case 'git':
      return <SiGit {...iconProps} />;
    case 'github':
      return <SiGithub {...iconProps} />;
    case 'packets':
    case 'wireshark':
      return <SiWireshark {...iconProps} />;
    case 'networking':
      return <FaNetworkWired {...iconProps} />;
    case 'rag':
      return <FaBrain {...iconProps} />;
    case 'ollama':
      return <SiPytorch {...iconProps} />;
    case 'embeddings':
      return <Memory sx={{ fontSize: size, color: color || 'currentColor' }} />;
    case 'prompt':
      return <SiOpenai {...iconProps} />;
    case 'htmlcss':
      return <SiHtml5 {...iconProps} />;
    case 'dsa':
      return <AccountTree sx={{ fontSize: size, color: color || 'currentColor' }} />;
    default:
      return <FaCode {...iconProps} />;
  }
};

export default TechIcon;
