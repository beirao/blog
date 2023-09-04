import React from 'react'
import ERC20ABI from '../abi/ERC20.abi.json'
import { useEffect, useState } from 'react'
import {
  useAccount,
  usePrepareContractWrite,
  useContractRead,
  useNetwork,
  useContractWrite,
} from 'wagmi'

function ApproveCard(props) {
  const { isConnected, address } = useAccount()

  const [allowanceAmount, setAllowanceAmount] = useState(0)
  const [tokenName, setTokenName] = useState()
  const [decToken, setDecToken] = useState(1)

  const {
    data: tokenNameTemp,
    isSuccess: isSuccesstokenName,
    isLoading: isLoadingtokenName,
  } = useContractRead({
    address: props.addressToken,
    abi: ERC20ABI,
    functionName: 'symbol',
    args: [],
  })

  const {
    data: allowanceTemp,
    isSuccess: isSuccessAllowanceRead,
    isLoading: isLoadingAllowanceRead,
  } = useContractRead({
    address: props.addressToken,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: [props.addressOwner, props.addressSpender],
  })

  const { data: decimalsToken } = useContractRead({
    address: props.addressToken,
    abi: ERC20ABI,
    functionName: 'decimals',
    args: [],
  })

  const { config, error } = usePrepareContractWrite({
    address: props.addressToken,
    abi: ERC20ABI,
    functionName: 'approve',
    args: [props.addressSpender, 0],
  })
  const {
    write: approveClean,
    isLoading: isLoadingApproveClean,
    isSuccess: isSuccessApproveClean,
    data: dataApproceClean,
  } = useContractWrite(config)

  useEffect(() => {
    if (allowanceTemp) {
      setAllowanceAmount(allowanceTemp.toString())
    } else {
      setAllowanceAmount(0)
    }
    setTokenName(tokenNameTemp)
    setDecToken(decimalsToken)
  }, [
    allowanceAmount,
    isConnected,
    address,
    isSuccessAllowanceRead,
    isSuccessApproveClean,
    isSuccesstokenName,
    tokenNameTemp,
    allowanceTemp,
    decToken,
    decimalsToken,
    dataApproceClean,
  ])
  if (allowanceAmount == '0' || isNaN(allowanceAmount) || allowanceAmount == undefined) return null

  return (
    <div className="flex justify-between gap-2 border-b py-4">
      <div className="flex flex-col">
        <div>
          <a
            className="underline-offset-1 hover:underline"
            href={`https://etherscan.io/address/${props.addressToken}`}
            target="_blank"
            rel="noreferrer"
          >
            {tokenName}
          </a>
          <a className="ml-3"> {(allowanceAmount / 10 ** Number(decToken)).toExponential(3)}</a>
        </div>
        <a
          className="underline-offset-1 hover:underline"
          href={`https://etherscan.io/address/${props.addressSpender}`}
          target="_blank"
          rel="noreferrer"
        >
          Spender: {props.addressSpender.slice(0, 5)}...
        </a>
      </div>
      <div className="mt-3.5">
        <a
          className="underline-offset-1 hover:underline"
          href={`https://etherscan.io/tx/${props.tx}`}
          target="_blank"
          rel="noreferrer"
        >
          tx: {props.tx.slice(0, 5)}...
        </a>
      </div>
      <div className="rounded-lg border px-4 pt-2.5 font-bold hover:rounded-full active:bg-slate-200 dark:text-white dark:active:bg-slate-700">
        <button
          className=""
          onClick={() => {
            isConnected ? approveClean?.() : alert('Connect wallet first')
          }}
        >
          {isLoadingApproveClean ? (
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
            <span className="">Revoke</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default ApproveCard
