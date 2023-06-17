import { PageSEO } from '@/components/SEO'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ERC20ABI } from '../abi/ERC20.abi.json'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export default function AllowanceCleaner() {
  const { isConnected, address } = useAccount()

  const [addressInput, setAddress] = useState('')

  useEffect(() => {
    setAddress(address)
  }, [isConnected, address])

  return (
    <>
      <PageSEO
        title={`Allowance Cleaner`}
        description="Tool to help you clean up your ERC20 token allowance."
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Allowance Cleaner
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Tool to help you clean up your ERC20 token allowance.
          </p>
        </div>
        <div className="p-4">
          <div className="flex flex-col place-items-end pb-3 pt-1">
            <ConnectButton />
          </div>
          <a className="text-lg">Enter your address or connect wallet:</a>
          <div className="mt-2.5">
            {isConnected ? (
              <input
                type="text"
                name="address"
                id="address"
                maxLength={42}
                minLength={42}
                disabled
                value={addressInput}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            ) : (
              <input
                type="text"
                name="address"
                id="address"
                maxLength={42}
                minLength={42}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
