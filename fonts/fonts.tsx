import localFont from 'next/font/local'
 
const Samthing = localFont({
  src: './Samthing/Samthing-Regular.otf',

})

const NVMONTRAVIA = localFont({
  src: './Montravia/NVMONTRAVIA-Regular.ttf',
})

const parma = localFont({
  src: './Parma/Parma-Regular.ttf',
})

const averia = localFont({
  src: './averie-brenton-font/Averie-Brenton.otf',
})
const wandpis = localFont({
  src: './wandpis-font/WandpisDEMO-Regular.ttf',
})

export const fonts = {
  samthing: Samthing,
  nvmontravia: NVMONTRAVIA,
  parma: parma,
  averia: averia,
  wandpis: wandpis,
};