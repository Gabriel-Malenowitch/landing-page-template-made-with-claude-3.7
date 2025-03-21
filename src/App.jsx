import React, { useState, useEffect, Suspense } from 'react';
import { 
  ThemeProvider, createTheme, 
  Container, Typography, Button, Card, Grid, Box, 
  Accordion, AccordionSummary, AccordionDetails,
  Paper, Avatar, List, ListItem, ListItemIcon, ListItemText,
  Divider, Chip, Rating, CardMedia, CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SecurityIcon from '@mui/icons-material/Security';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

// Configuração principal da página de vendas
// Modifique este objeto para personalizar toda a página
const salesPageConfig = {
  // Conteúdo textual
  headline: "Revolucione Seus Resultados com o Sistema Completo de Marketing Digital",
  subheadline: "O método passo a passo que já transformou mais de 10.000 negócios online",
  
  // Ofertas/Produtos
  products: [
    {
      id: 1,
      title: "Plano Básico",
      price: 97,
      originalPrice: 197,
      features: [
        "Acesso ao curso principal por 6 meses",
        "Comunidade de suporte básica",
        "Material de referência em PDF"
      ],
      isRecommended: false,
      cta: "Quero Começar Agora",
      link: "#basic"
    },
    {
      id: 2,
      title: "Plano Completo",
      price: 197,
      originalPrice: 497,
      features: [
        "Acesso vitalício ao curso principal",
        "Comunidade VIP de suporte avançado",
        "Material de referência em PDF e ePub",
        "10 templates exclusivos prontos para usar",
        "Consultoria individual (1 sessão de 30 min)"
      ],
      isRecommended: true,
      cta: "Escolher Plano Recomendado",
      link: "#complete"
    },
    {
      id: 3,
      title: "Plano Empresarial",
      price: 497,
      originalPrice: 997,
      features: [
        "Tudo do Plano Completo",
        "Licença para equipes de até 5 pessoas",
        "Consultoria trimestral estratégica (4 por ano)",
        "Workshops exclusivos mensais",
        "Prioridade no suporte 24/7"
      ],
      isRecommended: false,
      cta: "Melhor para Equipes",
      link: "#business"
    }
  ],
  
  // Benefícios
  benefits: [
    {
      title: "Resultados 3x Mais Rápidos",
      description: "Nosso sistema de aceleração permite que você implemente estratégias comprovadas em tempo recorde, eliminando a curva de aprendizado tradicional.",
      image: "https://picsum.photos/id/28/600/400"
    },
    {
      title: "Tráfego Qualificado Garantido",
      description: "Aprenda a atrair visitantes que realmente estão procurando pelo que você oferece, aumentando suas taxas de conversão em até 280%.",
      image: "https://picsum.photos/id/180/600/400"
    },
    {
      title: "Sistema de Automação Completo",
      description: "Implemente nosso sistema para automatizar 90% do seu processo de vendas, liberando seu tempo para focar no crescimento estratégico.",
      image: "https://picsum.photos/id/60/600/400"
    },
    {
      title: "Estratégias Exclusivas de Retenção",
      description: "Transforme clientes ocasionais em fãs e defensores da sua marca com nossas técnicas avançadas de relacionamento.",
      image: "https://picsum.photos/id/96/600/400"
    }
  ],
  
  // Depoimentos/Prova Social
  testimonials: [
    {
      name: "Carlos Silva",
      role: "Empreendedor Digital",
      image: "https://picsum.photos/id/1012/200/200",
      rating: 5,
      text: "Apliquei o sistema por apenas 30 dias e já aumentei minha receita em 43%. A metodologia é clara e os resultados são reais."
    },
    {
      name: "Ana Rodrigues",
      role: "Consultora de Marketing",
      image: "https://picsum.photos/id/1014/200/200",
      rating: 5,
      text: "Depois de tentar várias estratégias sem sucesso, este sistema finalmente me deu um caminho claro para escalar meu negócio. Já tripliquei minha lista de emails."
    },
    {
      name: "Ricardo Mendes",
      role: "Dono de E-commerce",
      image: "https://picsum.photos/id/1027/200/200",
      rating: 4,
      text: "O retorno sobre o investimento foi quase imediato. Em 45 dias recuperei o valor investido e agora tudo é lucro. Recomendo fortemente."
    }
  ],
  
  // Bônus
  bonuses: [
    {
      title: "Masterclass Exclusiva",
      value: "R$ 997",
      description: "Acesso a uma aula especial com os maiores especialistas do mercado compartilhando estratégias avançadas de conversão.",
      image: "https://picsum.photos/id/3/400/300"
    },
    {
      title: "Pack de Templates Premium",
      value: "R$ 497",
      description: "20 templates de alta conversão prontos para personalizar e usar em suas campanhas e landing pages.",
      image: "https://picsum.photos/id/48/400/300"
    },
    {
      title: "Consultoria Estratégica",
      value: "R$ 1.200",
      description: "Uma sessão individual onde analisaremos seu negócio atual e criaremos um plano personalizado para seus próximos 90 dias.",
      image: "https://picsum.photos/id/20/400/300"
    }
  ],
  
  // Garantia
  guarantee: {
    days: 30,
    title: "Garantia Incondicional de Satisfação",
    description: "Se em até 30 dias você não estiver completamente satisfeito com os resultados, basta nos enviar um email e devolveremos 100% do seu investimento. Sem perguntas, sem burocracia.",
    image: "https://picsum.photos/id/99/600/400"
  },
  
  // FAQ
  faq: [
    {
      question: "Quanto tempo preciso dedicar por semana?",
      answer: "O sistema foi desenhado para pessoas ocupadas. Com apenas 5-7 horas por semana você consegue implementar todas as estratégias e ver resultados consistentes."
    },
    {
      question: "Funciona para iniciantes ou preciso ter experiência?",
      answer: "O curso foi estruturado pensando tanto em iniciantes quanto em profissionais experientes. Temos módulos introdutórios para quem está começando e estratégias avançadas para quem já tem conhecimento na área."
    },
    {
      question: "Por quanto tempo terei acesso ao material?",
      answer: "Dependendo do plano escolhido, você terá de 6 meses a acesso vitalício a todo o conteúdo, incluindo atualizações futuras."
    },
    {
      question: "Posso acessar de qualquer dispositivo?",
      answer: "Sim! Nossa plataforma é 100% responsiva e otimizada para qualquer dispositivo: computadores, tablets e smartphones."
    },
    {
      question: "Existe algum suporte ou terei que aprender sozinho?",
      answer: "Todos os planos incluem acesso à nossa comunidade de suporte onde você pode tirar dúvidas. Os planos mais avançados incluem suporte direto com nossa equipe de especialistas."
    }
  ],
  
  // CTAs e Botões
  cta: {
    main: "Quero Transformar Meus Resultados Agora",
    secondary: "Ver Opções de Planos",
    scroll: "Saiba mais"
  },
  
  // Links
  links: {
    main: "#pricing",
    terms: "/termos",
    privacy: "/privacidade",
    support: "/suporte"
  },
  
  // Configurações de estilo
  styles: {
    // Paleta de cores principal
    colors: {
      primary: "#2962ff", // Azul - cor principal de ação/confiança
      secondary: "#ff6d00", // Laranja - destaque/urgência
      accent: "#00c853", // Verde - sucesso/garantia
      dark: "#1a237e", // Azul escuro - textos importantes
      light: "#f5f5f5", // Cinza claro - fundos
      text: "#212121", // Quase preto - textos gerais
      textLight: "#757575", // Cinza - textos secundários
      warning: "#ffd600", // Amarelo - alertas/destaques
      white: "#ffffff", // Branco
      black: "#000000", // Preto
      background: "#ffffff", // Fundo da página
      cardBackground: "#ffffff", // Fundo dos cards
    },
    
    // Tipografia
    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      headline: {
        fontWeight: 700,
        lineHeight: 1.2,
      },
      subheadline: {
        fontWeight: 400,
        lineHeight: 1.5,
      },
      sectionTitle: {
        fontWeight: 600,
        lineHeight: 1.3,
      }
    },
    
    // Bordas
    borders: {
      radius: {
        small: "4px",
        medium: "8px",
        large: "16px",
        pill: "9999px"
      }
    },
    
    // Elevação/Sombras
    elevation: {
      small: "0 2px 4px rgba(0,0,0,0.1)",
      medium: "0 4px 8px rgba(0,0,0,0.12)",
      large: "0 8px 16px rgba(0,0,0,0.14)",
      xlarge: "0 12px 24px rgba(0,0,0,0.16)"
    },
    
    // Espaçamentos
    spacing: {
      section: "5rem",
      element: "2rem",
      inner: "1rem"
    },
    
    // Animações
    animations: {
      hover: "all 0.3s ease-in-out",
      appear: "fadeIn 0.5s ease-in-out"
    },
    
    // Gradientes
    gradients: {
      primary: `linear-gradient(135deg, #2962ff, #1565c0)`,
      callToAction: `linear-gradient(135deg, #ff6d00, #ff9100)`,
      guarantee: `linear-gradient(135deg, #00c853, #64dd17)`,
    }
  }
};

