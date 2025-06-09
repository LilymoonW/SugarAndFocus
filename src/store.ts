// store.ts
import { create } from 'zustand'
import pie from './components/food/pie.png'
import dango from './components/food/dango.png'
import butterToast from './components/food/butteredToast.png'
import friedEgg from './components/food/friedEgg.png'
import baozi from './components/food/baozi.png'
import pancake from './components/food/pancakeStack.png'
import strawberryMochi from './components/food/strawberryMochi.png'
import mooncake from './components/food/mooncake.png'

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
  // {
  //   recipe: 'Dango',
  //   focusDuration: 25,
  //   completed: true,
  //   date: '2024-05-20T10:00:00Z',
  //   image: dango
  // },
  // {
  //   recipe: 'Cherry Pie',
  //   focusDuration: 50,
  //   completed: true,
  //   date: '2024-05-19T14:30:00Z',
  //   image: pie
  // },
  // {
  //   recipe: 'Butter Toast',
  //   focusDuration: 25,
  //   completed: true,
  //   date: '2024-05-18T09:15:00Z',
  //   image: butterToast
  // },
  // {
  //   recipe: 'Pancakes',
  //   focusDuration: 75,
  //   completed: true,
  //   date: '2024-05-17T16:45:00Z',
  //   image: pancake
  // },
  // {
  //   recipe: 'Strawberry Mochi',
  //   focusDuration: 25,
  //   completed: true,
  //   date: '2024-05-16T11:20:00Z',
  //   image: strawberryMochi
  // },
  // {
  //   recipe: 'Mooncake',
  //   focusDuration: 100,
  //   completed: true,
  //   date: '2024-05-15T13:10:00Z',
  //   image: mooncake
  // }
]


// Static Recipe Data
export const availableRecipes: Recipe[] = [
  {
    name: "Strawberry Mochi",
    image: strawberryMochi,
    cost: 10,
    purchased: false,
  },
  {
    name: "Mooncake",
    image: mooncake,
    cost: 7,
    purchased: false,
  },
  {
    name: "Baozi",
    image: baozi,
    cost: 7,
    purchased: true,
  },
  {
    name: 'Cherry Pie',
    image: pie,
    cost: 7,
    purchased: false,
  },
  {
    name: 'Pancakes',
    image: pancake,
    cost: 5,
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

  },

]

// Zustand Store
type AppState = {
  coins: number;
  availableRecipes: Recipe[];
  ownedRecipes: string[];
  sessions: StudySession[];
  selectedSessionIndex: number | null;
  selectedRecipe: string | null;

  setSelectedSessionIndex: (index: number) => void;
  changeSelectedRecipe: (recipe: string) => void;
  addSession: (session: StudySession) => void;
  setCoins: (coins: number) => void;
  buyRecipe: (recipe: Recipe) => void;
};

export const useAppStore = create<AppState>((set, get) => ({
  coins: 0,
  availableRecipes: [...availableRecipes],
  ownedRecipes: ["Fried Egg"], 
  // sessions: [],
  sessions: testSessions,
  selectedRecipe: "Fried Egg",
  selectedSessionIndex: null,
  setSelectedSessionIndex: (index) => set({ selectedSessionIndex: index }),
  

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
