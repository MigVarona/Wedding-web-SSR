export default function Home() {
  return (
    <main className="min-h-screen bg-[#2A2527] px-4 py-8 flex flex-col items-center justify-between">
      <header className="w-full flex justify-between items-center text-[#F5F0E8] text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#F5F0E8] flex items-center justify-center text-[#2A2527]">
            TGS
          </div>
          <span>The Good Score Type Foundry</span>
        </div>
        <div className="flex gap-4">
          <span>Designed by Danny Aldana</span>
          <span>Published by The Good Score</span>
          <span>©2024</span>
        </div>
      </header>

      <div className="container mx-auto text-center my-12">
        <h1 className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          <span className="mi-fuente-personalizada text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[14rem] font-bold leading-none tracking-wide text-[#F5F0E8]">
            CRISTINA
          </span>
          <span className="mi-fuente-personalizada text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[14rem] font-bold leading-none tracking-wide text-[#FFB7D5]">
            MIGUEL
          </span>
        </h1>
        <div className="mt-8 flex justify-end">
          <div className="text-right">
            <p className="text-xl md:text-2xl text-[#F5F0E8] mb-2">
              A Versatile<br />
              and Modern<br />
              Typeface
            </p>
            <p className="text-lg md:text-xl text-[#FFB7D5]">
              Characterized<br />
              By Its Narrow<br />
              Streamlined<br />
              Letterforms
            </p>
          </div>
        </div>
      </div>

      <footer className="w-full flex justify-between items-end text-[#F5F0E8] text-xs sm:text-sm">
        <p className="max-w-2xl">
          A versatile and modern typeface characterized by its narrow, streamlined letterforms. This font is ideal for 
          space-efficient design, offering a clean and elegant aesthetic without compromising readability.
        </p>
        <span>Follow Me at @dannyaldana</span>
      </footer>
    </main>
  )
}