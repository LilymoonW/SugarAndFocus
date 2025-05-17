// store.ts
import { create } from 'zustand'
import pie from './components/food/pie.png'
import dango from './components/food/dango.png'
import butterToast from './components/food/butteredToast.png'
import friedEgg from './components/food/friedEgg.png'

// Type Definitions
export type StudySession = {
  recipe: string
  focusDuration: number
  completed: boolean
  date: string
  image: string
}

export type Recipe = {
  name: string
  image: string // URL or import of local image
  cost: number
  purchased?: boolean
}

const testSessions: StudySession[] = [
  {
    recipe: 'Fried Egg',
    focusDuration: 25,
    completed: true,
    date: '2024-05-20T10:00:00Z',
    image: friedEgg
  },
  {
    recipe: 'Fried Egg',
    focusDuration: 50,
    completed: true,
    date: '2024-05-19T14:30:00Z',
    image: friedEgg
  },
  {
    recipe: 'Fried Egg',
    focusDuration: 25,
    completed: true,
    date: '2024-05-18T09:15:00Z',
    image: friedEgg
  },
  {
    recipe: 'Fried Egg',
    focusDuration: 75,
    completed: true,
    date: '2024-05-17T16:45:00Z',
    image: friedEgg
  },
  {
    recipe: 'Fried Egg',
    focusDuration: 25,
    completed: true,
    date: '2024-05-16T11:20:00Z',
    image: friedEgg
  },
  {
    recipe: 'Fried Egg',
    focusDuration: 100,
    completed: true,
    date: '2024-05-15T13:10:00Z',
    image: friedEgg
  }
]


// Static Recipe Data
export const availableRecipes: Recipe[] = [
  {
    name: 'Cherry Pie',
    image: pie,
    cost: 7,
    purchased: false,
  },
  {
    name: 'Dango',
    image: dango,
    cost: 5,
    purchased: false,

  },
  {
    name: 'Butter Toast',
    image: butterToast,
    cost: 3,
    purchased: false,

  },
  {
    name: "Fried Egg",
    image: friedEgg,
    cost: 0,
    purchased: true,

  }
]

// Zustand Store
type AppState = {
  coins: number
  availableRecipes: Recipe[]
  ownedRecipes: string[] // recipe names
  sessions: StudySession[]
  selectedRecipe: string | null

  addSession: (session: StudySession) => void
  setCoins: (coins: number) => void
  buyRecipe: (recipe: Recipe) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  coins: 0,
  availableRecipes: [...availableRecipes],
  ownedRecipes: [],
  // sessions: [],
  sessions: testSessions,
  selectedRecipe: "Fried Egg",

  changeSelectedRecipe: (recipe: string) => {
    const { availableRecipes } = get()
    const selectedRecipe = availableRecipes.find((r) => r.name === recipe)
    if (selectedRecipe) {
      set({ selectedRecipe: selectedRecipe.name })
    }
  },

  addSession: (session) =>
    set((state) => ({ sessions: [...state.sessions, session] })),

  setCoins: (coins) => set(() => ({ coins })),

  buyRecipe: (recipe) => {
    const { coins, ownedRecipes } = get()
    if (coins >= recipe.cost && !ownedRecipes.includes(recipe.name)) {
      set({
        coins: coins - recipe.cost,
        ownedRecipes: [...ownedRecipes, recipe.name],
      })
    }
  },
}))
