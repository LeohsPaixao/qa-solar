/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Endpoints para login e autenticação. Utilize o /login para gerar o token JWT e insira-o com o prefixo 'Bearer' no header Authorization.
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário
 *     description: Realiza o login do usuário e retorna um token JWT
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *                 example: joao@exemplo.com
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: senha123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: E-mail ou senha inválidos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Realiza logout do usuário
 *     description: Invalida o token JWT do usuário
 *     tags:
 *       - Autenticação
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout realizado com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
