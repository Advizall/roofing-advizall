# Estrutura do Banco de Dados

Este documento contém a estrutura completa do banco de dados do projeto, organizada por schemas.

## Visão Geral dos Schemas

| Schema | Tamanho | Número de Tabelas |
|--------|---------|-------------------|
| auth | 1032 kB | 16 |
| public | 408 kB | 10 |
| storage | 144 kB | 5 |
| realtime | 56 kB | 3 |
| supabase_migrations | 32 kB | 1 |
| vault | 24 kB | 1 |
| extensions | 0 bytes | 0 |
| graphql | 0 bytes | 0 |
| graphql_public | 0 bytes | 0 |

## Schema: public

### Tabelas

1. **profiles**
   - Tabela de perfis de usuários
   - Colunas:
     - `id` (uuid, PK) - Referência ao ID do usuário em auth.users
     - `updated_at` (timestamp with time zone) - Data de atualização
     - `created_at` (timestamp with time zone) - Data de criação
     - `full_name` (text) - Nome completo do usuário
     - `username` (text) - Nome de usuário público e único
     - `avatar_url` (text) - URL para a imagem de avatar do usuário
     - `role` (text, default: 'user') - Papel do usuário na aplicação
     - `email` (text) - Email do usuário

2. **chat_messages**
   - Tabela de mensagens de chat
   - Colunas:
     - `id` (uuid, PK) - ID único da mensagem
     - `conversation_id` (uuid, FK) - Referência à conversa
     - `content` (text) - Conteúdo da mensagem
     - `sender` (text) - Remetente da mensagem
     - `created_at` (timestamp with time zone) - Data de criação

3. **chat_conversations**
   - Tabela de conversas
   - Colunas:
     - `id` (uuid, PK) - ID único da conversa
     - `thread_id` (text) - ID da thread
     - `user_name` (text) - Nome do usuário
     - `user_email` (text) - Email do usuário
     - `user_phone` (text) - Telefone do usuário
     - `created_at` (timestamp with time zone) - Data de criação
     - `updated_at` (timestamp with time zone) - Data de atualização
     - `contacted` (boolean, default: false) - Status de contato

4. **contact_submissions**
   - Tabela de submissões de contato
   - Tamanho: 32768 bytes
   - 8 colunas

5. **ExtremeSoln**
   - Tabela ExtremeSoln
   - Tamanho: 49152 bytes
   - 4 colunas

6. **Aula 01**
   - Tabela Aula 01
   - Tamanho: 32768 bytes
   - 3 colunas

7. **robo de disparo**
   - Tabela de robô de disparo
   - Tamanho: 32768 bytes
   - 7 colunas

8. **Agendamento**
   - Tabela de agendamento
   - Tamanho: 32768 bytes
   - 6 colunas

9. **admin_logs**
   - Tabela de logs administrativos
   - Tamanho: 32768 bytes
   - 6 colunas

10. **robo de disparo mkt**
    - Duplicata da tabela "robo de disparo"
    - Tamanho: 32768 bytes
    - 7 colunas

## Relacionamentos Principais

1. A tabela `profiles` tem uma chave estrangeira que referencia a tabela `auth.users`
2. A tabela `chat_messages` tem uma chave estrangeira que referencia a tabela `chat_conversations`

## Observações

1. O schema `public` contém as tabelas principais da aplicação
2. Existem schemas do sistema como `auth`, `storage` e `realtime` que são gerenciados pelo Supabase
3. Algumas tabelas parecem ter nomes em português e podem precisar de padronização
4. Existem tabelas duplicadas (robo de disparo e robo de disparo mkt) que podem precisar ser consolidadas 