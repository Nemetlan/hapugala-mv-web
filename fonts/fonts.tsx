import localFont from 'next/font/local'
 
const Samthing = localFont({
  src: './Samthing/Samthing-Regular.otf',

})

const parma = localFont({
  src: './Parma/Parma-Regular.ttf',
})

export const fonts = {
  samthing: Samthing,
  parma: parma,
};