// src/setupTests.ts
import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Добавляем полифиллы для TextEncoder и TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;