// Criação do tema MUI com base na configuração
const theme = createTheme({
  palette: {
    primary: {
      main: salesPageConfig.styles.colors.primary,
    },
    secondary: {
      main: salesPageConfig.styles.colors.secondary,
    },
    text: {
      primary: salesPageConfig.styles.colors.text,
      secondary: salesPageConfig.styles.colors.textLight,
    },
    background: {
      default: salesPageConfig.styles.colors.background,
      paper: salesPageConfig.styles.colors.cardBackground,
    }
  },
  typography: {
    fontFamily: salesPageConfig.styles.typography.fontFamily,
    h1: {
      fontWeight: salesPageConfig.styles.typography.headline.fontWeight,
      lineHeight: salesPageConfig.styles.typography.headline.lineHeight,
    },
    h2: {
      fontWeight: salesPageConfig.styles.typography.sectionTitle.fontWeight,
      lineHeight: salesPageConfig.styles.typography.sectionTitle.lineHeight,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    }
  },
  shape: {
    borderRadius: parseInt(salesPageConfig.styles.borders.radius.medium),
  },
  shadows: Array(25).fill("none").map((_, i) => {
    if (i === 1) return salesPageConfig.styles.elevation.small;
    if (i === 2) return salesPageConfig.styles.elevation.medium;
    if (i === 3) return salesPageConfig.styles.elevation.large;
    if (i === 4) return salesPageConfig.styles.elevation.xlarge;
    return "none";
  }),
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: salesPageConfig.styles.borders.radius.medium,
          padding: "0.75rem 1.5rem",
          transition: salesPageConfig.styles.animations.hover,
        },
        containedPrimary: {
          background: salesPageConfig.styles.gradients.primary,
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: salesPageConfig.styles.elevation.large,
          },
        },
        containedSecondary: {
          background: salesPageConfig.styles.gradients.callToAction,
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: salesPageConfig.styles.elevation.large,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: salesPageConfig.styles.borders.radius.medium,
          boxShadow: salesPageConfig.styles.elevation.medium,
          transition: salesPageConfig.styles.animations.hover,
          "&:hover": {
            boxShadow: salesPageConfig.styles.elevation.large,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

// Componente de Imagem Otimizada
const OptimizedImage = ({ src, alt, style, priority = false, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Estado para armazenar a imagem em baixa resolução/blur
  const [blurDataUrl, setBlurDataUrl] = useState('/api/placeholder/20/15');
  
  useEffect(() => {
    // Simular carregamento progressivo da imagem
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
    };
    img.onerror = () => {
      setError(true);
    };
    
    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
  
  // Adicionar loading='lazy' para imagens não prioritárias
  const imgProps = {
    src: error ? '/api/placeholder/400/300' : src,
    alt,
    loading: priority ? 'eager' : 'lazy',
    style: {
      opacity: loaded ? 1 : 0.5,
      transition: 'opacity 0.5s ease-in-out',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      ...style,
    },
    ...props,
  };
  
  return (
    <Box position="relative" overflow="hidden" style={{ aspectRatio: props.aspectRatio || '16/9' }}>
      {!loaded && (
        <Box 
          position="absolute" 
          top={0} 
          left={0} 
          width="100%" 
          height="100%" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          sx={{ 
            backgroundColor: '#f0f0f0',
            backgroundImage: `url(${blurDataUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
          }}
        >
          <CircularProgress size={30} />
        </Box>
      )}
      <img {...imgProps} />
    </Box>
  );
};

// Componente de Botão CTA
const CTAButton = ({ children, secondary = false, ...props }) => {
  return (
    <Button
      variant="contained"
      color={secondary ? "secondary" : "primary"}
      size="large"
      sx={{
        py: 1.5,
        px: 4,
        fontSize: "1.1rem",
        boxShadow: theme.shadows[3],
        "&:hover": {
          boxShadow: theme.shadows[4],
          transform: "translateY(-3px)",
        },
        transition: "all 0.3s ease",
      }}
      endIcon={<ArrowForwardIcon />}
      {...props}
    >
      {children}
    </Button>
  );
};

// Componente de Preço com Desconto
const PriceDisplay = ({ originalPrice, currentPrice, currencySymbol = "R$" }) => {
  const discountPercentage = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  
  return (
    <Box textAlign="center">
      <Typography
        variant="body1"
        component="span"
        sx={{
          textDecoration: "line-through",
          color: "text.secondary",
          fontSize: "1.2rem",
          display: "block",
        }}
      >
        De {currencySymbol} {originalPrice}
      </Typography>
      <Typography
        variant="h3"
        component="span"
        sx={{
          fontWeight: 700,
          color: salesPageConfig.styles.colors.secondary,
          fontSize: "2.5rem",
          my: 1,
          display: "block",
        }}
      >
        Por {currencySymbol} {currentPrice}
      </Typography>
      <Chip
        label={`Economize ${discountPercentage}%`}
        color="secondary"
        size="medium"
        sx={{
          fontWeight: "bold",
          fontSize: "0.9rem",
          borderRadius: salesPageConfig.styles.borders.radius.pill,
        }}
      />
    </Box>
  );
};

// Componente principal da Página de Vendas
const SalesPage = () => {
  // Estado para controlar o accordion FAQ
  const [expanded, setExpanded] = useState(false);
  
  // Handler para o accordion
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  // Efeito para otimizar o CLS
  useEffect(() => {
    // Define altura mínima para elementos que causariam CLS
    document.documentElement.style.setProperty(
      '--min-content-height', 
      '2000px'
    );
    
    // Pré-carregue fontes críticas
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap';
    fontLink.rel = 'preload';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
    
    // Remova a altura mínima quando o conteúdo estiver carregado
    return () => {
      document.documentElement.style.removeProperty('--min-content-height');
    };
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: '100vh',
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        {/* Hero Section - Promessa principal */}
        <Box
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(https://picsum.photos/id/4/1920/1080)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            py: { xs: 8, md: 12 },
            display: 'flex',
            alignItems: 'center',
            minHeight: '80vh',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                    mb: 3,
                    fontWeight: 800,
                    lineHeight: 1.2,
                  }}
                >
                  {salesPageConfig.headline}
                </Typography>
                
                {salesPageConfig.subheadline && (
                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      mb: 6,
                      fontWeight: 400,
                      maxWidth: '90%',
                    }}
                  >
                    {salesPageConfig.subheadline}
                  </Typography>
                )}
                
                <Box sx={{ mt: 4 }}>
                  <CTAButton
                    href={salesPageConfig.links.main}
                    size="large"
                    sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
                  >
                    {salesPageConfig.cta.main}
                  </CTAButton>
                  
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    href="#benefits"
                    sx={{
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {salesPageConfig.cta.scroll}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        
        {/* Produtos/Ofertas */}
        <Box
          id="pricing"
          sx={{
            py: salesPageConfig.styles.spacing.section,
            bgcolor: salesPageConfig.styles.colors.light,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              component="h2"
              align="center"
              sx={{ mb: 6, fontWeight: 700 }}
            >
              Escolha o Plano Ideal Para Você
            </Typography>
            
            <Grid container spacing={4} justifyContent="center">
              {salesPageConfig.products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'visible',
                      border: product.isRecommended ? `3px solid ${salesPageConfig.styles.colors.accent}` : 'none',
                      transform: product.isRecommended ? 'scale(1.05)' : 'none',
                      zIndex: product.isRecommended ? 2 : 1,
                    }}
                  >
                    {product.isRecommended && (
                      <Chip
                        label="RECOMENDADO"
                        color="primary"
                        sx={{
                          position: 'absolute',
                          top: -15,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontWeight: 'bold',
                          px: 2,
                          fontSize: '0.9rem',
                        }}
                      />
                    )}
                    
                    <Box
                      sx={{
                        bgcolor: product.isRecommended ? salesPageConfig.styles.colors.primary : salesPageConfig.styles.colors.dark,
                        color: 'white',
                        p: 3,
                        borderTopLeftRadius: theme.shape.borderRadius,
                        borderTopRightRadius: theme.shape.borderRadius,
                      }}
                    >
                      <Typography variant="h4" align="center" gutterBottom>
                        {product.title}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ p: 3, flexGrow: 1 }}>
                      <PriceDisplay
                        originalPrice={product.originalPrice}
                        currentPrice={product.price}
                      />
                      
                      <Box sx={{ mt: 4 }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          O que está incluído:
                        </Typography>
                        <List dense>
                          {product.features.map((feature, index) => (
                            <ListItem key={index} sx={{ py: 1 }}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <CheckCircleIcon color="primary" />
                              </ListItemIcon>
                              <ListItemText primary={feature} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Box>
                    
                    <Box sx={{ p: 3, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        color={product.isRecommended ? "secondary" : "primary"}
                        size="large"
                        href={product.link}
                        sx={{
                          py: 1.5,
                          fontWeight: 'bold',
                          boxShadow: product.isRecommended ? theme.shadows[3] : theme.shadows[1],
                        }}
                        endIcon={<ShoppingCartIcon />}
                      >
                        {product.cta}
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        
        {/* Benefícios */}
        <Box
          id="benefits"
          sx={{
            py: salesPageConfig.styles.spacing.section,
            bgcolor: salesPageConfig.styles.colors.white,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              component="h2"
              align="center"
              sx={{ mb: 6, fontWeight: 700 }}
            >
              Por Que Nosso Sistema é Revolucionário
            </Typography>
            
            <Grid container spacing={4}>
              {salesPageConfig.benefits.slice(0, 2).map((benefit, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card sx={{ height: '100%', overflow: 'hidden' }}>
                    <OptimizedImage 
                      src={benefit.image} 
                      alt={benefit.title}
                      priority={index < 2}
                      aspectRatio="16/9"
                    />
                    <Box sx={{ p: 3 }}>
                      <Typography variant="h5" gutterBottom fontWeight="bold">
                        {benefit.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
              
              {salesPageConfig.benefits.slice(2).map((benefit, index) => (
                <Grid item xs={12} md={6} key={index + 2}>
                  <Card sx={{ height: '100%', overflow: 'hidden' }}>
                    <OptimizedImage 
                      src={benefit.image} 
                      alt={benefit.title}
                      aspectRatio="16/9"
                    />
                    <Box sx={{ p: 3 }}>
                      <Typography variant="h5" gutterBottom fontWeight="bold">
                        {benefit.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <CTAButton href={salesPageConfig.links.main}>
                {salesPageConfig.cta.main}
              </CTAButton>
            </Box>
          </Container>
        </Box>
        
        {/* Prova Social */}
        <Box
          sx={{
            py: salesPageConfig.styles.spacing.section,
            bgcolor: salesPageConfig.styles.colors.dark,
            color: salesPageConfig.styles.colors.white,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              component="h2"
              align="center"
              sx={{ mb: 6, fontWeight: 700, color: 'white' }}
            >
              O Que Nossos Alunos Estão Dizendo
            </Typography>
            
            <Grid container spacing={4} justifyContent="center">
              {salesPageConfig.testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.9)', 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <Box sx={{ p: 3, flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', mb: 2 }}>
                        <Rating value={testimonial.rating} readOnly />
                      </Box>
                      
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 3,
                          fontStyle: 'italic',
                          fontSize: '1.1rem',
                        }}
                      >
                        "{testimonial.text}"
                      </Typography>
                      
                      {/* gap */}

                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={testimonial.image}
                          alt={testimonial.name}
                          sx={{ mr: 2, width: 56, height: 56 }}
                        />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        
        {/* Bônus */}
        <Box
          sx={{
            py: salesPageConfig.styles.spacing.section,
            bgcolor: salesPageConfig.styles.colors.light,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              component="h2"
              align="center"
              sx={{ mb: 2, fontWeight: 700 }}
            >
              Bônus Exclusivos
            </Typography>
            
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              sx={{ mb: 6 }}
            >
              Ao adquirir hoje, você também recebe estes bônus especiais:
            </Typography>
            
            <Grid container spacing={4}>
              {salesPageConfig.bonuses.map((bonus, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="div"
                      sx={{ height: 200, position: 'relative' }}
                    >
                      <OptimizedImage
                        src={bonus.image}
                        alt={bonus.title}
                        style={{ height: '100%', objectFit: 'cover' }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          bgcolor: salesPageConfig.styles.colors.secondary,
                          color: 'white',
                          py: 0.5,
                          px: 1.5,
                          borderRadius: salesPageConfig.styles.borders.radius.medium,
                          fontWeight: 'bold',
                        }}
                      >
                        <Typography variant="subtitle2">
                          Valor: {bonus.value}
                        </Typography>
                      </Box>
                    </CardMedia>
                    
                    <Box sx={{ p: 3, flexGrow: 1 }}>
                      <Typography variant="h5" gutterBottom fontWeight="bold">
                        {bonus.title}
                      </Typography>
                      <Typography variant="body1">
                        {bonus.description}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography
                variant="h4"
                sx={{ mb: 3, fontWeight: 'bold' }}
              >
                Valor Total dos Bônus: 
                <Box component="span" sx={{ color: salesPageConfig.styles.colors.secondary, ml: 1 }}>
                  R$ {salesPageConfig.bonuses.reduce((total, bonus) => total + parseInt(bonus.value.replace(/\D/g, '')), 0).toLocaleString()}
                </Box>
              </Typography>
              
              <CTAButton href={salesPageConfig.links.main}>
                {salesPageConfig.cta.main}
              </CTAButton>
            </Box>
          </Container>
        </Box>
        
        {/* Garantia */}
        <Box
          sx={{
            py: salesPageConfig.styles.spacing.section,
            bgcolor: salesPageConfig.styles.colors.white,
            position: 'relative',
          }}
        >
          <Container maxWidth="md">
            <Paper
              elevation={4}
              sx={{
                p: 5,
                borderRadius: salesPageConfig.styles.borders.radius.large,
                background: salesPageConfig.styles.gradients.guarantee,
                color: 'white',
              }}
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="h3" gutterBottom fontWeight="bold">
                    {salesPageConfig.guarantee.title}
                  </Typography>
                  
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    <Box component="span" sx={{ fontWeight: 'bold' }}>
                      {salesPageConfig.guarantee.days} dias
                    </Box> de garantia incondicional
                  </Typography>
                  
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {salesPageConfig.guarantee.description}
                  </Typography>
                  
                  <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
                    <SecurityIcon sx={{ fontSize: 30, mr: 1 }} />
                    <Typography variant="body1" fontWeight="bold">
                      Sem riscos, satisfação garantida
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                  <Box
                    component="img"
                    src="https://picsum.photos/id/338/400/400"
                    alt="Selo de Garantia"
                    sx={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '50%',
                      border: '4px solid white',
                      boxShadow: theme.shadows[3],
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>
        
        {/* FAQ */}
        <Box
          sx={{
            py: salesPageConfig.styles.spacing.section,
            bgcolor: salesPageConfig.styles.colors.light,
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              component="h2"
              align="center"
              sx={{ mb: 6, fontWeight: 700 }}
            >
              Perguntas Frequentes
            </Typography>
            
            <Box>
              {salesPageConfig.faq.map((item, index) => (
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleAccordionChange(`panel${index}`)}
                  sx={{
                    mb: 2,
                    '&:before': { display: 'none' },
                    boxShadow: theme.shadows[1],
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      bgcolor: expanded === `panel${index}` ? 'rgba(0, 0, 0, 0.03)' : 'inherit' 
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">
                      {item.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Container>
        </Box>
        
        {/* Call to Action Final */}
        <Box
          sx={{
            py: salesPageConfig.styles.spacing.section,
            bgcolor: salesPageConfig.styles.colors.primary,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h3"
              component="h2"
              sx={{ mb: 3, fontWeight: 700 }}
            >
              Está Pronto Para Transformar Seus Resultados?
            </Typography>
            
            <Typography
              variant="h5"
              sx={{ mb: 4, fontWeight: 400 }}
            >
              Não perca mais tempo. Comece a implementar nosso sistema comprovado hoje mesmo.
            </Typography>
            
            <CTAButton
              href={salesPageConfig.links.main}
              secondary={true}
              sx={{ 
                px: 6, 
                py: 2, 
                fontSize: '1.3rem',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              {salesPageConfig.cta.main}
            </CTAButton>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <Chip
                icon={<VerifiedUserIcon />}
                label="Pagamento Seguro"
                sx={{ m: 1, bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
              <Chip
                icon={<LocalOfferIcon />}
                label={`${salesPageConfig.guarantee.days} Dias de Garantia`}
                sx={{ m: 1, bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
              <Chip
                icon={<StarIcon />}
                label="Acesso Imediato"
                sx={{ m: 1, bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
            </Box>
          </Container>
        </Box>
        
        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 4,
            bgcolor: salesPageConfig.styles.colors.dark,
            color: 'white',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Sistema Completo de Marketing Digital
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.7)">
                  © {new Date().getFullYear()} Todos os direitos reservados.
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Box>
                  <Typography variant="body2" component="a" href={salesPageConfig.links.terms} sx={{ mr: 3, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                    Termos de Uso
                  </Typography>
                  <Typography variant="body2" component="a" href={salesPageConfig.links.privacy} sx={{ mr: 3, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                    Política de Privacidade
                  </Typography>
                  <Typography variant="body2" component="a" href={salesPageConfig.links.support} sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                    Suporte
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SalesPage;