/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: Endpoints para gerenciamento dos usuários.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista de todos os usuários cadastrados no sistema.
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   fullName:
 *                     type: string
 *                   socialName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   document:
 *                     type: string
 *       401:
 *         description: Não autorizado. Token JWT inválido ou não fornecido.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registra um novo usuário
 *     description: Cria um novo usuário no sistema
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Nome completo do usuário
 *                 example: João da Silva
 *               socialName:
 *                 type: string
 *                 description: Nome social do usuário (opcional)
 *                 example: João
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *                 example: joao@exemplo.com
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: senha123
 *               phone:
 *                 type: string
 *                 description: Telefone do usuário
 *                 example: (11) 99999-9999
 *               document:
 *                 type: string
 *                 description: CPF ou CNPJ do usuário
 *                 example: 123.456.789-00
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - phone
 *               - document
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: E-mail já cadastrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Atualiza dados do usuário
 *     description: Atualiza as informações do usuário autenticado
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Nome completo do usuário
 *               socialName:
 *                 type: string
 *                 description: Nome social do usuário
 *               phone:
 *                 type: string
 *                 description: Telefone do usuário
 *               document:
 *                 type: string
 *                 description: CPF ou CNPJ do usuário
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /users/delete:
 *   delete:
 *     summary: Remove usuário(s)
 *     description: Remove um ou mais usuários do sistema
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs dos usuários a serem removidos
 *             required:
 *               - userIds
 *     responses:
 *       200:
 *         description: Usuário(s) removido(s) com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário(s) removido(s) com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Obtém informações do usuário autenticado
 *     description: Retorna os dados do usuário atualmente autenticado
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do usuário
 *                 fullName:
 *                   type: string
 *                   description: Nome completo
 *                 socialName:
 *                   type: string
 *                   description: Nome social
 *                 email:
 *                   type: string
 *                   description: E-mail
 *                 phone:
 *                   type: string
 *                   description: Telefone
 *                 document:
 *                   type: string
 *                   description: CPF/CNPJ
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro ao tentar obter o usuário.
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /users/{email}:
 *   post:
 *     summary: Envia um e-mail para o usuário com instruções para recuperar a senha
 *     description: >
 *       Este endpoint envia um e-mail para o usuário com as instruções necessárias para a recuperação de senha.
 *       Caso o e-mail informado não esteja cadastrado no sistema, será retornado um erro 404.
 *       Se ocorrer algum problema no envio do e-mail, por exemplo, uma falha na conexão com o servidor de e-mail,
 *       será retornado o erro 550.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Email do usuário para o qual o e-mail de recuperação de senha deve ser enviado.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: E-mail enviado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem confirmando o envio do e-mail.
 *                   example: "Um e-mail foi enviado com instruções para recuperar a senha."
 *       404:
 *         description: E-mail não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: >
 *                     Este erro ocorre quando o e-mail informado não está cadastrado no sistema.
 *                     Verifique se o email foi digitado corretamente ou se o usuário está registrado.
 *                   example: "Este email não esta cadastrado no banco de dados."
 *       500:
 *         description: Falha ao enviar o e-mail para recuperação de senha.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: >
 *                     Este erro ocorre quando há uma falha no serviço de envio do e-mail, possivelmente devido a problemas
 *                     de configuração ou indisponibilidade do servidor de e-mail.
 *                   example: "Falha ao enviar e-mail para recuperação de senha."
 */
