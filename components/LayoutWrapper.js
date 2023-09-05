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

  function conditionnalToggle() {
    if (modalOpen) {
      setModalOpen(false)
    }
  }
  const preFillMsg =
    "Gm%20Beirao,%0DI%20was%20wondering%20if%20you'd%20be%20available%20for%20a%20private%20audit?%0D%0DHere%20are%20some%20details%20about%20our%20project:%0D%0D-%20Your%20company/team/project's%20name?%0D%0D-%20Do%20you%20have%20a%20link%20to%20the%20repo?%0D%0D-%20How%20many%20contracts%20are%20in%20scope?%0D%0D-%20Total%20SLoC%20for%20these%20contracts?%0D%0D-%20Which%20chain(s)%20will%20these%20contracts%20be%20deployed%20in?%0D%0D-%20What%20is%20the%20overall%20line%20coverage%20percentage%20provided%20by%20your%20tests?%0D%0D-%20Is%20this%20either%20a%20fork%20of%20or%20an%20alternate%20implementation%20of%20another%20project?%0D%0D-%20Is%20this%20an%20upgrade%20of%20an%20existing%20system?%0D%0D-%20Is%20there%20a%20need%20to%20understand%20a%20separate%20part%20of%20the%20codebase%20/%20get%20context%20in%20order%20to%20audit%20this%20part%20of%20the%20protocol?%0D%0D-%20Does%20it%20use%20an%20oracle?%0D%0D-%20Does%20this%20project%20involve%20new/complex%20mathematical%20models?%0D%0D-%20When%20would%20you%20like%20to%20start%20your%20audit?%0D%0D-%20Is%20there%20any%20part%20of%20the%20audit%20process%20that%20you%20want%20keep%20stealth%20or%20private?%0D%0D-%20Is%20this%20fresh%20code%20or%20has%20it%20been%20audited?%0D%0D-%20If%20it's%20been%20audited%20before,%20by%20who?%0D%0D"
  const BeiraoXID = '1610193428037476352'
  const requestXUrl = `https://twitter.com/messages/compose?recipient_id=${BeiraoXID}&text=${preFillMsg}`

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between" onClick={conditionnalToggle}>
        <header className="flex  flex-wrap items-center justify-between py-10">
          <div>
            <div className="flex items-center justify-between">
              <Link href="/" aria-label={siteMetadata.headerTitle}>
                <div className="mr-3">
                  <Logo />
                </div>
              </Link>

              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="hidden h-6 text-2xl font-semibold sm:block">
                  {siteMetadata.headerTitle}
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
              <a
                // onClick={() => setModalOpen(!modalOpen)}
                target="_blank"
                rel="noreferrer"
                href={requestXUrl}
                className="ml-1 block rounded-lg bg-gradient-to-r from-orange-600 to-orange-400 p-2 px-2 text-xs font-bold text-white opacity-80 hover:from-orange-400 hover:to-orange-600 sm:hidden"
              >
                Request an audit 🕵️‍♂️
              </a>
            </div>
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

              <a
                // onClick={() => setModalOpen(!modalOpen)}
                target="_blank"
                rel="noreferrer"
                href={requestXUrl}
                className="ml-3 rounded-lg bg-gradient-to-r from-orange-600 to-orange-400  p-2 px-4 text-sm font-bold text-white opacity-80 hover:from-orange-400 hover:to-orange-600"
              >
                Request an audit 🕵️‍♂️
              </a>
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
