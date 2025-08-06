import localFont from 'next/font/local'
import './globals.css'

const miFuente = localFont({
  src: './fonts/LEMONMILK-Bold.otf',
  variable: '--font-mi-fuente'
})

const miFuente2 = localFont({
  src: './fonts/SundropsDisplay.ttf',
  variable: '--font-mi-fuente2'
})






export const metadata = {
  title: 'Cris y Miguel ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${miFuente.variable} ${miFuente2.variable}`}>
      <body>{children}</body>
    </html>
  )
}

