import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Example() {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end items-center justify-center p-0 p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 translate-y-0 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 translate-y-0 scale-95"
            >
              <Dialog.Panel className="relative my-8 flex w-full max-w-lg transform flex-col place-items-center overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="bg-white p-6 px-4 pb-4 pb-4 pt-5">
                  <div className="flex items-start">
                    <div className="ml-4 mt-0 mt-3 text-left text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Request an audit{' '}
                      </Dialog.Title>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col place-items-center bg-gray-50 px-6 py-3">
                  <a className=" mx-11 text-black">Fill this form : </a>
                  <a className=" mx-11 text-black">and</a>

                  <a
                    href="https://twitter.com/messages/compose?recipient_id=1610193428037476352&text=Gm%20Beirao,%20I've%20just%20completed%20your%20form.%20Looking%20forward%20to%20your%20quote!"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 "
                  >
                    DM me on X
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
