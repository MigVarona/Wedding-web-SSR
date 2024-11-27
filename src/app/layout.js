import localFont from 'next/font/local'
import './globals.css'

const miFuente = localFont({
  src: './fonts/LEMONMILK-Bold.otf',
  variable: '--font-mi-fuente'
})

const miFuente2 = localFont({
  src: './fonts/DailyShine-Regular.otf',
  variable: '--font-mi-fuente2'
})

export const metadata = {
  title: 'Mi App con Fuentes Personalizadas',
  description: 'Una aplicación Next.js con fuentes personalizadas .otf',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${miFuente.variable} ${miFuente2.variable}`}>
      <body>{children}</body>
    </html>
  )
}

