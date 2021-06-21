import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

function init() {
  Sentry.init({
    dsn: 'https://2e20b3d164ed46bea0f1f3e9562306ba@o702617.ingest.sentry.io/5777784',
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
