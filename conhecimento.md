# Base de Conhecimento - The Dirty Roofer

Este documento contém informações essenciais sobre a estrutura e componentes do site The Dirty Roofer.

## Estrutura de Arquivos

```
/
├── public/                 # Arquivos estáticos
│   ├── images/             # Imagens do site
│   └── 404.html            # Página de erro 404
├── src/                    # Código fonte
│   ├── components/         # Componentes React
│   │   ├── navigation/     # Componentes de navegação
│   │   ├── sections/       # Seções principais da página
│   │   ├── ui/             # Componentes de UI reutilizáveis
│   │   ├── client/         # Componentes específicos para área do cliente
│   │   └── Footer.tsx      # Componente do rodapé
│   ├── pages/              # Páginas do site
│   ├── hooks/              # React hooks personalizados
│   ├── lib/                # Funções utilitárias
│   ├── types/              # Definições de tipos TypeScript
│   ├── utils/              # Funções auxiliares
│   ├── integrations/       # Integrações com serviços externos
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Ponto de entrada
├── tailwind.config.ts      # Configuração do Tailwind CSS
└── index.html              # Arquivo HTML principal
```

## Componentes Principais

### 1. Páginas (`src/pages/`)

- **Index.tsx**: Página inicial com todas as seções
- **Login.tsx**: Página de login
- **Register.tsx**: Página de registro
- **ForgotPassword.tsx**: Página de recuperação de senha
- **NotFound.tsx**: Página de erro 404

### 2. Seções da Página Inicial (`src/components/sections/`)

- **Hero.tsx**: Seção de banner principal
- **About.tsx**: Seção sobre a empresa
- **Services.tsx**: Seção de serviços
- **HowItWorks.tsx**: Seção de processo (6 passos)
- **Testimonials.tsx**: Seção de depoimentos de clientes
- **Contact.tsx**: Seção de contato
  - **ContactForm.tsx**: Formulário de contato
  - **ContactInfo.tsx**: Informações de contato
  - **ServiceAreas.tsx**: Áreas atendidas

### 3. Navegação (`src/components/navigation/`)

- **Navbar.tsx**: Barra de navegação principal

### 4. Área de Cliente (`src/components/client/`)

- **ClientNavbar.tsx**: Barra de navegação para área de cliente
- **sections/**: Componentes específicos da área de cliente
  - **overview/WelcomeHeader.tsx**: Cabeçalho de boas-vindas
  - **ProcessSection.tsx**: Seção de processo do cliente
  - **MapSection.tsx**: Mapa de projetos
  - **VideoSection.tsx**: Seção de vídeo

## Esquema de Cores

O site utiliza uma combinação de tons de preto e dourado definidos no arquivo `tailwind.config.ts`:

### Paleta Principal

- **Preto (Navy)**
  - DEFAULT: '#121212'
  - 50: '#2A2A2A'
  - 100: '#252525'
  - 200: '#202020'
  - 300: '#1C1C1C'
  - 400: '#181818'
  - 500: '#141414'
  - 600: '#101010'
  - 700: '#0C0C0C'
  - 800: '#080808'
  - 900: '#000000'

- **Dourado (Gold)**
  - DEFAULT: '#D4AF37'
  - 50: '#F4EAC8'
  - 100: '#F0E3B7'
  - ...até 900

### Arquivos de Configuração de Cores

- **tailwind.config.ts**: Configuração atual (preto e dourado)
- **tailwind.config.ts.backup**: Backup da configuração original (azul e dourado)

## Informações da Empresa

### Nome e Detalhes

- **Nome da Empresa**: The Dirty Roofer
- **Slogan**: "NO JOB TOO BIG OR TOO SMALL"
- **Tagline adicional**: "Custom Copperwork at its Finest" (subsidiária Boston Copperworks)

### Informações de Contato

- **Endereço**: 85 Willow Court, Boston, MA 02196
- **Telefone**: 1-617-233-8489 (pedir por Brendan)
- **E-mail**: roofereamon@gmail.com
- **Horário de funcionamento**:
  - Mon-Fri: 8:00 AM - 6:00 PM
  - Sat: 9:00 AM - 2:00 PM
  - Sun: Closed

### Áreas Atendidas

Boston, Beacon Hill, Back Bay, South End, East Boston, Brighton, Allston, Dorchester, Roxbury, West Roxbury, Mattapan, Charlestown, South Boston, Roslindale, Hyde Park, Jamaica Plain, North End, Cambridge, Braintree, Brookline, Newton, Newton Center, Newton Highlands, Chestnut Hill, West Newton, Auburndale, Quincy, Milton, Watertown, Suffolk County MA

### Serviços Oferecidos

1. **Copper Roofing** - Custom copper roofing, siding, bays, cornices, specialty trim and standing seam panels
2. **Slate Roofing** - Installation and repair of traditional slate roofing
3. **Rubber Roofing** - EPDM rubber roofing systems with certified application
4. **Asphalt Shingle Roofing** - Master Shingle Applicator certified installation
5. **Masonry & Hardscape** - Pointing, stone walls, patios, steps, fireplaces, BBQ pits, walkways
6. **Gutters & Maintenance** - Custom OG and Half-Moon gutters, downspouts, cleaning services, inspections

## Processo da Empresa (How It Works)

1. **Initial Contact** - Reach out via phone or email for immediate response
2. **Free Estimate** - Assessment of needs and detailed quote
3. **Project Planning** - Scheduling, material selection, and comprehensive planning
4. **Expert Installation** - Quality materials and adherence to industry standards
5. **Final Inspection** - Thorough quality control
6. **Warranty & Support** - Comprehensive warranties and ongoing support

## Formulários

### Formulário de Contato
- Localização: `src/components/sections/contact/ContactForm.tsx`
- Campos: Nome, email, telefone, endereço, cidade, estado, código postal, fonte de referência, mensagem
- Comportamento: Exibe mensagem de sucesso após envio (sem conexão com backend)

### Componentes Relacionados
- **SuccessMessage.tsx**: Mensagem de sucesso após envio do formulário
- **FormFields.tsx**: Campos do formulário
- **SMSTermsDialog.tsx**: Termos de consentimento para SMS

## Arquivos CSS e Estilos

- **tailwind.config.ts**: Configurações do Tailwind CSS
- **index.css**: Estilos globais CSS
- **App.css**: Estilos específicos do componente App

## Links Úteis para Desenvolvimento

- `/src/components/sections/`: Onde estão as seções principais que aparecem na página inicial
- `/src/components/ui/`: Componentes de UI reutilizáveis como botões, cards, etc.
- `/src/pages/Index.tsx`: Estrutura principal da página inicial e ordem das seções
- `/tailwind.config.ts`: Configuração de cores e estilos
- `/src/components/navigation/Navbar.tsx`: Barra de navegação principal
- `/src/components/Footer.tsx`: Rodapé do site 