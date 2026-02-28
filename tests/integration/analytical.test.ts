import supertest from 'supertest';
import { app } from '../../src/app';
import connection from '../../src/database/connection';
import jwt from 'jsonwebtoken';

beforeAll(() => {
  process.env.SECRET = 'testsecret';
});

afterEach(() => {
  jest.clearAllMocks();
});

function mockConnectWithResponses(responder: (sql: string, params: any[]) => any) {
  const query = jest.fn((sql: string, params: any[]) => {
    return Promise.resolve(responder(sql, params));
  });
  const release = jest.fn();
  (connection as any).connect = jest.fn().mockResolvedValue({ query, release });
  return { query, release };
}

describe('Testes de Integração - Rotas Analíticas e Ferramentas', () => {
  const token = jwt.sign({ id: 1, username: 'admin', admin: true, tenant_id: 1 }, 'testsecret', { expiresIn: '1d' });

  test('GET /panel_analytical/info_values_os_paid - sucesso', async () => {
    mockConnectWithResponses(() => ({ rows: [], rowCount: 0 }));
    const res = await supertest(app)
      .get('/panel_analytical/info_values_os_paid')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  test('GET /panel_analytical/info_invoicing_liquid - sucesso', async () => {
    mockConnectWithResponses((sql) => {
      if (sql.includes('FROM order_of_service')) return { rows: [], rowCount: 0 };
      if (sql.includes('FROM expenses')) return { rows: [], rowCount: 0 };
      return { rows: [], rowCount: 0 };
    });
    const res = await supertest(app)
      .get('/panel_analytical/info_invoicing_liquid')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.monthly).toBeDefined();
  });

  test('GET /tools/notifications - sucesso', async () => {
    mockConnectWithResponses(() => ({ rows: [{ id: 1, msg: 'Alert' }], rowCount: 1 }));
    const res = await supertest(app)
      .get('/tools/notifications')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.msg).toBe("Notificações obtidas com sucesso");
    expect(res.body.data).toEqual([{ id: 1, msg: 'Alert' }]);
  });
});
