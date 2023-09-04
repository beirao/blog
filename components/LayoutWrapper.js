import { Fragment, useRef, useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import ModalRequestAudit from '../components/ModalRequestAudit.js'

const LayoutWrapper = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex  flex-wrap items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}

              <button
                onClick={() => setModalOpen(!modalOpen)}
                className="ml-3 rounded-lg bg-gradient-to-r from-orange-600 to-orange-400  p-2 px-4 text-sm font-bold text-white opacity-80 hover:from-orange-400 hover:to-orange-600"
              >
                Request an audit 🕵️‍♂️
              </button>
              {modalOpen && <ModalRequestAudit />}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
