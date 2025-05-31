import { rest } from 'msw';

export const handlers = [
  // Mock translations endpoint
  rest.get('/api/translations/:lang', (req, res, ctx) => {
    const { lang } = req.params;
    console.log(`[MSW] Fetching translations for ${lang}`);
    
    // Return mock translations
    return res(
      ctx.delay(150), // Simulate network delay
      ctx.json({
        translation: {
          welcome: 'Bem-vindo ao Meu Site',
          // Add more mock translations as needed
        }
      })
    );
  }),

  // Mock analytics endpoints
  rest.post('/api/analytics/pageview', (req, res, ctx) => {
    console.log('[MSW] Pageview tracked', req.body);
    return res(
      ctx.delay(50),
      ctx.json({ success: true })
    );
  }),

  rest.post('/api/analytics/vitals', (req, res, ctx) => {
    console.log('[MSW] Web vitals tracked', req.body);
    return res(
      ctx.delay(50),
      ctx.json({ success: true })
    );
  }),
];
