import prisma from '../../services/prismaClient.js';

const AVAILABLE_EVENTS = {
  'user.created': {
    name: 'Usuário Criado',
    description: 'Disparado quando um novo usuário é criado',
    sampleData: {
      id: 1,
      full_name: 'João Silva',
      email: 'joao@exemplo.com',
      created_at: '2024-04-28T12:00:00Z',
      event: 'user.created'
    },
    fetchRealData: async (limit = 5) => {
      return await prisma.user.findMany({
        take: limit,
        orderBy: {
          created_at: 'desc'
        },
        select: {
          id: true,
          full_name: true,
          email: true,
          created_at: true
        }
      });
    }
  },
};

export const listEvents = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      events: AVAILABLE_EVENTS
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao listar eventos',
      error: error.message
    });
  }
};

export const testTrigger = async (req, res) => {
  try {
    const { event } = req.params;
    const { limit = 5 } = req.query;

    if (!AVAILABLE_EVENTS[event]) {
      return res.status(404).json({
        success: false,
        message: 'Evento não encontrado'
      });
    }

    if (AVAILABLE_EVENTS[event].fetchRealData) {
      const realData = await AVAILABLE_EVENTS[event].fetchRealData(parseInt(limit));

      const dataWithEvent = realData.map(item => ({
        ...item,
        event: event
      }));

      return res.status(200).json({
        success: true,
        data: dataWithEvent,
        metadata: {
          total: realData.length,
          event: event,
          fetched_at: new Date().toISOString()
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: AVAILABLE_EVENTS[event].sampleData,
      metadata: {
        is_sample: true,
        event: event,
        fetched_at: new Date().toISOString()
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao testar trigger',
      error: error.message
    });
  }
}; 