
export default function Footer() {
    return (
        <section className="bg-brown">
      <div className="max-w-screen-xl px-2 py-8 mx-auto space-y-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2 text-white">
          <div className="px-2 py-1">
            <a
              href="#"
              className="text-base leading-6 text-pillwhite "
            >
              About
            </a>
          </div>
          <div className="px-2 py-1">
            <a
              href="#"
              className="text-base leading-6 text-pillwhite "
            >
              Team
            </a>
          </div>
          <div className="px-2 py-1">
            <a
              href="#"
              className="text-base leading-6 text-pillwhite "
            >
              Pricing
            </a>
          </div>
          <div className="px-2 py-1">
            <a
              href="#"
              className="text-base leading-6 text-pillwhite "
            >
              Contact
            </a>
          </div>
          <div className="px-2 py-1">
            <a
              href="#"
              className="text-base leading-6 text-pillwhite "
            >
              Terms
            </a>
          </div>
        </nav>
        <p className="text-xs leading-6 text-center tracking-tight text-white">
          © 2023 Boobs Inc. All rights reserved.
        </p>
      </div>
    </section>
    )
}