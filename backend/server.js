import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, 'data');
const profilePath = join(dataDir, 'profile.json');
const supportPath = join(dataDir, 'support-messages.json');
const PORT = Number(process.env.PORT || 5050);

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function readJson(path, fallback) {
  try {
    const raw = await readFile(path, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeJson(path, data) {
  await writeFile(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

function send(res, status, data) {
  res.writeHead(status, jsonHeaders);
  res.end(JSON.stringify(data));
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === 'OPTIONS') {
      res.writeHead(204, jsonHeaders);
      res.end();
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/health') {
      send(res, 200, { ok: true, service: 'meetcraft-backend' });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/profile') {
      send(res, 200, await readJson(profilePath, {}));
      return;
    }

    if (req.method === 'PUT' && url.pathname === '/api/profile') {
      const current = await readJson(profilePath, {});
      const next = { ...current, ...(await readBody(req)) };
      await writeJson(profilePath, next);
      send(res, 200, next);
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/support-messages') {
      send(res, 200, await readJson(supportPath, []));
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/support-messages') {
      const messages = await readJson(supportPath, []);
      const body = await readBody(req);
      const message = {
        id: Date.now(),
        type: body.type || 'question',
        subject: body.subject || '',
        message: body.message || '',
        createdAt: new Date().toISOString(),
      };
      messages.unshift(message);
      await writeJson(supportPath, messages);
      send(res, 201, message);
      return;
    }

    send(res, 404, { error: 'Not found' });
  } catch (error) {
    send(res, 500, { error: error.message || 'Server error' });
  }
});

server.listen(PORT, () => {
  console.log(`MeetCraft backend running at http://127.0.0.1:${PORT}`);
});
