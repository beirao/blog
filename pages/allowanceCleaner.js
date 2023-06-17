import { PageSEO } from '@/components/SEO'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ERC20ABI } from '../abi/ERC20.abi.json'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import ApproveCard from '@/components/ApproveCard'
import is from 'sharp/lib/is'

export default function AllowanceCleaner({ repo }) {
  const { isConnected, address } = useAccount()

  const [addressInput, setAddress] = useState('')
  const [txApprove, setSetTxApprove] = useState()

  const getApproveTx = async () => {
    if (addressInput && addressInput.length === 42) {
      // const response = await fetch('/api/getApproveTx', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     addressOwner: addressInput,
      //   }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // })
      setSetTxApprove([
        {
          addressToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          addressSpender: '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f',
        },
        {
          addressToken: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          addressSpender: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
        },
        {
          addressToken: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          addressSpender: '0x000000000022d473030f116ddee9f6b43ac78ba3',
        },
      ])
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
              className="m-3 h-10 rounded-lg bg-green-700 text-white hover:bg-green-600 md:m-0 "
              onClick={getApproveTx}
            >
              <a className="mx-2">Check allowance</a>
            </button>
          </div>
          <div className="pt-1 text-slate-600 dark:text-slate-300">
            {txApprove ? 'You have ' + txApprove.length + ' approved address(es) left:' : ''}
          </div>
          {txApprove
            ? txApprove.map((props, index) => (
                <ApproveCard
                  key={index}
                  addressToken={props.addressToken}
                  addressOwner={addressInput}
                  addressSpender={props.addressSpender}
                />
              ))
            : ''}
        </div>
      </div>
    </>
  )
}
