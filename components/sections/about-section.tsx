"use client"

export function AboutSection() {
  return (
    <section className="w-screen h-screen flex items-center justify-center relative z-10 p-8">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-green-400 font-mono mb-8">ABOUT.exe</h2>

          <div className="space-y-4 text-green-300">
            <p className="text-lg leading-relaxed">
              Software Engineering student specializing in AI and Web Development. Currently pursuing my Engineering Cycle
              at Faculty of Sciences and Technologies, Tangier.
            </p>

            <p className="text-lg leading-relaxed">
              Passionate about creating innovative solutions that bridge the gap between cutting-edge technology and
              real-world applications.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="border border-green-400/30 p-4 rounded-lg bg-green-400/5">
              <h3 className="text-green-400 font-mono text-sm mb-2">LOCATION</h3>
              <p className="text-green-300">Tangier, Morocco</p>
            </div>
            <div className="border border-green-400/30 p-4 rounded-lg bg-green-400/5">
              <h3 className="text-green-400 font-mono text-sm mb-2">BORN</h3>
              <p className="text-green-300">March 15, 2003</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-green-400 font-mono">EDUCATION.log</h3>

          <div className="space-y-6">
            <div className="border-l-2 border-green-400 pl-4">
              <h4 className="text-green-300 font-mono text-lg">Engineering Cycle</h4>
              <p className="text-green-400/80 text-sm">Software & Intelligent Systems</p>
              <p className="text-gray-400 text-sm">FST Tangier • 2023 - Present</p>
            </div>

            <div className="border-l-2 border-green-400/50 pl-4">
              <h4 className="text-green-300 font-mono text-lg">DEUST</h4>
              <p className="text-green-400/80 text-sm">Mathematics, CS & Physics</p>
              <p className="text-gray-400 text-sm">FST Fez • 2021 - 2023</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-green-400 font-mono mb-4">LANGUAGES</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-300">Arabic</span>
                <span className="text-green-400">Native</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">English</span>
                <span className="text-green-400">Advanced</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">French</span>
                <span className="text-green-400">C1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">Spanish</span>
                <span className="text-green-400">Basic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
