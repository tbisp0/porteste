/* eslint-disable */
/* tslint:disable */

/**
 * Mock Service Worker (0.51.1).
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 * - Please do NOT serve this file on production.
 */

const INTEGRITY_CHECKSUM = '3d6b9f06410d179a7f7404d4bf4c3c70';
const activeClientIds = new Set();

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', async function (event) {
  const clientId = event.source.id;
  if (!clientId || !self.clients) {
    return;
  }

  const client = await self.clients.get(clientId);
  if (!client) {
    return;
  }

  const allClients = await self.clients.matchAll({
    type: 'window',
  });

  switch (event.data) {
    case 'KEEPALIVE_REQUEST': {
      sendToClient(client, {
        type: 'KEEPALIVE_RESPONSE',
      });
      break;
    }

    case 'INTEGRITY_CHECK_REQUEST': {
      sendToClient(client, {
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: {
          packageVersion: '0.51.1',
          checksum: INTEGRITY_CHECKSUM,
        },
      });
      break;
    }

    case 'MOCK_ACTIVATE': {
      activeClientIds.add(clientId);

      sendToClient(client, {
        type: 'MOCKING_ENABLED',
        payload: true,
      });
      break;
    }

    case 'MOCK_DEACTIVATE': {
      activeClientIds.delete(clientId);
      break;
    }

    case 'CLIENT_CLOSED': {
      activeClientIds.delete(clientId);

      const remainingClients = allClients.filter((client) => {
        return client.id !== clientId;
      });

      // Unregister itself when there are no more clients
      if (remainingClients.length === 0) {
        self.registration.unregister();
      }

      break;
    }
  }
});

self.addEventListener('fetch', function (event) {
  const { request } = event;
  const accept = request.headers.get('accept') || '';
  const pathname = new URL(request.url).pathname;

  if (pathname === '/' && accept.includes('text/html')) {
    // Bypass server-sent events.
    if (accept.includes('text/event-stream')) {
      return;
    }

    // Bypass navigation requests.
    if (request.mode === 'navigate') {
      return;
    }
  }

  // Bypass all requests when there are no active clients.
  // Prevents the self-unregistered worked from handling requests
  // after it's been deleted (still remains active until all clients are closed).
  if (activeClientIds.size === 0) {
    return;
  }

  // Generate unique request ID.
  const requestId = Math.random().toString(16).slice(2);
  event.respondWith(
    handleRequest(event, requestId).catch((error) => {
      console.error(
        '[MSW] Failed to mock a "%s" request to "%s": %s',
        request.method,
        request.url,
        error
      );
      return Promise.reject(error);
    })
  );
});

async function handleRequest(event, requestId) {
  const client = await resolveMainClient(event);
  const response = await getResponse(event, client, requestId);

  // Send back the response clone for the "response:*" event listeners.
  // Ensure MSW is active and the message is dispatched.
  if (client && activeClientIds.has(client.id)) {
    (async function () {
      const responseClone = response.clone();
      sendToClient(client, {
        type: 'RESPONSE',
        payload: {
          requestId,
          isMockedResponse: true,
          type: responseClone.type,
          status: responseClone.status,
          statusText: responseClone.statusText,
          body: await responseClone.text(),
          headers: Object.fromEntries(responseClone.headers.entries()),
        },
      });
    })();
  }

  return response;
}

// Resolve the main client for the given event.
// Client that issues a request has a "self" clientId on the event object.
async function resolveMainClient(event) {
  const client = await self.clients.get(event.clientId);
  return client || (await self.clients.matchAll()).find((client) => {
    return client.visibilityState === 'visible';
  });
}

async function getResponse(event, client, requestId) {
  const { request } = event;
  const requestClone = request.clone();
  const getOriginalResponse = () => fetch(requestClone);

  // Bypass mocking when the request client is not active.
  if (!client) {
    return getOriginalResponse();
  }

  // Bypass requests with the explicit skipServiceWorker header.
  if (requestClone.headers.get('x-msw-bypass') === 'true') {
    const headers = Object.fromEntries(requestClone.headers.entries());
    delete headers['x-msw-bypass'];
    return fetch(requestClone, { headers });
  }

  // Send the request to the client-side MSW.
  const reqHeaders = {};
  request.headers.forEach((value, key) => {
    reqHeaders[key] = value;
  });

  const body = await request.text();

  const clientMessage = await sendToClient(client, {
    type: 'REQUEST',
    payload: {
      id: requestId,
      url: request.url,
      method: request.method,
      headers: reqHeaders,
      cache: request.cache,
      mode: request.mode,
      credentials: request.credentials,
      redirect: request.redirect,
      referrer: request.referrer,
      referrerPolicy: request.referrerPolicy,
      body: body ? JSON.parse(body) : undefined,
      bodyUsed: request.bodyUsed,
      keepalive: request.keepalive,
    },
  });

  switch (clientMessage.type) {
    case 'MOCK_RESPONSE': {
      return respondWithMock(clientMessage.data);
    }

    case 'MOCK_NOT_FOUND': {
      return getOriginalResponse();
    }

    case 'NETWORK_ERROR': {
      const { name, message } = clientMessage.data;
      const networkError = new Error(message);
      networkError.name = name;

      // Rejecting a request Promise emulates a network error.
      throw networkError;
    }
  }

  return getOriginalResponse();
}

function sendToClient(client, message) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();

    channel.port1.onmessage = (event) => {
      if (event.data && event.data.error) {
        return reject(event.data.error);
      }

      resolve(event.data);
    };

    client.postMessage(message, [channel.port2]);
  });
}

function respondWithMock(response) {
  // Setting response status code to 0 is a no-op.
  // We simply want to pre-set the response headers.
  // This enables "response" event handlers to modify the response.
  const mockResponse = new Response(null, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });

  mockResponse.body = response.body;
  return mockResponse;
}

// Mock response for the translations endpoint
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle translations
  if (url.pathname.startsWith('/api/translations/')) {
    const lang = url.pathname.split('/').pop();
    event.respondWith(
      new Response(
        JSON.stringify({
          translation: {
            welcome: `Bem-vindo (${lang})`,
            // Stats section
            stats: {
              clients: 'Clientes',
              projects: 'Projetos',
              experience: 'Anos de Experiência',
              awards: 'Prêmios'
            },
            // Testimonials section
            testimonials: {
              title: 'O que os clientes dizem',
              subtitle: 'Depoimentos de clientes satisfeitos com nosso trabalho',
              items: [
                {
                  name: 'João Silva',
                  role: 'CEO, Empresa X',
                  content: 'Excelente trabalho!',
                  avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
                },
                {
                  name: 'Maria Santos',
                  role: 'Diretora de Marketing',
                  content: 'Profissional altamente qualificado.',
                  avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
                }
              ]
            },
            // Add more mock translations as needed
          },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    );
    return;
  }

  // Handle analytics
  if (url.pathname === '/api/analytics/pageview' || url.pathname === '/api/analytics/vitals') {
    event.respondWith(
      new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    );
    return;
  }
});
