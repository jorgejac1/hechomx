export interface SeasonalTheme {
  id: string;
  name: string;
  description: string;
  startDate: string; // Format: MM-DD
  endDate: string; // Format: MM-DD
  color: string;
  bgColor: string;
  categories: string[];
  keywords: string[];
  icon: string;
}

export const seasonalThemes: SeasonalTheme[] = [
  {
    id: 'halloween',
    name: 'Halloween',
    description: 'Decoraciones y disfraces únicos para una celebración especial',
    startDate: '10-01',
    endDate: '10-31',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    categories: ['Decoración del Hogar', 'Arte', 'Ropa'],
    keywords: ['halloween', 'calabaza', 'disfraz', 'decoración'],
    icon: '🎃'
  },
  {
    id: 'dia-muertos',
    name: 'Día de Muertos',
    description: 'Celebra las tradiciones mexicanas con ofrendas y decoraciones únicas',
    startDate: '10-15',
    endDate: '11-02',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    categories: ['Decoración del Hogar', 'Arte'],
    keywords: ['calavera', 'ofrenda', 'tradicional', 'altar', 'muertos'],
    icon: '💀'
  },
  {
    id: 'navidad',
    name: 'Navidad',
    description: 'Regalos únicos hechos a mano para esta temporada especial',
    startDate: '11-15',
    endDate: '12-25',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    categories: ['Decoración del Hogar', 'Ropa', 'Joyería'],
    keywords: ['navidad', 'regalo', 'decoración', 'christmas'],
    icon: '🎄'
  },
  {
    id: "año-nuevo",
    name: "Año Nuevo",
    description: "Empieza el año con productos únicos hechos en México",
    startDate: "12-26",
    endDate: "01-15",
    color: "text-yellow-700",
    bgColor: "bg-yellow-50",
    categories: ["Joyería", "Ropa", "Decoración del Hogar"],
    keywords: ["nuevo", "celebración"],
    icon: "🎉",
  },
  {
    id: "amor-amistad",
    name: "Amor y Amistad",
    description: "Regalos especiales para demostrar tu cariño",
    startDate: "02-01",
    endDate: "02-14",
    color: "text-pink-700",
    bgColor: "bg-pink-50",
    categories: ["Joyería", "Ropa", "Arte"],
    keywords: ["amor", "regalo", "romántico"],
    icon: "💝",
  },
  {
    id: "primavera",
    name: "Primavera",
    description: "Renueva tu hogar con artesanías coloridas y frescas",
    startDate: "03-21",
    endDate: "06-20",
    color: "text-green-700",
    bgColor: "bg-green-50",
    categories: ["Decoración del Hogar", "Arte", "Textiles"],
    keywords: ["floral", "colorido", "fresco"],
    icon: "🌸",
  },
  {
    id: "verano",
    name: "Verano Mexicano",
    description: "Productos perfectos para la temporada de calor",
    startDate: "06-21",
    endDate: "09-22",
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    categories: ["Ropa", "Calzado", "Textiles"],
    keywords: ["verano", "playa", "ligero"],
    icon: "☀️",
  },
  {
    id: "otoño",
    name: "Otoño",
    description: "Artesanías cálidas para la temporada de cosecha",
    startDate: "09-23",
    endDate: "11-14",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    categories: ["Decoración del Hogar", "Textiles", "Ropa"],
    keywords: ["otoño", "cálido", "acogedor"],
    icon: "🍂",
  },
];

export function getCurrentSeasonalTheme(): SeasonalTheme | null {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const currentDate = `${month}-${day}`;

  for (const theme of seasonalThemes) {
    const start = theme.startDate;
    const end = theme.endDate;

    // Handle year-wrap (e.g., Dec 26 to Jan 15)
    if (start > end) {
      if (currentDate >= start || currentDate <= end) {
        return theme;
      }
    } else {
      if (currentDate >= start && currentDate <= end) {
        return theme;
      }
    }
  }

  return null;
}

export function getUpcomingSeasonalTheme(): SeasonalTheme | null {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const currentDate = `${month}-${day}`;

  // Find the next upcoming theme
  for (const theme of seasonalThemes) {
    if (theme.startDate > currentDate) {
      return theme;
    }
  }

  // If no upcoming theme this year, return first theme of next year
  return seasonalThemes[0];
}
