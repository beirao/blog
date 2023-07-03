import { PageSEO } from '@/components/SEO'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ERC20ABI } from '../abi/ERC20.abi.json'
import { useEffect, useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import ApproveCard from '@/components/ApproveCard'

export default function AllowanceCleaner() {
  const { isConnected, address } = useAccount()

  const [addressInput, setAddress] = useState('')
  const [txApprove, setSetTxApprove] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const getApproveTx = async () => {
    if (addressInput && addressInput.length === 42) {
      setIsLoading(true) // Définir l'état de chargement sur true avant de fetcher les données
      setSetTxApprove()

      const response = await fetch('/api/getApproveTx', {
        method: 'POST',
        body: JSON.stringify({
          addressOwner: addressInput,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const responseData = await response.json() // Store the response data
      setSetTxApprove(responseData)
      setIsLoading(false)
    } else {
      alert('Please enter a valid address.')
    }
  }

  useEffect(() => {
    if (isConnected && address) setAddress(address)
    if (txApprove && !isConnected) {
      setSetTxApprove()
    }
  }, [isConnected, address, addressInput])

  return (
    <>
      <PageSEO
        title={`Allowance Cleaner`}
        description="Tool to help you clean up your ERC20 token allowance."
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Allowance Cleaner 🧹
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Tool to help you clean up your ERC20 token allowance.
          </p>
        </div>
        <div className="p-4">
          <div className="flex flex-col place-items-end pb-3 pt-1">
            <ConnectButton />
            {isConnected ? (
              <a
                href={`https://etherscan.io/address/${address}`}
                target="_blank"
                rel="noreferrer"
                className="mt-1 text-blue-500 underline hover:underline-offset-4"
              >
                → etherscan
              </a>
            ) : (
              ''
            )}
          </div>
          <div className="mb-2 text-lg">Enter your address or connect wallet:</div>
          <div className="md:grid md:grid-cols-4 md:gap-4">
            <div className="md:col-span-3 ">
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
            <button
              className={`m-3 h-10 rounded-lg bg-green-700 text-white hover:bg-green-600 md:m-0 ${
                isLoading ? 'cursor-not-allowed opacity-50' : ''
              }`}
              onClick={getApproveTx}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="mx-4 h-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM16 0v4a8 8 0 00-8 8c0 2.18.877 4.152 2.296 5.591l3-2.647A5.965 5.965 0 0112 12a5.965 5.965 0 012.296-4.944l3 2.647C19.123 12.152 20 10.18 20 8a8 8 0 00-8-8z"
                    ></path>
                  </svg>
                </span>
              ) : (
                <span className="mx-2">Check allowance</span>
              )}
            </button>
          </div>

          {Array.isArray(txApprove)
            ? txApprove.map((props, index) => (
                <ApproveCard
                  key={index}
                  addressToken={props.addressToken}
                  addressOwner={addressInput}
                  tx={props.tx}
                  addressSpender={props.addressSpender}
                />
              ))
            : ''}
          <div className="pt-1 text-slate-600 dark:text-slate-300">
            {txApprove ? 'No more approved addresses left from here.' : ''}
          </div>
        </div>
      </div>
    </>
  )
}
