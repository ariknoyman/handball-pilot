import React from 'react';
import { createRoot } from 'react-dom/client';
import { FileRouter } from '@instinct/files';
import { App } from './App';
import { preloadAssets } from './assets';

// The hosting viewer may pass the route hash URL-encoded (#%2F...); normalize it for the hash router.
if (location.hash.startsWith('#%')) { try { history.replaceState(null, '', '#' + decodeURIComponent(location.hash.slice(1))); } catch { /* noop */ } }
createRoot(document.getElementById('root')!).render(<FileRouter><App /></FileRouter>);
preloadAssets();
