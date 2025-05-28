// Microcopy humanizado para melhorar a experiência do usuário

export const microcopy = {
  // Formulário de contato
  contact: {
    title: "Vamos construir algo incrível juntos? 🚀",
    subtitle: "Conte-me sobre seu projeto e vamos transformar ideias em realidade",
    name: {
      label: "Como posso te chamar?",
      placeholder: "Seu nome",
      error: "Ops! Preciso saber seu nome para nossa conversa 😊"
    },
    email: {
      label: "Onde posso te encontrar?",
      placeholder: "seu@email.com",
      error: "Hmm, esse email não parece certo. Pode verificar? 📧"
    },
    message: {
      label: "Qual é a sua ideia?",
      placeholder: "Conte-me sobre seu projeto, desafio ou apenas diga oi! Estou aqui para ajudar.",
      error: "Uma mensagem seria ótima para começarmos nossa conversa! ✨"
    },
    submit: {
      default: "Vamos conversar! 💬",
      loading: "Enviando sua mensagem... ⏳",
      success: "Mensagem enviada! Em breve entro em contato 🎉",
      error: "Ops! Algo deu errado. Que tal tentar novamente? 🔄"
    },
    privacy: "Seus dados estão seguros comigo. Prometo usar apenas para nossa conversa! 🔒"
  },

  // Navegação e interações
  navigation: {
    home: "Início da jornada",
    projects: "Meus trabalhos",
    about: "Minha história",
    contact: "Vamos conversar",
    backToTop: "Voltar ao topo",
    menu: "Menu de navegação",
    close: "Fechar menu"
  },

  // Projetos
  projects: {
    viewProject: "Ver projeto completo",
    viewCase: "Ver case study",
    liveDemo: "Ver demonstração",
    sourceCode: "Ver código",
    comingSoon: "Em breve! 🚧",
    loading: "Carregando projetos...",
    empty: "Novos projetos chegando em breve! 🎨",
    filter: "Filtrar por tecnologia",
    showAll: "Mostrar todos"
  },

  // Estados de loading
  loading: {
    default: "Carregando...",
    projects: "Buscando projetos incríveis...",
    contact: "Enviando sua mensagem...",
    page: "Preparando tudo para você..."
  },

  // Estados de erro
  error: {
    general: "Ops! Algo não saiu como esperado 😅",
    network: "Parece que sua conexão está instável. Tente novamente!",
    notFound: "Esta página decidiu se esconder! 🙈",
    retry: "Tentar novamente",
    goHome: "Voltar ao início"
  },

  // Estados de sucesso
  success: {
    contact: "Sua mensagem foi enviada! Logo entro em contato 🎉",
    subscribe: "Obrigado por se inscrever! 📧",
    copy: "Copiado para a área de transferência! 📋"
  },

  // Acessibilidade
  accessibility: {
    menu: "Menu de acessibilidade",
    description: "Personalize sua experiência de navegação",
    fontSize: "Ajustar tamanho da fonte",
    contrast: "Ativar alto contraste",
    darkMode: "Alternar modo escuro",
    language: "Alterar idioma",
    close: "Fechar menu de acessibilidade"
  },

  // Tooltips contextuais
  tooltips: {
    linkedin: "Vamos nos conectar no LinkedIn!",
    github: "Confira meu código no GitHub",
    behance: "Veja meus designs no Behance",
    email: "Envie-me um email",
    phone: "Vamos conversar por telefone",
    download: "Baixar meu currículo",
    share: "Compartilhar este projeto",
    like: "Curtir este projeto",
    bookmark: "Salvar para depois",
    expand: "Ver em tela cheia",
    collapse: "Minimizar",
    edit: "Editar informações",
    delete: "Remover item",
    copy: "Copiar link",
    external: "Abrir em nova aba"
  },

  // Feedback de interações
  feedback: {
    hover: {
      button: "Clique para interagir",
      link: "Clique para navegar",
      image: "Clique para ampliar",
      card: "Clique para ver detalhes"
    },
    click: {
      copied: "Copiado! ✅",
      saved: "Salvo! 💾",
      liked: "Curtido! ❤️",
      shared: "Compartilhado! 🔗"
    }
  },

  // Tempo e datas
  time: {
    justNow: "Agora mesmo",
    minutesAgo: (minutes: number) => `${minutes} min atrás`,
    hoursAgo: (hours: number) => `${hours}h atrás`,
    daysAgo: (days: number) => `${days} dias atrás`,
    reading: (minutes: number) => `${minutes} min de leitura`,
    updated: "Atualizado em"
  },

  // Call-to-actions motivacionais
  cta: {
    primary: "Vamos começar! 🚀",
    secondary: "Saiba mais",
    tertiary: "Talvez depois",
    explore: "Explorar projetos",
    contact: "Iniciar conversa",
    download: "Baixar agora",
    subscribe: "Quero receber novidades!",
    share: "Compartilhar com amigos",
    tryDemo: "Experimentar demo",
    learnMore: "Descobrir mais"
  },

  // Mensagens de empty states
  empty: {
    projects: "Novos projetos incríveis estão chegando! 🎨",
    search: "Nenhum resultado encontrado. Que tal tentar outro termo? 🔍",
    favorites: "Você ainda não tem favoritos. Explore os projetos! ⭐",
    notifications: "Tudo tranquilo por aqui! 🔔",
    messages: "Sua caixa de entrada está vazia 📭"
  },

  // Confirmações
  confirmations: {
    delete: "Tem certeza que deseja remover?",
    leave: "Deseja sair sem salvar as alterações?",
    reset: "Isso irá limpar todos os dados. Continuar?",
    submit: "Pronto para enviar?"
  }
};

// Função para obter microcopy aleatório motivacional
export const getRandomMotivationalCopy = (): string => {
  const motivational = [
    "Vamos criar algo incrível! ✨",
    "Sua ideia pode mudar tudo! 💡",
    "Juntos somos mais fortes! 🤝",
    "O futuro começa agora! 🚀",
    "Transformando sonhos em realidade! 🌟",
    "Cada projeto é uma nova aventura! 🗺️",
    "Inovação é nosso combustível! ⚡",
    "Vamos fazer a diferença! 🌍"
  ];
  
  return motivational[Math.floor(Math.random() * motivational.length)];
};

// Função para personalizar microcopy baseado no contexto
export const getContextualCopy = (context: string, action: string): string => {
  const contextMap: Record<string, Record<string, string>> = {
    contact: {
      submit: "Vamos conversar! 💬",
      loading: "Conectando nossos mundos... 🌉",
      success: "Mensagem enviada! Logo nos falamos 🎉"
    },
    project: {
      view: "Explorar projeto",
      like: "Adorei este trabalho! ❤️",
      share: "Compartilhar inspiração"
    },
    navigation: {
      next: "Próxima aventura",
      previous: "Voltar na jornada",
      home: "Base principal"
    }
  };

  return contextMap[context]?.[action] || "Vamos lá!";
};
