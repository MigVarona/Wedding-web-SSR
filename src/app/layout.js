import localFont from 'next/font/local'
import './globals.css'

const miFuente = localFont({
  src: './fonts/LEMONMILK-Bold.otf',
  variable: '--font-mi-fuente'
})

export const metadata = {
  title: 'Mi App con Fuente Personalizada',
  description: 'Una aplicación Next.js con una fuente personalizada .otf',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={miFuente.variable}>
      <body>{children}</body>
    </html>
  )
}

