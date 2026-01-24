export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Assignment 2 WebApp API',
    version: '1.0.0',
    description: 'API documentation for auth, users, posts, and comments (generated).',
  },
  servers: [{ url: '/api', description: 'API root (relative)' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      RegisterRequest: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
        required: ['username', 'email', 'password'],
      },
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          username: { type: 'string' },
          email: { type: 'string', format: 'email' },
        },
      },
      UsersResponse: {
        type: 'array',
        items: { $ref: '#/components/schemas/User' },
      },
      Post: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          senderId: { type: 'string' },
          content: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      PostsResponse: {
        type: 'array',
        items: { $ref: '#/components/schemas/Post' },
      },
      Comment: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          postId: { type: 'string' },
          senderId: { type: 'string' },
          content: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      CommentsResponse: {
        type: 'array',
        items: { $ref: '#/components/schemas/Comment' },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' },
        },
      },
      LoginRequest: {
        type: 'object',
        properties: { email: { type: 'string' }, password: { type: 'string' } },
        required: ['email', 'password'],
      },
      RefreshRequest: {
        type: 'object',
        properties: { refreshToken: { type: 'string' } },
        required: ['refreshToken'],
      },
      LogoutRequest: {
        type: 'object',
        properties: { refreshToken: { type: 'string' } },
        required: ['refreshToken'],
      },
    },
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterRequest' } } } },
        responses: { '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } }, '400': { description: 'Bad Request' } },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login user',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } } },
        responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } }, '401': { description: 'Unauthorized' } },
      },
    },
    '/auth/refresh': {
      post: {
        tags: ['Auth'],
        summary: 'Refresh access token using a refresh token',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/RefreshRequest' } } } },
        responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } }, '401': { description: 'Unauthorized' } },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Logout (revoke refresh token)',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LogoutRequest' } } } },
        responses: { '200': { description: 'OK' }, '400': { description: 'Bad Request' } },
      },
    },
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/UsersResponse' } } } } },
      },
    },
    '/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get user by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } }, '404': { description: 'Not Found' } },
      },
      put: {
        tags: ['Users'],
        summary: 'Update user by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
        responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } }, '404': { description: 'Not Found' } },
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete user by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' }, '404': { description: 'Not Found' } },
      },
    },
    '/posts': {
      get: {
        tags: ['Posts'],
        summary: 'Get posts (optionally filter by sender)',
        parameters: [{ name: 'sender', in: 'query', required: false, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/PostsResponse' } } } } },
      },
      post: {
        tags: ['Posts'],
        summary: 'Create a post',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
        responses: { '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Post' } } } } },
      },
    },
    '/posts/{id}': {
      get: {
        tags: ['Posts'],
        summary: 'Get post by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Post' } } } }, '404': { description: 'Not Found' } },
      },
      put: {
        tags: ['Posts'],
        summary: 'Update post by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
        responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Post' } } } }, '404': { description: 'Not Found' } },
      },
      delete: {
        tags: ['Posts'],
        summary: 'Delete post by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' }, '404': { description: 'Not Found' } },
      },
    },
    '/comments': {
      get: {
        tags: ['Comments'],
        summary: 'Get comments (optionally filter by postId)',
        parameters: [{ name: 'postId', in: 'query', required: false, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/CommentsResponse' } } } } },
      },
      post: {
        tags: ['Comments'],
        summary: 'Add a comment',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
        responses: { '201': { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Comment' } } } } },
      },
    },
    '/comments/{id}': {
      put: {
        tags: ['Comments'],
        summary: 'Update comment by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
        responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Comment' } } } }, '404': { description: 'Not Found' } },
      },
      delete: {
        tags: ['Comments'],
        summary: 'Delete comment by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' }, '404': { description: 'Not Found' } },
      },
    },
  },
  security: [],
};
